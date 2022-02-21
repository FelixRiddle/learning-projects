import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getAll } from "../lib/products/getProducts";

export const GlobalContext = React.createContext();

function App() {
	const [user, setUser] = useState({
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		age: "",
		phoneNumber: "",
		country: "",
		province: "",
		city: "",
		postalCode: "",
		lastUpdated: "",
		date: "",
	});
	const [token, setToken] = useState("");
	const [currentSite, setCurrentSite] = useState("");
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getAll("http://localhost:3001/api/products/getAll").then((data) => {
			setProducts([...data]);
		});
	}, []);

	useEffect(() => {
		// If the user already exists
		if (user._id) return;

		// Token management
		const token = localStorage.getItem("token");
		setToken(token);
		if (token && user && !user._id) {
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
		// console.log(`Token: ${token}`);
		if (token) return;
		setToken(localStorage.getItem("token"));
	}, [token, setToken]);

	return (
		<div className="App">
			<GlobalContext.Provider
				value={{
					user,
					token,
					setToken,
					currentSite,
					products,
					setCurrentSite,
					setProducts,
					setUser,
				}}
			>
				<Navbar />
			</GlobalContext.Provider>
		</div>
	);
}

export default App;
