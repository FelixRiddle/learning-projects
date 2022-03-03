import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { handleMessageValidationv2 } from "../../../../../lib/handleMessageValidation";
import { GlobalContext } from "../../../../App";
import Field from "../../../../components/inputs/field/Field";

const ChangeAddress = (props) => {
	const { token, user } = useContext(GlobalContext);

	const { input, setIsInChildComponent } = props;

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

	useEffect(() => {
		setIsInChildComponent(true);
	}, [setIsInChildComponent]);

	return (
		<div className="changeAddress">
			<h6>For location services</h6>
			<Message message={message} setMessage={setMessage} />

			<form action="submit">
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Country"
					inputName="country"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={location && location.country}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Province/State"
					inputName="province"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={location && location.province}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="City"
					inputName="city"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={location && location.city}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Street address"
					inputName="address"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={location && location.address}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Postal code"
					inputName="postalCode"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={location && location.postalCode}
				/>
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
