define(["require", "exports", "./PlayerModel", "../Tasks/Tasks", "./Skills", "../Core", "../Images", "../Inventory/Slot", "../ItemGenerators/ItemNouns", "../Inventory/Inventory"], function (require, exports, PlayerModel_1, Tasks_1, Skills_1, Core_1, Images_1, Slot_1, ItemNouns_1, Inventory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerView = void 0;
    /** Encapsuilates User facing Presentation/Descriptions of Player Model */
    class PlayerView {
        static cmToInches(measure) {
            return measure * 0.393701;
        }
        static kgToPounds(measure) {
            return measure * 2.20462;
        }
        static toFraction(value) {
            const wholeValue = Math.floor(value);
            const frac = value - wholeValue + 1 / 16;
            let fracSym;
            if (frac <= 1 / 8) {
                fracSym = "";
            }
            else if (frac <= 1 / 4) {
                fracSym = "⅛";
            }
            else if (frac <= 3 / 8) {
                fracSym = "¼";
            }
            else if (frac <= 1 / 2) {
                fracSym = "⅜";
            }
            else if (frac <= 5 / 8) {
                fracSym = "½";
            }
            else if (frac <= 3 / 4) {
                fracSym = "⅝";
            }
            else if (frac <= 7 / 8) {
                fracSym = "¾";
            }
            else {
                fracSym = "⅞";
            }
            return wholeValue + fracSym;
        }
        static renderMeasurement(label, metric, metricSuffix, imperial, imperialSuffix) {
            const style = (description, content, className) => {
                return `<span class="${className}">${description} ${content}</span>`;
            };
            return `<div><span>${label}:</span> ${style((Math.round(metric * 100) / 100).toString(), metricSuffix, "metric")} ${style(this.toFraction(imperial), imperialSuffix, "imperial")}</div>`;
        }
        static style(description, content) {
            return `<div><span >${description}:</span>    <span class="imperial">${content}</span></div>`;
        }
        static showSkill(label, name) {
            const skillLevel = Skills_1.Skills.get(name);
            if (skillLevel > 0) {
                return this.style(label, Math.round(skillLevel).toString());
            }
            else {
                return "";
            }
        }
        static describePlayer() {
            let description = "";
            //Hygiene stats.
            description += "<b>Status & Hygiene</b>";
            description += PlayerView.style("Tiredness", PlayerView.tirednessDescription());
            if (PlayerModel_1.PlayerModel.hasEverShaved()) {
                description += this.style("Shaving/Body Hair", PlayerView.shaveDescription());
            }
            if (PlayerModel_1.PlayerModel.hasGirlyHair()) {
                description += this.style("Hair", "Combined with your softened facial features and growing hair length, your hair conveys a feminine appearance.");
            }
            description += PlayerView.style("Cleanliness", PlayerView.cleanDescription());
            description += PlayerView.style("Clothing Norms", PlayerView.clothingToleranceDescription());
            description += this.style("Attraction", PlayerView.attractionDescription());
            description += "<br />";
            description += "<b>Abilities & Traits</b>";
            description += PlayerView.showSkill("Cardiovascular Capacity", Skills_1.SkillTypes.cardio); // Elliptical
            description += PlayerView.showSkill("Flexibility", Skills_1.SkillTypes.flexibility); // Yoga
            description += "<br />";
            description += "<b>Work Experience & Skills</b>";
            description += PlayerView.showSkill("Logistics", Skills_1.SkillTypes.flexibility);
            description += PlayerView.showSkill("Cleaning", Skills_1.SkillTypes.cleaning);
            description += "<br />";
            //MC is thinking more about measurements after hormones have taken some effect.
            description += this.renderBodyDetails();
            if (Slot_1.Slot.getSlotItem(ItemNouns_1.clothingSlots.penis) != null && Inventory_1.Inventory.has("first-dildo")) {
                description += "<b>Sex</b><br />";
                description += `You last had an orgasm of your uncaged penis ${PlayerModel_1.PlayerModel.getLastMajorSexualRelease()} days ago. <br />`;
                description += `You last had an orgasm via your ass ${PlayerModel_1.PlayerModel.getLastMinorSexualRelease()} days ago. <br />`;
            }
            return description;
        }
        static renderBodyDetails() {
            const hormones = Skills_1.Skills.get(Skills_1.SkillTypes.hormones);
            let description = "";
            if (hormones >= 5) {
                description += "<b>Body Stats, as reported by your smart watch</b>";
                const height = Skills_1.Skills.get(Skills_1.SkillTypes.height);
                const weight = Skills_1.Skills.get(Skills_1.SkillTypes.weight);
                const waist = Skills_1.Skills.get(Skills_1.SkillTypes.waist);
                const ass = Skills_1.Skills.get(Skills_1.SkillTypes.ass);
                const hairLength = Skills_1.Skills.get(Skills_1.SkillTypes.hairLength);
                description += PlayerView.renderMeasurement("Hair Length", hairLength, "cm", PlayerView.cmToInches(hairLength), "inches");
                if (PlayerModel_1.PlayerModel.hasGirlyHair()) {
                    description += "Your hair is at a length which is androgynous if not conventionally feminine. You don't need a wig to present as a girl. ";
                }
                description += PlayerView.renderMeasurement("Height", height, "cm", PlayerView.cmToInches(height), "inches");
                description += PlayerView.renderMeasurement("Weight", weight, "kg", PlayerView.kgToPounds(weight), "pounds");
                description += PlayerView.renderMeasurement("Waist", waist, "cm", PlayerView.cmToInches(waist), "inches");
                description += PlayerView.renderMeasurement("Ass", ass, "cm", PlayerView.cmToInches(ass), "inches");
                description += PlayerView.renderMeasurement("Shoe Size", 24.5, "cm", 8.5, "Women's US Shoe size");
                description += this.showSkill("EstroMet (WTF?) ", Skills_1.SkillTypes.hormones);
                if (ass < 0.5 || hairLength < 0.5) {
                    description += "\n New stats not determined. Please Sleep.\n";
                }
                description += "\n";
                description += PlayerView.renderBodyParts();
            }
            return description;
        }
        static renderAspect(label, description, image) {
            const content = `<b>${label}</b>
        ${description}
        ${Images_1.Images.drawPerson(image)}`;
            return content;
        }
        static renderBodyParts() {
            const breastDevelopment = Math.max(1, Skills_1.Skills.get(Skills_1.SkillTypes.breasts));
            let breastMessage;
            switch (breastDevelopment) {
                case 0:
                    breastMessage = "Your chest is what you'd expect for a rather skinny young man";
                    break;
                case 1:
                    breastMessage = `Your chest has what one might consider a hint of breasts. Your nipples are extremely sensitive, forcing you to wear a bra.                
                It's a little embarassing, but seeing them packaged up in a cute bra kind of turns you on.`;
                    break;
                case 2:
                    breastMessage = `Your breasts have continued developing. At this point clothing generally shows the profile of your boobs. This is so embarassing.`;
                    break;
                default:
                    breastMessage = "Unknown case";
                    break;
            }
            let description = PlayerView.renderAspect("Breasts", breastMessage, `chest-${breastDevelopment}.jpg`);
            description += `
        <b>Penis</b> 
        `;
            const penisItemName = Slot_1.Slot.get(ItemNouns_1.clothingSlots.penis);
            description +=
                penisItemName != "chasti-flex"
                    ? "You'd like to consider your penis to be average sized, around 4.5 inches while flacid."
                    : "Your penis is trapped in a flexible pink cage.";
            description += "<br />";
            description += `
        <b>Ass</b>
        You have a small butt lacking any particular definition.   `;
            description += "<br />";
            description += "<br />";
            return description;
        }
        static tirednessDescription() {
            if (PlayerModel_1.PlayerModel.isReadyForSleep()) {
                return "You are tired, and ready to go to bed.";
            }
            else {
                return "You have energy to do things today.";
            }
        }
        static cleanDescription() {
            if (Tasks_1.Tasks.hasTask("player-needs-shower")) {
                return `<span class="awkward-outfit-warning">You really feel like you need a shower.</span>`;
            }
            else {
                return "You are reasonably clean at the moment.";
            }
        }
        static shaveDescription() {
            if (!PlayerModel_1.PlayerModel.hasEverShaved()) {
                return "";
            }
            else if (PlayerModel_1.PlayerModel.needsShave()) {
                return `<span class="awkward-outfit-warning">Your body hair is growing out some. The computer and other people may not notice, but you are feel it catching on your clothes.</span>`;
            }
            else {
                return "You are absolutely free of body hair right now - your skin feels silky smooth, but also more sensitive.";
            }
        }
        static clothingToleranceDescription() {
            const clothingTolerance = PlayerModel_1.PlayerModel.checkClothingTolerance();
            if (clothingTolerance == 0) {
                return "You aren't too showy, you normally wear pretty basic, modestly priced outfits.";
            }
            if (clothingTolerance == 1) {
                return "The thought is really scary, but you know that  putting yourself in specific clothes from Stacy's closet, is a neccessary step to to winning a massive treasure.";
            }
            if (clothingTolerance == 2) {
                return `It's still kind of unsettling, but you feel a palpable excitement when you go out as ${PlayerModel_1.PlayerModel.getHeirName()} and are not afraid to do so.`;
            }
            return "";
        }
        static attractionDescription() {
            let maleAttraction = 0;
            const femaleAttraction = 10;
            if (Core_1.CoreUtils.hasPlayed("Heterosexual Mode")) {
                maleAttraction += 1;
            }
            let message = "";
            if (femaleAttraction == 10) {
                message += "You are strongly attracted to girls.";
            }
            if (maleAttraction > 0) {
                message += "Your experience in the pod has stirred some thoughts which you have not explored before.";
            }
            return message;
        }
        static drawStats() {
            let result = "";
            result += `Day: ${Core_1.CoreUtils.getDay()} \n`;
            result += `Cash: ${PlayerModel_1.PlayerModel.getMoney()} \n`;
            if (PlayerModel_1.PlayerModel.isCaged()) {
                const arousal = PlayerModel_1.PlayerModel.getArousalLevel();
                let arousalColor = "";
                if (arousal < 40) {
                    arousalColor = "white";
                }
                else if (arousal < 80) {
                    arousalColor = "yellow";
                }
                else {
                    arousalColor = "red";
                }
                result += `Arousal:  <span style='color:${arousalColor}'> ${arousal}</span> \n`;
            }
            if (SugarCube.State.hasPlayed("Work from Console")) {
                result += `Work: ${PlayerModel_1.PlayerModel.canWork() ? "💼" : ""} \n`;
            }
            if (PlayerModel_1.PlayerModel.canExercise()) {
                result += `Stamina: ${"🏃‍♀️".repeat(PlayerModel_1.PlayerModel.getStamina())} \n`;
            }
            if (navigator.webdriver == true) {
                result += `<div><a href="#" onClick='SugarCube.Save.export("TestSave-Day${Core_1.CoreUtils.getDay()}")'>SaveForTest</a></div>`;
            }
            return result;
        }
    }
    exports.PlayerView = PlayerView;
});
