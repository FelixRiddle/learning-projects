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
		// const newTitle = document.createElement("div");
		// newTitle.innerHTML = title;
		// console.log(`Paragraph element:`, newTitle);
		// console.log(`Its width: ${newTitle.width}`);
		// console.log(`Its style width: ${newTitle.style.width}`);
		// console.log(`Its offset width: ${newTitle.offsetWidth}`);
		// console.log(`Its client width: ${newTitle.clientWidth}`);
		// console.log(`Its scroll width: ${newTitle.scrollWidth}`);
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
		// console.log(`Image:`, image);
		// console.log(`Box offset size:`, boxOffsetSize);
		// console.log(`Title offset size:`, titleOffsetSize);
		// console.log(`Price offset size:`, priceOffsetSize);
	}, [boxOffsetSize, titleOffsetSize, priceOffsetSize, image]);

	return (
		<div
			id={id}
			className={"DefaultPanelProduct"}
			onClick={clickFn}
			style={{ width: size.width, height: size.height, marginRight: "10px" }}
		>
			<p
				id={titleId}
				style={{
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
				}}
			>
				{title}
			</p>
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
			<p
				id={priceId}
				style={{
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
				}}
			>
				${price}
			</p>
		</div>
	);
}

export default DefaultPanelProduct;
