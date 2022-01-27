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

export default ChangePasswords;