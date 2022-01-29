import React, { useEffect, useState } from "react";
import axios from "axios";
import handleMessageValidation from "../../../../lib/handleMessageValidation";

const ChangeBasicInfo = (props) => {
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

	const handleBasicInfoSubmit = async (e) => {
		e.preventDefault();
		console.log(`Password error:`);
		console.log(passwordInfo);

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

		const token = localStorage.getItem("token");
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

				if (res.data.message !== undefined) {
					// Some validation
					res.data.field === "email" &&
						res.data.error &&
						setEmailError({
							...emailError,
							state: res.data.state,
							message: res.data.message,
						});
					if (res.data.field === "password" && res.data.error) {
						setShowPasswordMessage(true);
						setPasswordInfo({
							...passwordInfo,
							error: true,
							state: res.data.state,
							message: res.data.message,
						});
					}

					// Set the response token on the local storage
					if (!res.data.error) {
						localStorage.setItem("token", res.data.token);
					}

					return;
				} else if (res.data.joiMessage !== undefined) {
					setError({ ...error, state: res.data.state });
					handleMessageValidation(
						input,
						res,
						["Email", "Password"],
						setError,
						error
					);

					console.log(`Message: ${res.data.joiMessage}`);

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
				(resData.joiMessage && (
					<div className="joiError">
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

			{/* TODO: These divs below */}
			{/* Show success message */}
			{resData.state === "success" && resData.message && (
				<div className="submitSuccessful">
					<div className="successMessage success">{resData.message}</div>
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
