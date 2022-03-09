import React, { useState } from "react";
import axios from "axios";

import "./Register.css";
import Alert from "../../components/alert/Alert";
import Field from "../../components/inputs/field/Field";
import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import { getAnyMessage } from "../../../lib/debug/handleMessages";

function Register() {
	const [input, setInput] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [state, setState] = useState("none");
	const [message, setMessage] = useState("");
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
		if (confirmPassword !== data.password) {
			setStatus((prevValues) => {
				return {
					...prevValues,
					state: "danger",
					message: "Passwords don't match",
					field: "password",
					error: true,
				};
			});
			return;
		}

		axios
			.post("http://localhost:3001/api/users/register", { ...data })
			.then((res) => {
				console.log(`Response data:`);
				console.log(res.data);
				console.log(`Its typeof ${typeof res.data}`);
				getAnyMessage(input, ["Email", "Password", "Confirm Password"], res);

				// if (typeof res.data === "object") {
				// 	setStatus((prevValues) => {
				// 		return {
				// 			...prevValues,
				// 			state: "success",
				// 			message: "Account created, check your email",
				// 			field: "",
				// 			error: false,
				// 		};
				// 	});
				// 	return;
				// } else if (res.data === "Email already exists") {
				// 	setStatus((prevValues) => {
				// 		return {
				// 			...prevValues,
				// 			state: "danger",
				// 			message: "Email already exists.",
				// 			field: "email",
				// 			error: true,
				// 		};
				// 	});
				// 	return;
				// } else if (res.data) {
				// 	const inputKeys = [];
				// 	Object.entries(input).map((e) => inputKeys.push(e[0]));

				// 	console.log(`Matching variables`);
				// 	const prevValues = ["email", "password"];
				// 	const placeholderValues = ["Email", "Password"];
				// 	// Force a copy of the string
				// 	let responseData = res.data;
				// 	handleMessageValidationv2(
				// 		{ email: "", password: "" },
				// 		responseData,
				// 		placeholderValues
				// 	);

				// 	const newMessage = handleMessageValidationv2(
				// 		prevValues,
				// 		responseData,
				// 		placeholderValues
				// 	);

				// 	setStatus((prevValues) => {
				// 		return {
				// 			...prevValues,
				// 			state: "danger",
				// 			message: newMessage,
				// 			field: "email",
				// 			error: true,
				// 		};
				// 	});

				// 	// for (let index in prevValues) {
				// 	// 	if (responseData.match(prevValues[index])) {
				// 	// 		console.log(
				// 	// 			`Current: ${prevValues[index]}, ${
				// 	// 				placeholderValues[index]
				// 	// 			}, result: ${responseData.replace(
				// 	// 				prevValues[index],
				// 	// 				placeholderValues[index]
				// 	// 			)}`
				// 	// 		);
				// 	// 		const resultMessage = responseData.replace(
				// 	// 			prevValues[index],
				// 	// 			placeholderValues[index]
				// 	// 		);
				// 	// 		setStatus((prevValues) => {
				// 	// 			return {
				// 	// 				...prevValues,
				// 	// 				state: "danger",
				// 	// 				message: resultMessage,
				// 	// 				field: "email",
				// 	// 				error: true,
				// 	// 			};
				// 	// 		});
				// 	// 	}
				// 	// }
				// }
			})
			.catch((err) => {
				console.warn(err);
				setStatus((prevValues) => {
					return {
						...prevValues,
						state: "danger",
						message:
							"Network error, this usually means that the server is down.",
						field: "email",
						error: true,
					};
				});
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
