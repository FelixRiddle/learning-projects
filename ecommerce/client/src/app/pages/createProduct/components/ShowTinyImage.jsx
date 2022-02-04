/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

function ShowTinyImage(props) {
	const { imageSrc, index } = props;
	return (
		<div className="images">
			{(imageSrc && (
				<img src={imageSrc} className="tiny-image" alt={index} />
			)) ||
				(!imageSrc && (
					<img
						src="http://localhost:3001/public/iconsx64/image_1.png"
						alt="Select image"
					/>
				))}
		</div>
	);
}

export default ShowTinyImage;
