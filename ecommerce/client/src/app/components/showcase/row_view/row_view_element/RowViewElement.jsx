import React, { useState } from "react";
import { useSelector } from "react-redux";
import Price from "../../../text/price/Price";

import "./RowViewElement.css";

function RowViewElement(props) {
	const {
		_id,
		description,
		imageHeight,
		imageWidth,
		images,
		name,
		price,
		clickFn,
	} = props;
	const [newProps] = useState({
		_id,
		description,
		imageHeight,
		imageWidth,
		images,
		name,
		price,
		clickFn,
	});
	const [newImageWidth] = useState(imageWidth || 128);
	const [newImageHeight] = useState(imageHeight || 128);

	const { serverUrl } = useSelector((state) => state.constants);

	return (
		<div className="RowViewElement" onClick={() => clickFn(newProps)}>
			<p
				style={{
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
					margin: "0px 0px 5px 0px",
					padding: 0,
				}}
			>
				{name}
			</p>

			<div className="image-and-description">
				<div>
					<img
						alt={name}
						className="image"
						height={newImageWidth}
						src={`${serverUrl}${images[0]}`}
						width={newImageHeight}
					/>
				</div>
				<div className="description-and-price">
					<div>
						<p
							className="truncate-overflow"
							style={{
								margin: 0,
								height: newImageHeight - 32,
								overflow: "hidden",
								// textOverflow: "ellipsis",
							}}
						>
							{description}
						</p>
					</div>
					<div>
						<Price
							bold={true}
							price={price}
							paragraphStyle={{ margin: "6px 0px 0px 0px", padding: 0 }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RowViewElement;
