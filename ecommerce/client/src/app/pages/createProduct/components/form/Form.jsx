import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Field from "../../../../components/inputs/field/Field";
import { CreateProductContext } from "../../CreateProduct";

function Form() {
	const {
		input,
		handleInputChange,
		cssDetails,
		status,
		setStatus,
		viewportSize,
	} = useContext(CreateProductContext);

	const [formId] = useState(uuidv4());

	useEffect(() => {
		if (!cssDetails) return;
		const resizeForm = cssDetails.productInputSize;
		if (!resizeForm) return;
		if (!viewportSize) return;
		// Resizes the canvas width and height if the user
		// resizes the window
		const parentElement = document.getElementById(formId);
		if (parentElement) {
			const newWidth = (resizeForm.width / 100) * viewportSize.width;
			const newHeight = (resizeForm.height / 100) * viewportSize.height;
			parentElement.style.width = newWidth + "px";
			parentElement.style.height = newHeight + "px";
		}
	}, [cssDetails, formId, viewportSize]);

	return (
		<div>
			<form action="submit" className="form" id={formId}>
				<span className="product-details">
					<div className="form-title">
						<h4>Product details</h4>
					</div>

					<div className="labels-inputs">
						<Field
							fieldParentDivClasses={"input-field"}
							inputLabel="Name"
							inputName="name"
							inputOnChange={handleInputChange}
							inputType="text"
							inputValue={input && input.name}
							setStatus={setStatus}
							status={status}
						/>
						<Field
							fieldParentDivClasses={"input-field"}
							inputLabel="Stock"
							inputName="stock"
							inputOnChange={handleInputChange}
							inputType="number"
							inputValue={input && input.stock}
							setStatus={setStatus}
							status={status}
						/>
						<Field
							fieldParentDivClasses={"input-field"}
							inputLabel="Price"
							inputName="price"
							inputOnChange={handleInputChange}
							inputType="number"
							inputValue={input && input.price}
							setStatus={setStatus}
							status={status}
						/>
					</div>
				</span>
			</form>
		</div>
	);
}

export default Form;
