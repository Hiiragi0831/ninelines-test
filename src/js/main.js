import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import Preloader from 'ninelines-preloader';
import helpers from './helpers';
import loaders from './components/loaders';
import helps from './helps';
import ready from './components/ready';

ieFix();
vhFix();
actualYear();
header.init();
lazyLoading.init();
loaders.init();

$('.lozad').each((index, element) => {
	lazyLoading.trigger(element);
});

const $loader = $('.loader');

helpers.lockScroll(true, $loader, 'loader');
Preloader.init(helps.preloadImages(document.querySelectorAll('picture')), 400)
	.then(() => {
		helpers.lockScroll(false, $loader, 'loader');
		ready.init();
	});
