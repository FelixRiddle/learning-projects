import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//import jwt from "jsonwebtoken";

import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Search from "../../pages/search/Search";

function Navbar() {
	const [user, setUser] = useState("")
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};
	
	useEffect(() => {
		const user = localStorage.getItem("user");
		/*
		if (token) {
			//const user = jwt.decode(token);*/
			
			if (!user) {
				console.log(`No previous session found.`);
				localStorage.removeItem("token");
			} else {
				console.log(`Previous session found.`);
				setUser(user);
			}
		//}
	}, [])

	return (
		<>
			{/* Links */}
			<Links />

			{/* Go to routes */}
			<GoToRoutes />

			{/* Footer */}
			<Footer />
		</>
	);
}

const Links = () => {
	return (
		<nav className="navbar1">
			<a className="navbar" href="/">
				Mercado
			</a>
			<a className="navbar" href="/about">
				About
			</a>
			<a className="navbar" href="/login">
				Login
			</a>
			<a className="navbar" href="/register">
				Register
			</a>
		</nav>
	);
};

const GoToRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
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
