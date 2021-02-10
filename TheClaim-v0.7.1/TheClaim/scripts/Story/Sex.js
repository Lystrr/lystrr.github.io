define(["require", "exports", "../Core", "../Images", "../Player/PlayerModel", "../Tasks/Tasks"], function (require, exports, Core_1, Images_1, PlayerModel_1, Tasks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sex = void 0;
    class Sex {
        static dildoSelf() {
            PlayerModel_1.PlayerModel.triggerSexualRelease(false);
            let isFirstTime = false;
            if (Tasks_1.Tasks.hasTask("need-sexual-relief")) {
                Tasks_1.Tasks.removeTask("need-sexual-relief");
                isFirstTime = true;
            }
            let prefix;
            let message;
            let suffix;
            if (isFirstTime) {
                prefix = "You have been tortured too long with your dick locked away.";
                suffix = ";";
            }
            else if (PlayerModel_1.PlayerModel.getArousalLevel() > 80) {
                prefix = `Your mind is loopy for sex, it kills you to admit it, but it was getting hard not to think of sliding the dildo deep inside you .`;
                suffix = "The omni-present thoughts of sex have faded to the background. You feel you can concentrate again, for now. ";
            }
            else {
                prefix = `You have been feeling like you need to fill that void inside you.`;
                suffix = "You feel like you have released a good bit of tension. You are already starting to think of next time.";
            }
            if (Core_1.CoreUtils.visitedCount() > 5) {
                message = `
            ${prefix}
            
            While you haven't been doing it incessantly, this isn't your first time either. You've started to get a little ritual.
            ${Images_1.Images.drawAction("dildo-first.gif")}
            
            Where you started with just an uncontrollable animalistic need for release, your mind now seems to fantasize how a girl feels as she is being penetrated deep, deep inside.
            ${Images_1.Images.drawAction("orgasm-face.gif")}

            You find your muscles tighten up, an see a stream little dribble of clear fluid coming out from your little cage.

            ${suffix} 
        `;
            }
            else {
                message = `
            ${prefix}
            You apply some lube, and slide a finger in, and follow with a second to loosen things up.

            After you warmed things up, you slide the tip of dildo in, to see how it feels.    
            
            Not altogether unpleasant, so you try it a little deeper this time.
            ${Images_1.Images.drawAction("dildo-first.gif")}
    
            From there the sensation kind of turns you on. At this point, a primal urge starts to take over your hyper-aroused mind, and you start agressively pumping in a daze. 
            
            You regain your senses as a piercing moan draws your attention back to the moment, and a couple streams of cum burst forth from the cage.            
            ${suffix}
            `;
            }
            return message;
        }
    }
    exports.Sex = Sex;
});
