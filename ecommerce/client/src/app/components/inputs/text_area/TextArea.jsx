import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TextArea(props) {
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
		textAreaColumns,
		textAreaRows,
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
					marginLeft: "10px",
				}),
			}}
		>
			<textarea
				className={inputClasses}
				cols={textAreaColumns}
				id={newInputId}
				name={inputName}
				onChange={inputOnChange}
				onClick={inputOnClick}
				placeholder={inputLabel}
				rows={textAreaRows}
				style={{ ...inputStyles, ...inputStyle }}
				type={inputType}
				value={inputValue}
			/>
		</div>
	);
}

export default TextArea;
