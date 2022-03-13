// A lil bug I don't know how to fix, funny bug tho
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import RowViewElement from "../row_view_element/RowViewElement";

import { wholeElementOnScreen } from "../../../../../lib/html/elements/elementPosition";
import redirect from "../../../../../lib/misc/redirect/redirect";

function RowView(props) {
	// Props
	const { infiniteScroll, items, maxItems, title } = props;

	// Redux
	const { clientUrl } = useSelector((state) => state.constants);

	// States
	const [compArray, setCompArray] = useState([]);
	const [conf] = useState({
		defaultMaxItems: 5,
	});
	const [updated, setUpdated] = useState(false);

	// Set visible items
	useEffect(() => {
		if (items && !updated) {
			if (infiniteScroll) {
				const newVisibleComponentsArray = [];

				// Get the max items
				const newMaxItems = maxItems || conf.defaultMaxItems;
				const showAmount = compArray.length + newMaxItems;

				// Push items in the visible array
				for (let i = compArray.length; i < showAmount; i++) {
					i = parseInt(i);

					if (i < showAmount && typeof items[i] !== "undefined") {
						newVisibleComponentsArray.push(items[i]);
					} else break;
				}

				// Set the components
				const newCompArray = newVisibleComponentsArray.map((e, index) => {
					const rowElement = (
						<RowViewElement
							key={uuidv4()}
							{...e}
							clickFn={() => redirect(e, clientUrl)}
						/>
					);
					return rowElement;
				});

				// Update the components array
				setCompArray((prev) => {
					return [...prev, ...newCompArray];
				});
			} else if (maxItems || (conf && conf.defaultMaxItems)) {
				const newVisibleComponentsArray = [];

				// Get the max items
				const newMaxItems = maxItems || conf.defaultMaxItems;

				for (let i in items) {
					i = parseInt(i);
					if (i < newMaxItems) {
						newVisibleComponentsArray.push(items[i]);
					} else break;
				}
				
				// Set the components
				const newCompArray = newVisibleComponentsArray.map((e, index) => {
					const rowElement = (
						<RowViewElement
							key={uuidv4()}
							{...e}
							clickFn={() => redirect(e, clientUrl)}
						/>
					);
					return rowElement;
				});
				
				setCompArray(newCompArray);
			}

			// Now it's updated
			setUpdated(true);
		}
	}, [clientUrl, conf, compArray, infiniteScroll, items, maxItems, updated]);

	// Every time items change, set updated to false
	useEffect(() => {
		setUpdated(false);
	}, [items]);

	// Infinite scrolling
	window.onscroll = () => {
		if (
			!compArray ||
			!compArray[compArray.length - 1] ||
			!compArray[compArray.length - 1].props
		)
			return;

		// Get the last element
		const lastElement = document.getElementById(
			compArray[compArray.length - 1].props._id
		);

		if (lastElement) {
			// If the whole element is on screen, this will be set to true
			const elementOnScreen = wholeElementOnScreen(lastElement);

			if (elementOnScreen) setUpdated(false);
		}
	};

	return (
		<div>
			<h1 className="title">
				<b>{title}</b>
			</h1>

			<nav>
				{compArray &&
					compArray.length > 0 &&
					compArray.map((e, index) => {
						return e;
					})}
			</nav>
		</div>
	);
}

export default RowView;
