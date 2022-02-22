// Tiny image for the image selector
function TinyImage(props) {
	const { classes, imageSrc, imageClasses, index, clickFn, isDisabled } = props;
	return (
		<div className={classes} onClick={() => !isDisabled && clickFn(imageSrc)}>
			<img src={imageSrc} className={imageClasses} alt={index} />
		</div>
	);
}

export default TinyImage;
