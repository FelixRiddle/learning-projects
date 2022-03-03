import React from "react";

function Label(props) {
	const { inputLabel, inputName, labelClasses, labelStyle } = props;

	return (
		<label className={labelClasses} htmlFor={inputName} style={labelStyle}>
			{inputLabel}
		</label>
	);
}

export default Label;
