define(["require", "exports", "../Inventory/MirrorUX", "../Inventory/Outfits", "../Inventory/OutfitsAnalyser", "../Inventory/OutfitsExplainer"], function (require, exports, MirrorUX_1, Outfits_1, OutfitsAnalyser_1, OutfitsExplainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutfitSwitcher = exports.SwitchOutcome = void 0;
    var SwitchOutcome;
    (function (SwitchOutcome) {
        SwitchOutcome[SwitchOutcome["noOutfitAvailable"] = 0] = "noOutfitAvailable";
        SwitchOutcome[SwitchOutcome["changedOutfit"] = 1] = "changedOutfit";
        SwitchOutcome[SwitchOutcome["noChangeNeeded"] = 2] = "noChangeNeeded";
    })(SwitchOutcome = exports.SwitchOutcome || (exports.SwitchOutcome = {}));
    class OutfitSwitcher {
        static switchContext(targetContext) {
            //find match
            let canProceed = true;
            let switchOutcome;
            const outfitDescription = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit();
            if (OutfitsAnalyser_1.OutfitsAnalyser.isValid(outfitDescription.assessments[targetContext])) {
                switchOutcome = SwitchOutcome.noChangeNeeded;
            }
            else {
                const outfitName = OutfitSwitcher.findMatchingOutfit(targetContext);
                if (outfitName != null) {
                    MirrorUX_1.MirrorUX.wearOutfit(outfitName, true);
                    switchOutcome = SwitchOutcome.changedOutfit;
                }
                else {
                    canProceed = false;
                    switchOutcome = SwitchOutcome.noOutfitAvailable;
                }
            }
            return {
                canProceed: canProceed,
                switchOutcomeDescription: OutfitSwitcher.describeSwitchOutcome(targetContext, switchOutcome, outfitDescription.assessments[targetContext]),
            };
        }
        static findMatchingOutfit(targetContext) {
            const outfits = Outfits_1.Outfits.getOutfits();
            //find match
            for (let i = 0; i < outfits.length; i++) {
                const outfit = OutfitsAnalyser_1.OutfitsAnalyser.describeOutfit(outfits[i].items);
                if (OutfitsAnalyser_1.OutfitsAnalyser.isValid(outfit.assessments[targetContext])) {
                    return outfits[i].name;
                }
            }
            return null;
        }
        static describeSwitchOutcome(targetContext, switchOutcome, outfitDescription) {
            if (targetContext == "fitness") {
                if (switchOutcome == SwitchOutcome.changedOutfit) {
                    return "You change into your favorite workout set. You may not always know what you're doing with your exercises, but this outfit sure puts you in an 'exercise' mood!\n\n";
                }
                else if (switchOutcome == SwitchOutcome.noOutfitAvailable) {
                    return `The watch reminds you what you should be wearing for exercising.\n${OutfitsExplainer_1.OutfitsExplainer.explainDetails(outfitDescription)}\n`;
                }
                else {
                    return "";
                }
            }
            else if (targetContext == "sleepwear") {
                if (switchOutcome == SwitchOutcome.changedOutfit) {
                    return "You change into your favorite sleepwear outfit, you like how soft and gentle it feels on your skin. \n\n";
                }
                else if (switchOutcome == SwitchOutcome.noOutfitAvailable) {
                    return `As your skin has been getting softer, and more sensitive, an outfit with some silky smooth sleepwear would be nice. Covert Natasha might have some options. You look forward to creating a sleepwear outfit.\n\n`;
                }
                else {
                    return "";
                }
            }
            else if (targetContext == "officeWork") {
                if (switchOutcome == SwitchOutcome.changedOutfit) {
                    return "You change into your favorite work outfit. Maybe you're still the not so experienced person you were before, but the clothes help stave off sensations of imposter syndrome for you.\n\n";
                }
                else if (switchOutcome == SwitchOutcome.noOutfitAvailable) {
                    return `As you still quite inexperienced at work, you don't like the idea of not at least maintaining a professional appearance, to show you are serious. Even if not physically at the office, a more proper work appearance can be helpful when you need to interact with co-workers, and to help keep your mind focused on work. Bergdorf Oldman at the mall should have some nice clothes which you could use as a foundation for a work outfit.\n\n`;
                }
                else {
                    return "";
                }
            }
            else {
                return "not handled yet! Whoops!";
            }
        }
    }
    exports.OutfitSwitcher = OutfitSwitcher;
});
