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

$('body').on(
	'b-attachment__link_hovered, b-404__link_hovered',
	function() {
		$l_full_screen_block.addClass('__hovered_logo');	
	}
);

$('body').on(
	'b-attachment__link_unhovered, b-404__link_unhovered',
	function() {
		$l_full_screen_block.removeClass('__hovered_logo');	
	}
);