import React, { useEffect, useContext } from "react";

import { CreateProductContext } from "../../../CreateProduct";

function Arrow(props) {
	const { config } = useContext(CreateProductContext);

	// Get the props
	const {
		arrowIcon,
		arrowFn,
		containerClasses,
		direction,
		iconClasses,
		imageId,
	} = props;

	useEffect(() => {
		if (!imageId) return;
		const img = document.getElementById(imageId);

		if (!direction) return;
		if (!config) return;
		if (img) {
			if (direction === "left") {
				img.style.top =
					(config.bigImageContainerSize.height - img.height) / 2 + "px";
				img.style.transform = "rotate(" + 180 + "deg)";
			} else if (direction === "right") {
				img.style.top =
					(config.bigImageContainerSize.height - img.height) / 2 + "px";
				img.style.left = config.bigImageContainerSize.width - img.width + "px";
			}
		}
	}, [config, direction, imageId]);

	return (
		<span className={containerClasses}>
			<img
				className={iconClasses}
				src={arrowIcon}
				alt=""
				id={imageId}
				onClick={arrowFn}
			/>
		</span>
	);
}

export default Arrow;
