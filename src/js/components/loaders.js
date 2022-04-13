// ЛЛЛАКЕТААААА надо переписать/////////////////////////////////////////////////
function init() {
	const $loader = $('.loader');
	const images = document.querySelectorAll('picture');
	const loaderImg = document.querySelector('.loader__img');
	const width = window.innerWidth;
	const height = window.innerHeight;
	let percent = 100 / images.length; // количество % на одну картинку
	let progress = 0; // точка отсчета
	let loadedImg = 0; // счетчик загрузки картинок

	function imgLoad() {
		progress += percent;
		loadedImg++;
		if (progress >= 100 || loadedImg === images.length) {
			$loader.delay(400).fadeOut('slow');
		}
		loaderImg.style.bottom = `${height * progress / 100}px`;
		loaderImg.style.left = `${width * progress / 100}px`;
	}

	if (images.length > 0) {
		for (let i = 0; i < images.length; i++) { // создаем клоны изображений
			let imgCopy = new Image();
			imgCopy.src = images[i].dataset.iesrc;
			imgCopy.onload = imgLoad;
			imgCopy.onerror = imgLoad;
		}
	} else {
		$loader.remove();
	}
}

export default {
	init,
};
