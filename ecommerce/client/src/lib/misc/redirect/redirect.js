export default function redirect(product, clientUrl) {
	const url = `${clientUrl}app/${product.ownerId}/${product._id}/${product.name}`;
	window.open(url, "_blank").focus();
}
