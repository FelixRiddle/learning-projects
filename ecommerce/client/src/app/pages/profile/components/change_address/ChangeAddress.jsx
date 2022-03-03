import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { handleMessageValidationv2 } from "../../../../../lib/handleMessageValidation";
import { GlobalContext } from "../../../../App";

const ChangeAddress = (props) => {
	const { token, user } = useContext(GlobalContext);
	const { input } = props;
	const [location, setLocation] = useState({
		country: "",
		province: "",
		city: "",
		postalCode: "",
		address: "",
	});
	const [message, setMessage] = useState({
		message: "",
		error: false,
		state: "",
		field: "",
	});
	const [dataLoaded, setDataLoaded] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLocation((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleChangeAddressSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/api/profile/changeAddress", {
				...input,
				_id: user._id,
				token,
				...location,
			})
			.then((res) => {
				console.log(res);
				if (res.data.joiMessage) {
					const joiMessage = handleMessageValidationv2(
						{
							...location,
						},
						res,
						["Country", "Province/State", "City", "Postal Code", "Address"]
					);
					setMessage({
						message: joiMessage,
						error: res.data.error,
						state: res.data.state,
						field: res.data.state,
					});
					console.log(joiMessage);
					console.log(message);
				} else if (res.data) {
					const { token, error, state, message } = res.data;

					// Save token
					if (token) localStorage.setItem("token", token);

					// Show message
					setMessage({
						message,
						state,
						error,
					});
				} else {
					console.log(`Impossible.`);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		if (
			location.country ||
			location.province ||
			location.city ||
			location.postalCode ||
			location.address ||
			dataLoaded
		)
			return;

		if (user._id) {
			let { country, province, city, postalCode, address } = user;

			if (!country) country = "";
			if (!province) province = "";
			if (!city) city = "";
			if (!postalCode) postalCode = "";
			if (!address) address = "";

			setLocation({ country, province, city, postalCode, address });
			setDataLoaded((prevInput) => !prevInput);
		}
	}, [location, user, dataLoaded]);

	return (
		<div className="changeAddress">
			<h6>For location services</h6>
			<Message message={message} setMessage={setMessage} />

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
						value={location.country}
					/>
					<input
						type="text"
						name="province"
						placeholder="Province/State"
						onChange={handleChange}
						value={location.province}
					/>
					<input
						type="text"
						name="city"
						placeholder="City"
						onChange={handleChange}
						value={location.city}
					/>
					<input
						type="text"
						name="postalCode"
						placeholder="Postal code"
						onChange={handleChange}
						value={location.postalCode}
					/>
					<input
						type="text"
						name="address"
						placeholder="Address"
						onChange={handleChange}
						value={location.address}
					/>
				</div>
				<button
					className="btn"
					type="submit"
					onClick={handleChangeAddressSubmit}
				>
					Save address
				</button>
			</form>
		</div>
	);
};

const Message = (props) => {
	const { message, setMessage } = props;

	return (
		<div
			className={"message " + message.state}
			onClick={() =>
				setMessage({
					message: "",
					error: false,
					state: "",
					field: "",
				})
			}
			hidden={!message.message && true}
		>
			{message.message && message.message}
		</div>
	);
};

export default ChangeAddress;
