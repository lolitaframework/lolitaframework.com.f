var current_width = jQuery(window).width();
var current_width_type = (current_width >= 768) ? "wide" : "small";

jQuery(window).on('resize',
    function() {
        var new_width = jQuery(window).width();
        var new_width_type = (new_width >= 768) ? "wide" : "small";

        if (current_width_type != new_width_type) {
            location.reload();
        }
    }
);
