$b_404 = $('.b-404');

$b_404.hover(
	function() {
		$('body').trigger('b-404__link_hovered');
	},
	function() {
		$('body').trigger('b-404__link_unhovered');
	}
);
