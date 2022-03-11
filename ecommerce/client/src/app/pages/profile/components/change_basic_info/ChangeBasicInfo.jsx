import React, { useState } from "react";
import axios from "axios";

import Field from "../../../../components/inputs/field/Field";
import "./ChangeBasicInfo.css";
import { useSelector } from "react-redux";
import { getToken } from "../../../../../lib/misc/getToken";
import AlertV2 from "../../../../components/alertv2/AlertV2";
import { getAnyMessage } from "../../../../../lib/debug/handleMessages";
import { validatePasswordLength } from "../../../../../lib/validation/password";

const ChangeBasicInfo = (props) => {
	const user = useSelector((state) => state.user);

	const {
		handleChange,
		passwordInfo,
		setPasswordInfo,
		input,
		setError,
		error,
	} = props;

	const [resData, setResData] = useState({});
	const [showPasswordMessage, setShowPasswordMessage] = useState(false);
	const [status, setStatus] = useState({});

	const handleBasicInfoSubmit = async (e) => {
		e.preventDefault();

		if (!validatePasswordLength(input.password, setStatus)) return;

		// Token for jwt authentication
		const token = getToken();
		await axios
			.post("http://localhost:3001/api/profile/changeBasicInfo", {
				_id: user._id,
				token,
				...input,
			})
			.then((res) => handleResponse(res))
			.catch((err) => handleError(err));
	};

	const handleError = (err) => {
		console.error(err);
		return setError({
			...error,
			state: "danger",
			message:
				"Internal server error, the website may be offline for a short time, try again later.",
		});
	};

	const handleResponse = (res) => {
		const data = res.data;

		// Save the response for later use
		setResData({ ...data });
		// console.log(`Response:`, data);

		if (data && data.token && typeof data.token === "string")
			localStorage.setItem("token", data.token);

		return getAnyMessage({
			input,
			debug: res,
			options: {
				reorganizedKeys: [
					"firstName",
					"lastName",
					"email",
					"age",
					"phoneNumber",
					"password",
				],
			},
			placeholderValues: [
				"First name",
				"Last name",
				"Email",
				"Birthday",
				"Phone number",
				"Password",
			],
			setCB: setStatus,
		});
	};

	return (
		<div className="changeBasicInfo">
			{/* Feedback alerts */}
			<AlertV2 center={true} setStatus={setStatus} status={status} />

			{/* Show or hide password error message */}
			{showPasswordMessage && (
				<div
					className="errorPopup"
					onClick={(e) => setShowPasswordMessage(false)}
				>
					<div className="arrow"></div>
					<div className="errorMessage">{passwordInfo.message}</div>
				</div>
			)}

			<h1>Basic info</h1>
			<form className="changeBasicInfo">
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="First name"
					inputName="firstName"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={input && input.firstName}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Last name"
					inputName="lastName"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={input && input.lastName}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputClasses={
						(resData.field === "email" && resData.error && "danger") || ""
					}
					inputLabel="Email"
					inputName="email"
					inputOnChange={handleChange}
					inputType="email"
					inputValue={input && input.email}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Birthday"
					inputName="age"
					inputOnChange={handleChange}
					inputType="date"
					inputValue={input && input.age}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Phone number"
					inputName="phoneNumber"
					inputOnChange={handleChange}
					inputType="text"
					inputValue={input && input.phoneNumber}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputClasses={passwordInfo && passwordInfo.error ? "danger" : ""}
					inputLabel="Password"
					inputName="password"
					inputOnChange={handleChange}
					inputOnClick={(e) =>
						setPasswordInfo({ ...passwordInfo, error: false })
					}
					inputType="password"
					inputValue={input && input.password}
					setStatus={setStatus}
					status={status}
				/>
				<button className="btn" type="submit" onClick={handleBasicInfoSubmit}>
					Save
				</button>
			</form>
		</div>
	);
};

export default ChangeBasicInfo;
