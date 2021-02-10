define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoreUtils = void 0;
    function getVariables() {
        return SugarCube.State.active.variables;
    }
    function setVariables(vars) {
        SugarCube.State.active.variables = vars;
    }
    function playPassage() {
        const passage = SugarCube.State.passage;
        SugarCube.Engine.play(passage);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function groupBy(getItem, items) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line @typescript-eslint/ban-types
        return items.reduce((groups, obj) => {
            const identifier = getItem(obj) || "";
            groups[identifier] = (groups[identifier] || []).concat(obj);
            return groups;
        }, {});
    }
    function getDay() {
        return CoreUtils.getVariables().day;
    }
    function getPageName() {
        return `<div class="hidden page_${SugarCube.State.turns}"></div>`;
    }
    // TODO move to use this.
    class CoreUtils {
        static getPassageName() {
            return SugarCube.State.active.title;
        }
        static hasPlayed(passage = null) {
            return SugarCube.State.hasPlayed(passage != null ? passage : CoreUtils.getPassageName());
        }
        static visitedCount(passage = null) {
            passage = passage != null ? passage : CoreUtils.getPassageName();
            return SugarCube.Scripting.evalTwineScript(`visited('${passage}')`);
        }
    }
    exports.CoreUtils = CoreUtils;
    CoreUtils.getDay = getDay;
    CoreUtils.getPageName = getPageName;
    CoreUtils.getVariables = getVariables;
    CoreUtils.setVariables = setVariables;
    CoreUtils.groupBy = groupBy;
    CoreUtils.playPassage = playPassage;
});
