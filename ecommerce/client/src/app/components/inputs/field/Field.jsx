import React from "react";
import Input from "../input/Input";
import Label from "../label/Label";
import PasswordInput from "../password_input/PasswordInput";

function Field(props) {
	const { inputType } = props;

	return (
		<div>
			<Label {...props} parent="Field" />
			{(inputType === "password" && (
				<PasswordInput {...props} parent="Field" />
			)) || <Input {...props} parent="Field" />}
		</div>
	);
}

export default Field;
