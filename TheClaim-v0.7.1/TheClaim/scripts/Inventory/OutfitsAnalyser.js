define(["require", "exports", "./MirrorUX", "./Clothing", "./Items", "../ItemGenerators/ItemNouns", "./Outfits", "./Slot", "./Slots", "../Player/PlayerModel"], function (require, exports, MirrorUX_1, Clothing_1, Items_1, ItemNouns_1, Outfits_1, Slot_1, Slots_1, PlayerModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getvisibleOutfitContexts = exports.OutfitsAnalyser = void 0;
    /**
     * Manages persistence of outfits
     * (Representation only. No UI/Experience Code)
     */
    class OutfitsAnalyser {
        static isValid(explanation) {
            let valid = true;
            for (let i = 0; i < explanation.length; i++) {
                valid && (valid = explanation[i].meetsCriteria);
            }
            return valid;
        }
        static describeCurrentOutfit() {
            try {
                const items = Slot_1.Slot.getAllContents();
                const extendedDescription = {
                    ...OutfitsAnalyser.describeOutfit(items),
                    yogaRating: OutfitsAnalyser.getYogaRating(),
                    isDecentOutfit: OutfitsAnalyser.isDecentOutfit(),
                    isNotNakedOutfit: OutfitsAnalyser.isNotNakedOutfit(),
                    isAllWomanOutfit: OutfitsAnalyser.isAllWomanOutfit(),
                    isAllMaleOutfit: OutfitsAnalyser.isAllMaleOutfit(),
                    isAllWomenClothing: OutfitsAnalyser.isAllWomenClothing(),
                };
                return extendedDescription;
            }
            catch (exception) {
                throw exception;
            }
        }
        static describeOutfit(outfitItems) {
            const mappedOutfit = Outfits_1.Outfits.packOutfit(outfitItems);
            const outfitDescription = {
                assessments: {
                    fitness: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("fitness")),
                    casual: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("casual")),
                    sleepwear: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("sleepwear")),
                    swimwear: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("swimwear")),
                    officeWork: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("officeWork")),
                    casualMale: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("casualMale")),
                    feminineOutfit: OutfitsAnalyser.checkOutfit(mappedOutfit, OutfitsAnalyser.makeFilters("feminineOutfit")),
                },
            };
            return outfitDescription;
        }
        static describeOutfitByName(outfitName) {
            const outfit = Outfits_1.Outfits.getOutfit(outfitName);
            return OutfitsAnalyser.describeOutfit(outfit.items);
        }
        static checkContext(item, context) {
            return item != null && item.contextual != null && (item.contextual.indexOf(context) >= 0 || item.contextual.indexOf("anything") >= 0);
        }
        static getYogaRating() {
            let outfitLevel = 0;
            if (!MirrorUX_1.MirrorUX.isWearing("black-thong") || !MirrorUX_1.MirrorUX.isWearing("stacy-bra") || !MirrorUX_1.MirrorUX.isWearing("tank-top") || !MirrorUX_1.MirrorUX.isWearing("yoga-pants")) {
                outfitLevel = 0;
            }
            else if (!MirrorUX_1.MirrorUX.isWearing("blonde-wig") || !MirrorUX_1.MirrorUX.isWearing("first-heels")) {
                outfitLevel = 1;
            }
            else if (!PlayerModel_1.PlayerModel.isWearingMakeup()) {
                outfitLevel = 2;
            }
            else if (!MirrorUX_1.MirrorUX.isWearing("ring-gaff")) {
                outfitLevel = 3;
            }
            else {
                outfitLevel = 10;
            }
            return outfitLevel;
        }
        static isNotNakedOutfit() {
            const check = (slotName) => {
                return Slot_1.Slot.getSlotItem(slotName) != null;
            };
            return check(ItemNouns_1.clothingSlots.underwear) && check(ItemNouns_1.clothingSlots.bra);
        }
        static isDecentOutfit() {
            const check = (slotName) => {
                return Slot_1.Slot.getSlotItem(slotName) != null;
            };
            return (check(ItemNouns_1.clothingSlots.feet) &&
                check(ItemNouns_1.clothingSlots.waist) &&
                check(ItemNouns_1.clothingSlots.underwear) &&
                check(ItemNouns_1.clothingSlots.top) &&
                (check(ItemNouns_1.clothingSlots.bra) || !PlayerModel_1.PlayerModel.needsBra()));
        }
        static isUnderGarment(item) {
            return (item.slots.indexOf(ItemNouns_1.clothingSlots.underwear) >= 0 ||
                item.slots.indexOf(ItemNouns_1.clothingSlots.penis) >= 0 ||
                item.slots.indexOf(ItemNouns_1.clothingSlots.bra) >= 0 ||
                item.slots.indexOf(ItemNouns_1.clothingSlots.ass) >= 0);
        }
        static isAllWomenClothing() {
            return MirrorUX_1.MirrorUX.doesOutfitSatisfyTest((item) => {
                return item.isFeminine || (item.slots != null && Clothing_1.Clothing.isUnderGarment(item));
            });
        }
        static isAllWomanOutfit() {
            let result = OutfitsAnalyser.isAllWomenClothing();
            result && (result = PlayerModel_1.PlayerModel.isWearingMakeup());
            result && (result = Slot_1.Slot.getSlotItem(ItemNouns_1.clothingSlots.head) != null || PlayerModel_1.PlayerModel.hasGirlyHair());
            return result;
        }
        static isAllMaleOutfit() {
            const result = MirrorUX_1.MirrorUX.doesOutfitSatisfyTest((item) => {
                return !item.isFeminine || (item.slots != null && Clothing_1.Clothing.isUnderGarment(item));
            }) && !PlayerModel_1.PlayerModel.isWearingMakeup();
            return result;
        }
        static isFemAthleticOutfit() {
            const check = (slotName) => {
                const itemName = Slot_1.Slot.get(slotName);
                const item = Items_1.Items.get(itemName);
                const isValid = item != null && item.contextual != null && item.contextual.indexOf("fitness") >= 0 && item.isFeminine == true;
                return isValid;
            };
            const result = check(ItemNouns_1.clothingSlots.feet) && check(ItemNouns_1.clothingSlots.hoisery) && check(ItemNouns_1.clothingSlots.waist) && check(ItemNouns_1.clothingSlots.top);
            return result;
        }
        static doesOutfitSatisfyTest(test) {
            return (Slots_1.Slots.getAll()
                .map((slot) => {
                const itemName = Slot_1.Slot.get(slot);
                if (itemName != null) {
                    const item = Items_1.Items.get(itemName);
                    return test(item);
                }
                return true;
            })
                .findIndex((result) => {
                return result == false;
            }) < 0);
        }
        static makeOutfitFilter(slots, activeDescription, defaultDescription = null) {
            const description = {};
            const defaultSlots = Slots_1.Slots.getAll();
            for (let i = 0; i < defaultSlots.length; i++) {
                description[defaultSlots[i]] = defaultDescription;
            }
            for (let i = 0; i < slots.length; i++) {
                description[slots[i]] = activeDescription;
            }
            return description;
        }
        static makeFemaleOutfitFilter(slots, activeDescription, defaultDescription = null) {
            const description = {};
            const defaultSlots = Slots_1.Slots.getAll();
            for (let i = 0; i < defaultSlots.length; i++) {
                description[defaultSlots[i]] = defaultDescription;
            }
            if (!PlayerModel_1.PlayerModel.hasGirlyHair()) {
                description[ItemNouns_1.clothingSlots.head] = { ...description[ItemNouns_1.clothingSlots.head], context: "anything" };
            }
            for (let i = 0; i < slots.length; i++) {
                description[slots[i]] = activeDescription;
            }
            return description;
        }
        static makeFilters(identifier) {
            let slotFilter = {};
            let targetSlots = [];
            if (identifier == "casualMale") {
                slotFilter = { context: "casual", isMale: true };
                targetSlots = [ItemNouns_1.clothingSlots.top, ItemNouns_1.clothingSlots.waist, ItemNouns_1.clothingSlots.underwear, ItemNouns_1.clothingSlots.hoisery, ItemNouns_1.clothingSlots.feet];
                const defaultFilter = { isMale: false };
                const description = OutfitsAnalyser.makeOutfitFilter(targetSlots, slotFilter, defaultFilter);
                description[ItemNouns_1.clothingSlots.head] = { isMale: true };
                description[ItemNouns_1.clothingSlots.bra] = {};
                description[ItemNouns_1.clothingSlots.underwear] = { context: "casual" };
                return description;
            }
            const defaultFilter = { isFemale: true };
            if (identifier == "fitness") {
                slotFilter = { context: identifier, isFemale: true };
                targetSlots = [ItemNouns_1.clothingSlots.top, ItemNouns_1.clothingSlots.bra, ItemNouns_1.clothingSlots.waist, ItemNouns_1.clothingSlots.underwear, ItemNouns_1.clothingSlots.hoisery, ItemNouns_1.clothingSlots.feet];
                //description[clothingSlots.head] = universal;
            }
            else if (identifier == "officeWork") {
                slotFilter = { context: identifier, isFemale: true };
                targetSlots = [ItemNouns_1.clothingSlots.top, ItemNouns_1.clothingSlots.bra, ItemNouns_1.clothingSlots.waist, ItemNouns_1.clothingSlots.underwear, ItemNouns_1.clothingSlots.hoisery, ItemNouns_1.clothingSlots.feet];
            }
            else if (identifier == "casual") {
                slotFilter = { context: identifier, isFemale: true };
                targetSlots = [ItemNouns_1.clothingSlots.top, ItemNouns_1.clothingSlots.bra, ItemNouns_1.clothingSlots.waist, ItemNouns_1.clothingSlots.underwear, ItemNouns_1.clothingSlots.feet];
            }
            else if (identifier == "sleepwear") {
                slotFilter = { context: identifier, isFemale: true };
                targetSlots = [ItemNouns_1.clothingSlots.underwear, ItemNouns_1.clothingSlots.bra];
            }
            else if (identifier == "swimwear") {
                slotFilter = { context: identifier, isFemale: true };
                targetSlots = [ItemNouns_1.clothingSlots.underwear, ItemNouns_1.clothingSlots.bra];
            }
            else if (identifier == "feminineOutfit") {
                slotFilter = {};
                targetSlots = [];
            }
            const description = OutfitsAnalyser.makeFemaleOutfitFilter(targetSlots, slotFilter, defaultFilter);
            return description;
        }
        static labelWarning(message) {
            return `<span class="outfit-error">${message}</span>`;
        }
        static checkItem(slotName, actual, expected) {
            const explanation = {
                explanation: "",
                meetsCriteria: true,
                slot: slotName,
            };
            if (expected == null) {
                explanation.ignore = true;
                explanation.explanation = "Nothing required\n";
                explanation.meetsCriteria = true;
                return explanation;
            }
            let singularNoun = "";
            if (actual != null) {
                singularNoun = ItemNouns_1.getSingularNoun(actual.pluralNoun);
                explanation.itemId = actual.id;
            }
            if (expected.context != null) {
                if (actual == null || actual.contextual == null) {
                    explanation.explanation += OutfitsAnalyser.labelWarning(`Expected ${expected.context} but found nothing.\n`);
                    explanation.meetsCriteria = false;
                }
                else {
                    if (actual.contextual.indexOf(expected.context) >= 0 && expected.context != "anything") {
                        explanation.explanation += `Expected an item for ${expected.context}.\n`;
                    }
                    else if (actual.contextual.indexOf("anything") >= 0) {
                        explanation.explanation += `Any item would be fine for ${slotName}.\n`;
                    }
                    else {
                        explanation.explanation += OutfitsAnalyser.labelWarning(`Expected an item for ${expected.context}.\n `);
                        explanation.meetsCriteria = false;
                    }
                    explanation.explanation += `The ${singularNoun} is suited for ${actual.contextual}.\n`;
                }
            }
            if (expected.isFemale) {
                if (actual == null) {
                    if (expected.context == null) {
                        explanation.explanation += `No item for a ${slotName} is ok for a feminine look.\n`;
                    }
                    else {
                        explanation.explanation += OutfitsAnalyser.labelWarning(`An item for ${slotName} is required for a feminine look.\n`);
                    }
                }
                else if (actual.isFeminine) {
                    explanation.explanation += `The ${singularNoun} is fine for a feminine look.\n`;
                }
                else {
                    explanation.explanation += OutfitsAnalyser.labelWarning(`The ${singularNoun} does not fit a feminine look.\n`);
                    explanation.meetsCriteria = false;
                }
            }
            if (expected.isMale) {
                if (actual == null) {
                    if (expected.context == null) {
                        explanation.explanation += `No item for a ${slotName} is ok for a masculine look.\n`;
                    }
                    else {
                        explanation.explanation += OutfitsAnalyser.labelWarning(`An item for ${slotName} is required for a masculine look.\n`);
                    }
                }
                else if (!actual.isFeminine) {
                    explanation.explanation += `The ${singularNoun} is fine for a masculine look.\n`;
                }
                else {
                    explanation.explanation += OutfitsAnalyser.labelWarning(`The ${singularNoun} does not fit a masculine look.\n`);
                    explanation.meetsCriteria = false;
                }
            }
            return explanation;
        }
        static checkOutfit(mappedOutfit, expectedOutfit) {
            const slots = Slots_1.Slots.getAll().map((slotName) => {
                const actual = mappedOutfit[slotName];
                const expected = expectedOutfit[slotName];
                return this.checkItem(slotName, actual, expected);
            });
            return slots;
        }
    }
    exports.OutfitsAnalyser = OutfitsAnalyser;
    function getvisibleOutfitContexts() {
        return ["casualMale", "casual", "fitness", "sleepwear", "swimwear", "officeWork"];
    }
    exports.getvisibleOutfitContexts = getvisibleOutfitContexts;
});
