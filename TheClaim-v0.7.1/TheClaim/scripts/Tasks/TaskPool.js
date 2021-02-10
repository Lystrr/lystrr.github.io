define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateTasks = exports.appendItem = void 0;
    function appendItem(dictionary, item) {
        dictionary[item.id] = item;
    }
    exports.appendItem = appendItem;
    function generateTasks() {
        const tasks = {};
        appendItem(tasks, { id: "drop-luggage", description: "Drop off your luggage in the guest bedroom." });
        appendItem(tasks, { id: "explore", description: "It's time to start exploring!" });
        appendItem(tasks, { id: "check-pawn-ticket", description: "I should see what the story on the pawn ticket is." });
        appendItem(tasks, { id: "can-the-key-be-used", description: "Does the key have a use somewhere in the house?" });
        appendItem(tasks, { id: "check-secret-room", description: "This place has a secret room! What's that about?" });
        appendItem(tasks, { id: "house-has-clothes", description: "Does Stacy have clothes that would work for the door?" });
        appendItem(tasks, { id: "clothing-needs-cleaning", description: "Some clothing needs to be cleaned" });
        appendItem(tasks, { id: "player-needs-shower", description: "I should get a shower", isHidden: true });
        appendItem(tasks, { id: "wear-stacy-clothes", description: "Will Stacy's clothes work at the door? One way to find out." });
        appendItem(tasks, { id: "check-adult-store", description: "The local strip mall might have a wig or something you can use for the door." });
        appendItem(tasks, { id: "first-shave", description: "Marissa's letter said the claimant would need to be shaved to get past the door." });
        appendItem(tasks, { id: "regular-shave", description: "You are starting to feel some stubble. Maybe it's time for another shave?" });
        const beatScanner = "how-to-beat-the-scanner";
        appendItem(tasks, { id: beatScanner, description: "This place has hidden treasure. There has to be a way to trick the scanner to get it?" });
        appendItem(tasks, { id: "have-hair", description: "The door is looking to see the claimant in a hairstyle like Marissa's, in the picture.", parentId: beatScanner });
        appendItem(tasks, { id: "have-makeup", description: "The door is looking to see the claimant wearing makeup, as Marissa mentioned.", parentId: beatScanner });
        appendItem(tasks, { id: "have-heels", description: "The door is looking to see the claimant wearing sandal heels (without socks) like pictured.", parentId: beatScanner });
        appendItem(tasks, { id: "learn-makeup", description: "An online tutorial might help for the makeup.", parentId: beatScanner });
        appendItem(tasks, { id: "find-gaff", description: "Sue might have something to help you hide your dick from the door.", parentId: beatScanner });
        appendItem(tasks, { id: "tasks-for-pod-area", description: "Dev note: Tasks for the pod area are being added. Gameplay exists, but the tasks will be catching up." });
        appendItem(tasks, {
            id: "start-inheritance-claim",
            description: "Now that you are past the door, maybe the console in the inner room can help with arranging the inheritance claim.",
        });
        const healthTracking = "start-health-tracking";
        appendItem(tasks, {
            id: healthTracking,
            description: "The inner chamber console needs you to provide health info.",
            parentId: "start-inheritance-claim",
        });
        appendItem(tasks, { id: "get-motivator-plug", description: "The computer has a surprise for you at the health screen of the console.", parentId: healthTracking });
        appendItem(tasks, {
            id: "register-voice",
            description: "The inner chamber console needs you to register your voice to control the systems.",
            parentId: "start-inheritance-claim",
        });
        appendItem(tasks, {
            id: "train-voice",
            description: "You need to complete some voice training at the inner chamber console, in order to register as a user.",
            parentId: "register-voice",
        });
        appendItem(tasks, {
            id: "get-omni-pod-checkup",
            description: "The omni pod will need to do an initial health checkup and ensure good health of the claimant.",
        });
        appendItem(tasks, {
            id: "get-omni-pod-voice-fix",
            description: "The omni pod might help with your voice problem.",
            parentId: "train-voice",
        });
        appendItem(tasks, {
            id: "start-health-assessment",
            description: "The computer needs to run some tests of your fitness to process your claim.",
            parentId: "start-health-tracking",
        });
        appendItem(tasks, {
            id: "need-running-shoes",
            description: "To go running, computer needs you get some running shoes from the local mall. At least they are pre-paid.",
            parentId: "start-health-assessment",
        });
        appendItem(tasks, {
            id: "first-elliptical",
            description: "Due to your 'agoraphobia' the computer wants you to do a 30 minute jog on the in-house gym elliptical. This should be a piece of cake.",
            parentId: "start-health-assessment",
        });
        appendItem(tasks, {
            id: "improve-conditioning",
            description: "The computer would like you to keep actively exercising to improve your physical fitness.",
        });
        appendItem(tasks, {
            id: "improve-flexibility",
            description: "The computer would like you to continue working on your cardio, but also start working on maximizing flexibility to become physically ready for the demands of your inheritance.",
        });
        appendItem(tasks, {
            id: "the-machine-knows",
            description: "The computer knows your secret, and allowed you to continue on the claim process. Feelings of uncertainty float over you.",
        });
        appendItem(tasks, {
            id: "first-day-of-work",
            description: "It looks like the claim is moving ahead! You need to read up on Maristech Logistics Systems, rest in the pod, and use the computer to work remotely for your first day as a trainee.",
        });
        appendItem(tasks, {
            id: "work-logistics",
            description: "The computer would like you to keep learning at the logistics job from the console, as the first step in learning about the company.",
        });
        appendItem(tasks, {
            id: "work-domestics",
            description: "As you've proven you can understand the essentials with logistics, the computer would like you to try working on the MarisHome domestic services, from the console.",
        });
        appendItem(tasks, {
            id: "need-drone-license",
            description: "To operate robot-drones, a drone operator license is needed, to stay in compliance with the Butler-Hancock act. The computer has filed for one on your behalf. You just need to go to take your car to the local branch office of the Department of Humanity for an interview and to collect your license. ",
        });
        appendItem(tasks, {
            id: "machine-requires-cage",
            description: "The computer requires you get a chastity cage today, to satisfy Marissa's will. And some bs 'prevent corruption from a masculine' influence, whatever that is supposed to mean. You aren't ready to handle the stress of going out as a girl again, you should go dressed as Billy.",
            requiredToday: true,
        });
        appendItem(tasks, {
            id: "need-sexual-relief",
            description: "You can't think about anything but sex and the computer isn't letting you remove the cage, and isn't telling you how to deal with this. Maybe Sue could help you come again.",
        });
        appendItem(tasks, {
            id: "train-for-doll-suit",
            description: "(NOT IMPLEMENTED YET) You will need to use the 'doll suit' to move ahead with more 'rigorous' onboarding for MarisTech. ",
        });
        appendItem(tasks, {
            id: "need-hair-styling",
            description: "(NOT IMPLEMENTED YET) Your hair is has grown beyond any typical male hairstyle- it doesn't look well arranged right now, and a typical barber isn't an option now. You will want to get it styled, but you don't know what you should get. Maybe a friend can help.",
        });
        appendItem(tasks, {
            id: "sexual-relief-sue-round-2",
            description: "Sue and the computer have arranged for you to get another round of 'relief'. The heiress can stop by Sue's shop to take advantage of the opportunity at her leisure.",
        });
        appendItem(tasks, {
            id: "marissa-logs-released",
            description: "The computer has notified you that Marissa's personal logs have been released, to help prepare you for your responsibilities.",
        });
        appendItem(tasks, { id: "watch-miami-vice", description: "A movie would be nice right now." });
        appendItem(tasks, { id: "watch-batman", description: "A movie would be nice right now." });
        appendItem(tasks, { id: "watch-robin-hood", description: "A movie would be nice right now." });
        appendItem(tasks, { id: "dust-library", description: "You need to dust the library", requiredToday: true });
        appendItem(tasks, { id: "clean-cinema", description: "You need to clean the cinema", requiredToday: true });
        appendItem(tasks, { id: "clean-grand-hall", description: "You need to tidy up the grand hall.", requiredToday: true });
        return tasks;
    }
    exports.generateTasks = generateTasks;
});
