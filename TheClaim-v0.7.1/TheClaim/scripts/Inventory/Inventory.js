define(["require", "exports", "../Core", "./Items"], function (require, exports, Core_1, Items_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Inventory = void 0;
    /**
     * Encapsulates core implementation an inventory pool.
     */
    class Inventory {
        static init() {
            Inventory.clear();
        }
        static add(itemId) {
            if (!Inventory.has(itemId)) {
                Core_1.CoreUtils.getVariables().inventory.push(itemId);
            }
        }
        static remove(itemId) {
            const index = Core_1.CoreUtils.getVariables().inventory.indexOf(itemId);
            if (index >= 0) {
                Core_1.CoreUtils.getVariables().inventory.splice(index, 1);
            }
        }
        static clear() {
            Core_1.CoreUtils.getVariables().inventory = [];
        }
        static has(item) {
            return Core_1.CoreUtils.getVariables().inventory.indexOf(item) >= 0;
        }
        static getItemIds() {
            return Core_1.CoreUtils.getVariables().inventory;
        }
        static getItems() {
            const items = Core_1.CoreUtils.getVariables().inventory;
            const itemsMap = items.map((itemId) => Items_1.Items.get(itemId));
            return itemsMap;
        }
    }
    exports.Inventory = Inventory;
});
