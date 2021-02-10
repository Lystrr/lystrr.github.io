define(["require", "exports", "./controls/CssLoader", "./controls/ImageOverlay", "./controls/prompt", "./Core", "./Story/Exercises", "./Images", "./Inventory/Clothing", "./Inventory/Inventory", "./Inventory/InventoryUX", "./Inventory/Items", "./Inventory/MirrorUX", "./Inventory/Outfits", "./Inventory/OutfitsAnalyser", "./Inventory/OutfitsExplainer", "./Inventory/Slot", "./Inventory/Slots", "./Inventory/Store", "./ItemGenerators/ItemGenerator", "./ItemGenerators/ItemNouns", "./Navigation/Pathways", "./Player/PlayerModel", "./Player/PlayerView", "./Player/Skills", "./Story/Work", "./Story/Dialogue", "./Story/DoH", "./Story/HousePolicy", "./Story/Sex", "./Tasks/Tasks", "./Tasks/TasksUX", "./Versioning"], function (require, exports, CssLoader_1, ImageOverlay_1, prompt_1, Core_1, Exercises_1, Images_1, Clothing_1, Inventory_1, InventoryUX_1, Items_1, MirrorUX_1, Outfits_1, OutfitsAnalyser_1, OutfitsExplainer_1, Slot_1, Slots_1, Store_1, ItemGenerator_1, ItemNouns_1, Pathways_1, PlayerModel_1, PlayerView_1, Skills_1, Work_1, Dialogue_1, DoH_1, HousePolicy_1, Sex_1, Tasks_1, TasksUX_1, Versioning_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLib = void 0;
    function initOnLoad() {
        if (Core_1.CoreUtils.getVariables().needsInit) {
            Core_1.CoreUtils.setVariables({
                day: 1,
                havePawnTicket: false,
                innerDoorUnlocked: false,
                canGoToPawn: false,
                player: PlayerModel_1.PlayerModel.firstTimeInit(),
                needsInit: true,
                omniPodDoorClosed: false,
                clothesAreDirty: false,
                inventory: [],
                outfits: [],
                lastOutfit: null,
                pageData: undefined,
                slotNames: [],
                slots: {},
            });
            Slots_1.Slots.init();
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.head);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.headaccessory);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.top);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.bra);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.waist);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.underwear);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.penis);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.ass);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.hoisery);
            Slots_1.Slots.add(ItemNouns_1.clothingSlots.feet);
            Inventory_1.Inventory.init();
            Inventory_1.Inventory.add("basic-tshirt");
            Inventory_1.Inventory.add("jeans");
            Inventory_1.Inventory.add("briefs");
            Inventory_1.Inventory.add("mens-white-socks");
            Inventory_1.Inventory.add("tennis-shoes");
            Inventory_1.Inventory.add("luggage");
            MirrorUX_1.MirrorUX.wear("briefs");
            MirrorUX_1.MirrorUX.wear("basic-tshirt");
            MirrorUX_1.MirrorUX.wear("jeans");
            MirrorUX_1.MirrorUX.wear("mens-white-socks");
            MirrorUX_1.MirrorUX.wear("tennis-shoes");
            Outfits_1.Outfits.init();
            const outfit = {
                items: Slot_1.Slot.getAllContents(),
                name: "Casual",
            };
            Outfits_1.Outfits.saveOutfit(outfit);
            Tasks_1.Tasks.init();
            InventoryUX_1.InventoryUX.init();
            Core_1.CoreUtils.getVariables().needsInit = false;
        }
    }
    SugarCube.Config.saves.version = Versioning_1.Versioning.saveVersion;
    SugarCube.Config.saves.onLoad = function (save) {
        if (save.version == null || save.version < Versioning_1.Versioning.lastSupportedVersion) {
            SugarCube.Engine.restart();
        }
    };
    /**
     * Used to regulate interactions with Types, from general page/Sugarcube context.
     * Normal typescript paths should refer directly to static types.
     */
    class Libraries {
        constructor() {
            this.CoreUtils = Core_1.CoreUtils;
            this.ItemDefinitions = {};
            this.Items = Items_1.Items;
            this.Inventory = Inventory_1.Inventory;
            this.OutfitsAnalyser = OutfitsAnalyser_1.OutfitsAnalyser;
            this.OutfitsExplainer = OutfitsExplainer_1.OutfitsExplainer;
            this.Slots = Slots_1.Slots;
            this.Slot = Slot_1.Slot;
            this.Clothing = Clothing_1.Clothing;
            this.StoreUX = Store_1.StoreUX;
            this.Outfits = Outfits_1.Outfits;
            this.Dialogue = Dialogue_1.Dialogue;
            this.Skills = Skills_1.Skills;
            this.HousePolicy = HousePolicy_1.HousePolicy;
            this.InventoryUX = InventoryUX_1.InventoryUX;
            this.MirrorUX = MirrorUX_1.MirrorUX;
            this.Images = Images_1.Images;
            this.Prompt = prompt_1.Prompt;
            this.ImageOverlay = ImageOverlay_1.ImageOverlay;
            this.Tasks = Tasks_1.Tasks;
            this.TasksUX = TasksUX_1.TasksUX;
            this.PlayerModel = PlayerModel_1.PlayerModel;
            this.Work = Work_1.Work;
            this.PlayerView = PlayerView_1.PlayerView;
            this.Exercises = Exercises_1.Exercises;
            this.Pathways = Pathways_1.Pathways;
            this.DoH = DoH_1.DoH;
            this.Sex = Sex_1.Sex;
            this.Versioning = Versioning_1.Versioning;
            this.initOnLoad = initOnLoad;
        }
    }
    const libraries = new Libraries();
    function getLib() {
        return libraries;
    }
    exports.getLib = getLib;
    SugarCube.getLib = getLib;
    //App Startup
    Items_1.Items.setItems(ItemGenerator_1.getItemDefinitions());
    CssLoader_1.CssLoader.EnsureCss("main.css");
});
