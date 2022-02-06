import React from "react";

function Form(props) {
	const { handleChange, input } = props;

	return (
		<div>
			<form action="submit" className="form">
				<span className="product-details">
					<div className="form-title">
						<h4>Product details</h4>
					</div>
					<div className="labels-inputs">
						<span className="labels">
							<label htmlFor="name">Name</label>
							<label htmlFor="images">Images</label>
							<label htmlFor="stock">Stock</label>
							<label htmlFor="price">Price</label>
						</span>
						<span className="inputs">
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={input.name}
								onChange={handleChange}
							/>
							<input
								type="file"
								name="images"
								accept="image/*"
								multiple={true}
								onChange={handleChange}
							/>
							<input
								type="text"
								name="stock"
								placeholder="Stock"
								value={input.stock}
								onChange={handleChange}
							/>
							<input
								type="text"
								name="price"
								placeholder="Price"
								value={input.price}
								onChange={handleChange}
							/>
						</span>
					</div>
				</span>
			</form>
		</div>
	);
}

export default Form;
