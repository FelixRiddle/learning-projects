/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

function UploadImage(props) {
	const {
		classes,
		linkref,
		title,
		iconClasses,
		textClass,
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
		<span className={classes} onClick={promptInput}>
			<img src="http://localhost:3001/public/iconsx64/upload_1.png" />
			<input id="file-input" hidden={true} type="file" onChange={changeFn} />
		</span>
	);
}

export default UploadImage;
