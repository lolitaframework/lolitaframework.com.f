$w_menu__item = $('.w-menu__item');
$w_menu__item__has_submenu = $('.w-menu__item.__has_submenu');
$w_menu__container = $('.w-menu__container');
$w_menu__undered_line = $('<span class="w-menu__undered-line"></span>');

// get menu items weight
$w_menu_items_width = 0;
$w_menu__item.not(':last-child').each(
	function() {
		$w_menu_items_width = $w_menu_items_width + $(this).outerWidth();
	}
);

// add line into menu container
$w_menu__container.append($w_menu__undered_line);

$w_menu__item__has_submenu.hover( 
	function() {
		$w_menu__undered_line.animate({'width': $w_menu_items_width + 'px'}, 100);
	},
	function() {
		$w_menu__undered_line.animate({'width': '0'}, 100);
	}
);