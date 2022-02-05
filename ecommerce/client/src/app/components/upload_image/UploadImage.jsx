/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function UploadImage(props) {
	const {
		classes,
		linkref,
		title,
		iconClasses,
		textClass,
		classCondition,
		clickFn,
		changeFn,
		name,
	} = props;
	const [image, setImage] = useState("");
	const [file, setFile] = useState("");
	const url = "http://localhost:3001/public/icons/";

	useEffect(() => {
		console.log(`Image`);
		console.log(image);
	}, [image]);

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

	return (
		<span key={uuidv4()} className={classes} onClick={promptInput}>
			<img className={classCondition && "image"} src={linkref} />
			<input
				id="file-input"
				name={name}
				hidden={true}
				multiple={true}
				type="file"
				onChange={changeFn}
			/>
		</span>
	);
}

export default UploadImage;
