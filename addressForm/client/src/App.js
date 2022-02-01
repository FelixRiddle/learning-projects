import { useEffect, useState } from "react";
import axios from "axios";
import { handleMessageValidationv2 } from "./lib/handleMessageValidation";

const App = (props) => {
	const [user, setUser] = useState({
		email: "aaa@gmail.com",
		password: "aaaaaaaa",
	});
	const [location, setLocation] = useState({
		country: "",
		province: "",
		city: "",
		postalCode: "",
		address: "",
	});
	const [message, setMessage] = useState({
		message: "",
		error: false,
		state: "",
		field: "",
	});
	const [token, setToken] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLocation((prevInput) => {
			return { ...prevInput, [name]: value };
		});
	};

	const handleChangeAddressSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/api/profile/changeAddress", {
				...location,
			})
			.then((res) => {
				console.log(res);
				if (res.data.joiMessage) {
					const joiMessage = handleMessageValidationv2(
						{
							...location,
						},
						res,
						["Country", "Province/State", "City", "Postal Code", "Address"]
					);
					setMessage({
						message: joiMessage,
						error: res.data.error,
						state: res.data.state,
						field: res.data.state,
					});
					console.log(joiMessage);
					console.log(message);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleRegister = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/register", { ...user })
			.then((res) => {
				console.log(`Response:`);
				console.log(res.status);
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/login", { ...user })
			.then((res) => {
				console.log(`Response:`);
				console.log(res.status);
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		// Get token
		setToken(localStorage.getItem("token"));
	}, [token]);

	return (
		<div className="changeAddress">
			<h6>For location services</h6>
			<button className="btn" onClick={handleRegister}>
				Register
			</button>
			<button className="btn" onClick={handleLogin}>
				Log in
			</button>
			<Message message={message} setMessage={setMessage} />

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
						value={location.country}
					/>
					<input
						type="text"
						name="province"
						placeholder="Province/State"
						onChange={handleChange}
						value={location.province}
					/>
					<input
						type="text"
						name="city"
						placeholder="City"
						onChange={handleChange}
						value={location.city}
					/>
					<input
						type="text"
						name="postalCode"
						placeholder="Postal code"
						onChange={handleChange}
						value={location.postalCode}
					/>
					<input
						type="text"
						name="address"
						placeholder="Address"
						onChange={handleChange}
						value={location.address}
					/>
				</div>
				<button type="submit" onClick={handleChangeAddressSubmit}>
					Save address
				</button>
			</form>
		</div>
	);
};

const Message = (props) => {
	const { message, setMessage } = props;

	return (
		<div
			className={"message " + message.state}
			onClick={() =>
				setMessage({
					message: "",
					error: false,
					state: "",
					field: "",
				})
			}
			hidden={!message.message && true}
		>
			{message.message && message.message}
		</div>
	);
};

export default App;
