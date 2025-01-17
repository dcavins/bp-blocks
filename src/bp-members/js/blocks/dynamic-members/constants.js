/**
 * WordPress dependencies.
 */
 const {
	i18n: {
		__,
	},
} = wp;

/**
 * Members ordering types.
 *
 * @type {Array}
 */
export const TYPES = [
	{
		label: __( 'Newest', 'buddypress' ),
		value: 'newest',
	},
	{
		label: __( 'Active', 'buddypress' ),
		value: 'active',
	},
	{
		label: __( 'Popular', 'buddypress' ),
		value: 'popular',
	},
];
