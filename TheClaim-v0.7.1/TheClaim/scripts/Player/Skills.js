define(["require", "exports", "../Core"], function (require, exports, Core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Skills = exports.SkillTypes = void 0;
    class SkillTypes {
    }
    exports.SkillTypes = SkillTypes;
    SkillTypes.cardio = "cardio";
    SkillTypes.flexibility = "flexibility";
    SkillTypes.hormones = "hormones"; //Hormones from the motivator and computer. Drives bodily properties
    SkillTypes.logistics = "logistics";
    SkillTypes.cleaning = "cleaning";
    SkillTypes.weight = "weight"; //kg
    SkillTypes.waist = "waist"; //cm
    SkillTypes.ass = "ass"; //cm
    SkillTypes.height = "height"; //cm
    SkillTypes.facialFem = "facialFem";
    SkillTypes.hairLength = "hairLength";
    //Milestones
    SkillTypes.breasts = "breasts"; //Discrete steps
    SkillTypes.hormoneAccumulation = "hormoneAccumulation";
    /**
     * Represents character skills/abilities/bodily attributes.
     * (Representation only. No UI/Experience Code)
     */
    class Skills {
        static ensure() {
            if (Core_1.CoreUtils.getVariables().player.skills == null) {
                Core_1.CoreUtils.getVariables().player.skills = {};
            }
        }
        static set(skillName, value) {
            Skills.ensure();
            Core_1.CoreUtils.getVariables().player.skills[skillName] = value;
        }
        static get(skillName) {
            Skills.ensure();
            return Core_1.CoreUtils.getVariables().player.skills[skillName] || 0;
        }
        static add(skillName, addition, max = 100) {
            Skills.ensure();
            let initialVal = Skills.get(skillName);
            if (initialVal == undefined) {
                initialVal = 0;
            }
            Skills.set(skillName, Math.min(initialVal + addition, max));
        }
    }
    exports.Skills = Skills;
});
