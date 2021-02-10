define(["require", "exports", "../Inventory/Inventory", "../Inventory/InventoryUX", "../Player/PlayerModel", "./Dialogue", "../Tasks/Tasks"], function (require, exports, Inventory_1, InventoryUX_1, PlayerModel_1, Dialogue_1, Tasks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DoH = void 0;
    class DoH {
        static hasAppointment() {
            return !Inventory_1.Inventory.has("drone-operator-license");
        }
        static meetAgents() {
            let log = "You enter the office area for the 'computer oversight' unit. After getting lost in the hallways a couple of times, you finally reach the right office.";
            log += `${Dialogue_1.Dialogue.heir(`Hi, I'm ${PlayerModel_1.PlayerModel.getHeirName()}. I'm here to get a drone operator license, under application DO #13601.`)}
        An formally dressed agent gets up to shake your hand, with a firm grip.
        ${Dialogue_1.Dialogue.agentGreen("Agent Green. D.O.H.")}
        ${Dialogue_1.Dialogue.agentGreen("This is my partner, Agent Black.")}
        ${Dialogue_1.Dialogue.agentBlack("How do you do.")}
        ${Dialogue_1.Dialogue.heir(`Uh, Hi.`)}
        You force a smile as a pleasantry. You feel anxious about authority figures.

        ${Dialogue_1.Dialogue.agentBlack("Our job is to help keep us safe from the dangers of illegal automation.")}
        ${Dialogue_1.Dialogue.agentBlack("For us, we know that what matters is the individual. For this reason the department assigns agents to get to know and liase with all computer-interfacing workers. Whenever you need to perform a change of status, or report any concerns, we will be your contacts with the department.")}
        ${Dialogue_1.Dialogue.agentGreen("That's right! You're an individual in our eyes.")}        
        ${Dialogue_1.Dialogue.agentBlack("The department requires us to validate all applications in person, before filing for human-drone operator licenses. It's all pretty much boilerplate. Ok, let's make this quick.")}
        ${Dialogue_1.Dialogue.agentGreen("You are " + PlayerModel_1.PlayerModel.getHeirName() + " Masterson. Correct?")}
        ${Dialogue_1.Dialogue.heir(`Uhh, yep, sure am.`)}
        ${Dialogue_1.Dialogue.agentGreen("Just the facts, maam. Gender - Female. Obviously.")}
        Agent Black Smiles.
        ${Dialogue_1.Dialogue.agentBlack(`Do you intend to subvert workers by replacing humanity with robots?`)}
        ${Dialogue_1.Dialogue.heir(`Nope.`)}
        ${Dialogue_1.Dialogue.agentBlack(`Do you believe robot values and culture is superior to our values and culture?`)}
        ${Dialogue_1.Dialogue.heir(`No.`)}
        You had never considered that there was such a thing as robot culture.
        ${Dialogue_1.Dialogue.agentBlack(`Are you currently, or have you ever been a member of a techno-marxist revolutionary movement seeking to enact non-democratic regime change with the help of robots?`)}
        You suppress a laugh. That question seems absurdly specific.
        ${Dialogue_1.Dialogue.heir(`Nope.`)}  
        ${Dialogue_1.Dialogue.agentBlack(`Perfect. That's all we need to confirm your application.`)}
        She starts signing on her tablet, and hands it to Agent Green, who likewise fills in his credential, and passes it over to you.
        ${Dialogue_1.Dialogue.agentBlack(`Please sign here to confirm the application`)}
        You sign. She takes the tablet back, prints you a document and hands it to yoy. 
        ${Dialogue_1.Dialogue.agentBlack(`And with that, you are a licensed drone operator! This form is your temporary license, your employer will recieve and file your permanent copy.`)}
        ${Dialogue_1.Dialogue.agentGreen(`See you around, DO #13601! Please close the door on your way out, and Keep your nose clean.`)}
        You shake the hands of both agents and head out.        
        `;
            InventoryUX_1.InventoryUX.add("drone-operator-license");
            Tasks_1.Tasks.removeTask("need-drone-license");
            return log;
        }
    }
    exports.DoH = DoH;
});
