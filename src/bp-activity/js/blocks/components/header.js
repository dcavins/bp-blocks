/**
 * WordPress dependencies.
 */
const { Button, Dashicon } = wp.components;
const { useSelect } = wp.data;
const { __, sprintf } = wp.i18n;

/**
 * Internal dependencies.
 */
import ActivityPublishButton from './publish-button';

export default function Header() {
	const user = useSelect( ( select ) => {
		return select( 'bp/activity' ).getCurrentUser();
	}, [] );

	let buttonVisual = (
		<Dashicon icon="buddicons-activity" />
	);

	if ( user.avatar_urls && user.avatar_urls.thumb ) {
		buttonVisual = (
			<img src={ user.avatar_urls.thumb } />
		);
	}

	let headerTitle = __( 'What’s new buddy?', 'buddypress' );
	if ( user.name ) {
		headerTitle = sprintf(
			/* translators: %s is the user's name */
			__( 'What’s new %s?', 'buddypress' ),
			user.name
		);
	}

	return (
		<div
			className="activity-editor-header"
			role="region"
			aria-label={ __( 'Activity Editor top bar.', 'buddypress' ) }
			tabIndex="-1"
		>
			<div className="activity-editor-header__user_header">
				<Button
					className="activity-editor-header__user-avatar"
					href={ user.link }
					label={ sprintf( __( 'View all %s‘s activities', 'buddypress' ), user.name ) }
				>
					{ buttonVisual }
				</Button>

				<h1 className="activity-editor-header__title">
					{ headerTitle }
				</h1>
			</div>

			<ActivityPublishButton />
		</div>
	);
}
