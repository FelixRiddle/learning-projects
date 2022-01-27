import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import handleMessageValidation from "../../../lib/handleMessageValidation";
import "./Login.css";
import Alert from "../../components/alert/Alert";

function Login() {
	const [input, setInput] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("none");
	const [state, setState] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPasswordShown, setIsPasswordShown] = useState(false);

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

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt_decode(token);

			if (!user) {
				setMessage(`The user you are logged in is invalid.`);
				localStorage.removeItem("token");
			} else {
				console.log(`Previous session found.`);
				setIsLoggedIn(true);
				// All this just for a date xD
				const tempAge = new Date(Date.parse(user.age));
				const newAge = [
					tempAge.getUTCFullYear(),
					("0" + (tempAge.getMonth() + 1)).slice(-2),
					("0" + tempAge.getDate()).slice(-2),
				].join("-");

				setInput({ ...user, age: newAge });
			}
		} else {
			setMessage(`You are already logged in.`);
		}
	}, []);

	return (
		<div className="login">
			<h2 className="loginTitle">Login</h2>
			{isLoggedIn && (
				<Alert class="caution" description={message} forceCenter={true} />
			)}
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
						type={isPasswordShown ? "text" : "password"}
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
			{/* show-hide password icon image */}
			{(!isPasswordShown && (
				<img
					className="password-show-hide-icon"
					alt="Show password"
					src="http://localhost:3001/public/icons/Show.png"
					onClick={() => setIsPasswordShown(!isPasswordShown)}
				/>
			)) ||
				(isPasswordShown && (
					<img
						className="password-show-hide-icon"
						alt="Show password"
						src="http://localhost:3001/public/icons/Hide.png"
						onClick={() => setIsPasswordShown(!isPasswordShown)}
					/>
				))}
		</div>
	);
}

export default Login;
