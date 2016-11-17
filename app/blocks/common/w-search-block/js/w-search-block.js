var $w_search_block = jQuery('.w-search-block');
var $w_search_block__close = jQuery('.w-search-block__close');

// add overlay
var $overlay = jQuery('<div id="overlay"></div>');
$overlay.css({
    'display': 'none',
    'position': 'fixed',
    'z-index': '9999',
    'width': '100%',
    'height': '100%',
    'background-color': '#000',
    'opacity': '0.5'
});
jQuery('body').prepend($overlay);


jQuery('body').on('w_menu__link__search_click',
    function() {
        $w_search_block.removeClass('w-search-block--hidden');
        $w_search_block.addClass('w-search-block--visible');
        if ($w_search_block.hasClass('w-search-block--header')) {
            $overlay.show();
        }
    }
);

$w_search_block__close.on('click',
    function() {
        $w_search_block.addClass('w-search-block--hidden');
        $w_search_block.removeClass('w-search-block--visible');
        if ($w_search_block.hasClass('w-search-block--header')) {
            $overlay.hide();
        }
        jQuery('body').trigger('w_search_block__close');
    }
);
