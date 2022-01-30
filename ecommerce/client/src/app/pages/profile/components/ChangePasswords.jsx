import React, { useEffect, useState } from "react";
import axios from "axios";

const ChangePasswords = (props) => {
	const { handleChange, input, setError, error } = props;
	const [passwordInfo, setPasswordInfo] = useState({
		icon: false,
		showCurrentPassword: false,
		showNewPassword: false,
		showRepeatNewPassword: false,
	});
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatNewPassword, setRepeatNewPassword] = useState("");

	const handleChangePasswordsSubmit = (e) => {
		e.preventDefault();
		axios.post("http://localhost:3001/api/profile/changePassword");
	};

	useEffect(() => {
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
			<form action="submit">
				<div className="changePasswordsLabels">
					<label htmlFor="password">Current password</label>
					<label htmlFor="newPassword">New password</label>
					<label htmlFor="repeatNewPassword">Repeat new password</label>
				</div>
				<div className="changePasswordsInputs">
					{/* Change passwords */}
					<input
						type={passwordInfo.showCurrentPassword ? "text" : "password"}
						name="password"
						placeholder="Current password"
						onChange={handleChange}
						value={input.password}
					/>
					<input
						type={passwordInfo.showNewPassword ? "text" : "password"}
						name="newPassword"
						placeholder="New password"
						onChange={handleChange}
						value={input.newPassword}
					/>
					<input
						type={passwordInfo.showRepeatNewPassword ? "text" : "password"}
						name="repeatNewPassword"
						placeholder="Repeat new password"
						onChange={handleChange}
						value={input.repeatNewPassword}
					/>
				</div>
				<button type="submit" onClick={handleChangePasswordsSubmit}>
					Change password
				</button>
			</form>
		</div>
	);
};

export default ChangePasswords;
