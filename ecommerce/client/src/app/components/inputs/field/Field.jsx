import React from "react";
import Input from "../input/Input";
import Label from "../label/Label";
import PasswordInput from "../password_input/PasswordInput";

function Field(props) {
	const { inputType } = props;
	
	return (
		<div>
			<Label {...props} />
			{(inputType === "password" && <PasswordInput {...props} />) || (
				<Input {...props} />
			)}
		</div>
	);
}

export default Field;
