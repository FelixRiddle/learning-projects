import { useState } from "react";
import axios from "axios";

function App() {
	const [inputId] = useState("fj932ej4fi90j34f09j43jf34ijf943jfi943j");
	const [imageFiles, setImageFiles] = useState({});
	const [images, setImages] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(`Images submitted`);

		const input = document.getElementById(inputId);
		console.log(`Input:`, input);
		const files = await input.files;

		if (!files) return;
		console.log(`Files value:`, files);
		console.log(`Typeof files:`, typeof files);

		const formData = new FormData();
		for (let i in files) {
			i = parseInt(i);

			const file = files[i];
			if (!file || !typeof file === "object" || !file["name"]) continue;


			console.log(`File name:`, file["name"]);
			console.log(`Element:`, file);
			// Field name, File, File name
			formData.append("files", file, file["name"]);
		}

		console.log(`Form Data now:`, formData);

		const response = await fetch("http://localhost:3001/images", {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: formData,
		});

		console.log(response.json());
	};

	const handleChange = async (e) => {
		// Files = all files
		const { files } = await e.target;
		console.log(`Files:`, files);

		setImages(() => {});

		setImageFiles(() => files);
	};

	return (
		<div className="App">
			{/* For uploading files */}
			<form
				action="/images"
				method="post"
				encType="multipart/form-data"
				onSubmit={handleSubmit}
			>
				<input
					id={inputId}
					onChange={handleChange}
					type="file"
					multiple
					name="images"
				/>
				<button type="submit">Submit files</button>
			</form>

			{/* For showing images */}
			<div>Uploaded images</div>
			{images &&
				images.map((e, index) => {
					if (typeof e !== "object") return <div hidden></div>;
					const imageUrl = URL.createObjectURL(e);

					return (
						<img
							alt={e["name"]}
							src={imageUrl}
							style={{ width: "128px", height: "128px" }}
						/>
					);
				})}
		</div>
	);
}

export default App;
