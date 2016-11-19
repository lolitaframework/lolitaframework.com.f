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
        if (jQuery(window).width() > 767) {
            slider_options = {
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                activateOn: 'click',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 1,
                scrollBy: 3,
                speed: 300,
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
                pagesBar: $b_slider.find('.b-stories__pages'),
                activatePageOn: 'click',
            };
        } else {
            slider_options = {
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                speed: 300,
                activatePageOn: 'click',
                scrollBy: 100,
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
                pagesBar: $b_slider.find('.b-stories__pages'),
            };

        }

        var $slider_object = new Sly($wrap, slider_options).init();
    }
);
