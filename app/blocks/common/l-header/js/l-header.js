$l_header__top__container__logo = $('.l-header__w-logo');
$l_header__top__container__menu = $('.l-header__w-menu');

$('body').on(
	'w_menu__link__search_click', 
	function() {
		$l_header__top__container__logo.addClass('l-header__w-logo--hidden');
		$l_header__top__container__menu.addClass('l-header__w-menu--hidden');
	}
);

$('body').on(
	'w_search_block__close', 
	function() {
		$l_header__top__container__logo.removeClass('l-header__w-logo--hidden');
		$l_header__top__container__menu.removeClass('l-header__w-menu--hidden');
	}
);
