define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Versioning = void 0;
    class Versioning {
        static getVersionDescriptions() {
            return [
                {
                    saveVersion: 5,
                    versionId: "0.7.1",
                    description: `Fixes of Player reported issues

🐞Bugs/Accessibility:
* Polyfill String.replaceAll() for constrained/non-modern browsers which don't implement it. This error was blocking for some dialogue passages for folks using Internet Explorer or possibly some proprietary browsers.
* Fix formatting errors on Marissa's Personal Logs.
* Fix links from Marissa's Personal logs to not jump to console.
* Fix formatting error after some dialogue passages.
* Tidy up some minor grammar issues in text passages.
* Updated dev notes and start page to reinforce the importance of players reporting issues.
                `,
                },
                {
                    saveVersion: 5,
                    versionId: "0.7.0",
                    description: ` Story advancement               
🗺️Worldbuilding:
* Round out inventory of Shoes at Shoeboxx (Ankleboots, ballet flats, block heels, dress sandals, knee high boots, loafers, pumps, stilettos, wedge heels)
* Add task to Allow player to access a partial set of Marissa's personal logs at threshold + previews of corrupted files.

📚Story+Continuity:
* 2nd bedroom encounter with Sue
* Define initial latex outfits for MC
* Oh no, 2nd Breast Growth Incident Morning Event! MC can still cosplay in boy clothes.
* Hair growth Milestone  - morning event + Styling Tasks
* Allow wig-less outfits after player reaches girly hair threshold.
* Only allow MC to fast forward to Inner chamber, if wearing a feminine outfit.
* Allow MC to manually enter the inner chamber in any feminine outfit, not specifically the Final yoga outfit, as long as inner chamber was previously visited.

✨UX Refinement:
* Add "Ass" metric for body details
* Add "EstroMet" tracker for body details
* Expand variety for yoga + cardio exercise grind imagery

🐞Bugs/Accessibility:
* Fix presentation of fractions.
* Fix Player profile image resetting to day 0 appearance
* Consistency: Change issue motivator plug to be given based on # of visits to Elliptical, rather than performance from elliptical training

🤓Internals:
* Enable of Save last outfit to game state + Restore outfit from game state
* Enable masked/partial undress of items
* Define item creation template in ItemGenerator 
* Update Developer Notes doc to address recurring topics
                `,
                },
                {
                    saveVersion: 5,
                    versionId: "0.6.1",
                    description: `Bugfixes Update
                
🐞Bugs/Accessibility:
* Fix shower error with makeup removal
* Fix transcription bug - Move sports bra to go back to bra slot, not underwear
* Fix transcription bug - Re-enable missing athletic shoes in item generator
* Prevent availability of outfit assessments until after player has visited inner chamber for first time.
* Refine player avatar transitions to appear slightly more quickly, but still at a reduced pace.

`,
                },
                {
                    saveVersion: 5,
                    versionId: "0.6.0",
                    description: `The self-aware wardrobe update  :
🗺️Worldbuilding:
* N/A

📚Story+Continuity:
* Add alternate messages for drone and warehouse work + automatic outfit switch text.
* Cover Chest soreness as a health topic for the computer
* Shift facial drift to be hormonally induced each day, not merely a consequence of on time.
* Add simple first-time wear message for babydoll outfit

✨UX Refinement:
* Provide a Mirror in basement
* Provide expanded hover images for clothing
* Provide declarative explanation model for why an outfit was or wasn't accepted + Expose as dialog from mirror UI
* Auto switching to Exercise Outfit if available
* Set up auto-switching of Work and Sleep Outfits, if available.
* Label clothes by supported Activity with emoji & tooltips.

🐞Bugs/Accessibility:
* Stockings @ Covert - Populate for missing stockings item 41
* Refine message for chest sensitivity
* Fix up scaling of wedge shoes
* Apply Item sorting by ID not name in stores and wardrobe

🤓Internals:
* Major code housekeeping! Clean up of dead variables. Consolidate logic into appropriate modules. Kill off dead-end classes.
* Create metadata for clothing categories in internal Model to describe uses of clothes
* Generalize outfit recognition filters for casual, sleep, work, fitness, etc.
`,
                },
                {
                    saveVersion: 5,
                    versionId: "0.5.0",
                    description: `Misc Minor Expansion :
Worldbuilding
* Provide initial HR onboarding for drone operation.
* Introduce Player to Marissa's dollsuit after first day on drone ops

Story+Continuity:
* Add blouses at Olddorf
* Add Turtleneck tops at Olddorf
* Add hoisery at Covert Natasha
* Add boyshorts & briefs at C.N.
* Add Babydoll nightwear at Covert Natasha
* Provide first example of bodily state indicators on status screen (Chest)
* Populate initial stock of heels & wedges at Shoeboxx
* Refine dildo use text for repeat use

Bugs/Accessibility:
* Fix verbiage for tendril to be specifc underwear agnostic
* Provide explanations for blocked sleep
* Factor mirror to be usable from Gym
* Fix exhaustion threshold to retain motivator "benefits"
* Warn about socks at door.
`,
                },
                {
                    saveVersion: 5,
                    versionId: "0.4.0",
                    description: `World building update:
* Add womens formal wear store at mall + populate Outfits
* Define Covert Natasha storefront
* Add Yoga exercises
* Add lore around Maristech domestic services
* Add Department of Humanity registration interview for drone operator license

Story+Continuity:
* Expose work skill levels from status screen
* Generalize exercise model. Track for cardio and flexibility stats.
* Provide "motivator-plug" for improved fitness endurance and gains.
* Increase chest sensitivity in presence of min hormone threshold. Bra no longer optional.
* Warn about shaving + Provide shave action from Mirror
* Provide new image for showering at day 10
* Block ambiguous outfits at front door of house
* Continuity - Introduce male name to sue at beginning
* Add positive feedback from Sue to female PC when player has been exercising today.
* increase player endurance with motivator plug active
* Add bra-requirement from increased hormone induced sensitivity.
* Track initial body attributes for weight, height and waist from status screen. Adjust daily based on fitness status.
* Wire up work model to wrap up warehouse job
* Give initial variable feedback at work & Gym
* Add conversations with computer and experience with Sue wrt "relief"
* Add arousal tracking for main character
* Add work productivity penalty and reduced capacity for exercise due to poor sleep

Simplification:
* Allow player to shower and launder from Mirror

Bugs/Accessibility:
* Provide click-zoom view for currently worn clothing & portraits
`,
                },
                {
                    saveVersion: 4,
                    versionId: "0.3.1",
                    description: `Bug fixes and Clothing experience improvement

Simplification:
* From the closet, provide visual feedback about the outfit's effectiveness, once the player has reached the inner chamber
* Allow quick toggling makeup from the Mirror, once the player has reached Inner Chamber

Bugs/Accessibility:
* Reject outfits as non feminine if there is no head accessory/wig (for now)
* Block library cleaning, until player has dropped off their luggage
`,
                },
                {
                    saveVersion: 4,
                    versionId: "0.3.0",
                    description: `Story Expansion + Quality of Life improvements (Less clicking!)

Simplification:
* Add shortcuts to bypass multi-hop paths between major locations (Grand Hallway, Bedroom, Inner Chamber, Strip Mall, Central Mall)
* Auto-Clean clothes when showering.

Story+ Continuity:
*Enforce non-removability of special clothing
*Implement the "Consequences" of Day 6
*Allow sleeping in the pod in day 7+
*Allow repeated visits to elliptical + work
*Block sleeping for mandatory "today" tasks
*Add Mall dialogue for added confidence on second visit.
*Block purchase of specialized clothing until player reaches a higher level of clothing tolerance (Racy clothing tiers/styles to follow a similar model)
*Treat swimwear as first example of "contextual" clothing
*Force extreme path of day 6 as the canon path for now, to allow for player to reach Open world phase of clothing tolerance 2. (Support of the more "reasonable" branches will come in time)

Bugs/Accessibility:
*Fix broken day 1 reference to main character image references
*Require task for shaving, before player can successfully learn.
*Add $ prefix on prices
*Expand status page to cover clothing tolerance
`,
                },
                {
                    saveVersion: 4,
                    versionId: "0.2a.1",
                    description: `Story expansion + Minor bug fixes (May have minor save compatability issues)

Story:
*Provide player character with their first "job+income" at Maristech.
*Add Exercise room + initial exercise mechanic with repeatable Elliptical Exercise.
*Allow character to sleep after work and/or exercise after 7th day.  (Purely mechanical, no story from there yet)
*Add first "experiences" in the pod for day 6. ;)

Worldbuilding+ Continuity:
*Provide high level background about what Maristech does
*Add HR Rep and Warehouse supervisor characters
*Provide basement bathroom+ Shower

Internals:
*Make more subtle transitions of player portraits

Bugs/Accessibility:
*Stabilize for robin hood movie task order
*Fix for known occurrences of hard coded player character name use
*Fix for know file path issues
*Mirror - Tweak introductory experience slightly, to make use more obvious.
*Mirror - Fix for removing multi-slot clothing in all slots when putting on other clothing.

`,
                },
                {
                    saveVersion: 4,
                    versionId: "0.2a.0",
                    description: `A significant internal update. Task tracking support and major refactorings broke with past savegames in this update.

UX Refinements:
*Clean up presentation of store inventory
*Move Mirror to Player's room
*Add Task Tracker page + Integrate tasks in with existing experiences
*Provide red overlay for outfit items which are now removed.

Story:
*Add context about globe during dusting
*Require cleaning of theater + library on day 1

Internals:
*Break up css to Sass
*rationalize code usages from twee
*Separate codefiles for maintainability
*Enable modular loading of scripts.
*fix image paths for dialogue
*Provide interface for sugarcube variable usage.
*Factor common player logic to shared functions
*Start validating save games for compatability. 

Worldbuilding:
*Add store inventory at sporting goods

Bugs/Accessibility:
*Fix Reddit link which broke flow
*add html based Prompt + Stabilize Prompt for keyboard input
`,
                },
                {
                    versionId: "0.2.2",
                    description: `The Wardrobe UI update:
* Supplemental case Sensitivity fix for character images - Moved usages of profile images to strictly use lower case
* Upgraded clothing system to support creation, update, rename and deletion of named outfits with previews.
* Changed individual clothing change mechanism to only provide messages on first wearing of new clothes, and to only provide player commentary on first occurrence.
* Normalized location images towards ~600px width
* Cleaned up Inner Door logic to better handle wardrobe issues.
* Updated jogging cliffhanger message.
* Updated tests to handle Mirror-clothing system overhaul.`,
                },
                {
                    versionId: "0.2.1",
                    description: `Early bug reactions 
* Fixed bug where Clean house wasn't being recorded, and player could never sleep. Moved the day 4 "Clean House" action from the left side bar UI to occur in the Grand Hallway. Re-Tested to make sure the player can (watch movie, clean and sleep) or (clean, watch movie and sleep).
* Updated developer notes section to provide link to actual forum page for feedback. 
* Make init stage more strict + suppress presentation of in-game details on Left-bar, when viewing the Developer notes which is "out of game".
* Defined Version Log page.
* Standardize image paths to all use lower-casing.`,
                },
                {
                    versionId: "0.2.0",
                    description: `
* First public 'Alpha' version`,
                },
            ];
        }
        static summarizeVersions() {
            return Versioning.getVersionDescriptions()
                .map((item) => {
                let row = `<div class='version-group'>`;
                row += `<div class='version-header'>Version: ${item.versionId}\n</div>`;
                row += `<div>${item.description}\n</div>`;
                row += `</div>`;
                return row;
            })
                .join("");
        }
    }
    exports.Versioning = Versioning;
    Versioning.saveVersion = 4;
    Versioning.lastSupportedVersion = 4;
});
