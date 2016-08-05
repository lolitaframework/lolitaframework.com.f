jQuery(document).ready(function($) {

    // Hover menu animation
    $menu_container = $('.lf_interface_menu.__hover_container > nav > ul');
    $menu_items = $menu_container.children('li').not(':last-child');
    $items_width = 0;
    $($menu_items).each(function() {
        $items_width = $items_width + $(this).outerWidth();
    });
    $bottom_line = $('<span class="bottom_line"></span>');
    $menu_container.append($bottom_line);

    $menu_container.children('li.has-sub-menu').hover(function() {
    	$bottom_line.css('width', $items_width + 'px');
    }, function() {
    	$bottom_line.css('width', '0');
    });

    //Search button
    $hover_container = $('.hover_container');
    $search_panel = $('.search_panel');
    $front_block = $('.front_block');
    $main_menu = $front_block.find('.lf_interface_menu');
    $('.lf_interface_menu.__hover_container li.search > a').click(function() {
        $main_menu.addClass('menuAnimation').delay(200).queue(function(next) {
            $hover_container.toggleClass('display_logo');
            $search_panel.toggleClass('opened');
            $front_block.toggleClass('closed');
            $(this).removeClass('menuAnimation');
            next();
        })
    });
    $('.search_panel__close').click(function(e) {
        e.preventDefault();
        $hover_container.toggleClass('display_logo');
        $search_panel.toggleClass('opened');
        $front_block.toggleClass('closed');        
    });
});

jQuery(window).load(function() {
    // And here.... ;)
});
