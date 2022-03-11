import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Profile.css";
import { get_year_month_day } from "../../../lib/misc/transformDate";
import { useUserData } from "../../../lib/user/useUserData";
import ProfileRoutes from "./components/profile_routes/ProfileRoutes";
import AlertV2 from "../../components/alertv2/AlertV2";
import { getAnyMessage } from "../../../lib/debug/handleMessages";

function Profile(props) {
	const user = useSelector((state) => state.user);
	const host = useSelector((state) => state.constants.clientUrl);

	const { handleChange, userData, setUserData } = useUserData();
	const [error, setError] = useState({
		state: "",
		message: "",
		superiorError: false,
		joiMessage: "",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const [loading, setLoading] = useState(false);
	const [passwordInfo, setPasswordInfo] = useState({
		error: false,
		errorMessage: "",
		joiMessage: "",
		duration: 10000,
		show: false,
	});
	const [status, setStatus] = useState({
		...getAnyMessage({ options: { messageType: "loading" } }),
	});
	const [updated, setUpdated] = useState(false);

	window.onload = () => {
		// If the error already exists
		if (isLoggedIn) return;

		try {
			// console.log(`User:`, user);
			if (user && user._id) {
				setIsLoggedIn(true);

				// Utc to YYYY-MM-DD
				const newAge = get_year_month_day(user.age);

				const { firstName, lastName, email, phoneNumber } = user;
				setUserData((prevInput) => {
					return {
						...prevInput,
						firstName: firstName || "",
						lastName: lastName || "",
						email: email || "",
						age: newAge,
						phoneNumber: phoneNumber || "",
						password: "",
					};
				});

				setStatus({ ...status, messageCopy: "" });
			} else {
				if (updated) return;

				console.log(`Status updated`);
				setIsLoggedIn(false);
				setUpdated(true);
				getAnyMessage({
					options: { messageType: "notLoggedIn" },
					setCB: setStatus,
				});
			}
		} catch (err) {
			setIsLoggedIn(false);
			console.error(err);
			getAnyMessage({
				options: { messageType: "somethingWentWrong" },
				setCB: setStatus,
			});
		}
	};

	return (
		<div>
			<div className="profile">
				<AlertV2 center={true} setStatus={setStatus} status={status} />

				{/* Check if the user is logged in and then show the settings */}
				{user && user._id && (
					<div>
						<h2 className="title">Profile</h2>
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
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
