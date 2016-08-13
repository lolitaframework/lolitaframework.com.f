$w_search_block = $('.w-search-block');
$w_search_block__close = $('.w-search-block__close');

$('body').on('w_menu__link__search_click', 
	function() {
		$w_search_block.removeClass('__hidden');
		$w_search_block.addClass('__visible');
	}
);

$w_search_block__close.on('click',
	function() {
		$w_search_block.addClass('__hidden');
		$w_search_block.removeClass('__visible');
		$('body').trigger('w_search_block__close');
	}
);