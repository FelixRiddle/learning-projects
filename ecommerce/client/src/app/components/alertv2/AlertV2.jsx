import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./AlertV2.css";

const closeAlertIcon = "http://localhost:3001/public/icons/close_1.png";

function AlertV2(props) {
	const {
		center,
		clickFn,
		description,
		hidden,
		state,
		title,
		viewportSize,
		extraStyle,
	} = props;

	const [boxId] = useState(uuidv4());
	const [boxStyle, setBoxStyle] = useState({});
	const [boxOffset, setBoxOffset] = useState({});
	const [iconSize, setIconSize] = useState({});

	useEffect(() => {
		// console.log(`Center`, center, "Viewport Size", viewportSize);
		if (center && viewportSize) {
			const box = document.getElementById(boxId);
			if (!box) return;
			// console.log(`Box element:`, box);
			// console.log(`Offset width:`, box.offsetWidth);
			// Offset width includes element width + padding + border
			const boxWidth = box.offsetWidth;
			// console.log(`Result`, viewportSize.width * 0.5 - boxWidth * 0.5 + "px");
			setBoxStyle((prevInput) => {
				return {
					...prevInput,
					left: viewportSize.width * 0.5 - boxWidth * 0.5,
				};
			});
		}
	}, [boxId, center, viewportSize, hidden]);

	useEffect(() => {
		if (boxOffset.width) return;
		if (hidden) return;
		const box = document.getElementById(boxId);
		if (box) {
			setBoxOffset((prevInput) => {
				return {
					...prevInput,
					width: box.offsetWidth,
					height: box.offsetHeight,
				};
			});
		}
	}, [boxId, boxOffset, hidden]);

	useEffect(() => {
		console.log(`Icon size:`, iconSize);
		if (iconSize.width) return;
		const icon = new Image();
		icon.onload = () => {
			setIconSize((prevInput) => {
				return {
					...prevInput,
					width: icon.width,
					height: icon.height,
				};
			});
		};
		icon.src = closeAlertIcon;
	}, [iconSize]);

	return (
		<div
			className={"alertV2 "}
			hidden={hidden}
			id={boxId}
			onClick={clickFn}
			style={{ ...boxStyle, ...extraStyle }}
		>
			<div className={"text " + (state + " ")}>
				<img
					alt="Close alert."
					className={"closeIcon"}
					src={closeAlertIcon}
					style={{ left: boxOffset.width - iconSize.width || 0, marginTop: 5 }}
					width={"20px"}
				/>
				<h4 className="headerText">{title}</h4>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default AlertV2;
