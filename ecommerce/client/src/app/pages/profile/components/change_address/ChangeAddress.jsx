import { useEffect, useState } from "react";
import axios from "axios";

import Field from "../../../../components/inputs/field/Field";
import { useSelector } from "react-redux";
import { getToken } from "../../../../../lib/misc/getToken";
import AlertV2 from "../../../../components/alertv2/AlertV2";
import { validatePasswordLength } from "../../../../../lib/validation/password";
import { getAnyMessage } from "../../../../../lib/debug/handleMessages";

const ChangeAddress = (props) => {
	const user = useSelector((state) => state.user);

	const { handleChange, input } = props;

	const [dataLoaded, setDataLoaded] = useState(false);
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
	const [status, setStatus] = useState({});

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setLocation((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleAddressSubmit = (e) => {
		e.preventDefault();

		// if (!handlePasswordValidation()) return;
		if (!validatePasswordLength(input.password, setStatus)) return;

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
				if (res && res.data && res.data.token)
					localStorage.setItem("token", res.data.token);

				return getAnyMessage({
					debug: res,
					placeholderValues: [
						"Country",
						"Province/State",
						"City",
						"Street address",
						"Postal code",
						"Password",
					],
					options: {
						reorganizedKeys: [
							"country",
							"province",
							"city",
							"address",
							"postalCode",
							"password",
						],
					},
					setCB: setStatus,
				});
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

			<AlertV2 center={true} setStatus={setStatus} status={status} />

			<form action="submit">
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Country"
					inputName="country"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.country}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Province/State"
					inputName="province"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.province}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="City"
					inputName="city"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.city}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Street address"
					inputName="address"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.address}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Postal code"
					inputName="postalCode"
					inputOnChange={handleAddressChange}
					inputType="text"
					inputValue={location && location.postalCode}
					setStatus={setStatus}
					status={status}
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
					setStatus={setStatus}
					status={status}
				/>
				<button className="btn" type="submit" onClick={handleAddressSubmit}>
					Save address
				</button>
			</form>
		</div>
	);
};

export default ChangeAddress;
