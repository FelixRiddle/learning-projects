/** Utc to YYYY-MM-DD
 *
 * @param {String} date
 * @returns {String}
 */
export const get_year_month_day = (date) => {
	const tempAge = new Date(Date.parse(date));
	const newAge = [
		tempAge.getUTCFullYear(),
		("0" + (tempAge.getMonth() + 1)).slice(-2),
		("0" + tempAge.getDate()).slice(-2),
	].join("-");

	return newAge;
};
