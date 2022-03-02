import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { get_icon } from "../../../../lib/images/icons/icons";

function PasswordInput(props) {
	const {
		divClasses,
		imageClasses,
		inputClasses,
		inputHeight,
		inputId,
		inputName,
		inputOnChange,
		inputOnClick,
		inputPlaceholder,
		inputValue,
		inputWidth,
	} = props;

	const [altAttribute] = useState({
		hide: "Hide password",
		show: "Show password",
	});
	const [hideIcon] = useState(get_icon("hide"));
	const [hover, setHover] = useState(false);
	const [newInputId] = useState(inputId || uuidv4());
	const [showIcon] = useState(get_icon("show"));
	const [switchIcon, setSwitchIcon] = useState(true);
	const [inputStyles, setInputStyles] = useState({ display: "flex" });

	// When the user clicks the icon show/hide
	const handleIconClick = () => {
		setSwitchIcon(!switchIcon);
	};

	// ON mouse enter and on mouse leave event
	const handleIconMouseEnter = () => {
		setHover(true);
	};

	const handleIconMouseLeave = () => {
		setHover(false);
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

	return (
		<div className={divClasses}>
			<div style={{ display: "flex" }}>
				<img
					alt={(switchIcon && altAttribute.hide) || altAttribute.show || ""}
					className={imageClasses}
					onClick={() => handleIconClick()}
					onMouseEnter={() => handleIconMouseEnter()}
					onMouseLeave={() => handleIconMouseLeave()}
					src={(switchIcon && hideIcon) || showIcon || ""}
					style={{
						...((hover && { cursor: "pointer" }) || { cursor: "default" }),
						display: "inline",
						marginRight: "5px",
					}}
				/>
				<input
					className={inputClasses}
					id={newInputId}
					name={inputName}
					onChange={inputOnChange}
					onClick={inputOnClick}
					placeholder={inputPlaceholder}
					style={inputStyles}
					type={(switchIcon && "password") || "text"}
					value={inputValue}
				/>
			</div>
		</div>
	);
}

export default PasswordInput;
