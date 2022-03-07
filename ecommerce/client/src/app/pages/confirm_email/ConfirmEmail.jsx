import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ConfirmEmail() {
	const params = useParams();
	const { serverUrl } = useSelector((state) => state.constants);

	const [loading, setLoading] = useState();

	console.log(`Result:`, params);

	useEffect(() => {
		if (params.id) {
			axios.get(`${serverUrl}api/users/confirmEmail`);
		}
	}, [params, serverUrl]);

	return (
		<div>
			{(!params || !params.id) && (
				<div>
					<h2 className="title">User not found</h2>
				</div>
			)}
		</div>
	);
}

export default ConfirmEmail;
