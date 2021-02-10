define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CssLoader = void 0;
    class CssLoader {
        // Weak substitute for sass
        static EnsureCss(filename) {
            if (CssLoader.loadedCss[filename] == null) {
                const cssLink = document.createElement("link");
                cssLink.rel = "stylesheet";
                cssLink.type = "text/css";
                cssLink.href = `css/${filename}`;
                document.head.append(cssLink);
                this.loadedCss[filename] = true;
            }
        }
    }
    exports.CssLoader = CssLoader;
    CssLoader.loadedCss = {};
});
