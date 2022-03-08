import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ConfirmEmail() {
	const params = useParams();
	const { serverUrl } = useSelector((state) => state.constants);

	const [loading, setLoading] = useState();
	const [status, setStatus] = useState({
		message: "",
	});
	useEffect(() => {
		if (params.id && status && !status.message) {
			console.log(`Param id: ${params.id}`);
			axios
				.post(`${serverUrl}api/users/confirmEmail`, { id: params.id })
				.then((res) => {
					setLoading(false);
					setStatus((prevInput) => {
						return { ...prevInput, message: "Account verified!" };
					});
					setStatus((prevInput) => {
						return {
							...prevInput,
							...res.data,
						};
					});
				})
				.catch((err) => {
					console.warn("Error:", err);
					setLoading(false);
					setStatus((prevInput) => {
						return {
							...prevInput,
							message: `There was an error when trying to verify
							your account.`,
						};
					});
				});
		}
	}, [params, serverUrl, status]);

	return (
		<div>
			{(loading && <p>Loading...</p>) || (!loading && <p>{status.message}</p>)}
			{(!params || !params.id) && (
				<div>
					<h2 className="title">User not found</h2>
				</div>
			)}
		</div>
	);
}

export default ConfirmEmail;
