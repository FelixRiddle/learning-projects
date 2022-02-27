import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { resizeElement } from "../../../../lib/html/css/resizeElement";

function Paragraph(props) {
	const {
		classes,
		content,
		divId,
		getParagraphHeight,
		paragraphClasses,
		paragraphId,
		resize,
		viewportSize,
	} = props;

	const [alternativeDivId] = useState(divId || uuidv4());
	const [alternativeParagraphId] = useState(paragraphId || uuidv4());

	// Resize the element
	useEffect(() => {
		// Error proof
		if (!viewportSize || (!viewportSize.width && !viewportSize.height)) return;
		if (!resize || (!resize.width && !resize.height)) return;

		resizeElement(alternativeDivId, resize, viewportSize);
	}, [alternativeDivId, divId, resize, viewportSize]);

	// Get the paragraph height
	useEffect(() => {
		if (!getParagraphHeight) return;

		const paragraph = document.getElementById(alternativeParagraphId);
		if (!paragraph) return;

		getParagraphHeight(paragraph.clientHeight);
	}, [alternativeParagraphId, getParagraphHeight, viewportSize]);

	return (
		<div
			className={classes}
			id={alternativeDivId}
		>
			<p className={paragraphClasses} id={alternativeParagraphId}>
				{content}
			</p>
		</div>
	);
}

export default Paragraph;
