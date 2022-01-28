import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import Alert from "../../components/alert/Alert";
import ChangeBasicInfo from "./components/ChangeBasicInfo";
import ChangePasswords from "./components/ChangePasswords";
import ChangeAddress from "./components/ChangeAddress";

function Profile() {
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
		token: "",
	});
	const [state, setState] = useState("none");
	const [message, setMessage] = useState("none");
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
				
				setInput({
					...user, age: newAge
					, token
				});
			}
		} else {
			setMessage(`Error 403: You aren't logged in.`);
		}
	}, []);

	return (
		<div>
			<title>Profile</title>
			<h2>Profile</h2>
			{(isLoggedIn && (
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
					<ChangePasswords
						handleChange={handleChange}
						input={input}
					/>

					{/* Change address */}
					<ChangeAddress
						handleChange={handleChange}
						input={input}
					/>
				</div>
			)) || (
				<div className="profile">
					<Alert class="danger" description={message} forceCenter={true} />
				</div>
			)}
		</div>
	);
}

export default Profile;
