import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import Preloader from 'ninelines-preloader';
import LocomotiveScroll from 'locomotive-scroll';
import helpers from './helpers';
import Share from 'ninelines-sharing';

ieFix();
vhFix();
actualYear();
header.init();
lazyLoading.init();
const $loader = $('.loader');

const $headerLinks = $('.header__link');
const $headerMobileLinks = $('.header__mobile-link');

helpers.lockScroll(true, $loader, 'loader');

$('.lozad').each((index, element) => {
	lazyLoading.trigger(element);
});

// нужно перенести
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

// делаем после того как загрузятся картинки/////////////////////////////////////////////////
function ready() {
	const locomotive = new LocomotiveScroll({
		el: document.querySelector('.site'),
		smooth: true,
		smartphone: {
			smooth: true,
		},
		tablet: {
			smooth: true,
		},
	});

	// вроде избыточно но надо проверять
	$('a[href^=\\#]:not([href$=\\#])').each((index, link) => {
		const linkHref = $(link).attr('href');
		const target = $(linkHref).get(0);

		$(link).on('click', (event) => {
			event.preventDefault();
			event.stopPropagation();

			if ($(link).hasClass('header__mobile-link')) {
				header.closeMenu().then(() => {
					$('.js-burger').removeClass('is-active');
					locomotive.start();
					locomotive.scrollTo(target);
				});
			} else {
				locomotive.scrollTo(target);
			}
		});
	});

	// Запускаем и останавливаем локомотив при открытии мобильного меню
	const jsBurger = $('.js-burger');
	jsBurger.on('click', () => {
		if (jsBurger.hasClass('is-active')) {
			locomotive.stop();
		} else {
			locomotive.start();
		}
	});

	// добавляем класс при попадании в видимость
	locomotive.on('call', (value, way) => {
		addActiveClass($headerLinks, value, way);
		addActiveClass($headerMobileLinks, value, way);
	});

	// проценты, надо переписать
	locomotive.on('scroll', ({limit, scroll}) => {
		const bar = document.querySelector('.top');
		const progress = Math.ceil(scroll.y / limit.y * 100);
		bar.querySelector('.top__percent').innerHTML = `${progress} %`;
		bar.querySelector('.top__ring-active').style.strokeDashoffset = `${122.46 - 122.46 * progress / 100}px`;
		if (progress >= 100) {
			bar.querySelector('.top__percent').classList.add('is-hidden');
			bar.querySelector('.top__arrow').classList.remove('is-hidden');
		} else {
			bar.querySelector('.top__percent').classList.remove('is-hidden');
			bar.querySelector('.top__arrow').classList.add('is-hidden');
		}
	});

	Array.from(document.querySelectorAll('[data-social]')).forEach((link) => {
		link.addEventListener('click', () => {
			let url = location.origin + location.pathname;

			// eslint-disable-next-line default-case
			switch (event.currentTarget.dataset.social) {
				case 'fb':
					Share.facebook(url);
					break;

				case 'vk':
					Share.vk(url);
					break;

				case 'tg':
					Share.telegram(url);
					break;
			}
		});
	});
}

// ЛЛЛАКЕТААААА надо переписать/////////////////////////////////////////////////
function loaders() {
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
loaders();

// ищем все картинки и пихаем в прелоадер/////////////////////////////////////////////////
const images = document.querySelectorAll('picture');
let preloadImg = [];
images.forEach((item) => {
	preloadImg.push(item.dataset.iesrc);
});
preloadImg.push('./images/active.png', './images/activeM.png');

// /////////////////////////////////////////////////
Preloader.init(preloadImg, 400)
	.then(() => {
		helpers.lockScroll(false, $loader, 'loader');
		ready();
	});
