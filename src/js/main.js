import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
// import Preloader from 'ninelines-preloader';
// import LocomotiveScroll from 'locomotive-scroll';

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();

header.init();
lazyLoading.init();

// Preloader.init('', 0)
// 	.then(() => {
// 		document.querySelector('.loader').style.display = 'none';
// 		// showPage();
// 	});
