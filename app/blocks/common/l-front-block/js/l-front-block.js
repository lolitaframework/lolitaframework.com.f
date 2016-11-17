$l_front_block = jQuery('.l-front-block');

jQuery('body').on('w_menu__link__search_click',
    function() {
        $l_front_block.addClass('l-front-block--hidden');
    }
);

jQuery('body').on('w_search_block__close',
    function() {
        $l_front_block.removeClass('l-front-block--hidden');
        $l_front_block.addClass('l-front-block--visible');
    }
);
