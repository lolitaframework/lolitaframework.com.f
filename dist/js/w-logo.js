$w_logo = $('.w-logo');

$('body').on('w_menu__mb_menu_button_click',
	function() {
		$w_logo.toggleClass('__hidden');		
	}
);