function addActiveClass(links, value, way) {
	links.each((index, element) => {
		if (value === element.dataset.scrollId) {
			if (way === 'enter') {
				element.classList.add('is-active');
			} else {
				element.classList.remove('is-active');
			}
		}
	});
}

function preloadImages(images) {
	let preloadImg = [];
	images.forEach((item) => {
		preloadImg.push(item.dataset.iesrc);
	});
	preloadImg.push('./images/active.png', './images/activeM.png');

	return preloadImg;
}
export default {
	addActiveClass,
	preloadImages,
};

