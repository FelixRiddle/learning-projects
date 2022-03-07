import React from "react";

function Price(props) {
	const {
		bold,
		deleted,
		divClasses,
		inserted,
		paragraphClasses,
		paragraphStyle,
		price,
		strong,
	} = props;
	
	const priceText = `$ ${price}`;

	return (
		<div className={divClasses}>
			<p className={paragraphClasses} style={{ ...paragraphStyle }}>
				{(bold && <b>{priceText}</b>) ||
					(deleted && <del>{priceText}</del>) ||
					(strong && <strong>{priceText}</strong>) ||
					(inserted && <ins>{priceText}</ins>) ||
					priceText}
			</p>
		</div>
	);
}

export default Price;
