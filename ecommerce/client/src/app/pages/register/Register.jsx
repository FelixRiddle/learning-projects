import React, { useState } from "react";
import axios from "axios";

import "./Register.css";
import Field from "../../components/inputs/field/Field";
import {
	getAnyMessage,
	// getNetworkErrorMessage,
} from "../../../lib/debug/handleMessages";
import {
	confirmPasswordValidation,
	validatePasswordLength,
} from "../../../lib/validation/password";
import AlertV2 from "../../components/alertv2/AlertV2";

function Register() {
	const [input, setInput] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [status, setStatus] = useState({
		message: "",
		state: "",
		field: "",
		error: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { confirmPassword, ...data } = input;
		
		// Validate passwords length
		if (!validatePasswordLength(data.password, setStatus)) return;
		if (
			!validatePasswordLength(confirmPassword, setStatus, {
				field: "confirmPassword",
			})
		)
			return;

		if (!confirmPasswordValidation(confirmPassword, data.password, setStatus))
			// Check if passwords match
			return;

		axios
			.post("http://localhost:3001/api/users/register", { ...data })
			.then((res) => {
				// Set status message
				getAnyMessage({
					input,
					inputPlaceHolderValues: ["Email", "Password", "Confirm Password"],
					debug: res,
					setCB: setStatus,
				});
			})
			.catch((err) => {
				console.warn(err);
				getAnyMessage({
					setCB: setStatus,
					options: { messageType: "networkError" },
				});
			});
	};

	return (
		<div>
			<h2 className="title">Register</h2>
			<AlertV2 center={true} status={status} setStatus={setStatus} />
			<form>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Email"
					inputName="email"
					inputOnChange={handleChange}
					inputType="email"
					inputValue={input && input.email}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Password"
					inputName="password"
					inputOnChange={handleChange}
					inputType="password"
					inputValue={input && input.password}
				/>
				<Field
					fieldParentDivClasses="input-field"
					inputLabel="Confirm password"
					inputName="confirmPassword"
					inputOnChange={handleChange}
					inputType="password"
					inputValue={input && input.confirmPassword}
				/>
				<button className="btn" type="submit" onClick={handleSubmit}>
					Create account
				</button>
			</form>
		</div>
	);
}

export default Register;
