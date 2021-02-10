requirejs.config({
    baseUrl: ''
});
requirejs(["scripts/ClaimScripts.js"], function(util) {
    Window.notifyDone();
});