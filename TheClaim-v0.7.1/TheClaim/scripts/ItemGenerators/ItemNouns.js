// This file defines all Items in the game, as well as supporting concepts + strings.
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSortRank = exports.stores = exports.Nouns = exports.getSingularNoun = exports.clothingSlotNames = exports.clothingSlots = exports.ItemType = void 0;
    exports.ItemType = {
        clothing: "clothing",
        item: "item",
    };
    // Used for implementation ID on logic pertaining to clothing slots
    exports.clothingSlots = {
        head: "head",
        headaccessory: "headaccessory",
        top: "top",
        bra: "bra",
        waist: "waist",
        underwear: "underwear",
        penis: "penis",
        ass: "ass",
        feet: "feet",
        hoisery: "hoisery",
    };
    // Used for presentation of clothing slots
    exports.clothingSlotNames = {
        head: "Hair",
        headaccessory: "Head accessories",
        top: "Upper Body Clothing",
        bra: "Bras",
        waist: "Waist",
        underwear: "Underwear",
        penis: "Penis",
        ass: "Ass",
        feet: "Shoes",
        hoisery: "Hoisery",
    };
    const Head = {
        wig: "Wig",
    };
    const HeadAccessory = {};
    const Outfits = {
        triathlonWetsuits: "Triathlon Wetsuits",
        sleevelessWetsuits: "Sleeveless Wetsuits",
        shortyWetsuits: "Shorty Wetsuits",
        onePieceSwimsuits: "One Piece Swimsuits",
        competitionSwimsuits: "Competition Swimsuits",
        formalDress: "Dresses",
        formalSuit: "Formal Suits",
        formalPantsuit: "Formal Pantsuits",
        babydoll: "Babydoll Nightwear Outfits",
        latexOutfits: "Latex Outfits",
    };
    const Tops = {
        hoodies: "Hoodies",
        tShirts: "Athletic T-Shirts",
        sleevelessSportTops: "Sleeveless Sport Tops",
        blouses: "Blouses",
        turtleneck: "Turtlenecks",
    };
    const Bra = {
        pushUp: "Push Up Bras",
        bralettes: "Bralettes",
        plunge: "Plunge Bras",
        sportsBras: "Sports Bras",
        strapless: "Strapless Bras",
    };
    const Waist = {
        jeans: "Jeans",
        yogaPants: "Yoga Pants",
        tights: "Tights",
        capriTights: "Capri Tights",
        runningTights: "Running Tights",
        runningShorts: "Running Shorts",
        pencilSkirt: "Pencil Skirts",
        officeDress: "Office Dress",
    };
    const Underwear = {
        briefs: "Briefs",
        panties: "Panties",
        thong: "Thong",
        boyshort: "Boyshorts",
        hipster: "Hipster Panties",
        lace: "Lace Panties ",
        bikinibrief: "Bikini briefs",
    };
    const Penis = {
        gaff: "Gaffs",
        cage: "Cages",
    };
    const Ass = {
        buttPlug: "Butt Plugs",
    };
    const Socks = {
        socks: "Socks",
        athleticSocks: "Athletic Socks",
        thighHighs: "Thigh Highs",
        pantyhose: "Pantyhose",
        kneeHighs: "Knee high socks",
    };
    const Feet = {
        tennisShoes: "Tennis Shoes",
        runningShoes: "Running Shoes",
        balletFlats: "Ballet flats",
        slippers: "Slippers",
        loafers: "Loafers",
        sandals: "Sandals",
        wedgeHeels: "Wedge Heels",
        platformHeels: "Platform Heels",
        blockHeels: "Block Heels",
        pumpHeels: "Pumps",
        stilettoHeels: "Stiletto Heels",
        dressSandals: "Dress Sandals",
        ankleBoots: "Ankle Boots",
        kneeHighBoots: "Knee High Boots",
        rainBoots: "Rain Boots",
    };
    function getSingularNoun(pluralNoun) {
        if (pluralNoun == "Hoodies")
            return "hoodie";
        if (pluralNoun == "Jeans")
            return "jeans";
        if (pluralNoun == "Dresses")
            return "dress";
        let regex = /((ies)($))/gi;
        let replacement = pluralNoun.replace(regex, "y");
        regex = /((es)($))/gi;
        replacement = pluralNoun.replace(regex, "e");
        regex = /((s)($))/gi;
        return replacement.replace(regex, "").toLocaleLowerCase();
    }
    exports.getSingularNoun = getSingularNoun;
    exports.Nouns = {
        Head,
        HeadAccessory,
        Top: Tops,
        Bra,
        Waist,
        Underwear,
        Penis,
        Ass,
        Feet,
        Socks,
        Outfit: Outfits,
    };
    exports.stores = {
        none: "no-store",
        running: "lady-fit-sport",
        yoga: "namaste-yoga",
        adult: "adult-goods-store",
        swim: "swimmer-world",
        covert: "covert-natasha",
        olddorfStore: "department-store",
        shoeboxx: "shoeboxx",
        testStore: "test-store",
    };
    function createSortOrder() {
        const list = [];
        const group = exports.Nouns;
        for (const key in group) {
            if (group.hasOwnProperty(key)) {
                const subgroup = group[key];
                for (const subkey in subgroup) {
                    list.push(subgroup[subkey]);
                }
            }
        }
        return list;
    }
    const clothingSortOrder = createSortOrder();
    function getSortRank(l, r) {
        if (l.type < r.type) {
            return -1;
        }
        if (r.type > l.type) {
            return 1;
        }
        if (l.type == "clothing") {
            const lc = l;
            const rc = r;
            const diff = clothingSortOrder.indexOf(lc.pluralNoun) - clothingSortOrder.indexOf(rc.pluralNoun);
            if (diff != 0) {
                return diff;
            }
        }
        //Could add a name sort...
        if (l.index != null && r.index != null) {
            return l.index - r.index;
        }
        //Sort by Id
        if (l.id < r.id) {
            return -1;
        }
        else if (l.id > r.id) {
            return 1;
        }
        else {
            return 0;
        }
    }
    exports.getSortRank = getSortRank;
});
