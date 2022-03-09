import React, { useState, useEffect } from "react";
import axios from "axios";

import { handleMessageValidationv2 } from "../../../lib/handleMessageValidation";
import "./Login.css";
import Alert from "../../components/alert/Alert";
import { useSelector } from "react-redux";
import Field from "../../components/inputs/field/Field";

function Login(props) {
	const user = useSelector((state) => state.user);

	const [input, setInput] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("none");
	const [state, setState] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
			.post("http://localhost:3001/api/users/login", { ...input })
			.then((res) => {
				console.log(`Response ${res.data}`);
				console.log(`Typeof: ${typeof res.data}`);
				if (res.data === "Email or password is wrong.") {
					setState("danger");
					setMessage("Email or password is wrong.");
				} else if (typeof res.data === "string") {
					setState("danger");
					handleMessageValidationv2(
						input,
						res,
						["Email", "Password"],
						setMessage
					);
				} else if (res.data.token) {
					localStorage.setItem("token", res.data.token);

					setState("success");
					setMessage("Successfully logged in, going to the home page...");

					// setTimeout(() => {
					window.location.href = "/home";
					// }, 5000);
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
		console.log(`User:`, user);
		if (user && user._id) {
			setIsLoggedIn(true);
			setMessage(`You are already logged in.`);
		}
	}, [user]);

	return (
		<div className="login">
			<h2 className="loginTitle">Login</h2>
			{isLoggedIn && (
				<Alert class="caution" description={message} forceCenter={true} />
			)}
			<form action="submit">
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
				<button className="btn" type="submit" onClick={handleSubmit}>
					Login
				</button>
			</form>
			<Alert class={state} description={message} forceCenter={true} />
			{/* {(state === "success" && (
				<Alert class="success" description={message} forceCenter={true} />
			)) ||
				(state === "danger" && (
					<Alert class="danger" description={message} forceCenter={true} />
				))} */}
		</div>
	);
}

export default Login;
