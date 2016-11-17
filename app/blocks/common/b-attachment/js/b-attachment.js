$b_attachment__link = jQuery('.b-attachment__link');

$b_attachment__link.hover(
    function() {
        jQuery('body').trigger('b-attachment__link_hovered');
    },
    function() {
        jQuery('body').trigger('b-attachment__link_unhovered');
    }
);
