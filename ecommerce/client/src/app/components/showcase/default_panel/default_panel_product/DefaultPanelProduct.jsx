import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./DefaultPanelProduct.css";

function DefaultPanelProduct(props) {
	const {
		clickFn,
		id,
		image,
		marginRight,
		offsetPosition,
		price,
		size,
		title,
	} = props;

	const [imageId] = useState(uuidv4());
	const [titleId] = useState(uuidv4());
	const [titleOffsetSize, setTitleOffsetSize] = useState({});
	const [priceId] = useState(uuidv4());
	const [priceOffsetSize, setPriceOffsetSize] = useState({});

	useEffect(() => {
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
	}, [priceId, titleId]);

	return (
		<article
			id={id}
			className={"DefaultPanelProduct"}
			onClick={clickFn}
			style={{
				position: "relative",
				top: `${(offsetPosition && offsetPosition.top) || 0}px`,
				right: `${(offsetPosition && offsetPosition.right) || 0}px`,
				bottom: `${(offsetPosition && offsetPosition.bottom) || 0}px`,
				left: `${(offsetPosition && offsetPosition.left) || 0}px`,
				width: size.width,
				height: size.height,
				marginRight: marginRight + "px",
			}}
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
		</article>
	);
}

export default DefaultPanelProduct;
