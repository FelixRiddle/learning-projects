class PgPoolStyle {
	/**
	 * Give data in object form and convert it to sql query
	 * @param {object} data: Data(usually in req.body)
	 * @param {string} tableName: The name of the table to insert into
	 * @returns
	 */
	insertIntoString = (data, tableName) => {
		// If no data was provided
		if (!data || typeof data !== "object") throw Error(`No data provided.`);
		if (!tableName || typeof tableName !== "string")
			throw Error(`No table name provided.`);
		const keysAndValues = Object.entries(data);
		// Join the keys and separate them by comma
		let strCombined = keysAndValues.map((e) => e[0]).join(", ");
		let setValues = keysAndValues.map((e, index) => `$${index + 1}`).join(`, `);
		return `INSERT INTO ${tableName} (${strCombined}) VALUES (${setValues})`;
	};

	findByIdAndUpdateString = (data, tableName) => {
		// If no data was provided
		if (!data || typeof data !== "object") throw Error(`No data provided.`);
		if (!tableName || typeof tableName !== "string")
			throw Error(`No table name provided.`);
		const keysAndValues = Object.entries(data);
		// Join the keys and separate them by comma
		let strCombined = keysAndValues
			.map((e, index) => `${e[0]} = $${index + 1}`)
			.join(", ");
		return `UPDATE ${tableName} SET ${strCombined} WHERE id = $${keysAndValues.length}`;
	};

	/**
	 * Get object data as an array usually for the second argument in
	 * pool.query()
	 * @param {object} data
	 * @returns
	 */
	getAsArray = (data) => {
		// If no data was provided
		if (!data || typeof data !== "object") throw Error(`No data provided.`);
		return Object.entries(data).map((e) => e[1]);
	};
}

module.exports = PgPoolStyle;