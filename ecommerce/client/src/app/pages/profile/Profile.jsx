import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./Profile.css";
import { get_year_month_day } from "../../../lib/misc/transformDate";
import { useUserData } from "../../../lib/user/useUserData";
import ProfileRoutes from "./components/profile_routes/ProfileRoutes";

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
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [passwordInfo, setPasswordInfo] = useState({
		error: false,
		errorMessage: "",
		joiMessage: "",
		duration: 10000,
		show: false,
	});
	const [loading, setLoading] = useState(true);

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

	// Check if the page is loading or not
	useEffect(() => {
		// All this "isMounted" stuff is to prevent updating a state
		// when the component is not mounted, which throws an error.
		let isMounted = true;

		new Promise((resolve, reject) => {
			window.onload = resolve();
		}).then(() => {
			if (isMounted) {
				setLoading(false);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div>
			<h2 className="title">Profile</h2>
			<div className="profile">
				{/* Bad request/internal server error/not logged in */}
				{loading && error.state === "danger" && error.message && (
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
