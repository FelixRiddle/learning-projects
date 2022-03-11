import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Login.css";
import { useSelector } from "react-redux";
import Field from "../../components/inputs/field/Field";
import AlertV2 from "../../components/alertv2/AlertV2";
import { getAnyMessage } from "../../../lib/debug/handleMessages";
import { validatePasswordLength } from "../../../lib/validation/password";

function Login(props) {
	const user = useSelector((state) => state.user);

	const [input, setInput] = useState({ email: "", password: "" });
	const [status, setStatus] = useState({});

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

		if (!validatePasswordLength(input.password, setStatus)) return;

		await axios
			.post("http://localhost:3001/api/users/login", { ...input })
			.then((res) => {
				console.log(`Response:`, res.data);

				getAnyMessage({
					input,
					placeholderValues: ["Email", "Password"],
					debug: res,
					setCB: setStatus,
				});

				// If the login was successful
				if (res.data.token) {
					console.log(`Token:`, res.data.token);
					localStorage.setItem("token", res.data.token);
					window.location.href = "/home";
				}
			})
			.catch((err) => {
				console.error(err);
				getAnyMessage({
					setCB: setStatus,
					options: { messageType: "networkError" },
				});
			});
	};

	useEffect(() => {
		if (user && user._id) {
			console.log(`User:`, user);
			getAnyMessage({
				setCB: setStatus,
				options: { messageType: "alreadyLoggedIn" },
			});
		}
	}, [user]);

	return (
		<div className="login">
			<h2 className="loginTitle">Login</h2>
			<AlertV2 center={true} status={status} setStatus={setStatus} />
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
		</div>
	);
}

export default Login;
