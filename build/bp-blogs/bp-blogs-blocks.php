<?php
/**
 * BP Groups Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-blogs\bp-blogs-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Blogs blocks.
 *
 * @todo Update `BP_Blogs_Component` component to include a `BP_Blogs_Component::blocks_init`
 * method to register BP Blogs Blocks.
 *
 * @since 9.0.0
 */
function register_blogs_blocks() {
	$blocks = array();

	if ( is_multisite() ) {
		$blocks['bp/recent-posts'] = array(
			'name'               => 'bp/recent-posts',
			'editor_script'      => 'bp-recent-posts-block',
			'editor_script_url'  => plugins_url( 'js/blocks/recent-posts.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-editor',
				'wp-block-editor',
			),
			'style'              => 'bp-recent-posts-block',
			'style_url'          => plugins_url( 'css/blocks/recent-posts.css', __FILE__ ),
			'attributes'         => array(
				'title'     => array(
					'type'    => 'string',
					'default' => __( 'Recent Networkwide Posts', 'buddypress' ),
				),
				'maxPosts'  => array(
					'type'    => 'number',
					'default' => 10,
				),
				'linkTitle' => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_blogs_render_recent_posts_block',
		);
	}

	/** The dynamic version of this filter is documented in bp-core/classes/class-bp-component.php. */
	$blocks = (array) apply_filters( 'bp_blogs_register_blocks', $blocks );

	if ( $blocks ) {
		foreach ( $blocks as $block ) {
			bp_register_block( $block );
		}
	}
}
add_action( 'bp_blogs_blocks_init', __NAMESPACE__ . '\register_blogs_blocks', 10, 0 );

/**
 * Callback function to render the Recent Posts Block.
 *
 * @since 9.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_blogs_render_recent_posts_block( $attributes = array() ) {
	$block_args = wp_parse_args(
		$attributes,
		array(
			'title'     => __( 'Recent Networkwide Posts', 'buddypress' ),
			'maxPosts'  => 10,
			'linkTitle' => false,
		)
	);

	$classnames           = 'widget_bp_blogs_widget buddypress widget';
	$wrapper_attributes   = get_block_wrapper_attributes( array( 'class' => $classnames ) );
	$blogs_directory_link = bp_get_blogs_directory_permalink();
	$max_posts            = (int) $block_args['maxPosts'];
	$no_posts             = __( 'Sorry, there were no posts found.', 'buddypress' );

	// Set the Block's title.
	if ( true === $block_args['linkTitle'] ) {
		$widget_content = sprintf(
			'<h2 class="widget-title"><a href="%1$s">%2$s</a></h2>',
			esc_url( $blogs_directory_link ),
			esc_html( $block_args['title'] )
		);
	} else {
		$widget_content = sprintf( '<h2 class="widget-title">%s</h2>', esc_html( $block_args['title'] ) );
	}

	$blog_activities = bp_activity_get(
		array(
			'action'   => 'new_blog_post',
			'max'      => $max_posts,
			'per_page' => $max_posts,
			'user_id'  => 0,
			'scope'    => false,
			'filter'   => array(
				'object'     => false,
				'primary_id' => false,
			),
		)
	);

	$blog_activities = reset( $blog_activities );

	if ( ! $blog_activities ) {
		$widget_content .= sprintf( '<div class="widget-error">%s</div>', $no_posts );
	} else {
		// Avoid conflicts with other activity loops.
		$reset_activities_template = null;
		if ( ! empty( $GLOBALS['activities_template'] ) ) {
			$reset_activities_template = $GLOBALS['activities_template'];
		}

		$GLOBALS['activities_template'] = new \stdClass();
		$activities                     = array();

		foreach ( $blog_activities as $blog_activity ) {
			$activity_content                         = '';
			$GLOBALS['activities_template']->activity = $blog_activity;

			if ( $blog_activity->content ) {
				/** This filter is documented in bp-activity/bp-activity-template.php. */
				$activity_content = apply_filters_ref_array( 'bp_get_activity_content_body', array( $blog_activity->content, &$blog_activity ) );
				$activity_content = sprintf(
					'<div class="activity-inner">%s</div>',
					$activity_content
				);
			}

			/** This filter is documented in bp-activity/bp-activity-template.php. */
			$actity_action = apply_filters_ref_array(
				'bp_get_activity_action',
				array(
					bp_insert_activity_meta( $blog_activity->action ),
					&$blog_activity,
					array( 'no_timestamp' => false ),
				)
			);

			$activities[] = sprintf(
				'<li>
					<div class="activity-content">
						<div class="activity-header">%1$s</div>
						%2$s
					</div>
				</li>',
				$actity_action,
				$activity_content
			);
		}

		// Reset the global template loop.
		$GLOBALS['activities_template'] = $reset_activities_template;

		$widget_content .= sprintf(
			'<ul class="activity-list item-list">
				%s
			</ul>',
			implode( "\n", $activities )
		);
	}

	// Adds a container to make sure the block is styled even when used into the Columns parent block.
	$widget_content = sprintf( '<div class="bp-recent-posts-block-container">%s</div>', "\n" . $widget_content . "\n" );

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
function bp_blogs_get_widget_block_dynamic_classname( $classname, $block_name ) {
	if ( 'bp/recent-posts' === $block_name ) {
		$classname .= ' widget_bp_blogs_widget buddypress';
	}

	return $classname;
}
add_filter( 'widget_block_dynamic_classname', __NAMESPACE__ . '\bp_blogs_get_widget_block_dynamic_classname', 10, 2 );
