define(["require", "exports", "../Inventory/MirrorUX", "../Images", "../Player/PlayerModel", "../Player/Skills", "../Tasks/Tasks", "../Core", "../Story/OutfitSwitcher"], function (require, exports, MirrorUX_1, Images_1, PlayerModel_1, Skills_1, Tasks_1, Core_1, OutfitSwitcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Exercises = void 0;
    class Exercises {
        static doElliptical() {
            let message = "";
            const switchOutcome = OutfitSwitcher_1.OutfitSwitcher.switchContext("fitness");
            message = switchOutcome.switchOutcomeDescription;
            if (!switchOutcome.canProceed) {
                return message;
            }
            message += `You start up the machine. You set the initial resistance to a level you feel you can handle, and start running.

            The watch prompts you to confirm that you have started physical activity, to start tracking.
            
            From there, the watch connects to the machine, and adjust the difficulty against your heart rate.`;
            const ellipticalImages = Skills_1.Skills.get(Skills_1.SkillTypes.hormones) > 25 ? 5 : 3;
            message += Images_1.Images.drawRandomImage("elliptical-exercise-NNN.jpg", ellipticalImages) + "\n";
            if (!SugarCube.State.hasPlayed("Elliptical")) {
                message += `The first stretch was relatively easy, but elliptical really has you working your glutes on a hill like section, you are really starting to sweat now.

        The notion of the inheritance being connected to your health, makes you want to make a good showing of yourself. At the end, you are dripping in sweat, and the jog is done.
        `;
            }
            else {
                if (!MirrorUX_1.MirrorUX.isWearing("motivator-plug")) {
                    message += `This isn't your first time on this machine, it's a little boring. You can't help but find yourself drawn to the cute reflection you see in the mirror. At the end, you are not sure how much progress you actually made.
                `;
                }
                else {
                    Skills_1.Skills.add(Skills_1.SkillTypes.hormones, 1);
                    message += `You feel like things are going a bit slow, so you increase the difficulty a bit.
                `;
                    message += Exercises.finishGasm();
                }
            }
            message += Exercises.updateSkill(Skills_1.SkillTypes.cardio);
            PlayerModel_1.PlayerModel.setHasExercisedToday();
            message += Exercises.canDoMore();
            Tasks_1.Tasks.ensureTask("player-needs-shower");
            Core_1.CoreUtils.getVariables().clothesAreDirty = true;
            return message;
        }
        static doYoga() {
            let message;
            const switchOutcome = OutfitSwitcher_1.OutfitSwitcher.switchContext("fitness");
            message = switchOutcome.switchOutcomeDescription;
            if (!switchOutcome.canProceed) {
                return message;
            }
            message += `You put on a training video, and put your watch into exercise mode. \n`;
            message += Images_1.Images.drawRandomImage(`yoga-exercise-NNN.jpg`, 8) + "\n";
            if (!SugarCube.State.hasPlayed("Yoga")) {
                message += `Yoga is new to you you find yourself sweating a lot as you try to imitate the poses, but your flexibility isn't great`;
            }
            else {
                if (!MirrorUX_1.MirrorUX.isWearing("motivator-plug")) {
                    message += `You are starting to get familiar with the exercise, but you find your mind drifting. You wonder if there is something you could do to make your exercises more stimulating.`;
                }
                else {
                    Skills_1.Skills.add(Skills_1.SkillTypes.hormones, 1);
                    message += `You hope that you can do a little better at some poses today.`;
                    message += this.finishGasm();
                }
            }
            message += Exercises.updateSkill(Skills_1.SkillTypes.flexibility);
            PlayerModel_1.PlayerModel.setHasExercisedToday();
            message += Exercises.canDoMore();
            Tasks_1.Tasks.ensureTask("player-needs-shower");
            Core_1.CoreUtils.getVariables().clothesAreDirty = true;
            return message;
        }
        static finishGasm() {
            let message;
            if (Skills_1.Skills.get(Skills_1.SkillTypes.hormones) < 5) {
                message = `
            You jolt a moment as you sense an icy cold spray inside your rear, coming from the plug.   

            After a couple minutes, you feel a renewed energy for the exercise, and find yourself putting more oomph in.
            
            `;
            }
            else {
                message = `
            You feel a now familiar sensation in your nether regions, as you work a little harder now.            
            `;
            }
            return message;
        }
        static updateSkill(skillName) {
            const baseSkill = Skills_1.Skills.get(skillName);
            const maxIncrease = MirrorUX_1.MirrorUX.isWearing("motivator-plug") ? 3 : 2;
            const skillIncrease = Math.round(Math.max(maxIncrease, (Math.random() * (100 - baseSkill)) / 10)) + 1;
            Skills_1.Skills.add(skillName, skillIncrease * 0.5);
            const skillDelta = Skills_1.Skills.get(skillName) - baseSkill;
            let message;
            switch (skillIncrease) {
                case 1:
                    if (baseSkill < 95) {
                        message = "You feel like you weren't able to push yourself. You don't feel like you made any notable progress today";
                    }
                    else {
                        message = "You feel like you are getting to the peak of what you can do with this exercise.";
                    }
                    break;
                case 2:
                    message = "You feel like you had a modest workout.";
                    break;
                case 3:
                    message = "You feel like you were able to get a decent workout.";
                    break;
                case 4:
                    const player = Core_1.CoreUtils.getVariables().player;
                    if (!player.hadFitGasm) {
                        message = `At your peak exertion, your body involuntarily shudders and you let out a quiet moan.
                    ${Images_1.Images.drawRandomImage("core-gasm-NNN.jpg", 3)}. 
                    That was one mind-blowing workout. You'll probably feel a little sore tommorow, but it was so worth it.`;
                        player.hadFitGasm = true;
                    }
                    else {
                        message = `Your felt you got really into the work out. You had an excellent workout`;
                    }
                    break;
                default:
                    message = "You feel like you made a lot of progress on your path to fitness";
                    break;
            }
            return message;
        }
        static canDoMore() {
            let message;
            if (PlayerModel_1.PlayerModel.canExerciseToday()) {
                message = `
            After the exercise wraps up, you still feel like you could do some exercise today. 
            `;
            }
            else {
                message = `
             You feel completely drained for today. 
             `;
            }
            return message;
        }
    }
    exports.Exercises = Exercises;
});
