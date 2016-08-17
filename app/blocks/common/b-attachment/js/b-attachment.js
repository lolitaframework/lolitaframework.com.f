$b_attachment__link = $('.b-attachment__link');

$b_attachment__link.hover(
	function() {
		$('body').trigger('b-attachment__link_hovered');
	},
	function() {
		$('body').trigger('b-attachment__link_unhovered');
	}
);
