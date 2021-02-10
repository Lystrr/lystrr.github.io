define(["require", "exports", "../Core", "./Items"], function (require, exports, Core_1, Items_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Outfits = void 0;
    /**
     * Manages persistence of outfits
     * (Representation only. No UI/Experience Code)
     */
    class Outfits {
        static init() {
            Outfits.clear();
        }
        static ensure() {
            if (Core_1.CoreUtils.getVariables().outfits == null) {
                Outfits.clear();
            }
        }
        static clear() {
            Core_1.CoreUtils.getVariables().outfits = [];
        }
        static has(outfititem) {
            return Core_1.CoreUtils.getVariables().inventory.indexOf(outfititem) >= 0;
        }
        static getOutfits() {
            Outfits.ensure();
            return Core_1.CoreUtils.getVariables().outfits;
        }
        static saveOutfit(outfit) {
            Outfits.getOutfits().push(outfit);
        }
        static getOutfit(outfitName) {
            const outfits = Outfits.getOutfits();
            const index = outfits.findIndex((item) => item.name === outfitName);
            const outfit = outfits[index];
            return outfit;
        }
        static deleteOutfit(outfitName) {
            const outfits = Outfits.getOutfits();
            const index = outfits.findIndex((item) => item.name === outfitName);
            outfits.splice(index, 1);
        }
        static packOutfit(itemsArray) {
            const items = {};
            for (let i = 0; i < itemsArray.length; i++) {
                const item = Items_1.Items.get(itemsArray[i]);
                if (item) {
                    for (let j = 0; j < item.slots.length; j++) {
                        items[item.slots[j]] = item;
                    }
                }
            }
            return items;
        }
        static restoreLastOutfit() {
            const outfit = Core_1.CoreUtils.getVariables().lastOutfit;
            Core_1.CoreUtils.getVariables().lastOutfit = null;
            return outfit;
        }
        static saveLastOutfit(items) {
            Core_1.CoreUtils.getVariables().lastOutfit = items;
        }
    }
    exports.Outfits = Outfits;
});
