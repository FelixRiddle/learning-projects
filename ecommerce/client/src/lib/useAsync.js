import { useEffect } from "react";

export const useAsync = (asyncFn, onSuccess) => {
	useEffect(() => {
		if (!asyncFn) console.log(`No asyncFn provided on useAsync.js`);
		let isActive = true;
		asyncFn().then((data) => {
			if (isActive) onSuccess(data);
		});
		return () => {
			isActive = false;
		};
	}, [asyncFn, onSuccess]);
};
