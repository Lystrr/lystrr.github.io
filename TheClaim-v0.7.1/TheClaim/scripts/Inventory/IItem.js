define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.emojifyContext = void 0;
    function emojifyContext(context) {
        let result;
        switch (context) {
            case "fitness":
                result = "⚽";
                break;
            case "swimwear":
                result = "🏊‍♀️";
                break;
            case "sleepwear":
                result = "🌙";
                break;
            case "officeWork":
                result = "💼";
                break;
            case "casual":
                result = "😃";
                break;
            case "anything":
                result = "♾️";
                break;
            default:
                result = "";
        }
        return result;
    }
    exports.emojifyContext = emojifyContext;
});
