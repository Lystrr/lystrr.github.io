define(["require", "exports", "../Core"], function (require, exports, Core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Slots = void 0;
    /**
     * Describes the available inventory slots
     * (Representation only. No UI/Experience Code)
     */
    class Slots {
        static init() {
            Core_1.CoreUtils.getVariables().slotNames = [];
            Core_1.CoreUtils.getVariables().slots = {};
        }
        static add(slot) {
            if (Slots.exists(slot)) {
                throw `slot already exists ${slot}`;
            }
            Core_1.CoreUtils.getVariables().slotNames.push(slot);
        }
        static remove(slot) {
            const index = Core_1.CoreUtils.getVariables().slotNames.indexOf(slot);
            if (index >= 0) {
                Core_1.CoreUtils.getVariables().slotNames.splice(index, 1);
                if (Core_1.CoreUtils.getVariables().slots) {
                    delete Core_1.CoreUtils.getVariables().slots[slot];
                }
            }
            else {
                console.error(`slot doesn't exist ${slot}`);
            }
        }
        static exists(slot) {
            return Core_1.CoreUtils.getVariables().slotNames.indexOf(slot) >= 0;
        }
        static ensureExists(slot) {
            if (!Slots.exists(slot)) {
                console.error(`Slot doesn't exist ${slot}`);
            }
        }
        static getAll() {
            return Core_1.CoreUtils.getVariables().slotNames;
        }
    }
    exports.Slots = Slots;
});
