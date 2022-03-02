import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Must follow
// PCI DSS Standard
export const useMasterCardGateway = () => {
	// Initialize it
	useEffect(() => {
		let isMounted = true;
		const api = window.SRCSDK_MASTERCARD;

		if (!api) return;
		console.log(`Api:`, typeof api);

		const dpaTransactionOptions = {
			dpaLocale: "en_US",
			// Required for better user experience
		};

		const sampleInitParams = {
			srcInitiatorId: uuidv4(), // required
			// SRCI identifier. This is generated by the Click to Pay System during onboarding.

			srciDpaId: uuidv4(), // required
			// DPA Identifier. This is generated by the SRCI during registration.

			srciTransactionId: uuidv4(), // required
			// A unique id used to track the user journey. This is used for analytics to
			// be able to correlate a single user "session" from button impression to the
			// end of the transaction.
			// This field may be created on the merchant page by the SRC Initiator and
			// need to be passed-through to all the networks (Click to Pay Systems). It is passed
			// all the way to the DCFs as well.
			dpaTransactionOptions, // required
			// dpaTransactionOptions
			// DPA-specific preferences and transaction configuration parameters
			// Optionality note: Must be provided to init or checkout. The checkout DpaTransactionOptions
			// will override the DpaTransactionOptions provided to init
		};

		try {
			new Promise((resolve, reject) => {
				api
					.init(sampleInitParams)
					.then(() => {
						console.log(`Success`);
						resolve();
					})
					.catch((err) => {
						console.error(err);
						reject();
					});
			})
				.then(() => {
					if (isMounted) {
						console.log(`Mastercard initialized`);
					}
				})
				.catch((err) => {
					console.error("Error:", err);
				});
		} catch (err) {
			console.error(err);
		}

		// To prevent state updates when the component is not mounted)?
		return () => {
			isMounted = false;
		};
	}, []);

	return;
};