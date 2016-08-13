$l_front_block = $('.l-front-block');

$('body').on('w_menu__link__search_click', 
	function() {
		$l_front_block.addClass('__hidden');
	}
);

$('body').on('w_search_block__close', 
	function() {
		$l_front_block.removeClass('__hidden');
		$l_front_block.addClass('__visible');
	}
);