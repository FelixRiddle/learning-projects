import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Links.css";
import IconLink from "../../../iconLink/IconLink";

const Links = (props) => {
	const user = useSelector((state) => state.user.user.value);

	const [showProfile, setShowProfile] = useState(false);
	const [input, setInput] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleSearch = () => {};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		console.log(`User:`, user);
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
				<IconLink
					classes="navbar-link"
					iconClasses="navbar-icon"
					textClass="navbar-link"
					linkref="/home"
					title="Home"
					iconName="home_1.png"
				/>
				{(!showProfile && (
					<span className="not-logged-in">
						<IconLink
							classes="navbar-link"
							iconClasses="navbar-icon"
							textClass="navbar-link"
							linkref="/register"
							title="Register"
							iconName="register_1.png"
						/>
						<IconLink
							classes="navbar-link"
							iconClasses="navbar-icon"
							textClass="navbar-link"
							linkref="/login"
							title="Login"
							iconName="user_1.png"
						/>
					</span>
				)) ||
					(showProfile && (
						<span className="logged-in">
							<IconLink
								classes="navbar-link"
								linkref="#"
								title="Logout"
								iconName="logout_1.png"
								iconClasses="navbar-icon"
								textClass="navbar-link"
								fn={handleLogout}
							/>
							<IconLink
								classes="navbar-link"
								linkref="/profile"
								title="Profile"
								iconName="user_1.png"
								iconClasses="navbar-icon"
								textClass="navbar-link"
							/>
							<IconLink
								classes="navbar-link"
								iconClasses="navbar-icon"
								textClass="navbar-link"
								linkref="/createProduct"
								title="Create product"
								iconName="plus_1.png"
							/>
						</span>
					))}
				<span className="search">
					<input
						className="search-input"
						type="text"
						placeholder="Search"
						name="search"
						value={input}
						onChange={handleChange}
					/>
					<img
						className="search-icon"
						src="http://localhost:3001/public/icons/loupe_1.png"
						alt="Loupe"
						onClick={handleSearch}
					/>
				</span>
			</span>
		</nav>
	);
};

export default Links;
