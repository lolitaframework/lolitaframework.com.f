/// <reference path="jquery.d.ts" />

namespace LolitaFramework {
    class MultilevelMenu {
        /**
         * Menu Object
         * @type {object}
         */
         private $menu_selector: any = null;

        /**
         * Menu Object
         * @type {object}
         */
         private $menu: any = null;

        /**
         * Menu Object
         * @type {object}
         */
         private $menu_width: any = null;

        /**
         * Menu Item Selector
         * @type {string}
         */
         private $menu_item_selector: string = 'li';

        /**
         * Sub Menu Selector
         * @type {string}
         */         
         private $sub_menu_selector: string;

        /**
         * Back object
         * @type {object}
         */
         private $current_menu: any = null;

        /**
         * Constructor
         */
        constructor(menu_selector: string = null, sub_menu_selector: string = null) {
        	if (menu_selector == null) {
        		console.log('%c You should provide the menu selector', 'color: red');
        		return;
        	}
        	if (sub_menu_selector == null) {
        		console.log('%c You should provide the sub-menu selector', 'color: red');
        		return;
        	}

            this.$menu_selector = menu_selector;
        	this.$menu = jQuery(menu_selector);
            this.$menu_width = this.$menu.outerWidth();
        	this.$sub_menu_selector = sub_menu_selector;
        	this.$current_menu = this.$menu;

            // set main menu container parameters
        	this.$menu.css({'position': 'relative', 'overflow': 'hidden', 'background-color': '#fff'});
        	if (this.$menu.length != 1) {
        		this.$menu = null;
        		console.log('%c There should me at least one menu', 'color: red');
        		return;
        	}

            // select and hide all sub-menus
            var $sub_menu_items = jQuery(this.$sub_menu_selector).hide();    

            // select all menu items
        	var $menu_items = jQuery(this.$menu).find(this.$menu_item_selector);
        	if ($menu_items.length < 1) {
        		console.log('%c There should be at least one menu item', 'color: red');
        		return;        		
        	}

            var _this = this;
        	$menu_items.on('click', function(e: any) {
                _this.click(e);
            });
        }

        /**
         * Get parent menu
         */
        private get_parent_menu($menu:any) {
            if ($menu.is(this.$menu_selector)) {
                return false;
            }

            var $parent1 = $menu.parent();
            var $parent0 = $menu.parent().parent();

            if ($parent1.is('li') && $parent0.is('ul')) {
                if ($parent0.is(this.$menu_selector)) {
                    return this.$menu;
                } else {
                    return $parent0;
                }
            } else {
                return false;
            }
        }

        /**
         * On Link Click
         */
        private click(event: any) {
            event.preventDefault();
            event.stopPropagation();

        	var $link = jQuery(event.currentTarget).children('a');
        	var $sub_menu = jQuery(event.currentTarget).children(this.$sub_menu_selector);

        	if ($sub_menu.length == 0 && $link.length == 0) {
        		console.log('%c There is no links or sub menus', 'color: red');
        		return;        		        		
        	} else if ($sub_menu.length == 1) {
        		this.render_submenu($sub_menu);
        	} else {
        		window.location.href = $link.attr('href');
        	}
        }

        /**
         * Render sub-menu
         */
        private render_submenu($sub_menu: any) {
        	var $back_button: any;

        	// add back button if required
        	if (!$sub_menu.find('li').first().hasClass('back_button')) {
        		$back_button = jQuery('<li class="back_button">Back</li>');
        		$sub_menu.prepend($back_button);
                var _this = this;
        		$back_button.on('click', function(e:any) {
                    _this.render_back(e);
                });
        	}

        	// set container size
        	this.$menu.height($sub_menu.outerHeight());
            $sub_menu.width(this.$menu.outerWidth());

        	// set z-index
            var new_z_index:string = <string>$sub_menu.css('z-index');

            if (new_z_index == 'auto') {
                new_z_index = '1';
            } else {
                new_z_index = <string>(new_z_index + 1);
            }

            // animate
			$sub_menu.css(
                {
                    'display':           'block',
                    'position':          'absolute', 
                    'z-index':            new_z_index, 
                    'background-color':  '#fff',
                    'top':               '0px',
                    'left':              this.$menu_width+'px'
                }
            );

        	$sub_menu.animate({'left': '0px'}, 200);

        	// set current menu
        	this.$current_menu = $sub_menu;
        }

        /**
         * Render back
         */
        private render_back(event:any) {
            var $parent_menu = this.get_parent_menu(this.$current_menu);
            event.stopPropagation();

            if ($parent_menu == false) {
                return;
            }

            // set container size
            this.$menu.height($parent_menu.outerHeight());
            $parent_menu.width(this.$menu.outerWidth());

            // animate
            this.$current_menu.animate({'left': this.$menu_width+'px'}, 200);

            // set current menu
            this.$current_menu = $parent_menu;
        }

    }

    (<any>window).LolitaFramework.multilevel_menu = new MultilevelMenu('.w-menu__container', '.w-menu__sub-menu');
}