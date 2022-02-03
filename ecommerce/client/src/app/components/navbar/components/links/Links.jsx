import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../App";

import "./Links.css";

const Links = (props) => {
	const { user } = useContext(GlobalContext);
	const [showProfile, setShowProfile] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		if (user) {
			if (user._id) {
				setShowProfile(true);
			} else {
				setShowProfile(false);
			}
		}
	}, [user]);

	return (
		<nav className="top-navbar">
			<span className="navbar-span">
				<a className="navbar-link" href="/">
					Mercado
				</a>
				<a className="navbar-link" href="/about">
					About
				</a>
				{(!showProfile && (
					<span className="not-logged-in">
						<a className="navbar-link" href="/login">
							Login
						</a>
						<a className="navbar-link" href="/register">
							Register
						</a>
					</span>
				)) ||
					(showProfile && (
						<span className="logged-in">
							<a className="navbar-link" onClick={handleLogout} href="/">
								Logout
							</a>
							<a className="navbar-link" href="/profile">
								Profile
							</a>
						</span>
					))}
			</span>
		</nav>
	);
};

export default Links;
