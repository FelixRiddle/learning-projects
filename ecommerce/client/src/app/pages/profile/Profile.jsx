import React, { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import Alert from "../../components/alert/Alert";
import ChangeBasicInfo from "./components/ChangeBasicInfo";
import ChangePasswords from "./components/ChangePasswords";
import ChangeAddress from "./components/ChangeAddress";
import axios from "axios";

function Profile(props) {
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		email: "",
		age: "",
		phoneNumber: "",
		password: "",
		newPassword: "",
		repeatNewPassword: "",
		country: "",
		province: "",
		city: "",
		postalCode: "",
		address: "",
	});
	const [error, setError] = useState({
		state: "",
		message: "",
		superiorError: false,
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [passwordInfo, setPasswordInfo] = useState({
		error: false,
		errorMessage: "",
		duration: 10000,
		show: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	useEffect(() => {
		axios.get("http://localhost:3001/test").catch((err) => {
			console.log(err);
			setError({
				...error,
				state: "danger",
				message: "Internal server offline.",
			});
		});

		try {
			const user = props.user;
			if (user) {
				console.log(`Previous session found.`);
				setIsLoggedIn(true);
				// All this just for a date xD
				const tempAge = new Date(Date.parse(user.age));
				const newAge = [
					tempAge.getUTCFullYear(),
					("0" + (tempAge.getMonth() + 1)).slice(-2),
					("0" + tempAge.getDate()).slice(-2),
				].join("-");

				setInput({
					...user,
					age: newAge,
				});

				setError({ ...error, state: "", message: "" });
			} else {
				setError({
					...error,
					state: "danger",
					message: "Error 403: You aren't logged in.",
				});
			}
		} catch (err) {}
	}, [props.user]);

	return (
		<div>
			<title>Profile</title>
			<h2>Profile</h2>

			{isLoggedIn && (
				<div className="profile">
					{/* Bad request/internal server error */}
					{error.state === "danger" && error.message && (
						<div className={`error ` + error.state}>
							<div className="errorMessage">{error.message}</div>
						</div>
					)}

					{/* Basic information */}
					<ChangeBasicInfo
						handleChange={handleChange}
						input={input}
						passwordInfo={passwordInfo}
						setPasswordInfo={setPasswordInfo}
						setError={setError}
						error={error}
					/>

					{/* Change password */}
					<ChangePasswords handleChange={handleChange} input={input} />

					{/* Change address */}
					<ChangeAddress handleChange={handleChange} input={input} />
				</div>
			)}

			{error.state && error.message && (
				<div className="profile">
					<Alert
						className={error.state}
						description={error.message}
						forceCenter={true}
					/>
				</div>
			)}
		</div>
	);
}

export default Profile;
