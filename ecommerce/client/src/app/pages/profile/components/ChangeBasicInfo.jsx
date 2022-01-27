import axios from "axios";
import handleMessageValidation from "../../../../lib/handleMessageValidation";

const ChangeBasicInfo = (props) => {
	const {
		handleChange,
		input,
		passwordInfo,
		setPasswordInfo,
		setState,
		setMessage,
	} = props;

	const handleBasicInfoSubmit = async (e) => {
		console.log(`Executed`);
		e.preventDefault();

		if (!input.password) {
			setPasswordInfo({
				...passwordInfo,
				error: true,
				errorMessage: "You must provide a password for making changes",
			});
			console.log(`Error message: ${passwordInfo.errorMessage}`);
			
			// Timeout
			setTimeout(() => {
				console.log(passwordInfo);
				setPasswordInfo({
					...passwordInfo,
					error: true,
					errorMessage: "",
				});
				console.log(passwordInfo.error)
			}, passwordInfo.duration);

			return;
		} else if (input.password.length < 8) {
			setPasswordInfo({
				...passwordInfo,
				error: true,
				errorMessage: "The password must be at least 8 characters long.",
			});

			// Timeout
			setTimeout(() => {
				setPasswordInfo({
					...passwordInfo,
					error: true,
					errorMessage: "",
				});
				console.log(passwordInfo.error);
			}, passwordInfo.duration);

			return;
		}
		console.log(`Password suplied!`);

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

	return (
		<div className="changeBasicInfo">
			{passwordInfo.errorMessage && (
				<div className="errorPopup">
					<div className="arrow"></div>
					<div className="errorMessage">{passwordInfo.errorMessage}</div>
				</div>
			)}
			<h6>Basic info</h6>
			<form>
				<div className="profileLabels">
					<label htmlFor="firstName">First name</label>
					<label htmlFor="lastName">Last name</label>
					<label htmlFor="email">Email</label>
					<label htmlFor="age">Age</label>
					<label htmlFor="phoneNumber">Phone number</label>
					<label htmlFor="password">Password</label>
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
					<input
						className={passwordInfo.error ? "danger" : ""}
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChange}
						value={input.password}
						onClick={(e) => setPasswordInfo({ ...passwordInfo, error: false })}
					/>
				</div>
				<button type="submit" onClick={handleBasicInfoSubmit}>
					Save
				</button>
			</form>
		</div>
	);
};

export default ChangeBasicInfo;
