define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setPriceOffset = exports.getPrice = exports.seedPrices = exports.generateItems = exports.generateStore = exports.appendItem = void 0;
    function appendItem(dictionary, item) {
        dictionary[item.id] = item;
    }
    exports.appendItem = appendItem;
    function generateStore(storeTemplate) {
        const items = {};
        for (let i = 0; i < storeTemplate.templates.length; i++) {
            generateItems(items, storeTemplate.templates[i]);
        }
        return items;
    }
    exports.generateStore = generateStore;
    function generateItems(dictionary, template) {
        for (let i = 1; i <= template.count; i++) {
            const clone = Object.assign({}, template.item);
            clone.index = i;
            if (clone.targetPrice != null) {
                clone.price = getPrice(clone.targetPrice, i);
            }
            if (clone.id != null) {
                clone.id = clone.id.replace("NNN", i.toString());
            }
            if (clone.id != null) {
                clone.image = clone.image.replace("NNN", i.toString());
            }
            appendItem(dictionary, clone);
        }
    }
    exports.generateItems = generateItems;
    const priceAdjustments = seedPrices();
    function seedPrices() {
        const priceAdjustments = [];
        for (let i = 0; i < 100; i++) {
            priceAdjustments[i] = Math.random() * 0.4 - 0.2;
        }
        return priceAdjustments;
    }
    exports.seedPrices = seedPrices;
    let priceOffset = 0;
    function getPrice(basePrice, id) {
        const result = Math.round(basePrice * (1 + priceAdjustments[(id + priceOffset) % 100]));
        return result;
    }
    exports.getPrice = getPrice;
    function setPriceOffset(idOffset) {
        priceOffset = idOffset;
    }
    exports.setPriceOffset = setPriceOffset;
});
