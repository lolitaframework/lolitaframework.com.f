$l_full_screen_block = $('.l-full-screen-block');

$('body').on(
	'w_menu__link__search_click',
	function() {
		$l_full_screen_block.addClass('__with_logo');
	}
);

$('body').on(
	'w_search_block__close',
	function() {
		$l_full_screen_block.removeClass('__with_logo');	
	}
);	