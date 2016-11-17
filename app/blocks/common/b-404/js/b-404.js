$b_404 = jQuery(
'.b-404');

$b_404.hover(
	function() {
		jQuery('body').trigger('b-404__link_hovered');
	},
	function() {
		jQuery('body').trigger('b-404__link_unhovered');
	}
);
