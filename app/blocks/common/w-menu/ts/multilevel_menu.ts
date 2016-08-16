/// <reference path="jquery.d.ts" />

namespace LolitaFramework {
    class MultilevelMenu {
        /**
         * Menu Object
         * @type {object}
         */
         $menu_container: any = null;

        /**
         * Menu Item Selector
         * @type {string}
         */
         $menu_item_selector: string = 'li';

        /**
         * Menu Items
         * @type {string}
         */
         $menu_items: any = [];

        /**
         * Sub Menu Selector
         * @type {string}
         */         
         $sub_menu_selector: string;

        /**
         * Back object
         * @type {object}
         */
         $current_menu: any = null;

        /**
         * Constructor
         */
        constructor(menu_selector: string = null) {
        	if (menu_selector == null) {
        		console.log('%c You should provide the menu selector', 'color: red');
        		return;
        	}
        	this.$menu_container = jQuery(menu_selector);
        	this.$current_menu = this.$menu_container;
        	this.$menu_container.css('position', 'relative');
        	if (this.$menu_container.length != 1) {
        		this.$menu_container = null;
        		console.log('%c There should me at least one menu', 'color: red');
        		return;
        	}
        	this.$menu_items = jQuery(menu_selector + '>' + this.$menu_item_selector);
        	if (this.$menu_items.length < 1) {
        		console.log('%c There should be at least one menu item', 'color: red');
        		return;        		
        	}

        	this.$menu_items.on('click', this.click);
        }

        /**
         * On Link Click
         */
        click(event: any) {
        	var link = jQuery(this).children('a');
        	var sub_menu = jQuery(this).children(this.$sub_menu_selector);

        	event.prevendDefault();

        	if (sub_menu.length == 0 && link.length == 0) {
        		console.log('%c There is no links or sub menus', 'color: red');
        		return;        		        		
        	} else if (sub_menu.length == 1) {
        		this.render_submenu(sub_menu);
        	} else {
        		window.location.href = link.attr('href');
        	}
        }

        /**
         * Render sub-menu
         */
        render_submenu(sub_menu: any, reverse: boolean = false) {
        	var menu_width = this.$menu_container.outerWidth();
        	var $back_button: any;

        	// add back button if required
        	if (!sub_menu.find('li').first().hasClass('back_button')) {
        		$back_button = jQuery('<li class="back_button">Back</li>');
        		sub_menu.prepend($back_button);
        		$back_button.on('click', this.render_back);
        	}

        	// set container size
        	this.$menu_container.width(sub_menu.outerWidth());
        	this.$menu_container.height(sub_menu.outerHeight());

        	// animate
			sub_menu.css('position', 'absolute');
        	if (reverse) {
        		sub_menu.css({'top': '0px', 'left': '-'+menu_width+'px'});
        	} else {
	        	sub_menu.css({'top': '0px', 'left': menu_width+'px'});
        	}
        	sub_menu.animate({'left': '0px'}, 200);

        	// set current menu
        	this.$current_menu = sub_menu;
        }

        /**
         * Render back
         */
        render_back() {
        	var $parent_menu = this.$current_menu.parent();
        	if (!$parent_menu.is('ul')) {
        		console.log('%c There is a problem with markup', 'color: red');
        		return;        		        		
        	}
        	if ($parent_menu.hasClass(this.$sub_menu_selector)) {
        		this.render_submenu($parent_menu, true);
        	}

        }

    }

    (<any>window).LolitaFramework.multilevel_menu = new MultilevelMenu();
}