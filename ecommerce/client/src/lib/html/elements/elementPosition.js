/**Check if the element is in the viewport screen
 *
 * @param {Object} el The element to search for
 * @returns {Boolean} If the element is on the viewport screen returns true.
 */
export const wholeElementOnScreen = (el) => {
	if (!el)
		return console.warn(
			`No element was provided on wholeElementOnScreen function`
		);
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidthh)
	);
};
