define(["require", "exports", "../Core", "./CssLoader"], function (require, exports, Core_1, CssLoader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Prompt = void 0;
    class Prompt {
        static reset() {
            CssLoader_1.CssLoader.EnsureCss("Prompt.css");
            const story = document.getElementById("story");
            story.innerHTML += `
            <!-- The Modal -->
            <div id="myModal" class="modal-dialog" onClick="if(event.target.className == 'modal-dialog'){ SugarCube.getLib().Prompt.close();}">
            

              <!-- Modal content -->
              <div class="" id="modal-content" onClick="return;">
                <span class="close" onclick="SugarCube.getLib().Prompt.close();">&times;</span>
                <p id="modal-message" class="modal-message">Some text in the Modal..</p>
                <div id="modal-footer">
                    <input type="text" id="modal-prompt-text" class="modal-prompt-text" required minlength="1" maxlength="50" onkeydown="SugarCube.getLib().Prompt.checkKey(event)">
                    <button class="modal-prompt-ok" onclick="SugarCube.getLib().Prompt.ok()">OK</button>
                </div>
              </div>
            
            </div>
          `;
            if (Prompt.isOpen) {
                Prompt.close(() => {
                    if (Prompt.reject) {
                        Prompt.reject();
                    }
                });
            }
            const modalFooter = document.getElementById("modal-footer");
            modalFooter.className = "";
            const modalContent = document.getElementById("modal-content");
            modalContent.className = "";
        }
        static close(action) {
            if (Prompt.isOpen) {
                Prompt.isOpen = false;
                const modal = document.getElementById("myModal");
                if (modal) {
                    const parent = modal.parentNode;
                    if (parent != null) {
                        parent.removeChild(modal);
                    }
                }
                if (action != null) {
                    action();
                }
                else {
                    Core_1.CoreUtils.playPassage();
                }
            }
            Prompt.resolve = null;
            Prompt.reject = null;
        }
        static ok() {
            const modalPrompt = document.getElementById("modal-prompt-text");
            if (Prompt.isOpen) {
                Prompt.close(() => {
                    if (Prompt.resolve && modalPrompt) {
                        Prompt.resolve(modalPrompt.value);
                    }
                });
            }
        }
        static checkKey(event) {
            if (event.key == "Enter") {
                Prompt.ok();
            }
            if (event.key == "Escape") {
                Prompt.close(() => {
                    if (Prompt.reject != null) {
                        Prompt.reject();
                    }
                });
            }
        }
        static prompt(message, defaultName) {
            const promise = new Promise((resolve, reject) => {
                Prompt.reset();
                Prompt.isOpen = true;
                Prompt.resolve = resolve;
                Prompt.reject = reject;
                // prompt uses open always with a 0 open mode
                const modal = document.getElementById("myModal");
                if (modal != null) {
                    modal.style.display = "block";
                }
                else {
                    reject();
                }
                const modalMessage = document.getElementById("modal-message");
                if (modalMessage != null) {
                    modalMessage.textContent = message;
                }
                else {
                    reject();
                }
                const modalPrompt = document.getElementById("modal-prompt-text");
                modalPrompt.value = defaultName;
                modalPrompt.focus();
            });
            return promise;
        }
        static message(message) {
            const promise = new Promise((resolve, reject) => {
                Prompt.reset();
                Prompt.isOpen = true;
                Prompt.resolve = resolve;
                Prompt.reject = reject;
                // prompt uses open always with a 0 open mode
                const modal = document.getElementById("myModal");
                if (modal != null) {
                    modal.style.display = "block";
                }
                else {
                    reject();
                }
                const modalMessage = document.getElementById("modal-message");
                if (modalMessage != null) {
                    modalMessage.innerHTML = message;
                }
                else {
                    reject();
                }
                const modalFooter = document.getElementById("modal-footer");
                modalFooter.className = "collapse";
                const modalContent = document.getElementById("modal-content");
                modalContent.className = "wide";
                const modalPrompt = document.getElementById("modal-prompt-text");
                modalPrompt.value = "";
                modalPrompt.focus();
            });
            return promise;
        }
    }
    exports.Prompt = Prompt;
    Prompt.isInitialized = false;
    Prompt.isOpen = false;
    Prompt.resolve = null;
    Prompt.reject = null;
});
