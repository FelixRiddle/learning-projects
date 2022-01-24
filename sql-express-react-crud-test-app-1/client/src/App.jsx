import { useState } from "react";
import axios from "axios";
//import "./App.scss";
import "./App.css"

function App() {
	const [input, setInput] = useState({
		first_name: "",
		age: "",
		country: "",
	 	position: "",
		wage_year: "",
	});
	const [status, setStatus] = useState("none");

	const handleChange = (e) => {
		const { name, value } = e.target;

		setInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { ...input };
		axios.post("http://localhost:3001/api/users/register", data)
		  .then((res) => {
				console.log(res);
				setStatus("success");
			})
			.catch((err) => {
				console.error(err);
				setStatus("error");
			});
	};

	return (
		<div className="App">
			<form action="submit">
				<div className="information">
					<label htmlFor="first_name">
						Name
					</label>
					<input
						onChange={handleChange}
						type="text"
						placeholder="First name"
						name="first_name"
						id="first_name"
						value={input.name}
					/>
					<label htmlFor="age">Age</label>
					<input
						onChange={handleChange}
						type="number"
						placeholder="Age"
						name="age"
						id="age"
						value={input.age}
					/>
					<label htmlFor="country">Country</label>
					<input
						onChange={handleChange}
						type="text"
						placeholder="Country"
						name="country"
						id="country"
						value={input.country}
					/>
					<label htmlFor="position">Position</label>
					<input
						onChange={handleChange}
						type="text"
						placeholder="Position"
						name="position"
						id="position"
						value={input.position}
					/>
					<label htmlFor="wage_year">Wage(yearly)</label>
					<input
						onChange={handleChange}
						type="number"
						placeholder="Wage(yearly)"
						name="wage_year"
						id="wage_year"
						value={input.wage_year}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>Add Employee</button>
				{/* <p className="success position-alert">Success</p>
				<p className="danger position-alert">Danger</p> */}
				{(status === "success" && (
					  <p className="success position-alert">
				      Employee added to the database!
				    </p>
					)) || (
					status === "error" && (
					  <p className="danger position-alert">
						  Couldn't add employee to the database.
						</p>
					))}
			</form>
		</div>
	);
}

export default App;
