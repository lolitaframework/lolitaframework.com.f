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

    $menu_container.children('li').hover(function() {
    	$bottom_line.css('width', $items_width + 'px');
    }, function() {
    	$bottom_line.css('width', '0');
    });

    //Search button
    $search_panel = $('.search_panel');
    $main_menu = $('.main_menu');
    $('.lf_interface_menu.__hover_container li.search > a').click(function() {
        $search_panel.toggleClass('opened');
        $main_menu.toggleClass('closed');
    });
    $('.search_panel__close').click(function(e) {
        e.preventDefault();
        $search_panel.toggleClass('opened');
        $main_menu.toggleClass('closed');        
    });


});

jQuery(window).load(function() {
    // And here.... ;)
});
