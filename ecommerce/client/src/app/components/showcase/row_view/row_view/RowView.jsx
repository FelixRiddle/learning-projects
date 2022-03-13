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
	const [conf, setConf] = useState({
		defaultMaxItems: 5,
	});
	const [updated, setUpdated] = useState(false);
	const [visibleItems, setVisibleItems] = useState([]);

	// Set visible items
	useEffect(() => {
		if (items && !updated) {
			if (maxItems) {
				const newVisibleItemsArray = [];
				for (let i in items) {
					i = parseInt(i);
					if (i < maxItems) {
						newVisibleItemsArray.push(items[i]);
					} else break;
				}
				setVisibleItems(newVisibleItemsArray);
			} else if (infiniteScroll) {
				const newVisibleItemsArray = [];

				// Get the max items
				const newMaxItems = maxItems || conf.defaultMaxItems;
				const showAmount = visibleItems.length + newMaxItems;

				// Push items in the visible array
				for (let i = visibleItems.length; i < showAmount; i++) {
					i = parseInt(i);
					if (i === visibleItems.length - 1)
						setConf((prev) => {
							return { ...prev, lastElementId: items[i]._id };
						});
					if (i < showAmount && typeof items[i] !== "undefined") {
						newVisibleItemsArray.push(items[i]);
					} else break;
				}

				// Set the components
				const newCompArray = newVisibleItemsArray.map((e, index) => {
					return (
						<RowViewElement
							key={uuidv4()}
							{...e}
							clickFn={() => redirect(e, clientUrl)}
						/>
					);
				});
				setCompArray((prev) => {
					return [...prev, ...newCompArray];
				});

				// Put the new items in the state
				setVisibleItems((prev) => {
					return [...prev, ...newVisibleItemsArray];
				});
			} else if (conf && conf.defaultMaxItems) {
				const newVisibleItemsArray = [];
				for (let i in items) {
					i = parseInt(i);
					if (i < conf.defaultMaxItems) {
						newVisibleItemsArray.push(items[i]);
					} else break;
				}
				setVisibleItems(newVisibleItemsArray);
			}

			setUpdated(true);
		}
	}, [
		clientUrl,
		conf,
		compArray,
		infiniteScroll,
		items,
		maxItems,
		updated,
		visibleItems,
	]);

	// Every time items change, set updated to false
	useEffect(() => {
		setUpdated(false);
	}, [items]);

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
					compArray[0] &&
					Object.entries(compArray).length >= 1 &&
					compArray.map((e, index) => {
						// console.log(`Item:`, e);
						return e;
					})}
			</nav>
		</div>
	);
}

export default RowView;
