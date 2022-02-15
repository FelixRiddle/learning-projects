import React, { Component } from "react";
import axios from "axios";

export default class UploadComponent extends Component {
	constructor(props) {
		super(props);

		this.onImgChange = this.onImgChange.bind(this);
		this.onUpload = this.onUpload.bind(this);

		this.state = {
			imagesArray: "",
		};
	}

	onImgChange(event) {
		this.setState({
			imagesArray: [...this.state.imagesArray, ...event.target.files],
		});
	}

	onUpload(event) {
		event.preventDefault();
		let formData = new FormData();

		console.log(`The whole array:`, this.state.imagesArray);
		for (const key of Object.keys(this.state.imagesArray)) {
			console.log(`Key: ${key}`);
			console.log(`Data:`, this.state.imagesArray[key]);
			formData.append("imagesArray", this.state.imagesArray[key]);
		}
		
		console.log(`The form data:`, formData);
		axios
			.post("http://localhost:3003/endpoint/multi-images-upload", formData, {})
			.then((res) => {
				console.log(res.data);
			});
	}

	render() {
		return (
			<div>
				<form action="submit" onSubmit={this.onUpload}>
					<div className="form-group">
						<input
							className="form-control form-control-lg mb-3"
							multiple
							name="imagesArray"
							onChange={this.onImgChange}
							type="file"
						/>
					</div>
					<div className="d-grid">
						<button className="btn btn-danger" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}
