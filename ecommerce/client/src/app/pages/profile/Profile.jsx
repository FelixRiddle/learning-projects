import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import handleMessageValidation from "../../../lib/handleMessageValidation";
import Alert from "../../components/alert/Alert";

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
	const [state, setState] = useState("none");
	const [message, setMessage] = useState("none");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	const handleBasicInfoSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post("http://localhost:3001/api/profile/changeBasicInfo", { ...input })
			.then((res) => {
				console.log(`Response ${res.data}`);
				console.log(`Typeof: ${typeof res.data}`);
				if (res.data === "Email or password is wrong.") {
					setState("danger");
					setMessage("Email or password is wrong.");
				} else if (typeof res.data === "string") {
					setState("danger");
					handleMessageValidation(
						input,
						res,
						["Email", "Password"],
						setMessage
					);
				} else if (res.data.token) {
					localStorage.setItem("token", res.data.token);
					setState("success");
					setMessage("Information changed.");
				}
			})
			.catch((err) => {
				console.error(err);
				setState("danger");
				setMessage(
					"Internal server error, the website may be offline for a short time, try again later."
				);
			});
	};

	const handleChangePasswordsSubmit = (e) => {
		e.preventDefault();
		axios.post("http://localhost:3001/api/profile/changePassword");
	};

	const handleChangeAddressSubmit = (e) => {
		e.preventDefault();
		axios.post("http://localhost:3001/api/profile/changeAddress");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt_decode(token);

			if (!user) {
				setMessage(`The user you are logged in is invalid.`);
				localStorage.removeItem("token");
			} else {
				console.log(`Previous session found.`);
				setIsLoggedIn(true);
				// All this just for a date xD
				const tempAge = new Date(Date.parse(user.age));
				const newAge = [
					tempAge.getUTCFullYear(),
					("0" + (tempAge.getMonth() + 1)).slice(-2),
					("0" + tempAge.getDate()).slice(-2),
				].join("-");

				setInput({ ...user, age: newAge });
			}
		} else {
			setMessage(`Error 403: You aren't logged in.`);
		}
	}, []);
	
	return (
		<div>
			<title>Profile</title>
			<h2>Profile</h2>
			{(isLoggedIn && (
				<div className="profile">
					{/* Basic information */}
					<ChangeBasicInfo
						handleChange={handleChange}
						input={input}
						handleSubmit={handleBasicInfoSubmit}
					/>

					{/* Change password */}
					<ChangePasswords
						handleChange={handleChange}
						input={input}
						handleSubmit={handleChangePasswordsSubmit}
					/>

					{/* Change address */}
					<ChangeAddress
						handleChange={handleChange}
						input={input}
						handleSubmit={handleChangeAddressSubmit}
					/>
				</div>
			)) || (
				<div className="profile">
					<Alert class="danger" description={message} forceCenter={true} />
				</div>
			)}
		</div>
	);
}

const ChangeBasicInfo = (props) => {
	const handleChange = props.handleChange;
	const input = props.input;
	const handleSubmit = props.handleBasicInfoSubmit;

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
	const handleSubmit = props.handleChangePasswordsSubmit;

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
	const handleSubmit = props.handleChangeAddressSubmit;

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
