import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { getAll } from "../lib/products/getProducts";
import { counterSlice } from "../lib/redux/actions/counterSlice";
import { productsSlice } from "../lib/redux/actions/productsSlice";
import { userSlice } from "../lib/redux/actions/userSlice";

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
			const products = productsSlice.reducer(
				{
					value: [...data],
				},
				productsSlice.actions.insertProducts()
			);

			console.log(`Products:`, products);
		});

		const newState = counterSlice.reducer(
			{
				value: 0,
			},
			counterSlice.actions.increment()
		);
		console.log(`State:`, newState);
	}, []);

	useEffect(() => {
		// If the user already exists
		if (user._id) return;

		// Token management
		const token = localStorage.getItem("token");
		setToken(token);
		if (token && user) {
			Promise.resolve(jwt_decode(token))
				.then((prevSession) => {
					console.log(`Previous session found`);
					setUser({ ...prevSession });

					// Save user on redux reducer
					userSlice.reducer(
						{
							value: { ...prevSession },
						},
						userSlice.actions.insertUser()
					);
				})
				.catch((err) => {
					console.log(`No previous session found`);
					localStorage.removeItem("token");
				});
		} else if (!token) {
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
					currentSite,
					products,
					setCurrentSite,
					setProducts,
					setUser,
					setToken,
					token,
					user,
				}}
			>
				<Navbar />
			</GlobalContext.Provider>
		</div>
	);
}

export default App;
