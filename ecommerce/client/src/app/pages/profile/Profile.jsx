import React, { useState, useEffect } from "react";

import "./Profile.css";
import axios from "axios";
import { get_year_month_day } from "../../../lib/misc/transformDate";
import { useUserData } from "../../../lib/user/useUserData";
import ProfileRoutes from "./components/profile_routes/ProfileRoutes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile(props) {
	const user = useSelector((state) => state.user);
	const host = useSelector((state) => state.constants.clientUrl);

	// Hooks
	const { setReRender } = props;

	const { handleChange, userData, setUserData } = useUserData();
	const [error, setError] = useState({
		state: "",
		message: "",
		superiorError: false,
		joiMessage: "",
	});
	const [isInChildComponent, setIsInChildComponent] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
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

	useEffect(() => {
		console.log(`Is in child component?: ${isInChildComponent}`);
		if (!isInChildComponent) navigate("/profile/changeBasicInfo");
	}, [isInChildComponent, navigate]);

	return (
		<div>
			<h2 className="title">Profile</h2>
			<div className="profile">
				{/* Bad request/internal server error/not logged in */}
				{error.state === "danger" && error.message && (
					<div className={"error " + (error.state && error.state)}>
						<div className="errorMessage">{error.message}</div>
					</div>
				)}

				{/* Check if the user is logged in and then show the settings */}
				{isLoggedIn && (
					<div className="profile-navbar">
						{/* Navigation bar */}
						<nav className="links" style={{ width: "200px" }}>
							<a className="link" href={`${host}profile/changeBasicInfo`}>
								Info
							</a>
							<a className="link" href={`${host}profile/changePassword`}>
								Change password
							</a>
							<a className="link" href={`${host}profile/changeAddress`}>
								Address
							</a>
							<a className="link" href={`${host}profile/updateProducts`}>
								Your products
							</a>
						</nav>

						{/* Routes to profile settings */}
						<ProfileRoutes
							error={error}
							handleChange={handleChange}
							input={userData}
							passwordInfo={passwordInfo}
							setError={setError}
							setInput={setUserData}
							setIsInChildComponent={setIsInChildComponent}
							setPasswordInfo={setPasswordInfo}
							setReRender={setReRender}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
