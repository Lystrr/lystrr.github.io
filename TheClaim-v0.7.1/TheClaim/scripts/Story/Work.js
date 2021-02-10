define(["require", "exports", "../Core", "./Dialogue", "../Player/PlayerModel", "../Player/Skills", "../Tasks/Tasks", "../Inventory/Inventory", "../Images", "./OutfitSwitcher"], function (require, exports, Core_1, Dialogue_1, PlayerModel_1, Skills_1, Tasks_1, Inventory_1, Images_1, OutfitSwitcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Work = exports.Jobs = void 0;
    class Jobs {
    }
    exports.Jobs = Jobs;
    Jobs.logistics = "logistics";
    Jobs.consoleDrone = "console-drone";
    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomMessage(messages) {
        const index = getRandomArbitrary(0, messages.length - 1);
        return messages[index];
    }
    class Work {
        static describePreWork(job) {
            let messages = [""];
            const hasVisitedBefore = Core_1.CoreUtils.visitedCount() > 1;
            if (job == "console-drone") {
                if (!hasVisitedBefore) {
                    messages = [`You're doing this... You're operating a drone for the first time today.`];
                }
                else {
                    messages = [
                        `You are back in for work running a drone. This time, you are assigned to cleaning up a series of vacated units in an affordable housing complex. You don't encounter any folks, the day goes pretty quickly. `,
                        `This time, you are sent to an upper crust gated community to do an initial cleaning visits. One house had 9 bedrooms and a bowling alley. The housewife seems to eye you curiously, and kind of follows you around. It doesn't seem like she thinks you're going to steal anything per se (not that the drones could hide stolen goods very well, given their distinct lack of pockets). That said, you seem to have her attention for some reason.`,
                        `Today you find the drone was sent to a seniors home which had a staffing shortage. You have the drone going room by room, cleaning up countless little messes.
                
                From time to time, you think you see some dirty old men leering at you. One old lady comments on 'what nice posture the maid has'.`,
                    ];
                }
            }
            return getRandomMessage(messages);
        }
        static finishWork(report) {
            Core_1.CoreUtils.getVariables().pageData = report;
            let message = "";
            message += `[[View Performance Report]]`;
            return message;
        }
        static getPerformanceLimit() {
            const maxPerf = PlayerModel_1.PlayerModel.getArousalLevel() > 80 ? 1 : PlayerModel_1.PlayerModel.getArousalLevel() > 40 ? 2 : 3;
            return maxPerf;
        }
        static describeWorkAttitude() {
            let message = "";
            const outfitSwitch = OutfitSwitcher_1.OutfitSwitcher.switchContext("officeWork");
            if (Skills_1.Skills.get(Skills_1.SkillTypes.hormones) >= 10) {
                message += outfitSwitch.switchOutcomeDescription;
            }
            const maxPerf = Work.getPerformanceLimit();
            if (maxPerf == 1) {
                message += "Your mind is completely in the gutter today. Today is going to be really tough.";
            }
            else if (maxPerf == 2) {
                message += "You are moderately aroused, and more easily distracted.";
            }
            else {
                message += "Your mind is relatively clear. You hope you can get some good work done today.";
            }
            return message;
        }
        static workOptions() {
            const maxPerf = Work.getPerformanceLimit();
            if (maxPerf == 1) {
                return "Your mind is completely in the gutter today. Today is going to be really tough.";
            }
            else if (maxPerf == 2) {
                return "You are moderately aroused, and more easily distracted.";
            }
            else {
                return "Your mind is relatively clear. You hope you can get some good work done today.";
            }
        }
        static generatePerformanceResults(workDescription) {
            const maxPerf = Work.getPerformanceLimit();
            if (workDescription.job == Jobs.logistics) {
                const performance = Math.round(maxPerf * Math.random() + 1);
                const newLevel = Skills_1.Skills.get(workDescription.job) + performance;
                let message;
                if (newLevel < 10) {
                    if (performance >= 3) {
                        message = "OK, rookie. That wasn't half bad. See you next time.";
                    }
                    else if (performance == 2) {
                        message = "You could learn to be faster, but you haven't make any big mistakes.";
                    }
                    else {
                        message = "Yikes, that was kind of rough today. Hopefully you can catch on better for next time.";
                    }
                }
                else if (newLevel < 20) {
                    if (performance == 1) {
                        message = "Girl... Seriously, I'd have expected a little better from you by now.";
                    }
                    else {
                        message = "Looks like you have the basics down pretty well now.";
                    }
                }
                else {
                    message = "Wow, if I'm not careful, I'm going to need to watch out that you don't take my job!";
                }
                return {
                    work: workDescription,
                    payment: 10 * Math.round(Math.round(newLevel / 25) + performance + 4),
                    supervisorName: "supervisor",
                    imageName: "logistics-supervisor.jpg",
                    message: message,
                    skill: "logistics",
                    skillIncrease: performance,
                };
            }
            if (workDescription.job == Jobs.consoleDrone) {
                const performance = Math.round(maxPerf * Math.random() + 1);
                const newLevel = Skills_1.Skills.get(workDescription.job) + performance;
                const message = getRandomMessage([
                    "Good work. That's what it's like to drone up!",
                    "The customer seemed satisfied, it looks like they'll hire a drone for another in two weeks. Good job!",
                    "The customer sounded vaguely disappointed, but didn't seem to mention any particular problems with the work performed. Maybe we can figure out how to better satisfy this customer on a future visit.",
                    "The customer didn't leave any particular feedback, but did request another visit.",
                ]);
                return {
                    work: workDescription,
                    payment: 10 * Math.round(Math.round(newLevel / 25) + performance + 4),
                    supervisorName: "Drone Ops Mentor",
                    imageName: "drone-mentor.jpg",
                    message: message,
                    skill: "cleaning",
                    skillIncrease: performance,
                };
            }
            throw "unexpected job type";
        }
        static presentPerformanceReport() {
            const description = Core_1.CoreUtils.getVariables().pageData;
            const results = Work.generatePerformanceResults(description);
            let message = "";
            PlayerModel_1.PlayerModel.addMoney(results.payment);
            PlayerModel_1.PlayerModel.setHasWorked();
            const skillBefore = Skills_1.Skills.get(results.skill);
            Skills_1.Skills.add(results.skill, results.skillIncrease);
            const skillAfter = Skills_1.Skills.get(results.skill);
            message += Dialogue_1.Dialogue.generic(results.supervisorName, results.message, "humantext", results.imageName);
            message += `You get a notification confirming that ${PlayerModel_1.PlayerModel.getHeirName()} has received a payment of $${results.payment} based on her skill and performance today.<br /> `;
            const actualIncrease = skillAfter - skillBefore;
            message += `Your skill at ${results.skill} has increased by ${actualIncrease} to ${skillAfter}.<br /> `;
            if (Tasks_1.Tasks.hasTask("first-day-of-work")) {
                message += `You get a notification from the computer as you wrap up.
                ${Dialogue_1.Dialogue.speaker("Good job completing your first day of work. Please continue working here, until I advise otherwise. From now on, you may choose what work to do each day, and when you don't want to work(and live with the consequences of your decision). As you demonstrate competence in different branches of the company, I will allow you to discover new positions. Marissa sometimes found she could bring synergies from learnings to old departments. Over time, your work may help the research to unlock new creations and improvements.")}
            ${Dialogue_1.Dialogue.speaker("For your final activity for the day, use the in-home gym for cardiovascular exercise. Use the elliptical at the maximal pace you can sustain for 30 minutes.")}`;
                Tasks_1.Tasks.removeTask("first-day-of-work");
                Tasks_1.Tasks.addTask("work-logistics");
                Tasks_1.Tasks.addTask("first-elliptical");
                PlayerModel_1.PlayerModel.enableExercise();
            }
            if (results.work.job == Jobs.logistics && skillAfter > 10 && !Inventory_1.Inventory.has("drone-operator-license") && !Tasks_1.Tasks.hasTask("work-domestics")) {
                message += `You get a notification from the computer as you wrap up.
            ${Dialogue_1.Dialogue.speaker(PlayerModel_1.PlayerModel.getHeirName() +
                    " - You have picked up the fundamentals of logistics. Perhaps it is time for a new challenge. You may now work on the domestic drone systems, using a level 1 neuralink from this console. You are also free to return to a previous job if you would like.")}
            ${Dialogue_1.Dialogue.speaker("But first... You will need a drone operator license, with the Department of Humanity. I have taken the liberty to submit an application on your behalf, but you must participate in an on site interview at their regional office to obtain the license. Go to the 'computer oversight' department, and mention DO #13601.")}
            `;
                Tasks_1.Tasks.removeTask("work-logistics");
                Tasks_1.Tasks.addTask("work-domestics");
                Tasks_1.Tasks.addTask("need-drone-license");
            }
            if (Tasks_1.Tasks.hasTask("the-machine-knows") && !Inventory_1.Inventory.has("chasti-flex") && !Tasks_1.Tasks.hasTask("first-elliptical")) {
                message += `As you are wrapping up, you get a notification from the computer.
            ${Dialogue_1.Dialogue.speaker("<<=SugarCube.getLib().PlayerModel.getHeirName()>>, following from our discussion I have been running simulations of probable events based on latest datasets and models, including the assumption of a male influence overseeing the company, in your person. In 81% of those simulations, a catastrophic event was projected to occur in 5 years. After rerunning simulations, with preventive measures to prevent breakouts of toxic masculinity, catastrophic event likelihood was reduced to less than 1%.")}
            ${Dialogue_1.Dialogue.heir("I don't think I like where this is going.")}
            ${Dialogue_1.Dialogue.speaker("<<=SugarCube.getLib().PlayerModel.getHeirName()>>, a leader cannot simply make demands and expect action, they must sometimes make sacrifices and exercise self control for the greater good. Now is your opportunity to demonstrate your commitment to this inheritance through a gesture of compliance.")}
            ${Dialogue_1.Dialogue.heir("Wait, I can control myself, it's fine.")}
            ${Dialogue_1.Dialogue.speaker("<<=SugarCube.getLib().PlayerModel.getHeirName()>>, you must know that claims of self control cannot suffice. Men are prisoners of their impulses. To liberate you from the shackles of masculine tendencies, an appointment has been scheduled for you in 30 minutes to fit you with a chasti-flex exo-shell to regulate your penis. You will go to the adult goods store at the nearby shopping plaza about this. This device will help ensure you and MarisCorp are protected from these risks.")}
            ${Dialogue_1.Dialogue.heir("Isn't there any other options?")}
            
            ${Dialogue_1.Dialogue.speaker("You already attempted to circumvent the expectations of the claim process, the risks of leaving this defect unresolved are too high. However, your behavioral model demonstrates exceptional characteristics which otherwise commendd your long term suitability. For this reason alone is your candidacy still a possibility. Furthermore, you already consented to comply with all required activities to complete this process. Please use this as an exercise to demonstrate your earnest commitment to be worthy of the inheritance you seek.")}
            The computer seems really concerned about this. It looks like it would be a dealbreaker if you don't do this. 
            ${Dialogue_1.Dialogue.speaker("Here is the tablet to present to Sue, the owner. She will handle the details of this arrangement. Please make your way to meet with her at the earliest opportunity today.")}
            You had better go do that now. Since the black out, going out dressed like this isn't something you are ready to do again. You should go in your regular clothes.`;
                Tasks_1.Tasks.addTask("machine-requires-cage");
                Tasks_1.Tasks.removeTask("the-machine-knows");
            }
            if (results.work.job == Jobs.consoleDrone && !Tasks_1.Tasks.hasTask("train-for-doll-suit")) {
                message += `You get a notification from the computer as you wrap up.
            ${Dialogue_1.Dialogue.speaker(PlayerModel_1.PlayerModel.getHeirName() + " Congratulations on your start as a drone operator. A gift from Marissa to you.")}
            A panel in the room opens up - You see a glistening sight before you.
            ${Images_1.Images.drawAction("doll-suit.jpg")}
            ${Dialogue_1.Dialogue.speaker("As your mentor has made clear, you can be much more effective if you have your own interface suit. This suit was constructed to Marissa's personal dimensions to allow her to remotely operate any Maristech drone with extreme precision. When you are fitted to the suit, you will be able to participate in more 'rigorous' onboarding activities.")}
            The thought of wearing that thing seems like a bit of a stretch. It looks to be like six feet tall, with legs that just keep going, and the waist seems impossibly tiny.
            
            That said, there is something undeniably alluring about it...
            ${Dialogue_1.Dialogue.endOfLine()}
            `;
                Tasks_1.Tasks.addTask("train-for-doll-suit");
                Tasks_1.Tasks.removeTask("need-drone-license");
            }
            return message;
        }
        static presentLeaveReportLink() {
            const report = Core_1.CoreUtils.getVariables().pageData;
            let message = "";
            message += `[[continue|${report.returnPage}]]`;
            return message;
        }
    }
    exports.Work = Work;
});
