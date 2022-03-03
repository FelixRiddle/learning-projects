import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import "./Profile.css";
import axios from "axios";
import { GlobalContext } from "../../App";
import { get_year_month_day } from "../../../lib/misc/transformDate";
import { useUserData } from "../../../lib/user/useUserData";
import ChangeBasicInfo from "./components/change_basic_info/ChangeBasicInfo";
import ChangePassword from "./components/change_password/ChangePasswords";
import ChangeAddress from "./components/change_address/ChangeAddress";
import ProfileRoutes from "./components/profile_routes/ProfileRoutes";

function Profile(props) {
	const { token, setToken, user } = useContext(GlobalContext);

	// Hooks
	const { handleChange, userData, setUserData } = useUserData();
	const { setReRender } = props;
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

				// Utc to YYYY-MM-DD
				const newAge = get_year_month_day(user.age);

				const { firstName, lastName, email, phoneNumber } = user;
				setUserData((prevInput) => {
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
	}, [user, isLoggedIn, setUserData]);

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
						{/* Routes to profile settings */}
						<ProfileRoutes
							error={error}
							handleChange={handleChange}
							input={userData}
							passwordInfo={passwordInfo}
							setError={setError}
							setInput={setUserData}
							setPasswordInfo={setPasswordInfo}
							setReRender={setReRender}
							setToken={setToken}
							token={token}
						/>
						
						{/* Navigation bar */}
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
