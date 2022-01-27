const ChangeAddress = (props) => {
	const handleChange = props.handleChange;
	const input = props.input;
	const handleSubmit = props.handleChangeAddressSubmit;

	return (
		<div className="changeAddress">
			<h6>For location services</h6>
			<form action="submit">
				<div className="changeAddressLabels">
					<label htmlFor="country">Country</label>
					<label htmlFor="province">Province/State</label>
					<label htmlFor="city">City</label>
					<label htmlFor="postalCode">Postal code</label>
					<label htmlFor="address">Address</label>
				</div>
				<div className="changeAddressInputs">
					<input
						type="text"
						name="country"
						placeholder="Country"
						onChange={handleChange}
						value={input.country}
					/>
					<input
						type="text"
						name="province"
						placeholder="Province/State"
						onChange={handleChange}
						value={input.province}
					/>
					<input
						type="text"
						name="city"
						placeholder="City"
						onChange={handleChange}
						value={input.city}
					/>
					<input
						type="text"
						name="postalCode"
						placeholder="Postal code"
						onChange={handleChange}
						value={input.postalCode}
					/>
					<input
						type="text"
						name="address"
						placeholder="Address"
						onChange={handleChange}
						value={input.address}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Save address
				</button>
			</form>
		</div>
	);
};

export default ChangeAddress;
