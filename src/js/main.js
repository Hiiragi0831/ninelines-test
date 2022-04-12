import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollSpy from 'simple-scrollspy';
import Preloader from 'ninelines-preloader';
import LocomotiveScroll from 'locomotive-scroll';
import helpers from './helpers';

ieFix();
vhFix();
actualYear();
header.init();
lazyLoading.init();

helpers.lockScroll(true, $('.loader'), 'loader');

function ready() {
	scrollSpy('#mobile-menu', {
		sectionClass: '.js-scrollspy',
		menuActiveTarget: '.header__mobile-link',
		activeClass: 'is-active',
		offset: 300,
	});

	const locomotive = new LocomotiveScroll({
		el: document.querySelector('.site'),
		smooth: true,
	});

	const anchorLinks = document.querySelectorAll('a[href^=\\#]:not([href$=\\#])');

	anchorLinks.forEach((anchorLink) => {
		let hashval = anchorLink.getAttribute('href');
		let target = document.querySelector(hashval);

		anchorLink.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();

			header.closeMenu().then(() => {
				$('.js-burger').removeClass('is-active');
				locomotive.scrollTo(target);
			});
		});
	});
}

Preloader.init([
	'/images/avatar.png',
	'/images/coin.png',
	'/images/line1.png',
	'/images/line2.png',
	'/images/footer.png',
])
	.then(() => {
		const coolImage = document.querySelectorAll('.lozad');
		const loader = $('.loader');

		for (let item of coolImage) {
			lazyLoading.trigger(item);
		}

		loader.css('display', 'none');
		helpers.lockScroll(false, loader, 'loader');
		ready();
	});
