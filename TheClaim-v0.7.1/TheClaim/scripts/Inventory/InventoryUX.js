define(["require", "exports", "./Inventory"], function (require, exports, Inventory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryUX = void 0;
    /** Provides UX Side APIs for Inventory Management */
    class InventoryUX {
        static add(itemName) {
            Inventory_1.Inventory.add(itemName);
        }
        static remove(itemName) {
            Inventory_1.Inventory.remove(itemName);
        }
        static hasItem(itemName) {
            return Inventory_1.Inventory.has(itemName);
        }
        static init() { }
        static renderItem(item) {
            return `<li><div class="item" title="${item.description}">${item.name}</div></li>`;
        }
        static render() {
            const items = Inventory_1.Inventory.getItems();
            let result = "<ul>";
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item == null) {
                    debugger;
                }
                if (item.name != undefined && item.type == "item" && item.description != undefined) {
                    result += InventoryUX.renderItem(item);
                }
            }
            result += "</ul>";
            return result;
        }
    }
    exports.InventoryUX = InventoryUX;
});
