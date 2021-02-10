define(["require", "exports", "./CssLoader"], function (require, exports, CssLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageOverlay = void 0;
    class ImageOverlay {
        static reset() {
            CssLoader_1.CssLoader.EnsureCss("overlay.css");
            if (!ImageOverlay.isInitialized) {
                //TODO: Need to find a way to apply an in-page overlay which is a top level element, without corrupting Sugarcube's click handlers.
                const story = document.getElementById("ui-overlay");
                story.innerHTML += `

            <div id="image-overlay" class="image-overlay">                          
                <image  id="image-overlay-content" src="">
            </div>
          `;
                ImageOverlay.isInitialized = true;
            }
        }
        static hide() {
            const overlay = document.getElementById("image-overlay");
            overlay.style.display = "none";
        }
        static show(imagePath) {
            // prompt uses open always with a 0 open mode
            /*ImageOverlay.reset();
            const modal = document.getElementById("image-overlay");
            if (modal != null) {
                modal.style.display = "block";
            }
            const modalContent = document.getElementById("image-overlay-content") as HTMLImageElement;
            modalContent.src = imagePath;
            */
            window.open(imagePath);
        }
    }
    exports.ImageOverlay = ImageOverlay;
    ImageOverlay.isInitialized = false;
    ImageOverlay.isActive = false;
});
