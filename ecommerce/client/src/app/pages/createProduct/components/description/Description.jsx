import React, { useContext } from "react";

import { useViewportSize } from "../../../../../lib/viewport/useViewportSize";
import Field from "../../../../components/inputs/field/Field";
import { CreateProductContext } from "../../CreateProduct";
import "./Description.css";

function Description() {
	const { input, handleInputChange } = useContext(CreateProductContext);
	const { viewportSize } = useViewportSize();

	return (
		<div className="description">
			<form className="form">
				<Field
					inline={false}
					inputLabel="Description"
					inputName="description"
					inputOnChange={handleInputChange}
					inputStyle={{ width: viewportSize.width - 30 + "px" }}
					inputType="textarea"
					inputValue={input && input.description}
					textAreaColumns={30}
					textAreaRows={10}
				/>
			</form>
		</div>
	);
}

export default Description;
