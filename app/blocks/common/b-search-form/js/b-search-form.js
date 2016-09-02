$b_search_form__input = $('.b-search-form__input:first');

$('body').on('w_menu__link__search_click', 
	function() {
		$b_search_form__input.focus();
	}
);
