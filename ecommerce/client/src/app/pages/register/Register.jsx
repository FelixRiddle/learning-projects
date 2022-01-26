import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import Alert from "../../components/alert/Alert";

function Register() {
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [state, setState] = useState("none");
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { confirmPassword, ...data } = input;
		if (confirmPassword !== data.password) {
			setState("danger");
			setMessage("Passwords don't match.");
			return;
		}
		
		axios
			.post("http://localhost:3001/api/users/register", { ...data })
			.then((res) => {
				console.log(res.data);
				console.log(`Is res.data an object?: ${typeof res.data}`);
				//console.log(`Body: ${res.body}`);
				if (typeof res.data === "object") {
					setState("success");
					setMessage("Account created successfully, check your email.");
					return;
				} else if (res.data === "Email already exists.") {
					setState("danger");
					setMessage("Email already exists.");
					return;
				} else if (res.data) {
					setState("danger");
					const inputKeys = [];
					Object.entries(input).map((e) => inputKeys.push(e[0]));

					console.log(`Matching variables`);
					const prevValues = [
						/"firstName"/,
						/"lastName"/,
						/"email"/,
						/"password"/,
					];
					prevValues.map((e, index) => console.log(prevValues[index]));
					const placeholderValues = [
						"First name",
						"Last name",
						"Email",
						"Password",
					];
					// Force a copy of the string
					let responseData = (" " + res.data).slice(1);
					for (let index in prevValues) {
						if (responseData.match(prevValues[index])) {
							console.log(
								`Current: ${prevValues[index]}, ${
									placeholderValues[index]
								}, result: ${responseData.replace(
									prevValues[index],
									placeholderValues[index]
								)}`
							);
							setMessage(
								responseData.replace(
									prevValues[index],
									placeholderValues[index]
								)
							);
						}
					}
				}
			})
			.catch((err) => {
				console.error(err);
				setState("danger");
				setMessage(
					"Network error, this usually means that the server is down."
				);
			});
	};

	return (
		<div className="register">
			<h2 className="title">Register</h2>
			<form className="grid-container">
				<div className="registerLabels">
					<label className="first-name" htmlFor="firstName">
						First name
					</label>
					<label className="last-name" htmlFor="lastName">
						Last name
					</label>
					<label className="email" htmlFor="email">
						Email
					</label>
					<label className="password" htmlFor="password">
						Password
					</label>
					<label className="confirm-password" htmlFor="confirmPassword">
						Confirm password
					</label>
				</div>

				<div className="registerInputs">
					<input
						className="first-name"
						type="text"
						name="firstName"
						onChange={handleChange}
						value={input.firstName}
						placeholder="First name"
					/>
					<input
						className="last-name"
						type="text"
						name="lastName"
						onChange={handleChange}
						value={input.lastName}
						placeholder="Last name"
					/>
					<input
						className="email"
						type="email"
						name="email"
						onChange={handleChange}
						value={input.email}
						placeholder="Email"
					/>
					<input
						className="password"
						type="password"
						name="password"
						onChange={handleChange}
						value={input.password}
						placeholder="Password"
					/>
					<input
						className="confirm-password"
						type="password"
						name="confirmPassword"
						onChange={handleChange}
						value={input.confirmPassword}
						placeholder="Enter your password again"
					/>
				</div>
				<button className="registerButton" type="submit" onClick={handleSubmit}>
					Create account
				</button>
			</form>
			{(state === "success" && (
				<Alert class="success" description={message} forceCenter={true} />
			)) ||
				(state === "danger" && (
					<Alert class="danger" description={message} forceCenter={true} />
				))}
		</div>
	);
}

export default Register;
