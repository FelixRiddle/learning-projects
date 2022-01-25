import "./Alert.css";

function Alert(props) {
	return (
		<div
			className={
				props.class + " alert " + (props.forceCenter && "force-center") + " "
			}
		>
			{props.description || props.content}
		</div>
	);
}

export default Alert;
