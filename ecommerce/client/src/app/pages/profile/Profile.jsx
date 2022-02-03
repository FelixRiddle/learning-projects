import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import ChangeBasicInfo from "./components/ChangeBasicInfo";
import ChangePasswords from "./components/ChangePasswords";
import ChangeAddress from "./components/ChangeAddress";
import axios from "axios";
import { GlobalContext } from "../../App";

function Profile(props) {
	const { token, setToken, user } = useContext(GlobalContext);
	const { setReRender } = props;
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		email: "",
		age: "",
		password: "",
		phoneNumber: "",
	});
	const [error, setError] = useState({
		state: "",
		message: "",
		superiorError: false,
		joiMessage: "",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [passwordInfo, setPasswordInfo] = useState({
		error: false,
		errorMessage: "",
		joiMessage: "",
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
		// If the error already exists
		if (isLoggedIn) return;

		axios.get("http://localhost:3001/test").catch((err) => {
			console.log(err);
			setError({
				superiorError: false,
				joiMessage: "",
				state: "danger",
				message: "Internal server offline.",
			});
		});

		try {
			if (user && user._id) {
				setIsLoggedIn(true);

				// All this just for a date xD
				const tempAge = new Date(Date.parse(user.age));
				const newAge = [
					tempAge.getUTCFullYear(),
					("0" + (tempAge.getMonth() + 1)).slice(-2),
					("0" + tempAge.getDate()).slice(-2),
				].join("-");

				const { firstName, lastName, email, phoneNumber } = user;
				setInput(() => {
					return {
						firstName,
						lastName,
						email,
						phoneNumber,
						password: "",
						age: newAge,
					};
				});

				setError({
					superiorError: false,
					joiMessage: "",
					state: "",
					message: "",
				});
				return;
			} else {
				setIsLoggedIn(false);
				setError({
					superiorError: false,
					joiMessage: "",
					state: "danger",
					message: "Error 403: You aren't logged in.",
				});
				return;
			}
		} catch (err) {
			setError({
				state: "danger",
				message: "Something went wrong, try logging out and login.",
				superiorError: false,
				joiMessage: "",
			});
			setIsLoggedIn(false);
			console.error(err);
			return;
		}
	}, [user, isLoggedIn, input]);

	return (
		<div>
			<title>Profile</title>
			<h2>Profile</h2>

			<div className="profile">
				{/* Bad request/internal server error/not logged in */}
				{error.state === "danger" && error.message && (
					<div className={"error " + (error.state && error.state)}>
						<div className="errorMessage">{error.message}</div>
					</div>
				)}

				{isLoggedIn && (
					<div>
						{/* Basic information */}
						<ChangeBasicInfo
							handleChange={handleChange}
							input={input}
							setInput={setInput}
							passwordInfo={passwordInfo}
							setPasswordInfo={setPasswordInfo}
							setError={setError}
							error={error}
						/>

						{/* Change password */}
						<ChangePasswords
							handleChange={handleChange}
							input={input}
							setReRender={setReRender}
							token={token}
							setToken={setToken}
						/>

						{/* Change address */}
						<ChangeAddress handleChange={handleChange} input={input} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
