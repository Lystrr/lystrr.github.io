define(["require", "exports", "../Core", "./IItem", "./Items", "../Images", "./Slot", "./Slots", "./Inventory", "./Clothing", "./Outfits", "../Link", "../Player/PlayerModel", "../Tasks/Tasks", "../ItemGenerators/ItemNouns", "../controls/prompt", "../Player/PlayerView", "./OutfitsAnalyser", "./OutfitsExplainer", "../Player/Skills"], function (require, exports, Core_1, IItem_1, Items_1, Images_1, Slot_1, Slots_1, Inventory_1, Clothing_1, Outfits_1, Link_1, PlayerModel_1, Tasks_1, ItemNouns_1, prompt_1, PlayerView_1, OutfitsAnalyser_1, OutfitsExplainer_1, Skills_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MirrorUX = void 0;
    /**
     * MirrorUX is a UX facing layer for interacting with the "Mirror".
     */
    class MirrorUX {
        static getSlot(slotName) {
            const item = Slot_1.Slot.get(slotName);
            return MirrorUX.drawItemWithOverlay(item, "", true);
        }
        static span(content, label) {
            return `<div class="item-emoji" title="${label}">${content}</div>`;
        }
        static getItemOverlay(itemId) {
            const item = Items_1.Items.get(itemId);
            let overlay = "";
            if (item != null && item.contextual) {
                overlay += `<div class="clothing-item overlay">`;
                if (!item.isFeminine) {
                    overlay += MirrorUX.span("🧍‍♂️", "masculine");
                }
                else {
                    overlay += MirrorUX.span("🧍‍♀️", "feminine");
                }
                for (let i = 0; i < item.contextual.length; i++) {
                    const context = item.contextual[i];
                    overlay += MirrorUX.span(IItem_1.emojifyContext(context), context);
                }
                overlay += `</div>`;
            }
            return overlay;
        }
        //Todo factor to Images
        static drawItemWithOverlay(itemId, customClassName = "", zoomOnClick = false) {
            const image = Images_1.Images.drawItemById(itemId, "clothing-item", zoomOnClick);
            const overlay = this.getItemOverlay(itemId);
            if (image != null && image != "") {
                return `<div class="clothing ${customClassName}">${image}${overlay}</div>`;
            }
            return "";
        }
        static getCharacterImage() {
            let facialFem = Math.round(Skills_1.Skills.get(Skills_1.SkillTypes.facialFem));
            if (facialFem <= 0) {
                facialFem = Math.round(Core_1.CoreUtils.getVariables().day / 2);
            }
            if (facialFem == 0) {
                facialFem = 1;
            }
            if (facialFem >= 17) {
                facialFem = 17;
            }
            const filename = `mc-${facialFem}.jpg`;
            return filename;
        }
        static getRow(slot1, slot2) {
            const getSlot = (slotName) => {
                const item = Slot_1.Slot.get(slotName);
                return MirrorUX.drawItemWithOverlay(item, "", true);
            };
            const slot1Content = getSlot(slot1);
            const slot2Content = getSlot(slot2);
            return slot1Content != "" || slot2Content != "" ? `<div>${slot1Content + slot2Content}</div>` : "";
        }
        static render() {
            const personImageName = MirrorUX.getCharacterImage();
            let profile = `<div class="profile-row">`;
            profile += Images_1.Images.drawPerson(personImageName);
            if (PlayerModel_1.PlayerModel.isWearingMakeup()) {
                profile += Images_1.Images.drawItemById("makeup", "clothing-item");
            }
            profile += `</div>`;
            let result = "";
            result += this.getRow(ItemNouns_1.clothingSlots.head, ItemNouns_1.clothingSlots.headaccessory);
            result += profile;
            result += this.getRow(ItemNouns_1.clothingSlots.top, ItemNouns_1.clothingSlots.bra);
            result += this.getRow(ItemNouns_1.clothingSlots.waist, ItemNouns_1.clothingSlots.underwear);
            result += this.getRow(ItemNouns_1.clothingSlots.penis, ItemNouns_1.clothingSlots.ass);
            result += this.getRow(ItemNouns_1.clothingSlots.feet, ItemNouns_1.clothingSlots.hoisery);
            return result;
        }
        static renderOutfits(femOnly = false) {
            const outfits = Outfits_1.Outfits.getOutfits();
            let result = "";
            if (outfits.length > 0) {
                result += "<b>Use a saved outfit</b>";
            }
            for (let i = 0; i < outfits.length; i++) {
                const name = outfits[i].name;
                const items = outfits[i].items;
                result += `<div class='wardrobe-row ${outfits[i].name}'>`;
                const outfitDescription = OutfitsAnalyser_1.OutfitsAnalyser.describeOutfit(outfits[i].items);
                result += "<div class='wardrobe-actions'>";
                result += `<span class='wardrobe-name'>${name}</span>`;
                if (!femOnly || OutfitsAnalyser_1.OutfitsAnalyser.isValid(outfitDescription.assessments["feminineOutfit"])) {
                    result += MirrorLinks.wearOutfitLink(name);
                    result += MirrorLinks.updateOutfitLink(name);
                    result += MirrorLinks.renameOutfitLink(name);
                    result += MirrorLinks.deleteOutfitLink(name);
                }
                else {
                    result += `<span class="awkward-outfit-warning">You can't wear a non-feminine outfit in the inner chamber.</span>`;
                }
                result += `<span>${OutfitsExplainer_1.OutfitsExplainer.labelSavedOutfit(outfitDescription)}</span>`;
                result += "</div>";
                result += "<div class='outfits'>";
                for (let j = 0; j < items.length; j++) {
                    const className = Inventory_1.Inventory.has(items[j]) ? "" : "removed";
                    result += MirrorUX.drawItemWithOverlay(items[j], className, false);
                }
                result += "</div>";
                result += "</div>";
            }
            return result;
        }
        static drawMirrorView() {
            let view = `You can use the mirror to get changed:
        ${MirrorUX.renderOutfits()}
        ${MirrorLinks.saveCurrentOutfitLink()}

        `;
            if (Core_1.CoreUtils.hasPlayed("Inner chamber")) {
                view += `<b>Impressions of Outfit</b>
            ${MirrorUX.outfitNotes()}
            
            `;
            }
            view += `<b>Change individual items</b>

        ${MirrorUX.renderClothesCarousel()}
        
        `;
            return view;
        }
        static drawICMirrorView() {
            let view = `You can use the mirror to get changed, but can only wear feminine clothing in the Inner Chamber.
        ${MirrorUX.renderOutfits(true)}
        ${MirrorLinks.saveCurrentOutfitLink()}

        `;
            view += `<b>Impressions of Outfit</b>
        ${MirrorUX.outfitNotes()}
            
        `;
            view += `<b>Change individual items</b>

        ${MirrorUX.renderClothesCarousel(true)}
        `;
            const outfitDescription = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit();
            if (outfitDescription.isNotNakedOutfit && outfitDescription.isAllWomanOutfit && !PlayerModel_1.PlayerModel.needsShave()) {
                view += "[[Inner chamber]]";
            }
            else {
                view += `You can't be seen in the inner chamber unless in a completely feminine look. Review 'Impressions of Outfit'. `;
            }
            return view;
        }
        static renderClothesCarousel(isRestrictedLocation = false) {
            const slots = Slots_1.Slots.getAll();
            const items = Inventory_1.Inventory.getItems();
            let result = "";
            const grouper = (item) => {
                if (item == null) {
                    debugger;
                }
                return item.pluralNoun;
            };
            for (let i = 0; i < slots.length; i++) {
                const slotName = slots[i];
                const slotItems = items.filter((item) => {
                    const clothingItem = item;
                    const showItem = !isRestrictedLocation || clothingItem.isFeminine;
                    return Clothing_1.Clothing.isClothing(clothingItem.id) && clothingItem.slots != null && clothingItem.slots.indexOf(slotName) >= 0 && showItem;
                });
                if (slotItems.length > 0) {
                    const groupedItems = Core_1.CoreUtils.groupBy(grouper, slotItems);
                    const slotDisplayName = ItemNouns_1.clothingSlotNames[slotName];
                    result += "<div class='clothing-options'>";
                    result += `<div class='clothing-slot-name'>${slotDisplayName}</div>`;
                    result += `<div class='clothing-options-row'>`;
                    for (const key in groupedItems) {
                        result += `<span class="clothing-group ${key}">`;
                        for (let k = 0; k < groupedItems[key].length; k++) {
                            const slotItem = groupedItems[key][k];
                            if (Clothing_1.Clothing.isWearing(slotItem.id)) {
                                result += `<span class="clothing-wear active-clothing">`;
                                result += MirrorUX.drawItemWithOverlay(slotItem.id, "zoom", false);
                                result += "</span>";
                            }
                            else {
                                result += MirrorLinks.wearClothingItemLink(slotItem.id);
                            }
                        }
                        result += "</span>";
                    }
                    const wornItem = Slot_1.Slot.getSlotItem(slotName);
                    if (wornItem != null && !wornItem.canNotRemove) {
                        result += MirrorLinks.removeClothingItemLink(wornItem.id);
                    }
                    result += "</div>";
                    result += "</div>";
                }
            }
            return result;
        }
        static toggleMakeup(useMakeup) {
            PlayerModel_1.PlayerModel.toggleMakeup(useMakeup);
            Core_1.CoreUtils.playPassage();
        }
        static shave() {
            PlayerModel_1.PlayerModel.shave();
            Core_1.CoreUtils.playPassage();
        }
        static shower() {
            PlayerModel_1.PlayerModel.shower();
            Core_1.CoreUtils.playPassage();
        }
        static outfitNotes(useIcFilter = false) {
            let result = "";
            const description = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit();
            if (Tasks_1.Tasks.hasTask("player-needs-shower")) {
                result += `<span class="awkward-outfit-description">You stink. You need a shower. ${Link_1.makeLink("Take a shower", "SugarCube.getLib().MirrorUX.shower();")}</span>`;
            }
            else if (Core_1.CoreUtils.getVariables().clothesAreDirty) {
                result += `<span class="awkward-outfit-description">Your clothes are dirty. ${Link_1.makeLink("Clean clothes", "SugarCube.getLib().MirrorUX.shower();")}</span>`;
            }
            else if (!useIcFilter && !description.isDecentOutfit) {
                result += `<span class="awkward-outfit-description"> ${MirrorUX.explainOutfitIndecency()}</span>`;
            }
            else if (useIcFilter && !description.isNotNakedOutfit) {
                result += `<span class="awkward-outfit-description"> ${MirrorUX.explainOutfitIndecency(useIcFilter)}</span>`;
            }
            else if (description.isAllMaleOutfit) {
                result += `<span class="masculine-outfit-description">The visible aspects of the outfit have a consistently masculine look to it.</span>`;
            }
            else if (description.isAllWomanOutfit && !PlayerModel_1.PlayerModel.needsShave()) {
                result += `<span class="feminine-outfit-description">The visible aspects of the outfit have a consistently feminine look to it.</span>`;
            }
            else {
                result += `<div class="awkward-outfit-description">This look doesn't seem to work as a completely masculine or feminine. You feel awkward about it.`;
                result += "</div>";
                result += "<ul>";
                result += "<li>" + (description.isAllWomenClothing ? "What you are wearing is all feminine" : "What you are wearing is not all feminine") + "</li>";
                result += "<li>" + (Slot_1.Slot.getSlotItem(ItemNouns_1.clothingSlots.head) != null ? "You do have something on your head" : "You don't have a wig on your head") + "</li>";
                result +=
                    "<li>" +
                        (PlayerModel_1.PlayerModel.isWearingMakeup()
                            ? `You have makeup on -  ${Link_1.makeLink("Remove Makeup", "SugarCube.getLib().MirrorUX.toggleMakeup(false);")}`
                            : `You don't have makeup on - ${Link_1.makeLink("Apply Makeup", "SugarCube.getLib().MirrorUX.toggleMakeup(true);")}`) +
                        "</li>";
                result += "<li>" + PlayerView_1.PlayerView.shaveDescription();
                if (PlayerModel_1.PlayerModel.needsShave()) {
                    result += " " + Link_1.makeLink("Shave", "SugarCube.getLib().MirrorUX.shave();");
                }
                result += "</li>";
                result += "</ul>";
            }
            //Once the player has the smart watch, more diagnostics are available.
            if (Inventory_1.Inventory.has("smart-watch")) {
                const outfitDescription = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit();
                result += OutfitsExplainer_1.OutfitsExplainer.describeOutfitViability(outfitDescription);
            }
            return result;
        }
        static async saveCurrentOutfit() {
            const outfit = {
                items: Slot_1.Slot.getAllContents(),
                name: "Outfit " + (Outfits_1.Outfits.getOutfits().length + 1),
            };
            outfit.name = await prompt_1.Prompt.prompt("What do you want to name this outfit? (e.g. casual, work, jogging)", outfit.name);
            if (outfit.name == null) {
                return;
            }
            if (Outfits_1.Outfits.getOutfit(outfit.name) != null) {
                alert("cancelling save, as another outfit already uses this name.");
            }
            else {
                Outfits_1.Outfits.saveOutfit(outfit);
                Core_1.CoreUtils.playPassage();
            }
        }
        static wearOutfit(outfitName, bypassNotifications = false) {
            const outfit = Outfits_1.Outfits.getOutfit(outfitName);
            MirrorUX.removeAll();
            for (let i = 0; i < outfit.items.length; i++) {
                if (Inventory_1.Inventory.has(outfit.items[i])) {
                    MirrorUX.wear(outfit.items[i]);
                }
            }
            if (!bypassNotifications) {
                Core_1.CoreUtils.playPassage();
            }
        }
        static updateOutfit(outfitName) {
            const outfit = Outfits_1.Outfits.getOutfit(outfitName);
            outfit.items = Slot_1.Slot.getAllContents();
            Core_1.CoreUtils.playPassage();
        }
        static async renameOutfit(outfitName) {
            const newName = await prompt_1.Prompt.prompt("What do you want to name this outfit?", outfitName);
            if (newName != outfitName) {
                if (Outfits_1.Outfits.getOutfit(newName) != null) {
                    window.alert("cancelling rename, as another outfit uses this name.");
                }
                else {
                    const outfit = Outfits_1.Outfits.getOutfit(outfitName);
                    outfit.name = newName;
                    Core_1.CoreUtils.playPassage();
                }
            }
        }
        static deleteOutfit(outfitName) {
            Outfits_1.Outfits.deleteOutfit(outfitName);
            Core_1.CoreUtils.playPassage();
        }
        static saveLastOutfit() {
            const outfit = {
                items: Slot_1.Slot.getAllContents(),
                name: "Last Outfit ",
            };
            Outfits_1.Outfits.saveLastOutfit(outfit);
        }
        /**
         * Restore last outfit.
         */
        static restoreLastOutfit() {
            const outfit = Outfits_1.Outfits.restoreLastOutfit();
            MirrorUX.removeAll();
            for (let i = 0; i < outfit.items.length; i++) {
                if (Inventory_1.Inventory.has(outfit.items[i])) {
                    MirrorUX.wear(outfit.items[i]);
                }
            }
        }
        static wear(itemName) {
            const outcome = MirrorUX.onWear(itemName);
            if (outcome == true) {
                Clothing_1.Clothing.wear(itemName);
            }
            return outcome;
        }
        /**
         * Allows for interrupt of normal flow.
         */
        static onWear(itemName) {
            let allowDefaultBehavior = false;
            const item = Items_1.Items.get(itemName);
            const firstTimeWearPassage = item.firstTimeWearPassage;
            const undiesShaved = "Put on Undies After Shave";
            if (firstTimeWearPassage != null && !Core_1.CoreUtils.hasPlayed(firstTimeWearPassage)) {
                Clothing_1.Clothing.wear(itemName);
                SugarCube.Engine.play(firstTimeWearPassage);
            }
            else if (itemName === "briefs" && PlayerModel_1.PlayerModel.hasEverShaved() && !SugarCube.State.hasPlayed(undiesShaved)) {
                Inventory_1.Inventory.remove("briefs");
                Inventory_1.Inventory.add("stacy-panties");
                Clothing_1.Clothing.wear("stacy-panties");
                SugarCube.Engine.play("Put on Undies After Shave");
            }
            else {
                allowDefaultBehavior = true;
            }
            return allowDefaultBehavior;
        }
        static remove(itemName) {
            Clothing_1.Clothing.remove(itemName);
            let hasClothes = false;
            Slots_1.Slots.getAll().map((slot) => {
                if (Slot_1.Slot.get(slot) != null) {
                    hasClothes = true;
                }
            });
            const ftnPassage = "First Time Naked";
            if (!hasClothes && !SugarCube.State.hasPlayed(ftnPassage)) {
                SugarCube.Engine.play(ftnPassage);
                return false;
            }
            return true;
        }
        static isWearing(itemName) {
            const item = Items_1.Items.get(itemName);
            if (item && item.slots) {
                let hasItem = true;
                for (let i = 0; i < item.slots.length; i++) {
                    const slotName = item.slots[i];
                    hasItem = hasItem && Slot_1.Slot.get(slotName) != undefined;
                }
                return hasItem;
            }
            return false;
        }
        static removeAll() {
            Slots_1.Slots.getAll().map((slot) => {
                const item = Slot_1.Slot.getSlotItem(slot);
                if (item != null && !item.canNotRemove) {
                    Slot_1.Slot.clear(slot);
                }
            });
        }
        static removeExplicit(ignoreSlots) {
            Slots_1.Slots.getAll().map((slot) => {
                const item = Slot_1.Slot.getSlotItem(slot);
                if (item != null && !(ignoreSlots.indexOf(slot) >= 0)) {
                    Slot_1.Slot.clear(slot);
                }
            });
        }
        static hasAthleticItem(slot) {
            const check = (itemName) => {
                const item = Items_1.Items.get(itemName);
                return (item != undefined &&
                    item.contextual != null &&
                    item.contextual.indexOf("fitness") >= 0 &&
                    item.isFeminine == true &&
                    item.slots != null &&
                    item.slots.indexOf(slot) >= 0);
            };
            const results = Inventory_1.Inventory.getItemIds().filter(check);
            return results.length > 0;
        }
        static WearAthleticItem(slot) {
            const check = (itemName) => {
                const item = Items_1.Items.get(itemName);
                return (item != undefined &&
                    item.contextual != null &&
                    item.contextual.indexOf("fitness") >= 0 &&
                    item.isFeminine == true &&
                    item.slots != null &&
                    item.slots.indexOf(slot) >= 0);
            };
            const filteredItems = Inventory_1.Inventory.getItemIds().filter(check);
            if (filteredItems.length > 0) {
                Clothing_1.Clothing.wear(filteredItems[0]);
            }
        }
        static explainOutfitIndecency(useIcFilter = false) {
            const check = (slotName) => {
                return Slot_1.Slot.getSlotItem(slotName) != null;
            };
            let result = "";
            if (!check(ItemNouns_1.clothingSlots.underwear)) {
                result += "You don't have any underwear on. Maybe you should put some on if you want to go outside.";
            }
            else if (!check(ItemNouns_1.clothingSlots.bra) && PlayerModel_1.PlayerModel.needsBra()) {
                result += "Your sensitive chest feels naked without a bra on.";
            }
            else if (!check(ItemNouns_1.clothingSlots.top) || !check(ItemNouns_1.clothingSlots.waist)) {
                result += "You wouldn't want to casually go outside your house dressed like this - your body is feeling a little more exposed than you're comfortable with...";
            }
            else if (!check(ItemNouns_1.clothingSlots.feet)) {
                result += "You will need shoes if you want to go walking outside.";
            }
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
    }
    exports.MirrorUX = MirrorUX;
    class MirrorLinks {
        static saveCurrentOutfitLink() {
            const script = "SugarCube.getLib().MirrorUX.saveCurrentOutfit();";
            return Link_1.makeLink("Save New Outfit", script);
        }
        static wearClothingItemLink(itemName) {
            const script = `if(SugarCube.getLib().MirrorUX.wear('${itemName}')){SugarCube.getLib().CoreUtils.playPassage()};`;
            const content = MirrorUX.drawItemWithOverlay(itemName, "zoom", false);
            return Link_1.makeLink(content, script, `clothing-wear ${itemName}`);
        }
        static removeClothingItemLink(itemName) {
            const script = `if(SugarCube.getLib().MirrorUX.remove('${itemName}')){SugarCube.getLib().CoreUtils.playPassage()};`;
            return Link_1.makeLink("remove", script, `clothing-remove ${itemName}`);
        }
        static wearOutfitLink(outfitName) {
            const script = `SugarCube.getLib().MirrorUX.wearOutfit('${outfitName}');`;
            return Link_1.makeLink("Wear", script, "wear");
        }
        static updateOutfitLink(outfitName) {
            const script = `SugarCube.getLib().MirrorUX.updateOutfit('${outfitName}');`;
            return Link_1.makeLink("Update", script, "update");
        }
        static renameOutfitLink(outfitName) {
            const script = `SugarCube.getLib().MirrorUX.renameOutfit('${outfitName}');`;
            return Link_1.makeLink("Rename", script, "rename");
        }
        static deleteOutfitLink(outfitName) {
            const script = `SugarCube.getLib().MirrorUX.deleteOutfit('${outfitName}');`;
            return Link_1.makeLink("Delete", script, "delete");
        }
    }
});
