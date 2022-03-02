const icons = {
	hide: "http://localhost:3001/public/icons/Hide.png",
	show: "http://localhost:3001/public/icons/Show.png",
};

export const get_icon = (iconName) => {
	for (let key of Object.keys(icons)) {
		if (key === iconName) return icons[key];
	}
	return undefined;
};
