import React, { useState, useEffect, useDebugValue } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Profile.css";

function Profile() {
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		email: "",
		age: "",
		phoneNumber: "",
		password: "",
		newPassword: "",
		repeatNewPassword: "",
		country: "",
		province: "",
		city: "",
		postalCode: "",
		address: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(`Changing: ${name}`);
		console.log(e.target);
		console.log(typeof value);
		console.log(value);
		setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("http://localhost:3001/api/users/profile");
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
				// All this just for a date xD
				const tempAge = new Date(Date.parse(user.age));
				const newAge = [
					tempAge.getUTCFullYear(),
					("0" + (tempAge.getMonth() + 1)).slice(-2),
					("0" + tempAge.getDate()).slice(-2),
				].join("-");
				
				setInput({ ...user, age: newAge });
			}
		}
	}, []);

	return (
		<div className="profile">
			<title>Profile</title>
			<h2>Profile</h2>

			{/* Basic information */}
			<ChangeBasicInfo
				handleChange={handleChange}
				input={input}
				handleSubmit={handleSubmit}
			/>

			{/* Change password */}
			<ChangePasswords
				handleChange={handleChange}
				input={input}
				handleSubmit={handleSubmit}
			/>

			{/* Change address */}
			<ChangeAddress
				handleChange={handleChange}
				input={input}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}

const ChangeBasicInfo = (props) => {
	const handleChange = props.handleChange;
	const input = props.input;
	const handleSubmit = props.handleSubmit;

	return (
		<div className="changeBasicInfo">
			<h6>Basic info</h6>
			<form action="submit">
				<div className="profileLabels">
					<label htmlFor="firstName">First name</label>
					<label htmlFor="lastName">Last name</label>
					<label htmlFor="email">Email</label>
					<label htmlFor="age">Age</label>
					<label htmlFor="phoneNumber">Phone number</label>
				</div>
				<div className="profileInputs">
					{/* Basic information */}
					<input
						type="text"
						name="firstName"
						placeholder="First name"
						onChange={handleChange}
						value={input.firstName}
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Last name"
						onChange={handleChange}
						value={input.lastName}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						onChange={handleChange}
						value={input.email}
					/>
					<input
						type="date"
						name="age"
						placeholder="Age"
						onChange={handleChange}
						value={input.age}
					/>
					<input
						type="text"
						name="phoneNumber"
						placeholder="Phone number"
						onChange={handleChange}
						value={input.phoneNumber}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Save
				</button>
			</form>
		</div>
	);
};

const ChangePasswords = (props) => {
	const handleChange = props.handleChange;
	const input = props.input;
	const handleSubmit = props.handleSubmit;

	return (
		<div className="changePasswords">
			<h6>Change password</h6>
			<form action="submit">
				<div className="changePasswordsLabels">
					<label htmlFor="password">Current password</label>
					<label htmlFor="newPassword">New password</label>
					<label htmlFor="repeatNewPassword">Repeat new password</label>
				</div>
				<div className="changePasswordsInputs">
					{/* Change passwords */}
					<input
						type="password"
						name="password"
						placeholder="Current password"
						onChange={handleChange}
						value={input.password}
					/>
					<input
						type="password"
						name="newPassword"
						placeholder="New password"
						onChange={handleChange}
						value={input.newPassword}
					/>
					<input
						type="password"
						name="repeatNewPassword"
						placeholder="Repeat new password"
						onChange={handleChange}
						value={input.repeatNewPassword}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Change password
				</button>
			</form>
		</div>
	);
};

const ChangeAddress = (props) => {
	const handleChange = props.handleChange;
	const input = props.input;
	const handleSubmit = props.handleSubmit;

	return (
		<div className="changeAddress">
			<h6>For location services</h6>
			<form action="submit">
				<div className="changeAddressLabels">
					<label htmlFor="country">Country</label>
					<label htmlFor="province">Province/State</label>
					<label htmlFor="city">City</label>
					<label htmlFor="postalCode">Postal code</label>
					<label htmlFor="address">Address</label>
				</div>
				<div className="changeAddressInputs">
					<input
						type="text"
						name="country"
						placeholder="Country"
						onChange={handleChange}
						value={input.country}
					/>
					<input
						type="text"
						name="province"
						placeholder="Province/State"
						onChange={handleChange}
						value={input.province}
					/>
					<input
						type="text"
						name="city"
						placeholder="City"
						onChange={handleChange}
						value={input.city}
					/>
					<input
						type="text"
						name="postalCode"
						placeholder="Postal code"
						onChange={handleChange}
						value={input.postalCode}
					/>
					<input
						type="text"
						name="address"
						placeholder="Address"
						onChange={handleChange}
						value={input.address}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Save address
				</button>
			</form>
		</div>
	);
};

export default Profile;
