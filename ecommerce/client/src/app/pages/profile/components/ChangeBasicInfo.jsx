import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleMessageValidationv2 } from "../../../../lib/handleMessageValidation";
import jwt_decode from "jwt-decode";

const ChangeBasicInfo = (props) => {
	const {
		handleChange,
		input,
		passwordInfo,
		setPasswordInfo,
		setError,
		error,
		setInput,
	} = props;
	const [resData, setResData] = useState({});
	const [showHidePasswordIcon, setShowHidePasswordIcon] = useState(true);
	const [showPasswordMessage, setShowPasswordMessage] = useState(false);
	const [emailError, setEmailError] = useState({
		state: "",
		message: "",
	});
	const [token, setToken] = useState("");

	const handleBasicInfoSubmit = async (e) => {
		e.preventDefault();

		try {
			setShowPasswordMessage(false);
			if (!input.password) {
				setPasswordInfo({
					...passwordInfo,
					error: true,
					message: "You must provide a password for making changes",
				});

				// Timeout
				setShowPasswordMessage(true);

				return;
			} else if (input.password.length < 8) {
				setPasswordInfo({
					...passwordInfo,
					error: true,
					errorMessage: "The password must be at least 8 characters long.",
				});

				// Timeout
				setShowPasswordMessage(true);

				return;
			}
		} catch (err) {}

		await axios
			.post("http://localhost:3001/api/profile/changeBasicInfo", {
				token,
				...input,
			})
			.then((res) => {
				console.log(`Response status: ${res.status}`);
				console.log(res.data);

				// Save the response for later use
				setResData({ ...res.data });

				if (res.data.message !== undefined || res.data.joiMessage) {
					// Some validation
					res.data.field === "email" &&
						res.data.error &&
						setEmailError({
							...emailError,
							state: res.data.state,
							message: res.data.message,
						});

					// If the password isn't correct
					if (res.data.field === "password" && res.data.error) {
						setShowPasswordMessage(true);
						setPasswordInfo({
							...passwordInfo,
							error: true,
							state: res.data.state,
							message: res.data.message,
						});
					}

					// For data validation
					console.log(`Outer`);
					if (res.data.joiMessage !== undefined) {
						console.log(`Joi error`);
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
						setResData({
							joiMessage: modifiedMessage,
							error: res.data.error,
							state: res.data.state,
						});
					}

					// Set the response token on the local storage
					if (!res.data.error) {
						localStorage.setItem("token", res.data.token);
						setToken(localStorage.getItem("token"));
					}

					return;
				}
			})
			.catch((err) => {
				console.error(err);
				setError({
					...error,
					state: "danger",
					message:
						"Internal server error, the website may be offline for a short time, try again later.",
				});
			});
	};

	// When the page starts
	useEffect(() => {
		axios
			.get("http://localhost:3001/public/icons/Show.png")
			.catch((err) => setShowHidePasswordIcon(false));
	}, []);

	useEffect(() => {
		try {
			setToken(localStorage.getItem("token"));
			if (token) {
				const { password, ...user } = jwt_decode(token);
				setInput(user);
			}
		} catch (err) {
			console.error(err);
		}
	}, [token]);

	return (
		<div className="changeBasicInfo">
			{/* Show or hide repeated email error message */}
			{(resData.field === "email" && emailError.message && (
				<div className="emailErrorPopup" onClick={() => setEmailError({})}>
					<div className="emailArrow"></div>
					<div className="emailErrorMessage">{resData.message}</div>
				</div>
			)) ||
				(resData.joiMessage && (
					<div className="joiError danger" onClick={() => setResData({})}>
						<div className="joiErrorMessagesArrow"></div>
						<div className="joiErrorMessage">{resData.joiMessage}</div>
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

			{/* Show or hide the password */}
			{(!passwordInfo.show && (
				<img
					className={
						"passwordIcon " + (!showHidePasswordIcon && "passwordIconOffset")
					}
					src="http://localhost:3001/public/icons/Show.png"
					alt="Show password"
					onClick={() =>
						setPasswordInfo({ ...passwordInfo, show: !passwordInfo.show })
					}
				/>
			)) ||
				(passwordInfo.show && (
					<img
						className={
							"passwordIcon " + (!showHidePasswordIcon && "passwordIconOffset")
						}
						src="http://localhost:3001/public/icons/Hide.png"
						alt="Hide password"
						onClick={() =>
							setPasswordInfo({ ...passwordInfo, show: !passwordInfo.show })
						}
					/>
				))}

			{/* Show success message */}
			{resData.state === "success" && resData.message && (
				<div
					className="submitSuccessful success"
					onClick={() => setResData({})}
				>
					<div className="successMessage">{resData.message}</div>
				</div>
			)}

			<h6>Basic info</h6>
			<form>
				<div className="profileLabels">
					<label htmlFor="firstName">First name</label>
					<label htmlFor="lastName">Last name</label>
					<label htmlFor="email">Email</label>
					<label htmlFor="age">Age</label>
					<label htmlFor="phoneNumber">Phone number</label>
					<label htmlFor="password">Password</label>
				</div>
				<div className="profileInputs">
					{/* Basic information */}
					<input
						type="text"
						name="firstName"
						placeholder="First name"
						onChange={handleChange}
						value={input.firstName}
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last name"
						onChange={handleChange}
						value={input.lastName}
					/>
					<input
						className={
							(resData.field === "email" && resData.error && "danger") || ""
						}
						type="email"
						name="email"
						placeholder="Email"
						onChange={handleChange}
						value={input.email}
						onClick={(e) => setResData({ ...resData, error: false })}
					/>
					<input
						type="date"
						name="age"
						placeholder="Age"
						onChange={handleChange}
						value={input.age}
					/>
					<input
						type="text"
						name="phoneNumber"
						placeholder="Phone number"
						onChange={handleChange}
						value={input.phoneNumber}
					/>
					<input
						className={passwordInfo.error ? "danger" : ""}
						type={passwordInfo.show ? "text" : "password"}
						name="password"
						placeholder="Password"
						onChange={handleChange}
						value={input.password}
						onClick={(e) => setPasswordInfo({ ...passwordInfo, error: false })}
					/>
				</div>
				<button type="submit" onClick={handleBasicInfoSubmit}>
					Save
				</button>
			</form>
		</div>
	);
};

export default ChangeBasicInfo;
