import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { handleMessageValidationv2 } from "../../../../lib/handleMessageValidation";
import { GlobalContext } from "../../../App";

const ChangeBasicInfo = (props) => {
	const { token, user, setToken } = useContext(GlobalContext);
	const {
		handleChange,
		input,
		passwordInfo,
		setPasswordInfo,
		setError,
		error,
	} = props;
	const [resData, setResData] = useState({});
	const [showHidePasswordIcon, setShowHidePasswordIcon] = useState(true);
	const [showPasswordMessage, setShowPasswordMessage] = useState(false);
	const [emailError, setEmailError] = useState({
		state: "",
		message: "",
	});
	//const [token, setToken] = useState("");

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
			else if (data.joiMessage) {
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
			else if (data.message) {
				return setResData({
					field: "",
					message: data.message,
					error: data.error,
					state: data.state,
				});
			} // Set the response token on the local storage
			else if (!data.error && data.token && data.token !== "undefined") {
				console.log(`On changeBasicInfo, returned token: ${data.token}`);
				localStorage.setItem("token", data.token);
				return setToken(data.token);
			}
		}
	};

	// When the page starts
	useEffect(() => {
		axios
			.get("http://localhost:3001/public/icons/Show.png")
			.catch((err) => setShowHidePasswordIcon(false));
	}, []);

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
						className={"basicInfoMessage " + ((resData.state && resData.state) || "")}
						onClick={() => setResData({})}
					>
						<div>{resData.message}</div>
					</div>
				))}

			{/* <div className="joiError danger" onClick={() => setResData({})}>
				<div className="joiErrorMessagesArrow"></div>
				<div className="joiErrorMessage">{resData.message}</div>
			</div> */}

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
