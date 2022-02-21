import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./DefaultPanelProduct.css";

function DefaultPanelProduct(props) {
	const { clickFn, id, image, price, title, size } = props;

	const [boxOffsetSize, setBoxOffsetSize] = useState({});
	const [imageId] = useState(uuidv4());
	const [titleId] = useState(uuidv4());
	const [titleOffsetSize, setTitleOffsetSize] = useState({});
	const [priceId] = useState(uuidv4());
	const [priceOffsetSize, setPriceOffsetSize] = useState({});

	useEffect(() => {
		const box = document.getElementById(id);
		setBoxOffsetSize((prevInput) => {
			return {
				...prevInput,
				width: box.offsetWidth,
				height: box.offsetHeight,
			};
		});

		const titleElement = document.getElementById(titleId);
		setTitleOffsetSize((prevInput) => {
			return {
				...prevInput,
				width: titleElement.offsetWidth,
				height: titleElement.offsetHeight,
			};
		});

		const priceElement = document.getElementById(priceId);
		setPriceOffsetSize((prevInput) => {
			return {
				...prevInput,
				width: priceElement.offsetWidth,
				height: priceElement.offsetHeight,
			};
		});
	}, [id, priceId, titleId]);

	useEffect(() => {
		console.log(`Image:`, image);
		console.log(`Box offset size:`, boxOffsetSize);
		console.log(`Title offset size:`, titleOffsetSize);
		console.log(`Price offset size:`, priceOffsetSize);
	}, [boxOffsetSize, titleOffsetSize, priceOffsetSize, image]);

	window.onresize = () => {
		const currentImage = document.getElementById(imageId);
		console.log(`Image size:`, {
			width: currentImage.offsetWidth,
			height: currentImage.offsetHeight,
		});
	};

	return (
		<div
			id={id}
			className={"DefaultPanelProduct"}
			onClick={clickFn}
			style={{ width: size.width, height: size.height, marginRight: "10px" }}
		>
			<p id={titleId}>{title}</p>
			<img
				alt={title}
				id={imageId}
				height={
					size.height &&
					titleOffsetSize.height &&
					priceOffsetSize.height &&
					size.height - titleOffsetSize.height - priceOffsetSize.height
				}
				src={image}
				width={size.width}
			/>
			<p id={priceId}>${price}</p>
		</div>
	);
}

export default DefaultPanelProduct;
