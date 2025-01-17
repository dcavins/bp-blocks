<?php
/**
 * BP Friends Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-friends\bp-friends-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the friends blocks.
 *
 * @since 9.0.0
 */
function register_friends_blocks() {
	$blocks = array(
		'bp/friends' => array(
			'name'               => 'bp/friends',
			'editor_script'      => 'bp-friends-block',
			'editor_script_url'  => plugins_url( 'js/blocks/friends.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-editor',
				'wp-block-editor',
				'bp-block-data',
			),
			'style'              => 'bp-friends-block',
			'style_url'          => plugins_url( 'css/blocks/friends.css', __FILE__ ),
			'attributes'         => array(
				'maxFriends'    => array(
					'type'    => 'number',
					'default' => 5,
				),
				'friendDefault' => array(
					'type'    => 'string',
					'default' => 'active',
				),
				'linkTitle'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postId'        => array(
					'type'    => 'number',
					'default' => 0,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_friends_render_friends_block',
		),
	);

	foreach ( $blocks as $block ) {
		bp_register_block( $block );
	}
}
add_action( 'bp_friends_blocks_init', __NAMESPACE__ . '\register_friends_blocks', 10, 0 );

/**
 * Registers a new script to manage the dynamic part of the Friends widget/block.
 *
 * @since 9.0.0
 *
 * @param array $scripts Data about the scripts to register.
 * @return array Data about the scripts to register.
 */
function bp_friends_register_scripts( $scripts = array() ) {
	$scripts['bp-friends-script'] = array(
		'file'         => esc_url( plugins_url( 'js/friends.js', __FILE__ ) ),
		'dependencies' => array(
			'lodash',
			'wp-url',
		),
		'footer'       => true,
	);

	return $scripts;
}
add_filter( 'bp_core_register_common_scripts', __NAMESPACE__ . '\bp_friends_register_scripts', 10, 1 );

/**
 * Returns the template to use for the Friends block items.
 *
 * @since 9.0.0
 *
 * @param string $type   Whether to use the template for JavaScript or PHP.
 * @param array  $tokens The data to use to customize the template (Needed for the PHP template).
 * @return string HTML/JS output.
 */
function bp_friends_get_friends_block_template( $type = 'js', $tokens = array() ) {
	$template = '
		<script type="html/template" id="tmpl-bp-friends-item">
			<li class="vcard">
				<div class="item-avatar">
					<a href="{{{data.link}}}" class="bp-tooltip" data-bp-tooltip="{{data.name}}">
						<img loading="lazy" src="{{{data.avatar_urls.thumb}}}" class="avatar user-{{data.id}}-avatar avatar-50 photo" width="50" height="50" alt="' . esc_html__( 'Profile Photo', 'buddypress' ) . '">
					</a>
				</div>

				<div class="item">
					<div class="item-title fn"><a href="{{{data.link}}}">{{data.name}}</a></div>
					<div class="item-meta">
						<span class="activity">{{data.extra}}</span>
					</div>
				</div>
			</li>
		</script>
	';

	// Use BP Theme Compat API to allow template override.
	$template_path = bp_locate_template( 'assets/widgets/friends.php' );
	if ( $template_path ) {
		$template = file_get_contents( $template_path ); // phpcs:ignore
	}

	if ( 'js' !== $type ) {
		$template = wp_kses(
			$template,
			array(
				'li'   => array( 'class' => true ),
				'div'  => array( 'class' => true ),
				'span' => array( 'class' => true ),
				'a'    => array(
					'href'            => true,
					'class'           => true,
					'data-bp-tooltip' => true,
				),
				'img'  => array(
					'src'     => true,
					'class'   => true,
					'loading' => true,
				),
			)
		);

		return bp_core_replace_tokens_in_text( $template, $tokens );
	}

	return $template;
}

/**
 * Registers a specific globals to be used by Friends Blocks.
 *
 * @since 9.0.0
 */
function bp_friends_register_block_globals() {
	buddypress()->friends->blocks = array(
		'bp/friends' => array(),
	);
}
add_action( 'bp_friends_setup_globals', __NAMESPACE__ . '\bp_friends_register_block_globals' );

/**
 * Adds specific script data for the BP Friends blocks.
 *
 * Only used for the BP Friends block.
 *
 * @since 9.0.0
 */
function bp_friends_blocks_add_script_data() {
	$friends_blocks = array_filter( buddypress()->friends->blocks['bp/friends'] );

	if ( ! $friends_blocks ) {
		return;
	}

	// Include the common JS template.
	echo bp_friends_get_friends_block_template(); // phpcs:ignore

	// List the block specific props.
	wp_add_inline_script(
		'bp-friends-script',
		sprintf( 'var bpFriendsBlocks = %s;', wp_json_encode( array_values( $friends_blocks ) ) ),
		'before'
	);
}

/**
 * Callback function to render the BP Friends Block.
 *
 * @since 9.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_friends_render_friends_block( $attributes = array() ) {
	$block_args = wp_parse_args(
		$attributes,
		array(
			'maxFriends'    => 5,
			'friendDefault' => 'active',
			'linkTitle'     => false,
			'postId'        => 0, // If the postId attribute is defined, post author friends are needed.
		)
	);

	$user_id = 0;
	if ( $block_args['postId'] ) {
		$user_id = (int) get_post_field( 'post_author', $block_args['postId'] );
	} else {
		$user_id = bp_displayed_user_id();

		if ( ! $user_id && isset( $_SERVER['REQUEST_URI'] ) ) {
			$request_uri  = esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );
			$request_path = wp_parse_url( $request_uri, PHP_URL_PATH );
			$regex        = addcslashes( sprintf( '%s/.*bp/friends', rest_get_url_prefix() ), '/' );

			if ( preg_match( "/{$regex}/", $request_path ) ) {
				$user_id = bp_loggedin_user_id();
			}
		}
	}

	if ( ! $user_id ) {
		return '';
	}

	$classnames         = 'widget_bp_core_friends_widget buddypress widget';
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

	$max_friends = (int) $block_args['maxFriends'];
	$no_friends  = __( 'Sorry, no members were found.', 'buddypress' );

	/**
	 * Filters the separator of the friends block nav links.
	 *
	 * @since 9.0.0
	 *
	 * @param string $separator Separator string. Default '|'.
	 */
	$separator = apply_filters( 'bp_friends_block_nav_links_separator', '|' );

	// Make sure the widget ID is unique.
	$widget_id = uniqid( 'friends-list-' );

	$link = trailingslashit( bp_core_get_user_domain( $user_id ) . bp_get_friends_slug() );

	/* translators: %s is the member's display name */
	$title = sprintf( __( '%s\'s Friends', 'buddypress' ), bp_core_get_user_displayname( $user_id ) );

	// Set the Block's title.
	if ( true === $block_args['linkTitle'] ) {
		$widget_content = sprintf(
			'<h2 class="widget-title"><a href="%1$s">%2$s</a></h2>',
			esc_url( $link ),
			esc_html( $title )
		);
	} else {
		$widget_content = sprintf( '<h2 class="widget-title">%s</h2>', esc_html( $title ) );
	}

	$item_options = array(
		'newest'  => array(
			'class' => '',
			'label' => __( 'Newest', 'buddypress' ),
		),
		'active'  => array(
			'class' => '',
			'label' => __( 'Active', 'buddypress' ),
		),
		'popular' => array(
			'class' => '',
			'label' => __( 'Popular', 'buddypress' ),
		),
	);

	$item_options_output = array();
	$separator_output    = sprintf( ' <span class="bp-separator" role="separator">%s</span> ', esc_html( $separator ) );

	foreach ( $item_options as $item_type => $item_attr ) {
		if ( $block_args['friendDefault'] === $item_type ) {
			$item_attr['class'] = ' class="selected"';
		}

		$item_options_output[] = sprintf(
			'<a href="%1$s" data-bp-sort="%2$s"%3$s>%4$s</a>',
			esc_url( $link ),
			esc_attr( $item_type ),
			$item_attr['class'],
			esc_html( $item_attr['label'] )
		);
	}

	$preview      = '';
	$default_args = array(
		'user_id'         => $user_id,
		'type'            => $block_args['friendDefault'],
		'per_page'        => $max_friends,
		'populate_extras' => true,
	);

	// Previewing the Block inside the editor.
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		$bp_query = bp_core_get_users( $default_args );
		$preview  = sprintf( '<div class="widget-error">%s</div>', $no_friends );

		if ( is_array( $bp_query['users'] ) && 0 < count( $bp_query['users'] ) ) {
			$preview = '';
			foreach ( $bp_query['users'] as $user ) {
				if ( 'newest' === $block_args['friendDefault'] ) {
					$extra = bp_core_get_last_activity(
						$user->user_registered,
						/* translators: %s is time elapsed since the registration date happened */
						_x( 'registered %s', 'Records the timestamp that the user registered into the activity stream', 'buddypress' )
					);
				} elseif ( 'popular' === $block_args['friendDefault'] && isset( $item_options['popular'] ) && isset( $user->total_friend_count ) ) {
					/** This filter is documented in buddypress/src/bp-friends/bp-friends-template.php */
					$extra = apply_filters(
						'bp_get_member_total_friend_count',
						/* translators: %s: total friend count */
						sprintf( _n( '%s friend', '%s friends', $user->total_friend_count, 'buddypress' ), number_format_i18n( $user->total_friend_count ) )
					);
				} else {
					/* translators: %s is time elapsed since the last activity happened */
					$extra = sprintf( __( 'Active %s', 'buddypress' ), bp_core_time_since( $user->last_activity ) );
				}

				$preview .= bp_friends_get_friends_block_template(
					'php',
					array(
						'data.link'              => bp_core_get_user_domain( $user->ID, $user->user_nicename, $user->user_login ),
						'data.name'              => $user->display_name,
						'data.avatar_urls.thumb' => bp_core_fetch_avatar(
							array(
								'item_id' => $user->ID,
								'html'    => false,
							)
						),
						'data.id'                => $user->ID,
						'data.extra'             => $extra,
					)
				);
			}
		}
	} else {
		// Get corresponding friends.
		$path = sprintf(
			'/%1$s/%2$s/%3$s',
			bp_rest_namespace(),
			bp_rest_version(),
			buddypress()->members->id
		);

		$default_path = add_query_arg(
			$default_args,
			$path
		);

		$preloaded_friends = array();
		if ( bp_is_running_wp( '5.0.0' ) ) {
			$preloaded_friends = rest_preload_api_request( '', $default_path );
		}

		buddypress()->friends->blocks['bp/friends'][ $widget_id ] = (object) array(
			'selector'   => $widget_id,
			'query_args' => $default_args,
			'preloaded'  => reset( $preloaded_friends ),
		);

		// Only enqueue common/specific scripts and data once per page load.
		if ( ! has_action( 'wp_footer', __NAMESPACE__ . '\bp_friends_blocks_add_script_data', 1 ) ) {
			wp_enqueue_script( 'bp-friends-script' );
			wp_localize_script(
				'bp-friends-script',
				'bpFriendsSettings',
				array(
					'path'    => ltrim( $path, '/' ),
					'root'    => esc_url_raw( get_rest_url() ),
					'nonce'   => wp_create_nonce( 'wp_rest' ),
					'strings' => array(
						'noFriendsFound' => $no_friends,
					),
				)
			);

			add_action( 'wp_footer', __NAMESPACE__ . '\bp_friends_blocks_add_script_data', 1 );
		}
	}

	$widget_content .= sprintf(
		'<div class="item-options">
			%1$s
		</div>
		<ul id="%2$s" class="item-list" aria-live="polite" aria-relevant="all" aria-atomic="true">
			%3$s
		</ul>',
		implode( $separator_output, $item_options_output ),
		esc_attr( $widget_id ),
		$preview
	);

	// Adds a container to make sure the block is styled even when used into the Columns parent block.
	$widget_content = sprintf( '<div class="bp-dynamic-block-container">%s</div>', "\n" . $widget_content . "\n" );

	// Only add a block wrapper if not loaded into a Widgets sidebar.
	if ( ! did_action( 'dynamic_sidebar_before' ) ) {
		return sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$widget_content
		);
	}

	return $widget_content;
}

/**
 * Make sure the BP Classnames are included into Widget Blocks.
 *
 * @since 9.0.0
 *
 * @param string $classname The classname to be used in the block widget's container HTML.
 * @param string $block_name The name of the block.
 * @return string The classname to be used in the block widget's container HTML.
 */
function bp_friends_get_widget_block_classname( $classname, $block_name ) {
	if ( 'bp/friends' === $block_name ) {
		$classname .= ' widget_bp_core_friends_widget buddypress';
	}

	return $classname;
}
add_filter( 'widget_block_dynamic_classname', __NAMESPACE__ . '\bp_friends_get_widget_block_classname', 10, 2 );
