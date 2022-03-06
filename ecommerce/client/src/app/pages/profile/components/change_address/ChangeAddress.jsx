import { useEffect, useState } from "react";
import axios from "axios";

import { handleMessageValidationv2 } from "../../../../../lib/handleMessageValidation";
import Field from "../../../../components/inputs/field/Field";
import { useSelector } from "react-redux";
import { getToken } from "../../../../../lib/misc/getToken";

const ChangeAddress = (props) => {
	const user = useSelector((state) => state.user);

	const { handleChange, input, setIsInChildComponent } = props;

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

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setLocation((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleAddressSubmit = (e) => {
		e.preventDefault();

		if (!handlePasswordValidation()) return;

		// Token for jwt authentication
		const token = getToken();
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

	const handlePasswordValidation = () => {
		if (input.password.length < 8) {
			setMessage({
				error: true,
				field: "password",
				message: "The password must be at least 8 characters long.",
				state: "danger",
			});
			return false;
		}

		return true;
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
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.country}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Province/State"
					inputName="province"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.province}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="City"
					inputName="city"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.city}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Street address"
					inputName="address"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.address}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Postal code"
					inputName="postalCode"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.postalCode}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputClasses={(message && message.error ? "danger" : "") || ""}
					inputLabel="Password"
					inputName="password"
					inputOnChange={handleChange}
					inputOnClick={(e) => setMessage({ ...message, error: false })}
					inputType="password"
					inputValue={input && input.password}
				/>
				<button className="btn" type="submit" onClick={handleAddressSubmit}>
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
