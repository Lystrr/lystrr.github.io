define(["require", "exports", "./IItem", "./Items", "../Link", "./OutfitsAnalyser"], function (require, exports, IItem_1, Items_1, Link_1, OutfitsAnalyser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutfitsExplainer = void 0;
    /**
     * Renders Explanation of analysed outfits
     *
     * */
    class OutfitsExplainer {
        static explainOutfitFromContext(context) {
            const scan = OutfitsAnalyser_1.OutfitsAnalyser.describeCurrentOutfit().assessments[context];
            return OutfitsExplainer.explainDetails(scan);
        }
        static explainDetails(explanation) {
            let content = "";
            content += "<table class='clothing-explanation-table'>";
            content += "<tr>";
            content += `<th>Valid</th>`;
            content += `<th>Item/Slot</th>`;
            content += `<th>Why</th>`;
            content += "</tr>";
            for (let i = 0; i < explanation.length; i++) {
                const rowExplanation = explanation[i];
                if (!rowExplanation.ignore) {
                    content += "<tr>";
                    content += `<td class="item-valid-column">${rowExplanation.meetsCriteria ? "✔️" : "❌"}</td>`;
                    content += `<td class="item-id-column">${rowExplanation.itemId != null ? Items_1.Items.renderItem(rowExplanation.itemId, "tiny") : ""}</td>`;
                    content += `<td>${rowExplanation.explanation}</td>`;
                    content += "</tr>";
                }
            }
            content += "</table>";
            return content;
        }
        static explainDetailsDialog(context) {
            const content = Link_1.makeLink("explain", `SugarCube.getLib().Prompt.message(SugarCube.getLib().OutfitsExplainer.explainOutfitFromContext('${context}'));`);
            return content;
        }
        static describeOutfitViability(outfitDescription) {
            const checks = OutfitsAnalyser_1.getvisibleOutfitContexts();
            let result = "";
            checks.map((context) => {
                const assess = outfitDescription.assessments[context];
                const isValid = OutfitsAnalyser_1.OutfitsAnalyser.isValid(assess);
                result += "<div>";
                result += `${context} ${isValid ? "✔️" : "❌"}`;
                result += OutfitsExplainer.explainDetailsDialog(context);
                result += "</div>";
            });
            return result;
        }
        static labelSavedOutfit(outfitDescription) {
            const checks = OutfitsAnalyser_1.getvisibleOutfitContexts();
            let result = "";
            checks.map((context) => {
                const assess = outfitDescription.assessments[context];
                const isValid = OutfitsAnalyser_1.OutfitsAnalyser.isValid(assess);
                if (isValid) {
                    result += `<span class="outfit-label">${IItem_1.emojifyContext(context)}  ${context} ✔️ </span>`;
                }
            });
            return result;
        }
    }
    exports.OutfitsExplainer = OutfitsExplainer;
});
