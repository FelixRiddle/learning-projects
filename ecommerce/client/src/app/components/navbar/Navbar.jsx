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
	const [user, setUser] = useState("");
	const [reRender, setReRender] = useState(false);
	const [token, setToken] = useState("");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		// Re render the page
		if (reRender) setReRender(false);
		try {
			const token = localStorage.getItem("token");
			setToken(token);
			if (token) {
				const prevSession = jwt_decode(token);

				if (!prevSession) {
					console.log(`No previous session found.`);
					localStorage.removeItem("token");
				} else {
					console.log(`Previous session found.`);
					setUser(prevSession);
				}
			}
		} catch (err) {
			console.log(`No previous session found.`);
		}
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
	return (
		<nav className="navbar">
			<span className="navbarspan">
				<a className="navlink" href="/">
					Mercado
				</a>
				<a className="navlink" href="/about">
					About
				</a>
				{(!props.user && (
					<span>
						<a className="navlink" href="/login">
							Login
						</a>
						<a className="navlink" href="/register">
							Register
						</a>
					</span>
				)) ||
					(props.user && (
						<span>
							<a className="navlink" onClick={props.handleLogout} href="/">
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
