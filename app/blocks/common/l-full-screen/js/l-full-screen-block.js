$l_full_screen_logo = jQuery('.l-full-screen__b-small-logo');

jQuery('body').on(
    'w_menu__link__search_click',
    function() {
        $l_full_screen_logo.addClass('l-full-screen__b-small-logo--visible');
    }
);

jQuery('body').on(
    'w_search_block__close',
    function() {
        $l_full_screen_logo.removeClass('l-full-screen__b-small-logo--visible');
    }
);
