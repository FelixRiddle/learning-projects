import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Search from "../../pages/search/Search";
import Profile from "../../pages/profile/Profile";

function Navbar() {
	const [user, setUser] = useState({
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		age: "",
		date: "",
		phoneNumber: "",
		lastUpdated: "",
	});
	const [reRender, setReRender] = useState(false);
	const [token, setToken] = useState("");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		// If the user already exists
		if (user._id) return;

		// Token management
		const token = localStorage.getItem("token");
		if (token !== "undefined" && token && user && !user._id) {
			console.log(`This doesn't execute`);
			Promise.resolve(jwt_decode(token))
				.then((prevSession) => {
					console.log(`Previous session found`);
					setUser({ ...prevSession });
				})
				.catch((err) => {
					console.log(`No previous session found`);
					localStorage.removeItem("token");
				});
		} else {
			console.log(`No previous session found.`);
			localStorage.removeItem("token");
		}
	}, [user]);

	useEffect(() => {
		console.log(`Triggering re render.`);
		if (reRender) setReRender(false);
	}, [reRender]);

	return (
		<>
			{/* Links */}
			<Links user={user} handleLogout={handleLogout} />

			{/* Go to routes */}
			<GoToRoutes
				user={user}
				setReRender={setReRender}
				token={token}
				setToken={setToken}
			/>

			{/* Footer */}
			<Footer />
		</>
	);
}

const Links = (props) => {
	const { user, handleLogout } = props;
	const [showProfile, setShowProfile] = useState(false);

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
		<nav className="navbar">
			<span className="navbarspan">
				<a className="navlink" href="/">
					Mercado
				</a>
				<a className="navlink" href="/about">
					About
				</a>
				{(!showProfile && (
					<span>
						<a className="navlink" href="/login">
							Login
						</a>
						<a className="navlink" href="/register">
							Register
						</a>
					</span>
				)) ||
					(showProfile && (
						<span>
							<a className="navlink" onClick={handleLogout} href="/">
								Logout
							</a>
							<a href="/profile">Profile</a>
						</span>
					))}
			</span>
		</nav>
	);
};

const GoToRoutes = (props) => {
	const { token, setToken } = props;

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login user={props.user} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/search" element={<Search />} />
				<Route
					path="/profile"
					element={
						<Profile
							user={props.user}
							setReRender={props.setReRender}
							token={token}
							setToken={setToken}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

const Footer = () => {
	return (
		<nav>
			<a id="footbar" href="/faq">
				Frequent asked questions
			</a>
			<a id="footbar" href="/tos">
				Terms of service
			</a>
			<a id="footbar" href="/data">
				Your data
			</a>
			<a id="footbar" href="/interestbasedads">
				Interest based ads
			</a>
			<a id="footbar" href="/license">
				&copy; 2022, Mercado
			</a>
		</nav>
	);
};

export default Navbar;
