define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeLink = void 0;
    /**
     * Encapsulates player invokable operations
     */
    function makeLink(label, clickScript, className = "") {
        let link = `<a `;
        link += `onClick="${clickScript}" `;
        if (className) {
            link += `class="${className}" `;
        }
        link += `>${label}</a>`;
        return link;
    }
    exports.makeLink = makeLink;
});
