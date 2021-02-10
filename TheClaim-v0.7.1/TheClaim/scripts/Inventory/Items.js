define(["require", "exports", "../Images"], function (require, exports, Images_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Items = void 0;
    class Items {
        static get(itemIdd) {
            return Items.itemsDefinitions[itemIdd];
        }
        static setItems(items) {
            Items.itemsDefinitions = items;
            for (const index in items) {
                items[index].id = index;
            }
        }
        /* Get all items which match*/
        static selectItems(isMatch) {
            const items = Items.itemsDefinitions;
            const itemsArray = [];
            for (const index in items) {
                itemsArray.push(items[index]);
            }
            return itemsArray.filter(isMatch);
        }
        static renderItem(itemId, className) {
            return Images_1.Images.drawItemById(itemId, className);
        }
    }
    exports.Items = Items;
});
