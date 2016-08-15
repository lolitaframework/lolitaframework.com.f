var LolitaFramework;
(function (LolitaFramework) {
    var MultilevelMenu = (function () {
        function MultilevelMenu(menu_selector) {
            if (menu_selector === void 0) { menu_selector = null; }
            this.$menu_container = null;
            this.$menu_item_selector = 'li';
            this.$menu_items = [];
            this.$back_object = null;
            if (menu_selector == null) {
                console.log('%c You should provide the menu selector', 'color: red');
                return;
            }
            this.$menu_container = jQuery(menu_selector);
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
        MultilevelMenu.prototype.click = function () {
            var link = jQuery(this).children('a');
            var sub_menu = jQuery(this).children(this.$sub_menu_selector);
            if (sub_menu.length == 0 && link.length == 0) {
                console.log('%c There is no links or sub menus', 'color: red');
                return;
            }
            else if (sub_menu.length == 1) {
                this.render_submenu(sub_menu);
            }
            else {
                window.location.href = link.attr('href');
            }
        };
        MultilevelMenu.prototype.render_submenu = function (sub_menu) {
        };
        MultilevelMenu.prototype.back = function () {
        };
        return MultilevelMenu;
    }());
    window.LolitaFramework.multilevel_menu = new MultilevelMenu();
})(LolitaFramework || (LolitaFramework = {}));
//# sourceMappingURL=multilevel_menu.js.map