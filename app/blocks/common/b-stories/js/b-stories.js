var $b_sliders = jQuery('.b-stories');

$b_sliders.each(
    function(index, item) {

        var $b_slider = jQuery(item);
        var $b_slider__items = $b_slider.find('.b-stories__items');

        // init slider
        var $frame = $b_slider__items;
        var $wrap = $frame.parent();

        // Call Sly on frame
        var slider_options = {};
        slider_options = {
            horizontal: 1,
            itemNav: 'centered',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            startAt: 0,
            speed: 300,
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            pagesBar: $b_slider.find('.b-stories__pages'),
            activatePageOn: 'click'
        };

        var $slider_object = new Sly($wrap, slider_options).init();

        jQuery(window).resize(function() {
            $slider_object.reload();
        });
    }
);
