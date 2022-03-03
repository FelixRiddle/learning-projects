import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Input(props) {
	const {
		inputClasses,
		inputHeight,
		inputId,
		inputLabel,
		inputName,
		inputOnChange,
		inputOnClick,
		inputParentDivClasses,
		inputStyle,
		inputType,
		inputValue,
		inputWidth,
		parent,
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
		<div
			className={inputParentDivClasses}
			style={{
				...(parent === "Field" && {
					display: "inline-block",
				}),
				marginLeft: "10px",
			}}
		>
			<input
				className={inputClasses}
				id={newInputId}
				name={inputName}
				onChange={inputOnChange}
				onClick={inputOnClick}
				placeholder={inputLabel}
				style={{ ...inputStyles, ...inputStyle }}
				type={inputType}
				value={inputValue}
			/>
		</div>
	);
}

export default Input;
