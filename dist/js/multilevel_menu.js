var LolitaFramework;
(function (LolitaFramework) {
    var MultilevelMenu = (function () {
        function MultilevelMenu(menu_selector, sub_menu_selector, max_screen_width) {
            if (menu_selector === void 0) { menu_selector = null; }
            if (sub_menu_selector === void 0) { sub_menu_selector = null; }
            if (max_screen_width === void 0) { max_screen_width = 768; }
            this.menu_selector = null;
            this.$menu = null;
            this.menu_item_selector = 'li';
            this.$current_menu = null;
            if (jQuery(window).width() > max_screen_width) {
                return;
            }
            if (menu_selector == null) {
                console.log('%c You should provide the menu selector', 'color: red');
                return;
            }
            if (sub_menu_selector == null) {
                console.log('%c You should provide the sub-menu selector', 'color: red');
                return;
            }
            this.menu_selector = menu_selector;
            this.$menu = jQuery(menu_selector);
            this.sub_menu_selector = sub_menu_selector;
            this.$current_menu = this.$menu;
            this.$menu.css({ 'position': 'relative', 'overflow': 'hidden', 'background-color': '#fff' });
            if (this.$menu.length != 1) {
                this.$menu = null;
                console.log('%c There should me at least one menu', 'color: red');
                return;
            }
            var $sub_menu_items = jQuery(this.sub_menu_selector).hide();
            var $menu_items = jQuery(this.$menu).find(this.menu_item_selector);
            if ($menu_items.length < 1) {
                console.log('%c There should be at least one menu item', 'color: red');
                return;
            }
            var _this = this;
            $menu_items.on('click', function (e) {
                _this.click(e);
            });
        }
        MultilevelMenu.prototype.get_parent_menu = function ($menu) {
            if ($menu.is(this.menu_selector)) {
                return false;
            }
            var $parent1 = $menu.parent();
            var $parent0 = $menu.parent().parent();
            if ($parent1.is('li') && $parent0.is('ul')) {
                if ($parent0.is(this.menu_selector)) {
                    return this.$menu;
                }
                else {
                    return $parent0;
                }
            }
            else {
                return false;
            }
        };
        MultilevelMenu.prototype.click = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $link = jQuery(event.currentTarget).children('a');
            var $sub_menu = jQuery(event.currentTarget).children(this.sub_menu_selector);
            if ($sub_menu.length == 0 && $link.length == 0) {
                console.log('%c There is no links or sub menus', 'color: red');
                return;
            }
            else if ($sub_menu.length == 1) {
                this.render_submenu($sub_menu);
            }
            else {
                window.location.href = $link.attr('href');
            }
        };
        MultilevelMenu.prototype.render_submenu = function ($sub_menu) {
            var $back_button;
            if (!$sub_menu.find('li').first().hasClass('back_button')) {
                $back_button = jQuery('<li class="back_button">Back</li>');
                $sub_menu.prepend($back_button);
                var _this = this;
                $back_button.on('click', function (e) {
                    _this.render_back(e);
                });
            }
            this.$menu.height($sub_menu.outerHeight());
            $sub_menu.width(this.$menu.outerWidth());
            var new_z_index = $sub_menu.css('z-index');
            if (new_z_index == 'auto') {
                new_z_index = '1';
            }
            else {
                new_z_index = (new_z_index + 1);
            }
            $sub_menu.css({
                'display': 'block',
                'position': 'absolute',
                'z-index': new_z_index,
                'background-color': '#fff',
                'top': '0px',
                'left': this.$menu.outerWidth() + 'px'
            });
            $sub_menu.animate({ 'left': '0px' }, 200);
            this.$current_menu = $sub_menu;
        };
        MultilevelMenu.prototype.render_back = function (event) {
            event.stopPropagation();
            var $parent_menu = this.get_parent_menu(this.$current_menu);
            if ($parent_menu == false) {
                return;
            }
            this.$menu.height($parent_menu.outerHeight());
            $parent_menu.width(this.$menu.outerWidth());
            this.$current_menu.animate({ 'left': this.$menu.outerWidth() + 'px' }, 200);
            this.$current_menu = $parent_menu;
        };
        return MultilevelMenu;
    }());
    window.LolitaFramework.multilevel_menu = new MultilevelMenu('.w-menu__container', '.w-menu__sub-menu');
})(LolitaFramework || (LolitaFramework = {}));
//# sourceMappingURL=multilevel_menu.js.map