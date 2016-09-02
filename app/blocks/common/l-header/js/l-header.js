$l_header__top__container__logo = $('.l-header__top__container__logo');
$l_header__top__container__menu = $('.l-header__top__container__menu');

$('body').on(
	'w_menu__link__search_click', 
	function() {
		$l_header__top__container__logo.addClass('__hidden');
		$l_header__top__container__menu.addClass('__hidden');
	}
);

$('body').on(
	'w_search_block__close', 
	function() {
		$l_header__top__container__logo.removeClass('__hidden');
		$l_header__top__container__menu.removeClass('__hidden');
	}
);
