import React, { useState } from "react";
import axios from "axios";

import "./Register.css";
import Alert from "../../components/alert/Alert";
import Field from "../../components/inputs/field/Field";
import {
	getAnyMessage,
	getNetworkErrorMessage,
} from "../../../lib/debug/handleMessages";
import { confirmPasswordValidation } from "../../../lib/validation/password";

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

		// Check if passwords match
		if (!confirmPasswordValidation(confirmPassword, data.password, setStatus))
			return;

		axios
			.post("http://localhost:3001/api/users/register", { ...data })
			.then((res) => {
				// console.log(`Response data:`);
				// console.log(res.data);
				// console.log(`Its typeof ${typeof res.data}`);

				// Set status message
				getAnyMessage(
					input,
					["Email", "Password", "Confirm Password"],
					res,
					setStatus
				);
			})
			.catch((err) => {
				console.warn(err);
				getNetworkErrorMessage(setStatus);
			});
	};

	return (
		<div>
			<h2 className="title">Register</h2>
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
			<Alert
				class={status.state}
				description={status.message}
				forceCenter={true}
			/>
		</div>
	);
}

export default Register;
