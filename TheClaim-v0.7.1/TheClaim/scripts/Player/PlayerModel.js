define(["require", "exports", "../Core", "../Tasks/Tasks", "../IGameVariables", "../Images", "../Story/Dialogue", "../Player/Skills", "../Inventory/Slot", "../ItemGenerators/ItemNouns", "../Inventory/Clothing", "../Story/OutfitSwitcher"], function (require, exports, Core_1, Tasks_1, IGameVariables_1, Images_1, Dialogue_1, Skills_1, Slot_1, ItemNouns_1, Clothing_1, OutfitSwitcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerModel = void 0;
    class PlayerModel {
        static firstTimeInit() {
            return {
                heirName: "",
                name: "Billy",
                money: 300,
                lastShaved: -9999,
                // Not an issue until cage is active
                lastMajorSexualRelease: 0,
                lastMinorSexualRelease: 0,
                canShave: false,
                clothingTolerance: IGameVariables_1.ClothingTolerance.Dude,
                wearingMakeup: false,
                readyForSleep: false,
                canExercise: false,
                exercisedToday: false,
                hadFitGasm: false,
                staminaReserve: 1,
                workedToday: false,
                hasGirlyHair: false,
                skills: {},
                tasks: [],
            };
        }
        static getName() {
            return Core_1.CoreUtils.getVariables().player.name;
        }
        static getHeirName() {
            return Core_1.CoreUtils.getVariables().player.heirName;
        }
        static fallAsleep() {
            let sleepMessage = "";
            if (Skills_1.Skills.get(Skills_1.SkillTypes.hormones) > 13) {
                const sleepSwitch = OutfitSwitcher_1.OutfitSwitcher.switchContext("sleepwear");
                sleepMessage += sleepSwitch.switchOutcomeDescription;
            }
            if (PlayerModel.getArousalLevel() < 50) {
                sleepMessage += `
            You fall asleep relatively soon after hitting the sheets.
            ${Images_1.Images.drawAction("sleep-sheep.webp")}`;
            }
            else if (PlayerModel.getArousalLevel() < 80) {
                const sleepImage = Images_1.Images.drawAction("restless.gif");
                sleepMessage += `
            Your mind drifts for a while. It takes a while to fall asleep.
            ${sleepImage}`;
            }
            else {
                const sleepImage = Images_1.Images.drawAction("cant-sleep.gif");
                sleepMessage += `
            Your mind is completely gravitating to thoughts of sex. It's nigh on impossible for you to fall asleep.
            ${sleepImage}
            `;
            }
            sleepMessage += "\n";
            return sleepMessage;
        }
        static sleepQuality() {
            let morningMessage = "";
            if (PlayerModel.getArousalLevel() < 50) {
                morningMessage = `You feel well rested and eager to take on the world today.`;
            }
            else if (PlayerModel.getArousalLevel() < 80) {
                morningMessage = `You don't feel like you got a great night's sleep, your energy level is a little lower than ideal.`;
            }
            else {
                morningMessage = `The need for sex is now dominating your thoughts. You awake rather tired.`;
            }
            morningMessage += "\n";
            return morningMessage;
        }
        static morningUpdate() {
            PlayerModel.resetReadyForSleep();
            PlayerModel.resetWork();
            PlayerModel.resetExercisedToday();
            PlayerModel.updatePhysicalStats();
            let message = PlayerModel.sleepQuality();
            if (PlayerModel.hasEverShaved() && PlayerModel.needsShave()) {
                message += `
            Your body hair is getting a bit noticeable. \n`;
                message += Images_1.Images.drawAction("hairy-legs.jpg") + "\n";
            }
            if (Core_1.CoreUtils.getDay() == 7) {
                message += Dialogue_1.Dialogue.speaker("Good morning, <<=SugarCube.getLib().PlayerModel.getHeirName()>>. I hope last night was pleasurable for you...") + "\n";
                message += "That seemed like a longer pause than usual. Computers don't have real emotions, but if they did, you feel like this one was smirking at you.";
                message += Dialogue_1.Dialogue.speaker("You have a busy day ahead of you. First you will learn hands on about our logistics operation at the console, and then you will wear your new footwear for a jog on the treadmill in the fitness room.");
            }
            //Rationed events...
            if (Skills_1.Skills.get(Skills_1.SkillTypes.hormones) > 7 && Skills_1.Skills.get(Skills_1.SkillTypes.breasts) <= 0) {
                message += `Your chest is feeling really sore. You notice that your nipples are extremely sensitive. It hurts when loose fabric rubs against your unprotected chest. It's probably just a temporary skin sensitivity, but wearing a bra is more a neccessity than an option, right now. \n`;
                //Needs Bra
                message += Images_1.Images.drawAction("nipples-sensitive.jpg") + "\n";
                Skills_1.Skills.set(Skills_1.SkillTypes.breasts, 1);
            }
            else if (Skills_1.Skills.get(Skills_1.SkillTypes.hormones) > 15 && Skills_1.Skills.get(Skills_1.SkillTypes.facialFem) > 10 && Skills_1.Skills.get(Skills_1.SkillTypes.breasts) <= 1) {
                message += `\nYou feel a vague sense like you are carrying some weight on your chest. Oh, no! Not again, this is so humiliating!
            ${Images_1.Images.drawAction("nipples-sensitive.jpg")}
            Your boobs have been bigger. They are well beyond just being "perky bee-stings" at this point.
            
            At this point, with all the changes your body has been going through, your caged penis is the last bodily manifestation of your masculinity. Nothing about your body shape would give a person a clear or reasonable hint that they are looking at a man, or even a boy.
            ${Images_1.Images.drawAction("chest-2.jpg")}

            You can still wear or buy male clothes(if that's your kind of look, and you have any luck finding a store that has them), but even with some attempts at trickery, any reasonably intelligent observer would logically see through the ruse and conclude they are looking at girl who likes to cosplay as a boy or is a tomboy.
            `;
                Skills_1.Skills.set(Skills_1.SkillTypes.breasts, 2);
            }
            else if (Skills_1.Skills.get(Skills_1.SkillTypes.hairLength) > 15 && !PlayerModel.hasGirlyHair()) {
                message += `Good news and Bad news.
            
            Your hair seems to have grown a little faster than you are used to. It's been growing so much, that you don't have to have the weight and scratchiness of the wig on your head anymore.

            ${Images_1.Images.drawAction("mc-hair-1.jpg")}
            

            However, the local barber isn't going to be an option anymore. You will need to get this styled, or people may judge you as being quite unfashionable. Maybe Sue could give you some advice.
            `;
                Core_1.CoreUtils.getVariables().player.hasGirlyHair = true;
                Tasks_1.Tasks.addTask("need-hair-styling");
            }
            else if (PlayerModel.getLastMajorSexualRelease() > 7 && !Tasks_1.Tasks.hasTask("sexual-relief-sue-round-2") && Core_1.CoreUtils.visitedCount("Request Relief from Sue") == 0) {
                message += `
            ${Dialogue_1.Dialogue.speaker(`${PlayerModel.getHeirName()}, good morning. You have been completing your responsibilities to a highly satisfactory level. You have earned the priviledge of basic relief from your base instincts, to allow your higher feminine faculties to operate at peak efficiency. `)}
            
            ${Dialogue_1.Dialogue.speaker(`Based on your initial conduct with her, a tentative arrangement has been made with Sue to attend to ensuring that you are educated in fundamental matters, in a safe and discrete environment.`)}
            `;
                Tasks_1.Tasks.addTask("sexual-relief-sue-round-2");
            }
            else if (Core_1.CoreUtils.hasPlayed("Request Relief from Sue") && !Tasks_1.Tasks.hasTask("marissa-logs-released") && Core_1.CoreUtils.visitedCount("MARISSA LOG FILES") == 0) {
                message += `
            ${Dialogue_1.Dialogue.speaker(`${PlayerModel.getHeirName()}, It is time that you start learning more about your predecessor, and the responsibilities you will be taking on.  `)}
            
            ${Dialogue_1.Dialogue.speaker(`I have started to release some of Marissa's Logs, as pertinent to the affairs of MarisCorp,  for your review on the console. These logs were never meant for general consumption, please treat these materials with the utmost of confidentiality.`)}
            `;
                Tasks_1.Tasks.addTask("marissa-logs-released");
            }
            return message;
        }
        static explainNoSleep() {
            if (Core_1.CoreUtils.getDay() >= 7) {
                if (!PlayerModel.hasExercisedToday()) {
                    return "You haven't exercised at all today, yet. You feel like a little movement would do you some good first.";
                }
                else if (PlayerModel.canWork()) {
                    return "You haven't done any work today. A sense of guilt weights you down. You can't sleep like this.  ";
                }
                else if (Tasks_1.Tasks.hasTodayTask()) {
                    return "You still have a task on your [[task|Tasks]] list which is must be completed today. You feel too anxious to sleep before that is resolved.";
                }
            }
            else if (!PlayerModel.isReadyForSleep()) {
                return "You are simply not ready to sleep yet.";
            }
            return "";
        }
        static resetReadyForSleep() {
            return (Core_1.CoreUtils.getVariables().player.readyForSleep = false);
        }
        static setReadyForSleep() {
            Core_1.CoreUtils.getVariables().player.readyForSleep = true;
        }
        static isReadyForSleep() {
            return (Core_1.CoreUtils.getVariables().player.readyForSleep ||
                (Core_1.CoreUtils.getDay() >= 7 && (PlayerModel.hasExercisedToday() || PlayerModel.getStamina() == 0) && !PlayerModel.canWork() && !Tasks_1.Tasks.hasTodayTask()));
        }
        static resetWork() {
            return (Core_1.CoreUtils.getVariables().player.workedToday = false);
        }
        static setHasWorked() {
            Core_1.CoreUtils.getVariables().player.workedToday = true;
        }
        static canWork() {
            return !Core_1.CoreUtils.getVariables().player.workedToday;
        }
        static resetExercisedToday() {
            const clothingItem = Slot_1.Slot.getSlotItem(ItemNouns_1.clothingSlots.ass);
            const baseCapacity = clothingItem != null && clothingItem.id == "motivator-plug" ? 2 : 1;
            const fitnessBonus = Math.ceil(Skills_1.Skills.get(Skills_1.SkillTypes.cardio) / 60);
            const player = Core_1.CoreUtils.getVariables().player;
            const arousalPenalty = PlayerModel.getArousalLevel() > 80 ? 2 : PlayerModel.getArousalLevel() > 40 ? 1 : 0;
            player.staminaReserve = baseCapacity + Math.max(fitnessBonus - arousalPenalty, 0);
            Core_1.CoreUtils.getVariables().player.exercisedToday = false;
            player.hadFitGasm = false;
        }
        static setHasExercisedToday() {
            Core_1.CoreUtils.getVariables().player.staminaReserve--;
            Core_1.CoreUtils.getVariables().player.exercisedToday = true;
        }
        static addExerciseStamina() {
            Core_1.CoreUtils.getVariables().player.staminaReserve++;
        }
        static canExerciseToday() {
            return Core_1.CoreUtils.getVariables().player.staminaReserve > 0;
        }
        static hasExercisedToday() {
            return Core_1.CoreUtils.getVariables().player.exercisedToday;
        }
        static getStamina() {
            return Core_1.CoreUtils.getVariables().player.staminaReserve;
        }
        static updatePhysicalStats() {
            const maxWeightChange = 0.01 + PlayerModel.getStamina() * 0.1;
            let priorWeight = Skills_1.Skills.get(Skills_1.SkillTypes.weight);
            if (priorWeight == null || priorWeight == 0) {
                priorWeight = 63;
            }
            const weight = Math.max(43, priorWeight - maxWeightChange);
            Skills_1.Skills.set(Skills_1.SkillTypes.weight, weight);
            const weightToWaist = 1.15;
            Skills_1.Skills.set(Skills_1.SkillTypes.waist, weight * weightToWaist);
            Skills_1.Skills.set(Skills_1.SkillTypes.height, 171);
            //Player should be getting a change here every few days
            const hormonalShift = Math.min(1, Math.max(0, Skills_1.Skills.get(Skills_1.SkillTypes.hormones) / 7));
            Skills_1.Skills.add(Skills_1.SkillTypes.facialFem, hormonalShift); // Max effect at ~ 27
            const facialFem = Skills_1.Skills.get(Skills_1.SkillTypes.facialFem);
            let priorHairlength = Skills_1.Skills.get(Skills_1.SkillTypes.hairLength);
            if (priorHairlength == 0) {
                priorHairlength = 5 + facialFem;
            }
            const hairLength = priorHairlength + hormonalShift;
            Skills_1.Skills.set(Skills_1.SkillTypes.hairLength, hairLength); //Hair grows at max 0.5cm/day
            const assSize = Math.max(101.6, 76.2 + Math.min(20, facialFem));
            Skills_1.Skills.set(Skills_1.SkillTypes.ass, assSize);
        }
        static canShave() {
            return Core_1.CoreUtils.getVariables().player.canShave;
        }
        static enableShave() {
            Core_1.CoreUtils.getVariables().player.canShave = true;
        }
        static needsShave() {
            const player = Core_1.CoreUtils.getVariables().player;
            return Core_1.CoreUtils.getDay() - player.lastShaved > 4;
        }
        static hasEverShaved() {
            const player = Core_1.CoreUtils.getVariables().player;
            return player.lastShaved != null && player.lastShaved > 0;
        }
        static hasGirlyHair() {
            return Core_1.CoreUtils.getVariables().player.hasGirlyHair;
        }
        static canExercise() {
            const player = Core_1.CoreUtils.getVariables().player;
            return player.canExercise;
        }
        static enableExercise() {
            const player = Core_1.CoreUtils.getVariables().player;
            player.canExercise = true;
        }
        static shave() {
            const player = Core_1.CoreUtils.getVariables().player;
            player.lastShaved = Core_1.CoreUtils.getDay();
            Tasks_1.Tasks.removeTask("first-shave");
            Tasks_1.Tasks.removeTask("regular-shave");
            Tasks_1.Tasks.removeTask("player-needs-shower");
        }
        static needsShower() {
            return Tasks_1.Tasks.hasTask("player-needs-shower");
        }
        static shower() {
            Tasks_1.Tasks.removeTask("player-needs-shower");
            Core_1.CoreUtils.getVariables().clothesAreDirty = false;
        }
        // Clothing
        static checkClothingTolerance() {
            return Core_1.CoreUtils.getVariables().player.clothingTolerance;
        }
        static raiseClothingTolerance(clothingTolerance) {
            Core_1.CoreUtils.getVariables().player.clothingTolerance = clothingTolerance;
        }
        static needsBra() {
            return Core_1.CoreUtils.getDay() >= 9;
        }
        // Money
        static getMoney() {
            return Core_1.CoreUtils.getVariables().player.money;
        }
        static hasMoney(amount) {
            return Core_1.CoreUtils.getVariables().player.money > amount;
        }
        static deductMoney(amount) {
            Core_1.CoreUtils.getVariables().player.money -= amount;
        }
        static addMoney(amount) {
            Core_1.CoreUtils.getVariables().player.money += amount;
        }
        // Makeup
        static isWearingMakeup() {
            return Core_1.CoreUtils.getVariables().player.wearingMakeup;
        }
        static toggleMakeup(wearMakeup) {
            Core_1.CoreUtils.getVariables().player.wearingMakeup = wearMakeup;
        }
        //Arousal (when caged)
        static isCaged() {
            const isCaged = Clothing_1.Clothing.isWearing("chasti-flex");
            return isCaged;
        }
        static getArousalLevel() {
            const day = Core_1.CoreUtils.getDay();
            const player = Core_1.CoreUtils.getVariables().player;
            const baseline = Math.min(day - (player.lastMajorSexualRelease || 0), 20);
            const immediateNeed = Math.min((day - (player.lastMinorSexualRelease || 0)) * 25, 75);
            const fitGasm = player.hadFitGasm ? 0 : 5;
            return PlayerModel.isCaged() ? Math.min(100, baseline + immediateNeed + fitGasm) : 0;
        }
        static triggerSexualRelease(isMajor) {
            const day = Core_1.CoreUtils.getDay();
            const player = Core_1.CoreUtils.getVariables().player;
            if (isMajor) {
                player.lastMajorSexualRelease = day;
            }
            player.lastMinorSexualRelease = day;
        }
        static getLastMajorSexualRelease() {
            const day = Core_1.CoreUtils.getDay();
            const player = Core_1.CoreUtils.getVariables().player;
            return day - player.lastMajorSexualRelease;
        }
        static getLastMinorSexualRelease() {
            const day = Core_1.CoreUtils.getDay();
            const player = Core_1.CoreUtils.getVariables().player;
            return day - player.lastMinorSexualRelease;
        }
    }
    exports.PlayerModel = PlayerModel;
});
