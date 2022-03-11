import React, { useEffect, useState } from "react";
import axios from "axios";

import { handleMessageValidationv2 } from "../../../../../lib/handleMessageValidation";
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
	// const [resData, setResData] = useState({});
	const [status, setStatus] = useState({});
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

		// if (!passwordValidation()) return;
		// console.log(`Input:`, passwordInput);
		// console.log(`User id: ${user._id}`);
		// console.log(`Password info:`, passwordInfo);

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
					placeHolderValues: ["Password", "New password", "Confirm password"],
					setCB: setStatus,
				});

				if (res.data.token) localStorage.setItem("token", res.data.token);

				return;

				// The response should be like this
				// if (res.data.joiMessage !== undefined) {
				// 	const responseMessage = handleMessageValidationv2(
				// 		{
				// 			password: passwordInput.password,
				// 			newPassword: passwordInput.newPassword,
				// 			repeatNewPassword: passwordInput.repeatNewPassword,
				// 		},
				// 		res,
				// 		["Current password", "New password", "Repeat password"]
				// 	);
				// 	// setResData({ ...res.data, message: responseMessage });
				// }
				// if (res.data.message !== undefined) {
				// 	setPasswordInfo({
				// 		message: res.data.message,
				// 		error: res.data.error,
				// 		state: res.data.state,
				// 		field: res.data.field,
				// 	});
				// 	if (!res.data.error && res.data.state === "success") {
				// 		console.log(`New token saved`);

				// 		// Set the new token
				// 		const newToken = localStorage.setItem("token", res.data.token);
				// 		setUpdate({ ...update, token: newToken, updated: false });
				// 	}
				// }
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// useEffect(() => {
	// 	if (status) console.log(status);
	// }, [status]);

	useEffect(() => {
		// If the token already exists return
		if (update.token) return;
		if (update.updated) return;
		console.log(`Updating password...`);

		// Get token
		setUpdate({
			...update,
			token: localStorage.getItem("token"),
			updated: true,
		});
	}, [update]);

	return (
		<div className="changePasswords">
			<h6>Change password</h6>

			{/* For error or success messages
			<Messages
				passwordInfo={passwordInfo}
				setPasswordInfo={setPasswordInfo}
				resData={resData}
				setResData={setResData}
			/> */}

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

export default ChangePassword;
