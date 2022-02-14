import { useState } from "react";

function App() {
	const [inputId] = useState("fj932ej4fi90j34f09j43jf34ijf943jfi943j");

	const handleSubmitClick = async (e) => {
		e.preventDefault();
		console.log(`Images submitted`);

		const input = document.getElementById(inputId);
		console.log(`Input:`, input);
		const files = await input.files;
		console.log(`Files value:`, files);
		if (!files) return;

		const response = await fetch("http://localhost:3001/images", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: files,
		});

		console.log(response.json());
	};

	return (
		<div className="App">
			{/* For uploading files */}
			<form action="/images" method="post" encType="multipart/form-data">
				<input id={inputId} type="file" multiple name="images" />
				<button type="submit" onClick={handleSubmitClick}>
					Submit files
				</button>
			</form>
		</div>
	);
}

export default App;
