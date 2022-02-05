/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { v4 as uuidv4 } from "uuid";

function UploadImage(props) {
	const { classes, linkref, title, classCondition, changeFn, name, onLoadFn } =
		props;

	const promptInput = (e) => {
		document.getElementById("file-input").click();
	};

	return (
		<span key={uuidv4()} className={classes} onClick={promptInput}>
			<img
				className={(classCondition && "image") || ""}
				src={linkref}
				alt={title}
				onLoad={() => onLoadFn()}
			/>
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
