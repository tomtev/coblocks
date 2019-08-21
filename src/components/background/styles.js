/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * Background Classes
 *
 * @param {Object} attributes      The attributes.
 * @param {Object} backgroundColor The selected background color.
 * @returns {Object} styles.
 */
const BackgroundStyles = ( attributes, backgroundColor ) => {
	const backgroundClass = attributes && attributes.backgroundColor && getColorClassName( 'background-color', attributes.backgroundColor );
	const styles = {
		backgroundImage: attributes.backgroundImg && attributes.backgroundType === 'image' ? `url(${ attributes.backgroundImg })` : undefined,
		backgroundColor: backgroundColor.color,
		backgroundPosition: attributes.focalPoint && ! attributes.hasParallax ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined,
	};
	return styles;
};

export default BackgroundStyles;
