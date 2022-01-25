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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const {confirmPassword, ...data} = input;
		if(confirmPassword !== data.password) return setState("passwordsDontMatch")
		axios
			.post("http://localhost:3001/api/users/register", { ...data })
			.then((res) => {
				console.log(res);
				setState("successful");
			})
			.catch((err) => {
				console.error(err);
				setState("networkError");
			});
	};

	return (
		<div>
			<h2 className="title">Register</h2>
			<form className="grid-container">
			  <div className="labels">
				<label className="first-name" htmlFor="firstName">
					First name
				</label>
				<label className="last-name" htmlFor="lastName">
					Last name
				</label>
				<label className="email" htmlFor="email">Email</label>
				<label className="password" htmlFor="password">Password</label>
				<label className="confirm-password" htmlFor="confirmPassword">Confirm password</label>
				</div>
				
				<div className="inputs">
				<input
					className="last-name"
					type="text"
					name="lastName"
					onChange={handleChange}
					value={input.lastName}
					placeholder="Last name"
				/>
				<input
					className="first-name"
					type="text"
					name="firstName"
					onChange={handleChange}
					value={input.firstName}
					placeholder="First name"
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
				<button type="submit" onClick={handleSubmit}>Create account</button>
			</form>
			{(state === "successful" && (
				<Alert
					class="success"
					description="Account created, check email!"
					forceCenter={true}
				/>
			)) ||
				(state === "passwordsDontMatch" && (
					<Alert
						class="danger"
						description="Passwords don't match."
						forceCenter={true}
					/>
				)) ||
				(state === "networkError" && (
					<Alert
						class="danger"
						description="Network error, this usually means that the server is down."
						forceCenter={true}
					/>
				))}
		</div>
	);
}

export default Register;
