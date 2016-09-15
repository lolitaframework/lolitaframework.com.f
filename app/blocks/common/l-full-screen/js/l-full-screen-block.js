$l_full_screen_logo = $('.l-full-screen__b-small-logo');

$('body').on(
	'w_menu__link__search_click',
	function() {
		$l_full_screen_logo.addClass('l-full-screen__b-small-logo--visible');
	}
);

$('body').on(
	'w_search_block__close',
	function() {
		$l_full_screen_logo.removeClass('l-full-screen__b-small-logo--visible');	
	}
);	