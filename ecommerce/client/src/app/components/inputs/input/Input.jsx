import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Input(props) {
	const {
		divClasses,
		inputClasses,
		inputHeight,
		inputId,
		inputName,
		inputOnChange,
		inputOnClick,
		inputPlaceholder,
		inputType,
		inputValue,
		inputWidth,
	} = props;

	const [newInputId] = useState(inputId || uuidv4());
	const [inputStyles, setInputStyles] = useState({});

	// Set the input sizes to the provided sizes
	useEffect(() => {
		if (inputWidth)
			setInputStyles((prevInput) => {
				return { ...prevInput, width: inputWidth };
			});

		if (inputHeight)
			setInputStyles((prevInput) => {
				return { ...prevInput, height: inputHeight };
			});
	}, [inputHeight, inputWidth]);

	return (
		<div className={divClasses}>
			<input
				className={inputClasses}
				id={newInputId}
				name={inputName}
				onChange={inputOnChange}
				onClick={inputOnClick}
				placeholder={inputPlaceholder}
				style={inputStyles}
				type={inputType}
				value={inputValue}
			/>
		</div>
	);
}

export default Input;
