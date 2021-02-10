define(["require", "exports", "../Core", "../Inventory/MirrorUX", "../Images", "../Inventory/OutfitsAnalyser", "../Tasks/Tasks"], function (require, exports, Core_1, MirrorUX_1, Images_1, OutfitsAnalyser_1, Tasks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dialogue = void 0;
    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (str, newStr) {
            // If a regex pattern
            if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") {
                return this.replace(str, newStr);
            }
            // If a string
            return this.replace(new RegExp(str, "g"), newStr);
        };
    }
    //HACKs... TODO: Consolidate Dep's
    class Dialogue {
        static speaker(message) {
            const imageName = "computer.jpg";
            return Dialogue.generic(`Computer`, message, "speaker", imageName);
        }
        static sue(message) {
            const imageName = "susan.jpg";
            return Dialogue.generic(`Sue`, message, "humantext sue", imageName);
        }
        //TODO: Encapsulate logic for this
        static player(message) {
            const imageName = MirrorUX_1.MirrorUX.getCharacterImage();
            return Dialogue.generic("You", message, "humantext player", imageName);
        }
        static playerAsDressed(message) {
            const outfitDescription = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit();
            if (outfitDescription.isAllMaleOutfit) {
                return Dialogue.player(message);
            }
            else {
                return Dialogue.heir(message);
            }
        }
        static brain(message) {
            const imageName = "brain.png";
            return Dialogue.generic("Your brain", message, "humantext", imageName);
        }
        static heir(message) {
            const imageName = MirrorUX_1.MirrorUX.getCharacterImage();
            return Dialogue.generic(`You (as ${Core_1.CoreUtils.getVariables().player.heirName})`, message, "humantext heir", imageName);
        }
        static playerDrone(message) {
            return Dialogue.generic(`Drone`, message, "drone", "maid-profile.jpg");
        }
        static marissa(message) {
            const imageName = "marissa.jpg";
            return Dialogue.generic("Marissa", message, "humantext marissa", imageName);
        }
        static pawn(message) {
            const imageName = "pawn-broker.jpg";
            return Dialogue.generic("Pawn Broker", message, "humantext pawn-broker", imageName);
        }
        static sporting(message) {
            const imageName = "sporting-clerk.jpg";
            return Dialogue.generic("Lady Fit-Sport Clerk", message, "humantext", imageName);
        }
        static gamestore(message) {
            const imageName = "gamer-goth.jpg";
            return Dialogue.generic("GamesHut Cashier", message, "humantext", imageName);
        }
        static lingeriestore(message) {
            const imageName = "lingerie-salesgirl.jpg";
            return Dialogue.generic("Lingerie Salesgirl", message, "humantext", imageName);
        }
        static hrContact(message) {
            const imageName = "hr-contact.jpg";
            return Dialogue.generic("HR Contact", message, "humantext", imageName);
        }
        static logisticsSupervisor(message) {
            const imageName = "logistics-supervisor.jpg";
            return Dialogue.generic("Logistics Supervisor", message, "humantext", imageName);
        }
        static droneMentor(message) {
            const imageName = "drone-mentor.jpg";
            return Dialogue.generic("Drone Ops Mentor", message, "humantext", imageName);
        }
        static agentBlack(message) {
            const imageName = "agent-black.jpg";
            return Dialogue.generic("Agent Black - DoH", message, "humantext", imageName);
        }
        static agentGreen(message) {
            const imageName = "agent-green.jpg";
            return Dialogue.generic("Agent Green - DoH", message, "humantext", imageName);
        }
        static replaceSugar(message) {
            message = message.replaceAll(" = ", " to ");
            message = message.replaceAll(" && ", " //a//n//d ");
            message = message.replaceAll(" || ", " or ");
            if (message.toLowerCase().indexOf("eve") >= 0) {
                throw "literal character name";
            }
            return message;
        }
        static speak(speaker, message) {
            let result = "";
            message = this.replaceSugar(message);
            switch (speaker) {
                case "sue":
                    result = Dialogue.sue(message);
                    break;
                case "heir":
                    result = Dialogue.heir(message);
                    break;
            }
            return result;
        }
        static generic(name, message, className, image = "") {
            Images_1.Images.drawPerson(image, className);
            let result = `<div class="message"><table><td>`;
            result += Images_1.Images.drawPerson(image, "message-portrait zoom");
            result += `</td><td>`;
            result += `<span class="label">${name}</span>`;
            result += `<span class="${className}">${message}</span></td></table></div>`;
            return result;
        }
        static endOfLine() {
            if (Tasks_1.Tasks.hasTask("train-for-doll-suit") && Core_1.CoreUtils.visitedCount("Request Relief from Sue") > 0) {
                return '<div class="message"><span class="label">The Developer</span><span class="developerMessage">Thank you all for playing, as I refine the core experience. The main character is at a state where they can work, exercise, shop for clothes and sleep. There is no major story mechanics after the main character has had their second bedroom experience with Sue and been introduced to the "doll-suit". Forum feedback, especially about gameplay impacting bugs or confusing passages is appreciated. </span><div>[[Developer Notes]]</div><div class="endOfLine">End of Line</div></div>';
            }
            return "";
        }
    }
    exports.Dialogue = Dialogue;
});
