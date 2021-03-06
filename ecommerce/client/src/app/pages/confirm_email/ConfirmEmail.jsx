import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getAnyMessage } from "../../../lib/debug/handleMessages";
import AlertV2 from "../../components/alertv2/AlertV2";

function ConfirmEmail() {
	const params = useParams();
	const { serverUrl } = useSelector((state) => state.constants);

	const [status, setStatus] = useState(
		getAnyMessage({ options: { messageType: "loading" } })
	);

	useEffect(() => {
		let isMounted = true;

		new Promise((resolve, reject) => {
			window.addEventListener("load", () => {
				resolve();
			});
			window.addEventListener("abort", () => {
				reject();
			});
		})
			.then(() => {
				if (isMounted) {
					if (params.id && status) {
						console.log(`Param id: ${params.id}`);
						axios
							.post(`${serverUrl}api/users/confirmEmail`, { id: params.id })
							.then((res) => {
								console.log(`Res data:`, res.data);
								getAnyMessage({ debug: res, setCB: setStatus });
							})
							.catch((err) => {
								console.warn("Error:", err);
								getAnyMessage({
									setCB: setStatus,
									options: { messageType: "networkError" },
								});
							});
					}
				}
			})
			.catch((err) => {
				console.error(err);
			});
		
		return () => {
			isMounted = false;
		};
	}, [params, serverUrl, status]);

	return (
		<div>
			<AlertV2 center={true} setStatus={setStatus} status={status} />
			{(!params || !params.id) && (
				<div>
					<h2 className="title">User not found</h2>
				</div>
			)}
		</div>
	);
}

export default ConfirmEmail;
