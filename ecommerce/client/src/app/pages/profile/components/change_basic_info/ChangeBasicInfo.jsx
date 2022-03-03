import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { handleMessageValidationv2 } from "../../../../../lib/handleMessageValidation";
import { GlobalContext } from "../../../../App";
import Field from "../../../../components/inputs/field/Field";
import "./ChangeBasicInfo.css";

const ChangeBasicInfo = (props) => {
	const { token, user, setToken } = useContext(GlobalContext);
	const {
		handleChange,
		passwordInfo,
		setPasswordInfo,
		input,
		setIsInChildComponent,
		setError,
		error,
	} = props;
	const [resData, setResData] = useState({});
	const [showPasswordMessage, setShowPasswordMessage] = useState(false);
	const [emailError, setEmailError] = useState({
		state: "",
		message: "",
	});

	const handleBasicInfoSubmit = async (e) => {
		e.preventDefault();

		dataValidation();

		await axios
			.post("http://localhost:3001/api/profile/changeBasicInfo", {
				token,
				_id: user._id,
				...input,
			})
			.then((res) => handleResponse(res))
			.catch((err) => handleError(err));
	};

	const dataValidation = () => {
		try {
			setShowPasswordMessage(false);
			if (!input.password) {
				setPasswordInfo({
					...passwordInfo,
					error: true,
					message: "You must provide a password for making changes",
				});

				// Timeout
				return setShowPasswordMessage(true);
			} else if (input.password.length < 8) {
				setPasswordInfo({
					...passwordInfo,
					error: true,
					errorMessage: "The password must be at least 8 characters long.",
				});

				// Timeout
				return setShowPasswordMessage(true);
			}
		} catch (err) {}
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
		console.log(`On ChangeBasicInfo, response:`);
		console.log(data);

		// If there was an error
		if (data.message || data.joiMessage) {
			// Some validation
			if (data.field === "email" && data.error) {
				return setEmailError({
					...emailError,
					state: data.state,
					message: data.message,
				});
			} // If the password isn't correct
			else if (data.field === "password" && data.error) {
				setShowPasswordMessage(true);
				return setPasswordInfo({
					...passwordInfo,
					error: true,
					state: data.state,
					message: data.message,
				});
			} // For data validation
			else if (data.joiMessage && data.error) {
				const modifiedMessage = handleMessageValidationv2(
					{
						firstName: input.firstName,
						lastName: input.lastName,
						email: input.email,
						password: input.password,
					},
					res,
					["First name", "Last name", "Email", "Password"]
				);
				return setResData({
					field: "",
					message: modifiedMessage,
					error: data.error,
					state: data.state,
				});
			} // Normal message
			else if (data.message && data.error) {
				return setResData({
					field: "",
					message: data.message,
					error: data.error,
					state: data.state,
				});
			} // Set the response token on the local storage
			else if (!data.error && data.token && data.token !== "undefined") {
				localStorage.setItem("token", data.token);
				return setToken(data.token);
			}
		}
	};
	
	useEffect(() => {
		setIsInChildComponent(true);
	}, [setIsInChildComponent])

	return (
		<div className="changeBasicInfo">
			{/* Show or hide repeated email error message */}
			{(resData.field === "email" && emailError.message && (
				<div className="emailErrorPopup" onClick={() => setEmailError({})}>
					<div className="emailArrow"></div>
					<div className="emailErrorMessage">{resData.message}</div>
				</div>
			)) ||
				(resData.message && (
					<div
						className={
							"basicInfoMessage " + ((resData.state && resData.state) || "")
						}
						onClick={() => setResData({})}
					>
						<div>{resData.message}</div>
					</div>
				))}

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
					content="First name"
					htmlFor="firstName"
					inputClasses="input"
					inputName="firstName"
					inputOnChange={handleChange}
					inputPlaceholder="First name"
					inputType="text"
					inputValue={input && input.firstName}
				/>
				<Field
					content="Last name"
					htmlFor="lastName"
					inputClasses="input"
					inputName="lastName"
					inputOnChange={handleChange}
					inputPlaceholder="Last name"
					inputType="text"
					inputValue={input && input.lastName}
				/>
				<Field
					content="Email"
					htmlFor="email"
					inputClasses={
						"input" +
						((resData.field === "email" && resData.error && "danger") || "")
					}
					inputName="email"
					inputOnChange={handleChange}
					inputPlaceholder="Email"
					inputType="text"
					inputValue={input && input.email}
				/>
				<Field
					content="Age"
					htmlFor="age"
					inputClasses="input"
					inputName="age"
					inputOnChange={handleChange}
					inputPlaceholder="Age"
					inputType="date"
					inputValue={input && input.age}
				/>
				<Field
					content="Phone number"
					htmlFor="phoneNumber"
					inputClasses="input"
					inputName="phoneNumber"
					inputOnChange={handleChange}
					inputPlaceholder="Phone number"
					inputType="text"
					inputValue={input && input.phoneNumber}
				/>
				<Field
					content="Password"
					htmlFor="password"
					inputClasses={
						"input" + (passwordInfo && passwordInfo.error ? "danger" : "")
					}
					inputName="password"
					inputOnChange={handleChange}
					inputOnClick={(e) =>
						setPasswordInfo({ ...passwordInfo, error: false })
					}
					inputPlaceholder="Password"
					inputType="password"
					inputValue={input && input.password}
				/>
				<button className="btn" type="submit" onClick={handleBasicInfoSubmit}>
					Save
				</button>
			</form>
		</div>
	);
};

export default ChangeBasicInfo;
