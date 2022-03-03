import React from "react";

function Label(props) {
	const { content, htmlFor, labelClasses } = props;

	return (
		<label className={labelClasses} htmlFor={htmlFor}>
			{content}
		</label>
	);
}

export default Label;
