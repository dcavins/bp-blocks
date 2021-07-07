<?php
/**
 * BP Messages Blocks Functions.
 *
 * @package   bp-blocks
 * @subpackage \build\bp-messages\bp-messages-blocks
 */

namespace BP\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the messages component blocks.
 *
 * @since 9.0.0
 */
function register_messages_blocks() {
	$blocks = array(
		'bp/sitewide-notices' => array(
			'name'               => 'bp/sitewide-notices',
			'editor_script'      => 'bp-sitewide-notices-block',
			'editor_script_url'  => plugins_url( 'js/blocks/sitewide-notices.js', __FILE__ ),
			'editor_script_deps' => array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-i18n',
				'wp-editor',
				'wp-block-editor',
				'bp-block-data',
			),
			'style'              => 'bp-sitewide-notices-block',
			'style_url'          => plugins_url( 'css/blocks/sitewide-notices.css', __FILE__ ),
			'attributes'         => array(
				'title' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
			'render_callback'    => __NAMESPACE__ . '\bp_messages_render_sitewide_notices_block',
		),
	);

	foreach ( $blocks as $block ) {
		bp_register_block( $block );
	}
}
add_action( 'bp_messages_blocks_init', __NAMESPACE__ . '\register_messages_blocks', 10, 0 );

/**
 * Callback function to render the BP Sitewide Notices Block.
 *
 * @since 9.0.0
 *
 * @param array $attributes The block attributes.
 * @return string           HTML output.
 */
function bp_messages_render_sitewide_notices_block( $attributes = array() ) {
	$block_args = bp_parse_args(
		$attributes,
		array(
			'title' => '',
		),
		'widget_object_sitewide_messages'
	);

	if ( ! is_user_logged_in() ) {
		return;
	}

	// Don't display the block if there are no Notices to show.
	$notice = \BP_Messages_Notice::get_active();
	if ( empty( $notice ) ) {
		return;
	}

	$closed_notices = (array) bp_get_user_meta( bp_loggedin_user_id(), 'closed_notices', true );

	if ( in_array( $notice->id, $closed_notices ) ) {
		return;
	}

	// There is an active, non-dismissed notice to show.
	$title = $block_args['title'];

	$classnames         = 'widget_bp_core_sitewide_messages buddypress widget';
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

	$widget_content = '';

	if ( $title ) {
		$widget_content .= sprintf(
			'<h2 class="widget-title">%s</h2>',
			esc_html( $title )
		);
	}

	$widget_content .= sprintf(
		'<div class="bp-sitewide-notice">
			<div id="message" class="info notice" rel="n-%1$d">
				<strong>%2$s</strong>
				<button type="button" id="close-notice" class="bp-tooltip" data-bp-tooltip="%3$s" data-bp-sitewide-notice-id="%4$d"><span class="bp-screen-reader-text">%5$s</span> <span aria-hidden="true">&Chi;</span></button>
				%6$s
			</div>
		</div>',
		esc_attr( $notice->id ),
		bp_get_message_notice_subject( $notice ),
		esc_attr__( 'Dismiss this notice', 'buddypress' ),
		esc_attr( $notice->id ),
		esc_html__( 'Dismiss this notice', 'buddypress' ),
		bp_get_message_notice_text( $notice )
	);

	if ( ! did_action( 'dynamic_sidebar_before' ) ) {
		return sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$widget_content
		);
	}

	return $widget_content;
}