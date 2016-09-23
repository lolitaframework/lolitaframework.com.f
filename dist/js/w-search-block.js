var $w_search_block = $('.w-search-block');
var $w_search_block__close = $('.w-search-block__close');

$('body').on('w_menu__link__search_click',
    function() {
        $w_search_block.removeClass('w-search-block--hidden');
        $w_search_block.addClass('w-search-block--visible');
    }
);

$w_search_block__close.on('click',
    function() {
        $w_search_block.addClass('w-search-block--hidden');
        $w_search_block.removeClass('w-search-block--visible');
        $('body').trigger('w_search_block__close');
    }
);