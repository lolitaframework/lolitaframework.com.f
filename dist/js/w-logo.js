$w_logo = jQuery('.w-logo');

jQuery('body').on('w_menu__mb_menu_button_click',
    function() {
        $w_logo.toggleClass('w-logo--hidden');
    }
);
