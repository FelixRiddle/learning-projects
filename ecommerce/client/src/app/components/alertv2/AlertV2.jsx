import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./AlertV2.css";
import { useViewportSize } from "../../../lib/viewport/useViewportSize";

const closeAlertIcon = "http://localhost:3001/public/icons/close_1.png";

function AlertV2(props) {
	const {
		center,
		clickFn,
		extraStyle,
		hidden,
		message,
		setStatus,
		state,
		status,
		title,
		// viewportSize,
	} = props;

	const [boxId] = useState(uuidv4());
	const [boxStyle, setBoxStyle] = useState({});
	const [boxOffset, setBoxOffset] = useState({});
	const [messageId] = useState(uuidv4());
	const [iconId] = useState(uuidv4());
	const [iconSize, setIconSize] = useState({});
	const { viewportSize } = useViewportSize();

	const handleClick = (e) => {
		// console.log(`Clicked on the status message.`);

		if (clickFn) clickFn(e);

		if (status && status.messageCopy)
			setStatus((prevInput) => {
				return {
					...prevInput,
					messageCopy: undefined,
				};
			});
	};

	const handleIconLoad = () => {
		const icon = document.getElementById(iconId);

		if (icon)
			setIconSize((prevInput) => {
				return { ...prevInput, width: icon.width, height: icon.height };
			});
	};

	useEffect(() => {
		// console.log(`Center:`, center);
		// console.log(`Viewport size:`, viewportSize);
		if (center && viewportSize) {
			const box = document.getElementById(boxId);
			// console.log(`Box:`, box);

			if (!box) return;
			const boxWidth = box.offsetWidth;
			// console.log(`Box width:`, boxWidth);

			setBoxStyle((prevInput) => {
				return {
					...prevInput,
					left: viewportSize.width * 0.5 - boxWidth * 0.5,
				};
			});
		}
	}, [boxId, center, message, status, viewportSize]);

	useEffect(() => {
		// if (boxOffset.width) return;
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
	}, [boxId, hidden, message, status, title]);

	return (
		<div>
			{((status && status.messageCopy) || message) && (
				<div
					className={"alertV2 "}
					hidden={hidden}
					id={boxId}
					onClick={(e) => handleClick(e)}
					style={{ ...boxStyle, ...extraStyle }}
				>
					<div
						className={
							"text " + ((status && status.state) || "") + ((state || "") + " ")
						}
					>
						<img
							alt="Close alert."
							className={"closeIcon"}
							id={iconId}
							onLoad={handleIconLoad}
							src={closeAlertIcon}
							style={{
								left: boxOffset.width - iconSize.width - 5 || 0,
								marginTop: 5,
							}}
							width="15px"
						/>
						<h4 className="headerText">{title}</h4>
						<p id={messageId}>{(status && status.messageCopy) || message}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default AlertV2;
