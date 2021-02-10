define(["require", "exports", "../Core", "../Inventory/OutfitsAnalyser"], function (require, exports, Core_1, OutfitsAnalyser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pathways = exports.Locations = void 0;
    class Locations {
    }
    exports.Locations = Locations;
    Locations.GrandHallway = "Grand Hallway";
    Locations.InnerChamber = "Inner chamber";
    Locations.Pod = "Pod";
    Locations.YourBedroom = "Your Bedroom";
    Locations.RetailStrip = "Retail Strip";
    Locations.BaldricHouse = "Baldric House";
    Locations.CentralMall = "Central Mall";
    class Pathways {
        static makeJumpLink(source, destination) {
            let result;
            if (Pathways.canGo(source, destination)) {
                result = `<a class="jump-link" onClick="SugarCube.getLib().Pathways.go('${source}', '${destination}');">(⏭️ ${destination})</a>`;
            }
            else {
                result = "";
            }
            return result;
        }
        static canGo(source, destination) {
            const description = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit();
            if (source == Locations.GrandHallway && destination == Locations.InnerChamber) {
                return SugarCube.State.hasPlayed("Inner chamber") && OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit().isAllWomanOutfit;
            }
            else if (source == Locations.InnerChamber && destination == Locations.GrandHallway) {
                return true;
            }
            else if (source == Locations.Pod && destination == Locations.InnerChamber) {
                return SugarCube.State.hasPlayed("Open Omni-pod door");
            }
            else if (source == Locations.InnerChamber && destination == Locations.Pod) {
                return SugarCube.State.hasPlayed("Close Omni-pod Door");
            }
            else if (source == Locations.BaldricHouse && destination == Locations.CentralMall) {
                return SugarCube.State.hasPlayed(Locations.CentralMall) && description.isAllWomanOutfit;
            }
            else if (source == Locations.CentralMall && destination == Locations.BaldricHouse) {
                return description.isAllWomanOutfit;
            }
            else {
                return SugarCube.State.hasPlayed(destination);
            }
        }
        //Used by html from makeJumpLink
        static go(source, destination) {
            if (Pathways.canGo(source, destination)) {
                const variables = Core_1.CoreUtils.getVariables();
                if (source == Locations.GrandHallway && destination == Locations.InnerChamber) {
                    variables.innerDoorUnlocked = true;
                }
                else if (source == Locations.InnerChamber && destination == Locations.GrandHallway) {
                    variables.innerDoorUnlocked = false;
                }
                if (source == Locations.Pod && destination == Locations.InnerChamber) {
                    variables.omniPodDoorClosed = false;
                }
                else if (source == Locations.InnerChamber && destination == Locations.Pod) {
                    variables.omniPodDoorClosed = true;
                }
                SugarCube.Engine.play(destination);
            }
        }
    }
    exports.Pathways = Pathways;
});
