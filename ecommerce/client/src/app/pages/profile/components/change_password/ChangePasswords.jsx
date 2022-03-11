import React, { useState } from "react";
import axios from "axios";

import Field from "../../../../components/inputs/field/Field";
import { useSelector } from "react-redux";
import { getToken } from "../../../../../lib/misc/getToken";
import { getAnyMessage } from "../../../../../lib/debug/handleMessages";
import AlertV2 from "../../../../components/alertv2/AlertV2";
import {
	confirmPasswordValidation,
	validatePasswordLength,
} from "../../../../../lib/validation/password";

const ChangePassword = (props) => {
	const user = useSelector((state) => state.user);

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
		password: "",
		newPassword: "",
		repeatNewPassword: "",
	});
	const [status, setStatus] = useState({});
	// const [update, setUpdate] = useState({
	// 	token: "",
	// 	updated: false,
	// });

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleChangePasswordsSubmit = (e) => {
		e.preventDefault();

		console.log(`Are the passwords at least 8 characters long?:`);
		if (!validatePasswordLength(passwordInput.password, setStatus)) return;
		console.log(`New password`);
		if (
			!validatePasswordLength(passwordInput.newPassword, setStatus, {
				field: "newPassword",
			})
		)
			return;
		console.log(`Confirm new password`);
		if (
			!validatePasswordLength(passwordInput.repeatNewPassword, setStatus, {
				field: "repeatNewPassword",
			})
		)
			return;

		console.log(`Do passwords match?:`);
		if (
			!confirmPasswordValidation(
				passwordInput.newPassword,
				passwordInput.repeatNewPassword,
				setStatus,
				{ overwrite: { field: "newPassword" } }
			)
		)
			return;

		// Token for jwt authentication
		const token = getToken();
		axios
			.post("http://localhost:3001/api/profile/changePassword", {
				...passwordInput,
				_id: user._id,
				token,
			})
			.then((res) => {
				getAnyMessage({
					debug: res,
					input: passwordInput,
					placeholderValues: ["Password", "New password", "Confirm password"],
					setCB: setStatus,
				});

				if (res.data.token) localStorage.setItem("token", res.data.token);

				return;
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// useEffect(() => {
	// 	if (status) console.log(status);
	// }, [status]);

	// useEffect(() => {
	// 	// If the token already exists return
	// 	if (update.token) return;
	// 	if (update.updated) return;
	// 	console.log(`Updating password...`);

	// 	// Get token
	// 	setUpdate({
	// 		...update,
	// 		token: localStorage.getItem("token"),
	// 		updated: true,
	// 	});
	// }, [update]);

	return (
		<div className="changePasswords">
			<h6>Change password</h6>

			<AlertV2 center={true} setStatus={setStatus} status={status} />

			<form action="submit">
				<Field
					fieldParentDivClasses="input-field"
					inputClasses={
						"input" + (passwordInfo && passwordInfo.error ? "danger" : "")
					}
					inputLabel="Current password"
					inputName="password"
					inputOnChange={handlePasswordChange}
					inputOnClick={() =>
						passwordInfo.field === "password" &&
						setPasswordInfo({ ...passwordInfo, field: "" })
					}
					inputType="password"
					inputValue={passwordInput && passwordInput.password}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputClasses={
						"input" + (passwordInfo && passwordInfo.error ? "danger" : "")
					}
					inputLabel="New password"
					inputName="newPassword"
					inputOnChange={handlePasswordChange}
					inputOnClick={() =>
						passwordInfo.field === "password" &&
						setPasswordInfo({ ...passwordInfo, field: "" })
					}
					inputType="password"
					inputValue={passwordInput && passwordInput.newPassword}
					setStatus={setStatus}
					status={status}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputClasses={
						"input" + (passwordInfo && passwordInfo.error ? "danger" : "")
					}
					inputLabel="Repeat new password"
					inputName="repeatNewPassword"
					inputOnChange={handlePasswordChange}
					inputOnClick={() =>
						passwordInfo.field === "password" &&
						setPasswordInfo({ ...passwordInfo, field: "" })
					}
					inputType="password"
					inputValue={passwordInput && passwordInput.repeatNewPassword}
					setStatus={setStatus}
					status={status}
				/>
				<button
					className="btn"
					type="submit"
					onClick={handleChangePasswordsSubmit}
				>
					Change password
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
