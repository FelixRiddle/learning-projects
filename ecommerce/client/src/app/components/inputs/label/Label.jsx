import React from "react";

function Label(props) {
	const { content, htmlFor, labelClasses } = props;

	return (
		<div>
			<label className={labelClasses} htmlFor={htmlFor}>
				{content}
			</label>
		</div>
	);
}

export default Label;
