import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleMessageValidationv2 } from "../../../../lib/handleMessageValidation";

const ChangePasswords = (props) => {
	const { input } = props;
	const [passwordInfo, setPasswordInfo] = useState({
		icon: false,
		showCurrentPassword: false,
		showNewPassword: false,
		showRepeatNewPassword: false,
		state: "",
		message: "",
		field: "",
	});
	const [passwordInput, setPasswordInput] = useState({
		currentPassword: "",
		newPassword: "",
		repeatNewPassword: "",
	});
	const [resData, setResData] = useState({});
	const [update, setUpdate] = useState({
		token: "",
		updated: false,
	});

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleChangePasswordsSubmit = (e) => {
		e.preventDefault();
		if (!passwordValidation()) return;

		axios
			.post("http://localhost:3001/api/profile/changePassword", {
				newPassword: passwordInput.newPassword,
				currentPassword: passwordInput.currentPassword,
				_id: input._id,
				token: update.token,
			})
			.then((res) => {
				// The response should be like this
				if (res.data.joiMessage !== undefined) {
					const responseMessage = handleMessageValidationv2(
						{
							currentPassword: passwordInput.currentPassword,
							newPassword: passwordInput.newPassword,
							repeatNewPassword: passwordInput.repeatNewPassword,
						},
						res,
						["Current password", "New password", "Repeat password"]
					);
					setResData({ ...res.data, message: responseMessage });
				}
				if (res.data.message !== undefined) {
					setPasswordInfo({
						message: res.data.message,
						error: res.data.error,
						state: res.data.state,
						field: res.data.field,
					});
					if (!res.data.error && res.data.state === "success") {
						console.log(`New token saved`);

						// Set the new token
						const newToken = localStorage.setItem("token", res.data.token);
						setUpdate({ ...update, token: newToken, updated: false });
					}
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const passwordValidation = () => {
		// Validation
		if (passwordInput.currentPassword.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "currentPassword",
				message: "The password must be 8 characters long.",
			});
			return false;
		}

		if (passwordInput.newPassword.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "newPassword",
				message: "The password must be 8 characters long.",
			});
			return false;
		}

		if (passwordInput.repeatNewPassword.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "repeatNewPassword",
				message: "The password must be 8 characters long.",
			});
			return false;
		} else if (passwordInput.newPassword !== passwordInput.repeatNewPassword) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "",
				message: "The passwords don't match.",
			});
			return false;
		}

		return true;
	};
	
	useEffect(() => {
		// Test if the icons exist/are online
		axios
			.get("http://localhost:3001/public/icons/Show.png")
			.then((res) => {
				setPasswordInfo({ ...passwordInfo, icon: true });
			})
			.catch((err) => {
				setPasswordInfo({ ...passwordInfo, icon: false });
			});
	}, [passwordInfo]);

	useEffect(() => {
		// If the token already exists return
		if (update.token) return;
		if (update.updated) return;
		console.log(`Updating password...`);

		// Get token
		setUpdate({ ...update, token: localStorage.getItem("token"), updated: true, });
	}, [update]);

	/*
	useEffect(() => {
		// Update token state
		if (update.updated)
			setUpdate({
				...update,
				token: localStorage.getItem("token"),
				updated: false,
			});
	}, [update]);*/

	return (
		<div className="changePasswords">
			<h6>Change password</h6>

			{/* For error or success messages */}
			<Messages
				passwordInfo={passwordInfo}
				setPasswordInfo={setPasswordInfo}
				resData={resData}
				setResData={setResData}
			/>

			{/* For show-hide password icons */}
			<ShowHidePasswords
				passwordInfo={passwordInfo}
				setPasswordInfo={setPasswordInfo}
			/>

			<form action="submit">
				<div className="changePasswordsLabels">
					<label htmlFor="password">Current password</label>
					<label htmlFor="newPassword">New password</label>
					<label htmlFor="repeatNewPassword">Repeat new password</label>
				</div>
				<div className="changePasswordsInputs">
					{/* Change passwords */}
					<input
						onClick={() =>
							passwordInfo.field === "currentPassword" &&
							setPasswordInfo({ ...passwordInfo, field: "" })
						}
						className={
							(passwordInfo.field === "currentPassword" && "danger") || ""
						}
						type={passwordInfo.showCurrentPassword ? "text" : "password"}
						name="currentPassword"
						placeholder="Current password"
						onChange={handlePasswordChange}
						value={passwordInput.currentPassword}
					/>
					<input
						onClick={() =>
							passwordInfo.field === "newPassword" &&
							setPasswordInfo({ ...passwordInfo, field: "" })
						}
						className={(passwordInfo.field === "newPassword" && "danger") || ""}
						type={passwordInfo.showNewPassword ? "text" : "password"}
						name="newPassword"
						placeholder="New password"
						onChange={handlePasswordChange}
						value={passwordInput.newPassword}
					/>
					<input
						onClick={() =>
							passwordInfo.field === "repeatNewPassword" &&
							setPasswordInfo({ ...passwordInfo, field: "" })
						}
						className={
							(passwordInfo.field === "repeatNewPassword" && "danger") || ""
						}
						type={passwordInfo.showRepeatNewPassword ? "text" : "password"}
						name="repeatNewPassword"
						placeholder="Repeat new password"
						onChange={handlePasswordChange}
						value={passwordInput.repeatNewPassword}
					/>
				</div>
				<button type="submit" onClick={handleChangePasswordsSubmit}>
					Change password
				</button>
			</form>
		</div>
	);
};

const Messages = (props) => {
	const { passwordInfo, setPasswordInfo, resData, setResData } = props;

	return (
		<div
			className={
				"messages " + (passwordInfo.state + " ") + (resData.state + " ")
			}
			onClick={() => {
				setPasswordInfo({ ...passwordInfo, message: "" });
				setResData({ ...resData, message: "", joiMessage: "" });
			}}
			hidden={!passwordInfo.message && !resData.message && true}
		>
			<div>{passwordInfo.message || resData.message}</div>
		</div>
	);
};

const ShowHidePasswords = (props) => {
	const { passwordInfo, setPasswordInfo } = props;

	return (
		<div className="show-hide-passwords">
			{/* show-hide current password */}
			{(!passwordInfo.showCurrentPassword && (
				<img
					onClick={() =>
						setPasswordInfo({
							...passwordInfo,
							showCurrentPassword: !passwordInfo.showCurrentPassword,
						})
					}
					className={
						`show-hide-current-password ` +
						(!passwordInfo.icon && "offset-text")
					}
					src="http://localhost:3001/public/icons/Show.png"
					alt="Show password"
				/>
			)) ||
				(passwordInfo.showCurrentPassword && (
					<img
						onClick={() =>
							setPasswordInfo({
								...passwordInfo,
								showCurrentPassword: !passwordInfo.showCurrentPassword,
							})
						}
						className={
							`show-hide-current-password ` +
							(!passwordInfo.icon && "offset-text")
						}
						src="http://localhost:3001/public/icons/Hide.png"
						alt="Hide password"
					/>
				))}

			{/* show-hide new password */}
			{(!passwordInfo.showNewPassword && (
				<img
					onClick={() =>
						setPasswordInfo({
							...passwordInfo,
							showNewPassword: !passwordInfo.showNewPassword,
						})
					}
					className={
						`show-hide-new-password ` + (!passwordInfo.icon && "offset-text")
					}
					src="http://localhost:3001/public/icons/Show.png"
					alt="Show new password"
				/>
			)) ||
				(passwordInfo.showNewPassword && (
					<img
						onClick={() =>
							setPasswordInfo({
								...passwordInfo,
								showNewPassword: !passwordInfo.showNewPassword,
							})
						}
						className={
							`show-hide-new-password ` + (!passwordInfo.icon && "offset-text")
						}
						src="http://localhost:3001/public/icons/Hide.png"
						alt="Hide new password"
					/>
				))}

			{/* show-hide repeat new password */}
			{(!passwordInfo.showRepeatNewPassword && (
				<img
					onClick={() =>
						setPasswordInfo({
							...passwordInfo,
							showRepeatNewPassword: !passwordInfo.showRepeatNewPassword,
						})
					}
					className={
						`show-hide-repeat-new-password ` +
						(!passwordInfo.icon && "offset-text")
					}
					src="http://localhost:3001/public/icons/Show.png"
					alt="Show repeat new password"
				/>
			)) ||
				(passwordInfo.showRepeatNewPassword && (
					<img
						onClick={() =>
							setPasswordInfo({
								...passwordInfo,
								showRepeatNewPassword: !passwordInfo.showRepeatNewPassword,
							})
						}
						className={
							`show-hide-repeat-new-password ` +
							(!passwordInfo.icon && "offset-text")
						}
						src="http://localhost:3001/public/icons/Hide.png"
						alt="Hide repeat new password"
					/>
				))}
		</div>
	);
};

export default ChangePasswords;
