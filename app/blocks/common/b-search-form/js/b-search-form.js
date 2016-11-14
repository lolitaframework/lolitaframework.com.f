$b_search_form__input = $('.b-search-form--header .b-search-form__input, .b-search-form--header .b-search-form__input');
$b_search_form_archive__input = $('.b-search-form--archive .b-search-form__input');
$b_search_form__clear = $('.b-search-form__clear');

$('body').on('w_menu__link__search_click',
    function() {
        $b_search_form__input.focus();
    }
);

$b_search_form_archive__input.focus();
$b_search_form__clear.on('click', function(e) {
    e.preventDefault();
    $b_search_form_archive__input.val("");
});
