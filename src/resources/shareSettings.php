<?php

$protocol = $_SERVER['PROTOCOL'] = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https' : 'http';
$host = $protocol . '://' . $_SERVER['HTTP_HOST'];
$title = 'Денис, HTML-верстальщик / Middle Front-end разработчик';
$description = 'Работаю верстальщиком с 2017 года. Натягиваю версту на CMS, в основном на MODX и Wordpress. При верстке использую: бэм, pug, scss, postcss, js, webpack, git. Двигаюсь по направлению vuejs, reactjs. На данный момент времени прохожу обучение vuejs.';
$image = $host . '/images/share.png';

// Uncomment the code below and fill in the pages if necessary
// $pages = [
// 	'/page/1' => [
// 		'title' => '',
// 		'description' => '',
// 		'image' => '/images/',
// 	],
// ];

$page = @$pages[$_SERVER['REQUEST_URI']];

if ($page) {
	$title = !is_null(@$page['title']) ? $page['title'] : $title;
	$description = !is_null(@$page['description']) ? $page['description'] : $description;
	$image = !is_null(@$page['image']) ? $host . $page['image'] : $image;
}

?>
