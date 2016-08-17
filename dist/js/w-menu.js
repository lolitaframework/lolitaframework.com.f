$w_menu = $('.w-menu');
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

// add search button trigger
$w_menu__link__search = $('.w-menu__item.__search > .w-menu__link');
$w_menu__link__search.on('click', 
	function() {
		$('body').trigger('w_menu__link__search_click')
	}
);

// add mobile elements
$w_menu__mb_search = $('<button class="w-menu__mb-search">Search</button>');
$w_menu__mb_menu_button = $('<button class="w-menu__mb-menu-button">Menu</button>');
$w_menu.append($w_menu__mb_search);
$w_menu.append($w_menu__mb_menu_button);

$w_menu__mb_search.on('click', 
	function(e) {
		e.preventDefault();
		$('body').trigger('w_menu__link__search_click');
	}
);

$w_menu__mb_menu_button.on('click', 
	function(e) {
		e.preventDefault();
		$('body').trigger('w_menu__mb_menu_button_click');
		$w_menu__container.slideToggle('100');
	}
);