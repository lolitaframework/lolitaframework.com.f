var $w_search_block = jQuery('.w-search-block');
var $w_search_block__results = $w_search_block.find('.w-search-block__results');
var $w_search_block__items = $w_search_block.find('.w-search-block__item');
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

// search click
jQuery('body').on('w_menu__link__search_click',
    function() {
        $w_search_block.removeClass('w-search-block--hidden');
        $w_search_block.addClass('w-search-block--visible');
        $w_search_block.addClass('w-search-block--active');
        if ($w_search_block.hasClass('w-search-block--header')) {
            $overlay.show();
        }
    }
);

// w-search-block activation/deactivation
jQuery(document).mouseup(function(e) {
    if (!$w_search_block.is(e.target) // if the target of the click isn't the container...
        && $w_search_block.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $w_search_block.removeClass('w-search-block--active');
    } else {
        $w_search_block.addClass('w-search-block--active');
    }
});

// set next item
function nextItem() {
    $w_search_block__items = $w_search_block.find('.w-search-block__item');
    var $next_element = $w_search_block__items.filter('.w-search-block__item--active').next();
    $w_search_block__items.removeClass('w-search-block__item--active');
    if (!$next_element.length) {
        $next_element = $w_search_block__items.first();
    }
    $next_element.addClass('w-search-block__item--active');
}

// set prev item
function prevItem() {
    $w_search_block__items = $w_search_block.find('.w-search-block__item');
    var $prev_element = $w_search_block__items.filter('.w-search-block__item--active').prev();
    $w_search_block__items.removeClass('w-search-block__item--active');
    if (!$prev_element.length) {
        $prev_element = $w_search_block__items.last();
    }
    $prev_element.addClass('w-search-block__item--active');
}

// bind hover
$w_search_block__results.on('mouseenter', '.w-search-block__item', function() {
    $w_search_block__items = $w_search_block.find('.w-search-block__item');
    $w_search_block__items.removeClass('w-search-block__item--active');
    jQuery(this).addClass('w-search-block__item--active');
});


// arrows binding
jQuery(document).keydown(function(e) {
    if ($w_search_block.hasClass('w-search-block--active')) {
        switch (e.which) {
            case 38: // up
                prevItem();
                break;

            case 40: // down
                nextItem();
                break;

            default:
                return;
        }
        e.preventDefault();
    }
});

// close button
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
