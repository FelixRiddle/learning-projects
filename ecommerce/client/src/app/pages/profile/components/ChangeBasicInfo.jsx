import React, { useState } from "react";
import axios from "axios";
import handleMessageValidation from "../../../../lib/handleMessageValidation";

const ChangeBasicInfo = (props) => {
	const {
		handleChange,
		input,
		passwordInfo,
		setPasswordInfo,
		setState,
		setMessage,
	} = props;
	const [resData, setResData] = useState({});

	const handleBasicInfoSubmit = async (e) => {
		e.preventDefault();

		if (!input.password) {
			setPasswordInfo({
				...passwordInfo,
				error: true,
				errorMessage: "You must provide a password for making changes",
			});

			// Timeout
			setTimeout(() => {
				console.log(passwordInfo);
				setPasswordInfo({
					...passwordInfo,
					error: false,
					errorMessage: "",
				});
			}, passwordInfo.duration);

			return;
		} else if (input.password.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				error: true,
				errorMessage: "The password must be at least 8 characters long.",
			});

			// Timeout
			setTimeout(() => {
				setPasswordInfo({
					...passwordInfo,
					error: false,
					errorMessage: "",
				});
			}, passwordInfo.duration);

			return;
		}

		if (resData !== undefined && resData.field === "email") {
			// Timeout
			setTimeout(() => {
				setResData({ error: resData.error, message: "", field: "" });
			}, passwordInfo.duration);
			return;
		}

		await axios
			.post("http://localhost:3001/api/profile/changeBasicInfo", { ...input })
			.then((res) => {
				console.log(`Response: ${res.status}`);
				console.log(res.data);

				// Save the response for later use
				setResData({ ...res.data });

				if (res.data.message !== undefined) {
					setState(res.data.state);
					setMessage(res.data.message);

					if (!res.data.error) {
						localStorage.setItem("token", res.data.token);
					}

					return;
				} else if (res.data.joiMessage !== undefined) {
					setState(res.data.state);
					handleMessageValidation(
						input,
						res,
						["Email", "Password"],
						setMessage
					);

					console.log(`Message: ${res.data.joiMessage}`);

					return;
				}
			})
			.catch((err) => {
				console.error(err);
				setState("danger");
				setMessage(
					"Internal server error, the website may be offline for a short time, try again later."
				);
			});
	};

	return (
		<div className="changeBasicInfo">
			{/* Show or hide repeated email error message */}
			{(resData.field === "email" && resData.message && (
				<div className="emailErrorPopup">
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
			{passwordInfo.errorMessage && (
				<div className="errorPopup">
					<div className="arrow"></div>
					<div className="errorMessage">{passwordInfo.errorMessage}</div>
				</div>
			)}

			{/* Show or hide the password */}
			{(!passwordInfo.show && (
				<img
					className="passwordIcon"
					src="http://localhost:3001/public/icons/Show.png"
					alt="Show password"
					onClick={() =>
						setPasswordInfo({ ...passwordInfo, show: !passwordInfo.show })
					}
				/>
			)) ||
				(passwordInfo.show && (
					<img
						className="passwordIcon"
						src="http://localhost:3001/public/icons/Hide.png"
						alt="Hide password"
						onClick={() =>
							setPasswordInfo({ ...passwordInfo, show: !passwordInfo.show })
						}
					/>
				))}

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
						className={resData.error ? "danger" : ""}
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
