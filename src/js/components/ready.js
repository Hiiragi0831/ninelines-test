import LocomotiveScroll from 'locomotive-scroll';
import header from './header';
import Share from 'ninelines-sharing';
import helps from '../helps';

function init() {
	const $headerLinks = $('.header__link');
	const $headerMobileLinks = $('.header__mobile-link');

	if (document.querySelector('html').classList.contains('is-device-mobile')) {
		document.querySelector('.skills__image').removeAttribute('data-scroll');
		document.querySelector('.skills__image').removeAttribute('data-scroll-sticky');
		document.querySelector('.skills__image').removeAttribute('data-scroll-target');
	}

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
		helps.addActiveClass($headerLinks, value, way);
		helps.addActiveClass($headerMobileLinks, value, way);
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

export default {init};
