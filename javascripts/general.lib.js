var $general_objects = {};

function addObjectToGeneral($element, $object) {
    var $id = $element.id;
    if ($id.length !== 0) {
        $general_objects['#' + $id] = $object;
    }
}

jQuery(document).ready(function($) {

    // Init jQuery SLY triggers
    //============================================================================================//
    $('.sly').each(function() {

        if ($(this).hasClass('horizontal')) {
            var $scroolbar = $('<div class="scrollbar" style="position: absolute; right: 0; left: 0; bottom: 0; height: 1px; background: lightgray"><div class="handle" style="position: absolute; top: -1px; width: 100px; height: 3px; background: #000000; cursor: w-resize;"></div></div>');
        } else {
            var $scroolbar = $('<div class="scrollbar" style="position: absolute; right: 0; top: 0; bottom: 0; width: 1px; background: lightgray"><div class="handle" style="position: absolute; left: -1px; height: 100px; width: 3px; background: #000000; cursor: n-resize;"></div></div>');
        }

        $(this).append($scroolbar);

        var $options = {

            horizontal: false, // Switch to horizontal mode.

            // Item based navigation
            itemNav: null, // Item navigation type. Can be: 'basic', 'centered', 'forceCentered'.
            itemSelector: null, // Select only items that match this selector.
            smart: true, // Repositions the activated item to help with further navigation.
            activateOn: 'click', // Activate an item on this event. Can be: 'click', 'mouseenter', ...
            activateMiddle: false, // Always activate the item in the middle of the FRAME. forceCentered only.

            // Scrolling
            scrollSource: null, // Element for catching the mouse wheel scrolling. Default is FRAME.
            scrollBy: 60, // Pixels or items to move per one mouse scroll. 0 to disable scrolling.
            scrollHijack: 300, // Milliseconds since last wheel event after which it is acceptable to hijack global scroll.
            scrollTrap: true, // Don't bubble scrolling when hitting scrolling limits.

            // Dragging
            dragSource: null, // Selector or DOM element for catching dragging events. Default is FRAME.
            mouseDragging: false, // Enable navigation by dragging the SLIDEE with mouse cursor.
            touchDragging: true, // Enable navigation by dragging the SLIDEE with touch events.
            releaseSwing: true, // Ease out on dragging swing release.
            swingSpeed: 0.2, // Swing synchronization speed, where: 1 = instant, 0 = infinite.
            elasticBounds: true, // Stretch SLIDEE position limits when dragging past FRAME boundaries.
            interactive: null, // Selector for special interactive elements.

            // Scrollbar
            scrollBar: $scroolbar, // Selector or DOM element for scrollbar container.
            dragHandle: true, // Whether the scrollbar handle should be draggable.
            dynamicHandle: true, // Scrollbar handle represents the ratio between hidden and visible content.
            minHandleSize: 50, // Minimal height or width (depends on sly direction) of a handle in pixels.
            clickBar: true, // Enable navigation by clicking on scrollbar.
            syncSpeed: 0.5, // Handle => SLIDEE synchronization speed, where: 1 = instant, 0 = infinite.

            // Pagesbar
            pagesBar: null, // Selector or DOM element for pages bar container.
            activatePageOn: null, // Event used to activate page. Can be: click, mouseenter, ...
            pageBuilder: // Page item generator.
                function(index) {
                return '<li>' + (index + 1) + '</li>';
            },

            // Navigation buttons
            forward: null, // Selector or DOM element for "forward movement" button.
            backward: null, // Selector or DOM element for "backward movement" button.
            prev: null, // Selector or DOM element for "previous item" button.
            next: null, // Selector or DOM element for "next item" button.
            prevPage: null, // Selector or DOM element for "previous page" button.
            nextPage: null, // Selector or DOM element for "next page" button.

            // Automated cycling
            cycleBy: null, // Enable automatic cycling by 'items' or 'pages'.
            cycleInterval: 7000, // Delay between cycles in milliseconds.
            pauseOnHover: true, // Pause cycling when mouse hovers over the FRAME.
            startPaused: false, // Whether to start in paused sate.

            // Mixed options
            moveBy: 300, // Speed in pixels per second used by forward and backward buttons.
            speed: 200, // Animations speed in milliseconds. 0 to disable animations.
            easing: 'swing', // Easing for duration based (tweening) animations.
            startAt: null, // Starting offset in pixels or items.
            keyboardNavBy: null, // Enable keyboard navigation by 'items' or 'pages'.

            // Classes
            draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
            activeClass: 'active', // Class for active items and pages.
            disabledClass: 'disabled' // Class for disabled navigation elements.
        };

        if ($(this).hasClass('horizontal')) {
            $options.horizontal = true;
        }

        if ($(this).hasClass('basic')) {
            $options.itemNav = 'basic';
            $options.scrollBy = 1;
        }

        if ($(this).hasClass('centered')) {
            $options.itemNav = 'centered';
            $options.startAt = 2;
            $options.scrollBy = 1;
        }

        if ($(this).hasClass('forceCentered')) {
            $options.itemNav = 'forceCentered';
            $options.scrollBy = 1;
        }

        if ($(this).hasClass('mouse')) {
            $options.mouseDragging = true;
        }

        if ($(this).hasClass('cycle_by_items')) {
            $options.cycleBy = 'items';
            $options.cycleInterval = 1000;
        }

        if ($(this).hasClass('cycle_by_pages')) {
            $options.cycleBy = 'pages';
            $options.cycleInterval = 7000;
        }

        if ($(this).hasClass('one_per_frame')) {
            $options.itemNav = 'forceCentered';
            $options.activateMiddle = true;
        }

        if ($(this).hasClass('crazy')) {
            $options.itemNav = 'basic';
        }

        var $navigation = null;

        if ($(this).hasClass('prev_next_item')) {
            if ($navigation == null) {
                $navigation = $('<div class="navigation"></div>');
            }

            var $prev_button = $('<span class="prev" style="cursor: pointer">Previous Item</span>');
            var $next_button = $('<span class="next" style="cursor: pointer">Next Item</span>');

            $navigation.append($prev_button);
            $navigation.append($next_button);

            $options.prev = $prev_button;
            $options.next = $next_button;

            $(this).append($navigation);
        }

        if ($(this).hasClass('prev_next_page')) {
            if ($navigation == null) {
                $navigation = $('<div class="navigation"></div>');
            }

            var $prev_button = $('<span class="prevPage" style="cursor: pointer">Previous Page</span>');
            var $next_button = $('<span class="nextPage" style="cursor: pointer">Next Page</span>');

            $navigation.append($prev_button);
            $navigation.append($next_button);

            $options.prevPage = $prev_button;
            $options.nextPage = $next_button;

            $(this).append($navigation);
        }

        //init sly
        var $object = new Sly($(this).find('.frame'), $options);

        //add object to global array
        addObjectToGeneral(this, $object);

        //reload on resize and trigger
        $(window).on('load resize sly_reactivate', function() {
            $object.reload();
        });

        //if crazy type then reload on load
        if ($(this).hasClass('crazy')) {
            $(window).load(function() {
                $object.reload();
            });
        }

        $object.init();
    });


    // Init bxSlider triggers
    //============================================================================================//
    $('.bx_slider').each(function() {

        var $options = {

            // GENERAL
            mode: 'fade',
            slideSelector: '',
            infiniteLoop: true,
            hideControlOnEnd: false,
            speed: 500,
            easing: 'swing',
            slideMargin: 0,
            startSlide: 0,
            randomStart: false,
            captions: false,
            ticker: false,
            tickerHover: false,
            adaptiveHeight: false,
            adaptiveHeightSpeed: 500,
            video: false,
            useCSS: true,
            preloadImages: 'visible',
            responsive: true,
            slideZIndex: 50,
            wrapperClass: 'bx-wrapper',

            // TOUCH
            touchEnabled: false,
            swipeThreshold: 50,
            oneToOneTouch: true,
            preventDefaultSwipeX: true,
            preventDefaultSwipeY: false,

            // KEYBOARD
            keyboardEnabled: false,

            // PAGER
            pager: false,
            pagerType: 'full',
            pagerShortSeparator: ' / ',
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,

            // CONTROLS
            controls: false,
            nextText: 'Next',
            prevText: 'Prev',
            nextSelector: null,
            prevSelector: null,
            autoControls: false,
            startText: 'Start',
            stopText: 'Stop',
            autoControlsCombine: false,
            autoControlsSelector: null,

            // AUTO
            auto: false,
            pause: 7000,
            autoStart: true,
            autoDirection: 'next',
            autoHover: false,
            autoDelay: 0,
            autoSlideForOnePage: false,

            // CAROUSEL
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,

            // CALLBACKS
            onSliderLoad: function() {
                return true
            },
            onSlideBefore: function() {
                return true
            },
            onSlideAfter: function() {
                return true
            },
            onSlideNext: function() {
                return true
            },
            onSlidePrev: function() {
                return true
            },
            onSliderResize: function() {
                return true
            }
        };

        if ($(this).hasClass('pager')) {
            $options.pager = true;
        }

        if ($(this).hasClass('controls')) {
            $options.controls = true;
        }

        if ($(this).hasClass('auto')) {
            $options.auto = true;
        }

        var $object = $(this).bxSlider($options);

        //add object to global array
        addObjectToGeneral(this, $object);
    });

    // Init aSlider triggers
    //============================================================================================//
    $('.rslider').each(function() {

        var $options = {
            "auto": false, // Boolean: Animate automatically, true or false
            "speed": 500, // Integer: Speed of the transition, in milliseconds
            "timeout": 7000, // Integer: Time between slide transitions, in milliseconds
            "pager": false, // Boolean: Show pager, true or false
            "nav": false, // Boolean: Show navigation, true or false
            "random": false, // Boolean: Randomize the order of the slides, true or false
            "pause": false, // Boolean: Pause on hover, true or false
            "pauseControls": true, // Boolean: Pause when hovering controls, true or false
            "prevText": "Prev", // String: Text for the "previous" button
            "nextText": "Next", // String: Text for the "next" button
            "maxwidth": "", // Integer: Max-width of the slideshow, in pixels
            "navContainer": "", // Selector: Where auto generated controls should be appended to, default is after the <ul>
            "manualControls": "", // Selector: Declare custom pager navigation
            "namespace": "rslides", // String: change the default namespace used
            "before": $.noop, // Function: Before callback
            "after": $.noop // Function: After callback
        };

        if ($(this).hasClass('pager')) {
            $options["pager"] = true;
        }

        if ($(this).hasClass('controls')) {
            $options["nav"] = true;
        }

        if ($(this).hasClass('auto')) {
            $options["auto"] = true;
        }

        var $object = $(this).responsiveSlides($options);

        //add object to global array
        addObjectToGeneral(this, $object);

    });

    // Init Magnific Popup triggers
    //============================================================================================//

    //image data-mfp-src="full image address"
    $('.image_link').each(function() {

        var $options = {
            type: 'image'
        };

        var $object = $(this).magnificPopup($options);

        //add object to global array
        addObjectToGeneral(this, $object);

    });

    //gallery_item
    var $gallery_items = $('.gallery_item');

    if ($gallery_items.length > 0) {
        var $objects = $gallery_items.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }


    //iframe - youtube, vimeo, gmaps
    $('.iframe_link').each(function() {

        var $options = {
            type: 'iframe'
        };

        var $object = $(this).magnificPopup($options);

        //add object to global array
        addObjectToGeneral(this, $object);
    });

    //inline
    $('.inline_link').each(function() {

        var $options = {
            type: 'inline'
        };

        var $object = $(this).magnificPopup($options);

        //add object to global array
        addObjectToGeneral(this, $object);
    });


    //ajax
    $('.ajax_link').each(function() {

        var $options = {
            type: 'ajax'
        };

        var $object = $(this).magnificPopup($options);

        //add object to global array
        addObjectToGeneral(this, $object);
    });

    // Init sShare triggers
    //============================================================================================//

    $('.sShares').find('li > button, li > a').each(function() {
        var $container = $(this).parents('.sShares');

        $(this).ShareLink({
            title: $container.data('title'),
            text: $container.data('text'),
            image: $container.data('image'),
            url: $container.data('href'),
            width: 640,
            height: 480
        });
    });

    $('.sCounters').find('li > span').each(function() {
        var $container = $(this).parents('.sCounters');

        $(this).ShareCounter({
            url: $container.data('href')
        });
    });

    // Init Isotope triggers
    //============================================================================================//


    $(window).on('load', function() {

        $('.isotope').each(function() {

            var $isotope_object = null;
            var $items_container = $(this).find('.items_container');
            var $layout = ($(this).data('layout')) ? $(this).data('layout') : 'masonry';


            //init isotope
            $isotope_object = $items_container.isotope({ itemSelector: '.item', stamp: '.stamp', layoutMode: $layout });

            //add object to global array
            addObjectToGeneral(this, $isotope_object);


            //init buttons
            var $nav_buttons = $(this).find('.nav_buttons').find('button');

            $nav_buttons.click(function() {
                var $filter = $(this).data('filter');
                var $sort_by = $(this).data('sort-by');
                var $options = {};

                if ($filter) {
                    $options.filter = $filter;
                }

                if ($sort_by) {
                    $options.sortBy = $sort_by;
                }

                $options.sortAscending = !$(this).hasClass('descending');

                $isotope_object.isotope($options);
            });

            jQuery(document).on('if-ajax-ready', function(evt, myData) {
                $isotope_object.isotope('insert', myData);
            });
        });
    });


    // Tabs
    //============================================================================================//

    $('.tabs').find('ul.nav').find('a').click(function(e) {
        e.preventDefault();

        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');

        var $id = $(this).attr('href');

        var $block = $($id);

        $block.siblings().removeClass('active');
        $block.addClass('active');
    });
});
