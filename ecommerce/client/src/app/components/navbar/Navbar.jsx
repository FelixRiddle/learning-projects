import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Search from "../../pages/search/Search";

function Navbar() {
	const [user, setUser] = useState("");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt_decode(token);

			if (!user) {
				console.log(`No previous session found.`);
				localStorage.removeItem("token");
			} else {
				console.log(`Previous session found.`);
				console.log(`User:`);
				console.log(user);
				setUser(user);
			}
		}
	}, []);

	return (
		<>
			{/* Links */}
			<Links user={user} handleLogout={handleLogout} />

			{/* Go to routes */}
			<GoToRoutes />

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
						</span>
					))}
			</span>
		</nav>
	);
};

const GoToRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/search" element={<Search />} />
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
