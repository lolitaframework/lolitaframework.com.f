var $l_front_block = jQuery('.l-front-block');
var $here_arrow = jQuery('.l-front-block__here-arrow');

if (jQuery(window).width() > 767) {
    if (jQuery.cookie !== undefined) {
        if (!jQuery.cookie('lolitatheme__here-arrow')) {
            $here_arrow.addClass('l-front-block__here-arrow--visible');
            $l_front_block.on('mouseenter',
                function() {
                    jQuery.cookie('lolitatheme__here-arrow', 'true');
                    $here_arrow.addClass('l-front-block__here-arrow--hidden');
                }
            );
        }
    }
}


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
