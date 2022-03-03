import React, { useState } from "react";

import Input from "../input/Input";
import Label from "../label/Label";
import PasswordInput from "../password_input/PasswordInput";
import TextArea from "../text_area/TextArea";

function Field(props) {
	const {
		fieldParentDivClasses,
		inputClasses,
		inputParentDivClasses,
		inputStyle,
		inputType,
		inline,
	} = props;

	const [newInputStyle] = useState({
		marginTop: "8px",
		...inputStyle,
	});
	const [newInputClasses] = useState(
		"input input-aesthetic " + ((inputClasses && inputClasses) || "")
	);
	const [newInputParentDivClasses] = useState(
		"input-parent " + ((inputParentDivClasses))
	);

	return (
		<div className={fieldParentDivClasses}>
			<Label {...props} parent="Field" />
			{(inputType === "password" && (
				<PasswordInput
					{...props}
					inputClasses={newInputClasses}
					inputParentDivClasses={newInputParentDivClasses}
					parent="Field"
				/>
			)) ||
				(inputType === "textarea" && (
					<TextArea
						{...props}
						inputClasses={newInputClasses}
						inputStyle={newInputStyle}
						inputParentDivClasses={newInputParentDivClasses}
						parent={
							(typeof inline === "undefined" && "Field") ||
							(!inline && inputType)
						}
					/>
				)) || (
					<Input
						{...props}
						inputClasses={newInputClasses}
						inputParentDivClasses={newInputParentDivClasses}
						parent="Field"
					/>
				)}
		</div>
	);
}

export default Field;
