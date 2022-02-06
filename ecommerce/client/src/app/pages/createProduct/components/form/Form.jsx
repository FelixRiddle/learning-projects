import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CreateProductContext } from "../../CreateProduct";

function Form() {
	const { input, handleInputChange } = useContext(CreateProductContext);

	// Constants
	const fields = [
		{
			type: "text",
			name: "name",
			placeholder: "Name",
		},
		{
			type: "text",
			name: "stock",
			placeholder: "Stock",
		},
		{
			type: "number",
			name: "price",
			placeholder: "Price",
		},
	];

	return (
		<div>
			<form action="submit" className="form">
				<span className="product-details">
					
					<div className="form-title">
						<h4>Product details</h4>
					</div>
					
					<div className="labels-inputs">
						<span className="labels">
							{fields.map((e) => (
								<label key={uuidv4()} htmlFor={e.name}>
									{e.placeholder}
								</label>
							))}
						</span>
						<span className="inputs">
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={input.name}
								onChange={handleInputChange}
							/>
							<input
								type="text"
								name="stock"
								placeholder="Stock"
								value={input.stock}
								onChange={handleInputChange}
							/>
							<input
								type="number"
								name="price"
								placeholder="Price"
								value={input.price}
								onChange={handleInputChange}
							/>
						</span>
					</div>
					
				</span>
			</form>
		</div>
	);
}

export default Form;
