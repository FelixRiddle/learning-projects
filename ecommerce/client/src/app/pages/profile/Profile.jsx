import React, { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import Alert from "../../components/alert/Alert";
import ChangeBasicInfo from "./components/ChangeBasicInfo";
import ChangePasswords from "./components/ChangePasswords";
import ChangeAddress from "./components/ChangeAddress";

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
	const [state, setState] = useState("");
	const [message, setMessage] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [passwordInfo, setPasswordInfo] = useState({
		error: false,
		errorMessage: "",
		duration: 10000,
		show: false,
	});
	const [user, setUser] = useState(props.user);

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
		console.log(`Logging in...`);
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
				
				setState("")
				setMessage("");
			} else {
				setState(`danger`);
				setMessage(`Error 403: You aren't logged in.`);
			}
		} catch (err) {}
	}, [props.user]);

	return (
		<div>
			<title>Profile</title>
			<h2>Profile</h2>

			{/* Bad request/internal server error */}
			{state === "danger" && message && (
				<div className={`error ` + state}>
					<div className="errorMessage">{message}</div>
				</div>
			)}

			{isLoggedIn && (
				<div className="profile">
					{/* Basic information */}
					<ChangeBasicInfo
						handleChange={handleChange}
						input={input}
						passwordInfo={passwordInfo}
						setPasswordInfo={setPasswordInfo}
						setState={setState}
						setMessage={setMessage}
					/>

					{/* Change password */}
					<ChangePasswords handleChange={handleChange} input={input} />

					{/* Change address */}
					<ChangeAddress handleChange={handleChange} input={input} />
				</div>
			)}
			
			{state && message && (
				<div className="profile">
					<Alert className={state} description={message} forceCenter={true} />
				</div>
			)}
		</div>
	);
}

export default Profile;
