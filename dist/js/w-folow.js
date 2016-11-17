$w_folow = jQuery('.w-folow');
$w_folow_frame = $w_folow.find('.w-folow__frame');


if (jQuery(window).width() > 767) {
    $w_folow_frame.sly({
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        activateMiddle: 1,
        mouseDragging: 1,
        touchDragging: 1,
        startAt: 5,
        scrollBy: 1,
        speed: 100,
        dragHandle: 1,
        dynamicHandle: 1
    });

}
