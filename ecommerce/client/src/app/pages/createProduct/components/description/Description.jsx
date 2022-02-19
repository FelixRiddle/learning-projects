import React, { useContext } from "react";
import { CreateProductContext } from "../../CreateProduct";
import "./Description.css";

function Description() {
	const { input, viewportSize, handleInputChange } =
		useContext(CreateProductContext);

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
