import React, { useEffect, useState } from "react";
import axios from "axios";

const ChangePasswords = (props) => {
	const { handleChange, input, setError, error } = props;
	const [passwordInfo, setPasswordInfo] = useState({
		icon: false,
		showCurrentPassword: false,
		showNewPassword: false,
		showRepeatNewPassword: false,
		state: "",
		errorMessage: "",
		field: "",
	});
	const [passwordInput, setPasswordInput] = useState({
		currentPassword: "",
		newPassword: "",
		repeatNewPassword: "",
	});

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleChangePasswordsSubmit = (e) => {
		e.preventDefault();
		console.log(`Some information:`);
		console.log(passwordInput);
		console.log(passwordInput.currentPassword.length);
		console.log(passwordInput.newPassword.length);
		console.log(passwordInput.repeatNewPassword.length);

		// Validation
		if (passwordInput.currentPassword.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "currentPassword",
				message: "The password must be 8 characters long.",
			});
			return;
		}

		if (passwordInput.newPassword.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "newPassword",
				message: "The password must be 8 characters long.",
			});
			return;
		}

		if (passwordInput.repeatNewPassword.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "repeatNewPassword",
				message: "The password must be 8 characters long.",
			});
			return;
		} else if (passwordInput.newPassword !== passwordInput.repeatNewPassword) {
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "",
				message: "The passwords don't match.",
			});
			return;
		}

		axios
			.post("http://localhost:3001/api/profile/changePassword", {
				newPassword: passwordInput.newPassword,
				currentPassword: passwordInput.currentPassword,
			})
			.then((res) => {})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		// Test if the icons exist/are online
		axios
			.get("http://localhost:3001/public/icons/Show.png")
			.then((res) => {
				setPasswordInfo({ ...passwordInfo, icon: true });
				console.log(`Icons loaded!`);
			})
			.catch((err) => {
				setPasswordInfo({ ...passwordInfo, icon: false });
				console.log(`The icons couldn't be loaded!`);
			});
	}, []);

	return (
		<div className="changePasswords">
			<h6>Change password</h6>

			{/* For error or success messages */}
			<Messages passwordInfo={passwordInfo} setPasswordInfo={setPasswordInfo} />

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
						className={passwordInfo.field === "currentPassword" && "danger"}
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
						className={passwordInfo.field === "newPassword" && "danger"}
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
						className={passwordInfo.field === "repeatNewPassword" && "danger"}
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
	const { passwordInfo, setPasswordInfo } = props;

	return (
		<div
			className={"messages " + passwordInfo.state}
			onClick={() => setPasswordInfo({ ...passwordInfo, message: "" })}
			hidden={!passwordInfo.message && true}
		>
			{/* 
			setPasswordInfo({
				...passwordInfo,
				state: "danger",
				field: "currentPassword",
				message: "The password must be 8 characters long.",
			}); */}
			<div>{passwordInfo.message}</div>
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
