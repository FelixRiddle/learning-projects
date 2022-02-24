import React, { useContext } from "react";
import { useViewportSize } from "../../../../../lib/viewport/useViewportSize";
import { CreateProductContext } from "../../CreateProduct";
import "./Description.css";

function Description() {
	const { input, handleInputChange } =
		useContext(CreateProductContext);
	const { viewportSize } = useViewportSize();

	return (
		<div className="description">
			<form className="form">
				<div className="label">
					<label htmlFor="description">Description</label>
				</div>
				<div className="input">
					<textarea
						name="description"
						id="description"
						value={input.description}
						cols="30"
						onChange={handleInputChange}
						rows="10"
						style={{ width: viewportSize.width - 30 + "px" }}
					></textarea>
				</div>
			</form>
		</div>
	);
}

export default Description;
