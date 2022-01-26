import React, { useState } from "react";
import axios from "axios";
import handleMessageValidation from "../../../lib/handleMessageValidation";
import "./Login.css";

import Alert from "../../components/alert/Alert";

function Login() {
	const [input, setInput] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("none");
	const [state, setState] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput(() => {
			return {
				...input,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = "";

		await axios
			//"http://localhost:3001/api/users/register"
			.post("http://localhost:3001/api/users/login", { ...input })
			.then((res) => {
				console.log(`Response ${res.data}`);
				console.log(`Typeof: ${typeof res.data}`);
				if (res.data === "Email or password is wrong.") {
					setState("danger");
					setMessage("Email or password is wrong.");
				} else if (typeof res.data === "string") {
					setState("danger");
					handleMessageValidation(
						input,
						res,
						["Email", "Password"],
						setMessage
					);
				} else if (res.data.token) {
					localStorage.setItem("token", res.data.token);

					setState("success");
					setMessage(
						"Successfully logged in, going to the home page in 5 seconds..."
					);
					
					setTimeout(() => {
						window.location.href = "/home";
					}, 5000);
				}
			})
			.catch((err) => {
				console.error(err);
				setState("danger");
				setMessage(
					"Internal server error, the website may be offline for a short time, try again later."
				);
			});
	};

	return (
		<div className="login">
			<h2 className="loginTitle">Login</h2>
			<form className="grid-container" action="submit">
				<div className="loginLabels">
					<label htmlFor="email">Email</label>
					<label htmlFor="password">Password</label>
				</div>
				<div className="loginInputs">
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={input.email}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={input.password}
					/>
				</div>
				<button className="loginButton" type="submit" onClick={handleSubmit}>
					Login
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

export default Login;
