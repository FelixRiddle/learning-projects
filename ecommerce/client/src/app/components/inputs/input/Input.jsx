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
		setStatus,
		status,
	} = props;

	const [newInputId] = useState(inputId || uuidv4());
	const [inputStyles, setInputStyles] = useState({});

	const handleInputClick = (e) => {
		if (inputOnClick) inputOnClick(e);
		if (setStatus) setStatus({ ...status, messageCopy: "", fieldCopy: "" });
	};

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

	// Change the outline color, every time the status is updated
	useEffect(() => {
		// console.log(`Current status:`, status);
		// console.log(`Input name:`, inputName);
		// console.log(
		// 	`Is this the component with red border?:`,
		// 	status && status.fieldCopy && status.fieldCopy === inputName
		// );

		setInputStyles((prevInput) => {
			return {
				...prevInput,
				borderBottom:
					(status &&
						status.fieldCopy &&
						status.fieldCopy === inputName &&
						"1px solid red") ||
					"",
				outline:
					(status &&
						status.fieldCopy &&
						status.fieldCopy === inputName &&
						"2px solid red") ||
					"",
			};
		});
	}, [inputName, status]);

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
				onClick={handleInputClick}
				placeholder={inputLabel}
				style={{ ...inputStyles, ...inputStyle }}
				type={inputType}
				value={inputValue}
			/>
		</div>
	);
}

export default Input;
