/* Utility Code - Start */
/* isObject: Returns if Value is an object (not including "null"). */
setup.isObject = function (Value) {
	return !!Value && typeof Value === "object";
};

/* isProperty: Returns if Prop is a property of the object Obj. */
setup.isProperty = function (Obj, Prop) {
	var result = false;
	if (setup.isObject(Obj)) {
		result = Obj ? hasOwnProperty.call(Obj, Prop) : false;
		if (!result) {				 /* if not pass... */
			try {
				if (Obj[Prop] === undefined) {
					result = false;  /* double-check fail */
				} else {
					result = true;   /* double-check pass */
				}
			} catch(error) {
				result = false;		 /* error fail */
			}
		}
	}
	return result;
};
/* Utility Code - End */

Config.saves.onLoad = function (save) {
	/* Create the Right UI Bar. */
	var $rightUiBar = $('<div id="right-ui-bar"></div>').insertAfter("#ui-bar");

	
	var i, hist = save.state.history;
	/* Retroactively add missing variables throughout game history. */
	for (i = 0; i < hist.length; i++) {
		if (!setup.isProperty(hist[i].variables, "tieImage")) {
			hist[i].variables.tieImage = "images/clothes/neck/purple_stripe.png";
		}
		if (!setup.isProperty(hist[i].variables, "jacketImage")) {
			hist[i].variables.jacketImage = "images/clothes/shirts/school_jacket.png";
		}
		if (!setup.isProperty(hist[i].variables, "makeupImage")) {
			hist[i].variables.makeupImage = "images/body/makeup/the_works.png";
		}
		if (!setup.isProperty(hist[i].variables.player, "crush")) {
			if (visited("Girlfriend Girltalk AskOutQB")) {
				hist[i].variables.player.crush = hist[i].variables.qb.firstname;
			} else {
				hist[i].variables.player.crush = hist[i].variables.girlfriend.firstname;
			}
		}
		if (!setup.isProperty(hist[i].variables, "witchClub")) {
			hist[i].variables.witchClub = 0;
		}
		if (!setup.isProperty(hist[i].variables, "braShoppingActive")) {
			hist[i].variables.braShoppingActive = false;
		}
		if (!setup.isProperty(hist[i].variables, "garcia")) {
			hist[i].variables.garcia = { suspicion: 0, detention: false, therapy: false };
		}
		if (setup.isProperty(hist[i].variables, "therapistPassage") && hist[i].variables.therapistPassage == "End of Current Content") {
			hist[i].variables.therapistPassage = "Therapist 2";
		}
		if (!setup.isProperty(hist[i].variables, "tfCircumstances")) {
			hist[i].variables.tfCircumstances = { "setting": "", "reason": "", "witnesses": "", "extraClothing": ""};
		}
		if (!setup.isProperty(hist[i].variables, "lastTf")) {
			hist[i].variables.lastTf = "";
		}
		hist[i].variables.tfs = { face: ["Masturbate Day 4 Change", "Face2", "Face3", "Face4"], ass: ["Masturbate 2 Change", "Ass2", "Ass3", "Ass4"], boobs: ["Boobs1", "Boobs2", "Boobs3", "Boobs4"], voice: ["Voice1", "Voice2", "Voice3", "Voice4"], hands: ["Hands1", "Hands2", "Hands3"], hair: ["Hair1", "Hair2", "Hair3"], height: ["Height1", "Height2", "Height3"] };
		hist[i].variables.tfLimits = { face: 4, ass: 4, boobs: 4, voice: 4, hands: 3, hair: 3, height: 3 };
		if (!setup.isProperty(hist[i].variables.player, "ownsGirlPants")) {
			hist[i].variables.player.ownsGirlPants = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "ownsGirlShoes")) {
			hist[i].variables.player.ownsGirlShoes = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "trimmedPubicHair")) {
			hist[i].variables.player.trimmedPubicHair = true;
		}
		if (!setup.isProperty(hist[i].variables.player, "towel")) {
			hist[i].variables.player.towel = 0;
		}
		if (!setup.isProperty(hist[i].variables, "tfProgress")) {
			hist[i].variables.tfProgress = [0, 0, 0, 0, 0, 0, 0];
			if (setup.isProperty(hist[i].variables.player, "face")) {
				hist[i].variables.tfProgress[0] = hist[i].variables.player.face;
			}
			if (setup.isProperty(hist[i].variables.player, "ass")) {
				hist[i].variables.tfProgress[1] = hist[i].variables.player.ass;
			}
			if (setup.isProperty(hist[i].variables.player, "boobs")) {
				hist[i].variables.tfProgress[2] = hist[i].variables.player.boobs;
			}
			if (setup.isProperty(hist[i].variables.player, "voice")) {
				hist[i].variables.tfProgress[3] = hist[i].variables.player.voice;
			}
			if (setup.isProperty(hist[i].variables.player, "hands")) {
				hist[i].variables.tfProgress[4] = hist[i].variables.player.hands;
			}
			if (setup.isProperty(hist[i].variables.player, "hair")) {
				hist[i].variables.tfProgress[5] = hist[i].variables.player.hair;
			}
			if (setup.isProperty(hist[i].variables.player, "height")) {
				hist[i].variables.tfProgress[6] = hist[i].variables.player.height;
			}
		}
		if (!setup.isProperty(hist[i].variables, "beforeSexClothes")) {
			hist[i].variables.beforeSexClothes = { shirt: "Plain White Tee", underwear: "Blue Boxers", pants: "Basketball Shorts", shoes: "Leather Shoes", socks: "White Socks" };
		}
		if (!setup.isProperty(hist[i].variables, "therapistPassage")) {
			hist[i].variables.therapistPassage = "Therapist 1";
		}
		if (!setup.isProperty(hist[i].variables.player, "skillCurse")) {
			hist[i].variables.player.skillCurse = 0;
		}
		if (!setup.isProperty(hist[i].variables.player, "isWearingPanties")) {
			if (hist[i].variables.player.underwear == null) {
				hist[i].variables.player.isWearingPanties = false;
			}
			else {
				hist[i].variables.player.isWearingPanties = hist[i].variables.player.underwear.panties;
			}
		}
		if (!setup.isProperty(hist[i].variables.team, "playerOnTeam")) {
			hist[i].variables.team.playerOnTeam = hist[i].variables.player.skillCurse < 4;
		}
		if (setup.isProperty(hist[i].variables, "clothesInventory")) {
			if (!setup.isProperty(hist[i].variables.clothesInventory, "bra")) {
				hist[i].variables.clothesInventory.bra = [];
			}
		}
		if (!setup.isProperty(hist[i].variables.player, "isWearingButtplug")) {
			hist[i].variables.player.isWearingButtplug = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "hasButtplug")) {
			hist[i].variables.player.hasButtplug = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "buttplugCurse")) {
			hist[i].variables.player.buttplugCurse = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "usedGirlsLockerRoom")) {
			hist[i].variables.player.usedGirlsLockerRoom = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "hasWornMakeup")) {
			hist[i].variables.player.hasWornMakeup = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "ownsMakeup")) {
			hist[i].variables.player.ownsMakeup = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "isWearingMakeup")) {
			hist[i].variables.player.isWearingMakeup = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "gotFuckedByCock")) {
			hist[i].variables.player.gotFuckedByCock = false;
		}
		if (!setup.isProperty(hist[i].variables.player, "hasUsedWomensBathroom")) {
			hist[i].variables.player.hasUsedWomensBathroom = false;
		}
		if (setup.isProperty(hist[i].variables.clothesInventory, "pants") && !setup.isProperty(hist[i].variables.clothesInventory.pants[0], "manImage")) {
			var dressPants = {
				"properName": "Dress Pants",
				"informalName": "dress pants",
				"manImage": "images/clothes/pants/school_uniform_pants_man_legs.png",
				"womanImage": "images/clothes/pants/school_uniform_pants_man_legs.png",
				"school": true,
				"football": true,
				"casual": false,
				"workout": false,
				"dress": false,
				"torn": false,
				"female": false
			};
			var footballPants = {
				"properName": "White Polyester Pants",
				"informalName": "white polyester pants",
				"manImage": "images/clothes/pants/football_pants_man_legs.png",
				"womanImage": "images/clothes/pants/football_pants_default_legs.png",
				"school": false,
				"football": true,
				"casual": false,
				"workout": true,
				"dress": false,
				"torn": false,
				"female": false
			};
			var casualPants = {
				"properName": "Jeans",
				"informalName": "jeans",
				"manImage": "images/clothes/pants/jeans_man_legs.png",
				"womanImage": "images/clothes/pants/jeans_man_legs.png",
				"school": false,
				"football": false,
				"casual": true,
				"workout": false,
				"dress": false,
				"torn": false,
				"female": false
			};
			var womensSlacks = {
				"properName": "Womens Slacks",
				"informalName": "womens slacks",
				"womanImage": "images/clothes/pants/womens_slacks_woman_legs.png",
				"school": true,
				"football": false,
				"casual": false,
				"dress": false,
				"female": true
			};
			var girlsJeans = {
				"properName": "Girls Jeans",
				"informalName": "girls jeans",
				"womanImage": "images/clothes/pants/high_rise_jeans_woman_legs.png",
				"school": false,
				"football": false,
				"casual": true,
				"dress": false,
				"female": true
			};
			var yogaPants = {
				"properName": "Yoga Pants",
				"informalName": "yoga pants",
				"manImage": "images/clothes/pants/yoga_pants_black_man_legs.png",
				"womanImage": "images/clothes/pants/yoga_pants_black_woman_legs.png",
				"school": false,
				"football": false,
				"casual": true,
				"workout": true,
				"dress": false,
				"torn": false,
				"female": true
			};
			var newPantsArray = [dressPants, casualPants];
			if (hist[i].variables.player.skillCurse < 4) {
				newPantsArray.push(footballPants);
			}
			for (var j=0;j<hist[i].variables.clothesInventory.pants.length;j++) {
				if (hist[i].variables.clothesInventory.pants[j].properName == "Womens Slacks") {
					newPantsArray.push(womensSlacks);
				} else if (hist[i].variables.clothesInventory.pants[j].properName == "Girls Jeans") {
					newPantsArray.push(girlsJeans);
				} else if (hist[i].variables.clothesInventory.pants[j].properName == "Yoga Pants") {
					newPantsArray.push(yogaPants);
				}
			}
			hist[i].variables.clothesInventory.pants = newPantsArray;
			if (hist[i].variables.player.pants == null) {
				hist[i].variables.player.pants = null;
			} else if (hist[i].variables.player.pants.properName == "Dress Pants") {
				hist[i].variables.player.pants = dressPants;
			} else if (hist[i].variables.player.pants.properName == "White Polyester Pants") {
				hist[i].variables.player.pants = footballPants;
			} else if (hist[i].variables.player.pants.properName == "Basketball Shorts") {
				hist[i].variables.player.pants = casualPants;
			} else if (hist[i].variables.player.pants.properName == "Womens Slacks") {
				hist[i].variables.player.pants = womensSlacks;
			} else if (hist[i].variables.player.pants.properName == "Girls Jeans") {
				hist[i].variables.player.pants = girlsJeans;
			} else if (hist[i].variables.player.pants.properName == "Yoga Pants") {
				hist[i].variables.player.pants = yogaPants;
			}
			setUniformPants(hist[i], "Dress Pants", dressPants);
			setUniformPants(hist[i], "White Polyester Pants", footballPants);
			setUniformPants(hist[i], "Basketball Shorts", casualPants);
			setUniformPants(hist[i], "Womens Slacks", womensSlacks);
			setUniformPants(hist[i], "Girls Jeans", girlsJeans);
			setUniformPants(hist[i], "Yoga Pants", yogaPants);
		} else {
			for (j = 0; j < hist[i].variables.clothesInventory.pants.length; j++) {
				if (hist[i].variables.clothesInventory.pants[j].womanImage == "images/clothes/pants/high_rise_school_uniform_pants_woman_legs.png") {
					hist[i].variables.clothesInventory.pants[j].womanImage = "images/clothes/pants/womens_slacks_woman_legs.png";
				}
			}
		}
		if (setup.isProperty(hist[i].variables.clothesInventory, "shirt") && !setup.isProperty(hist[i].variables.clothesInventory.shirt[0], "images")) {
			hist[i].variables.clothesInventory.shirt = [];
			var schoolShirt = {
				"properName": "Dress Shirt and Jacket",
				"informalName": "dress shirt",
				"images": ["images/clothes/shirts_under/school_uniform_shirt_with_crest.png", "images/clothes/shirts_under/school_uniform_shirt_with_crest.png", "images/clothes/shirts_under/school_uniform_shirt_with_crest_breast_bulge.png", "images/clothes/shirts_under/school_uniform_shirt_with_crest_large_breasts.png"],			
				"school": true,
				"football": false,
				"casual": true,
				"workout": false,
				"dress": false
			};
			var footballShirt = {
				"properName": "Stallions Jersey and Pads",
				"informalName": "jersey",
				"images": ["images/clothes/shirts_under/football_jersey.png", "images/clothes/shirts_under/football_jersey_small_breasts.png", "images/clothes/shirts_under/football_jersey_large_breasts.png", "images/clothes/shirts_under/football_jersey_large_breasts.png"],			
				"school": false,
				"football": true,
				"casual": false,
				"workout": true,
				"dress": false
			};
			var casualShirt = {
				"properName": "Plain White Tee",
				"informalName": "t-shirt",
				"images": ["images/clothes/shirts_under/white_shirt.png", "images/clothes/shirts_under/white_shirt_small_breasts.png", "images/clothes/shirts_under/white_shirt_medium_breasts.png", "images/clothes/shirts_under/white_shirt_large_breasts.png"],			
				"school": false,
				"football": false,
				"casual": true,
				"workout": true,
				"dress": false
			};
			hist[i].variables.clothesInventory.shirt = [schoolShirt, casualShirt];
			if (hist[i].variables.player.skillCurse < 4) {
				hist[i].variables.clothesInventory.shirt.push(footballShirt);
			}
			if (hist[i].variables.player.shirt == null) {
				hist[i].variables.player.shirt = null;
			} else if (hist[i].variables.player.shirt.properName == "Dress Shirt and Jacket") {
				hist[i].variables.player.shirt = schoolShirt;
			} else if (hist[i].variables.player.shirt.properName == "Stallions Jersey and Pads") {
				hist[i].variables.player.shirt = footballShirt;
			} else if (hist[i].variables.player.shirt.properName == "Plain White Tee") {
				hist[i].variables.player.shirt = casualShirt;
			}
			setUniformShirt(hist[i], "Dress Shirt and Jacket", schoolShirt);
			setUniformShirt(hist[i], "Stallions Jersey and Pads", schoolShirt);
			setUniformShirt(hist[i], "Plain White Tee", schoolShirt);
		}
		if (setup.isProperty(hist[i].variables.clothesInventory, "underwear") && !setup.isProperty(hist[i].variables.clothesInventory.underwear[0], "manImage")) {
			var blueBoxers = {
				"properName": "Blue Boxers",
				"informalName": "blue boxers",
				"manImage": "images/clothes/underwears/blue_boxer_briefs_man_legs.png",
				"womanImage": "images/clothes/underwears/blue_boxer_briefs_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"workout": true,
				"panties": false
			};
			var jockStrap = {
				"properName": "Jock Strap",
				"informalName": "jock strap",
				"manImage": "images/clothes/underwears/black_boxer_briefs_man_legs.png",
				"womanImage": "images/clothes/underwears/black_boxer_briefs_woman_legs.png",
				"school": false,
				"football": true,
				"casual": false,
				"workout": true,
				"panties": false
			};
			var greyBikiniPanties = {
				"properName": "Grey Bikini Panties",
				"informalName": "grey bikini panties",
				"manImage": "images/clothes/underwears/gray_bikini_panties_man_legs.png",
				"womanImage": "images/clothes/underwears/gray_bikini_panties_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var blackBikiniBottoms = {
				"properName": "Black Bikini Bottoms",
				"informalName": "black bikini bottoms",
				"manImage": "images/clothes/underwears/black_bikini_bottom_man_legs.png",
				"womanImage": "images/clothes/underwears/black_bikini_bottom_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var plainWhitePanties = {
				"properName": "Plain White Panties",
				"informalName": "plain white panties",
				"manImage": "images/clothes/underwears/basic_white_panties_man_legs.png",
				"womanImage": "images/clothes/underwears/basic_white_panties_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var blueFrenchCutPanties = {
				"properName": "Blue French Cut Panties",
				"informalName": "blue french-cut panties",
				"manImage": "images/clothes/underwears/french_cut_panties_blue_man_legs.png",
				"womanImage": "images/clothes/underwears/french_cut_panties_blue_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var laceyPurplePanties = {
				"properName": "Lacey purple panties",
				"informalName": "lacey purple panties",
				"manImage": "images/clothes/underwears/purple_bikini_panties_man_legs.png",
				"womanImage": "images/clothes/underwears/purple_bikini_panties_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var forestGreenPanties = {
				"properName": "Forest Green Bikini-style Panties",
				"informalName": "green bikini panties",
				"manImage": "images/clothes/underwears/green_bikini_panties_man_legs.png",
				"womanImage": "images/clothes/underwears/green_bikini_panties_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var purpleHipsterPanties = {
				"properName": "Purple Hipster Panties",
				"informalName": "purple hipster panties",
				"manImage": "images/clothes/underwears/purple_boyshorts_man_legs.png",
				"womanImage": "images/clothes/underwears/purple_boyshorts_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var lacyBlackBoyshorts = {
				"properName": "Lacy Black Boyshorts",
				"informalName": "lacy black boyshorts",
				"manImage": "images/clothes/underwears/black_boyshorts_man_legs.png",
				"womanImage": "images/clothes/underwears/black_boyshorts_woman_legs.png",
				"school": true,
				"football": true,
				"casual": true,
				"panties": true
			};
			var newUnderwear = [blueBoxers];
			if (hist[i].variables.player.skillCurse < 4) {
				newUnderwear.push(jockStrap);
			}
			for (var j=0;j<hist[i].variables.clothesInventory.underwear.length;j++) {
				if (hist[i].variables.clothesInventory.underwear[j].properName == "Grey bikini panties") {
					newUnderwear.push(greyBikiniPanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Black Bikini Bottoms") {
					newUnderwear.push(blackBikiniBottoms);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "plain white panties") {
					newUnderwear.push(plainWhitePanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Plain white panties") {
					newUnderwear.push(plainWhitePanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Blue French Cut Panties") {
					newUnderwear.push(blueFrenchCutPanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Lacey purple panties") {
					newUnderwear.push(laceyPurplePanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Forest green bikini-style panties") {
					newUnderwear.push(forestGreenPanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Purple hipster panties") {
					newUnderwear.push(purpleHipsterPanties);
				} else if (hist[i].variables.clothesInventory.underwear[j].properName == "Lacy black boyshorts") {
					newUnderwear.push(lacyBlackBoyshorts);
				}
			}
			hist[i].variables.clothesInventory.underwear = newUnderwear;
			if (hist[i].variables.player.underwear == null) {
				hist[i].variables.player.underwear = null;
			} else if (hist[i].variables.player.underwear.properName == "Blue Boxers") {
				hist[i].variables.player.underwear = blueBoxers;
			} else if (hist[i].variables.player.underwear.properName  == "Jock Strap") {
				hist[i].variables.player.underwear = jockStrap;
			} else if (hist[i].variables.player.underwear.properName  == "Grey bikini panties") {
				hist[i].variables.player.underwear = greyBikiniPanties;
			} else if (hist[i].variables.player.underwear.properName  == "Black Bikini Bottoms") {
				hist[i].variables.player.underwear = blackBikiniBottoms;
			} else if (hist[i].variables.player.underwear.properName  == "plain white panties" || hist[i].variables.player.underwear == "Plain white panties") {
				hist[i].variables.player.underwear = plainWhitePanties;
			} else if (hist[i].variables.player.underwear.properName  == "Blue French Cut Panties") {
				hist[i].variables.player.underwear = blueFrenchCutPanties;
			} else if (hist[i].variables.player.underwear.properName  == "Lacey purple panties") {
				hist[i].variables.player.underwear = laceyPurplePanties;
			} else if (hist[i].variables.player.underwear.properName  == "Forest green bikini-style panties") {
				hist[i].variables.player.underwear = forestGreenPanties;
			} else if (hist[i].variables.player.underwear.properName  == "Purple hipster panties") {
				hist[i].variables.player.underwear = purpleHipsterPanties;
			} else if (hist[i].variables.player.underwear.properName  == "Lacy black boyshorts") {
				hist[i].variables.player.underwear = lacyBlackBoyshorts;
			} else {
				hist[i].variables.player.underwear = null;
			}
			setUniformUnderwear(hist[i], "Blue Boxers", blueBoxers);
			setUniformUnderwear(hist[i], "Jock Strap", jockStrap);
			setUniformUnderwear(hist[i], "Grey bikini panties", greyBikiniPanties);
			setUniformUnderwear(hist[i], "Black Bikini Bottoms", blackBikiniBottoms);
			setUniformUnderwear(hist[i], "plain white panties", plainWhitePanties);
			setUniformUnderwear(hist[i], "Plain white panties", plainWhitePanties);
			setUniformUnderwear(hist[i], "Blue French Cut Panties", blueFrenchCutPanties);
			setUniformUnderwear(hist[i], "Lacey purple panties", laceyPurplePanties);
			setUniformUnderwear(hist[i], "Forest green bikini-style panties", forestGreenPanties);
			setUniformUnderwear(hist[i], "Purple hipster panties", purpleHipsterPanties);
			setUniformUnderwear(hist[i], "Lacy black boyshorts", lacyBlackBoyshorts);
		}
		if (setup.isProperty(hist[i].variables.player, "shoes") && typeof(hist[i].variables.player.shoes) === "string") {
			hist[i].variables.clothesInventory.shoes = [];
			var schoolShoes = {
				"properName": "Oxfords",
				"informalName": "oxfords",
				"school": true,
				"football": false,
				"casual": true,
				"workout": false,
				"female": false,
			};
			var footballShoes = {
				"properName": "Football Cleats",
				"informalName": "cleats",
				"school": false,
				"football": true,
				"casual": false,
				"workout": true,
				"female": false,
			};
			var casualShoes = {
				"properName": "Sneakers",
				"informalName": "sneakers",
				"school": false,
				"football": false,
				"casual": true,
				"workout": true,
				"female": false,
			};
			hist[i].variables.clothesInventory.shoes = [schoolShoes, casualShoes];
			if (hist[i].variables.player.skillCurse < 4) {
				hist[i].variables.clothesInventory.shoes.push(footballShoes);
			}
			if (hist[i].variables.player.shoes == "Oxfords") {
				hist[i].variables.player.shoes = schoolShoes;
			} else if (hist[i].variables.player.shoes == "Football Cleats") {
				hist[i].variables.player.shoes = footballShoes;
			} else if (hist[i].variables.player.shoes == "Leather Shoes") {
				hist[i].variables.player.shoes = casualShoes;
			} else {
				hist[i].variables.player.shoes = null;
			}
			setUniformShoes(hist[i], "Oxfords", schoolShoes);
			setUniformShoes(hist[i], "Football Cleats", footballShoes);
			setUniformShoes(hist[i], "Leather Shoes", casualShoes);
		}
		else if (setup.isProperty(hist[i].variables.clothesInventory, "shoes") && !setup.isProperty(hist[i].variables.clothesInventory.shoes[0], "female")) {
			for (var j=0;j<hist[i].variables.clothesInventory.shoes.length;j++) {
				hist[i].variables.clothesInventory.shoes[j].female = false;
			}
		}
		if (setup.isProperty(hist[i].variables.player, "socks") && typeof(hist[i].variables.player.socks) === "string") {
			hist[i].variables.clothesInventory.socks = [];
			var whiteSocks = {
				"properName": "White Socks",
				"informalName": "white socks",
				"school": true,
				"football": true,
				"casual": true,
				"workout": true
			};
			var greySocks = {
				"properName": "Grey Socks",
				"informalName": "grey socks",
				"school": true,
				"football": true,
				"casual": true,
				"workout": true
			};
			hist[i].variables.clothesInventory.socks = [whiteSocks, greySocks];
			if (hist[i].variables.player.socks == "White Socks") {
				hist[i].variables.player.socks = whiteSocks;
			} else if (hist[i].variables.player.socks == "Grey Socks") {
				hist[i].variables.player.socks = greySocks;
			} else {
				hist[i].variables.player.socks = null;
			}
			setUniformSocks(hist[i], "White Socks", whiteSocks);
			setUniformSocks(hist[i], "Grey Socks", greySocks);
		}
		if (setup.isProperty(hist[i].variables.clothesInventory, "bra") && hist[i].variables.clothesInventory.bra.length > 0 && !setup.isProperty(hist[i].variables.clothesInventory.bra[0], "images")) {
			var currentBra = hist[i].variables.clothesInventory.bra[0];
			var newBraArray = [];
			var newBra = null;
			if (currentBra.properName == "Red sports bra") {
				newBra = {
					"properName": "Red sports bra",
					"informalName": "red sports bra",
					"images": ["images/clothes/bras/sports_bra_small_breasts_red.png", "images/clothes/bras/sports_bra_large_breasts_red.png", "images/clothes/bras/sports_bra_large_breasts_red.png", "images/clothes/bras/sports_bra_large_breasts_red.png"],
					"school": true,
					"football": true,
					"casual": true
				};
			} else if (currentBra.properName == "White sports bra") {
				newBra = {
					"properName": "White sports bra",
					"informalName": "white sports bra",
					"images": ["images/clothes/bras/sports_bra_small_breasts_white.png", "images/clothes/bras/sports_bra_large_breasts_white.png", "images/clothes/bras/sports_bra_large_breasts_white.png", "images/clothes/bras/sports_bra_large_breasts_white.png"],
					"school": true,
					"football": true,
					"casual": true
				};
			} else if (currentBra.properName == "Blue sports bra") {
				newBra = {
					"properName": "Blue sports bra",
					"informalName": "blue sports bra",
					"images": ["images/clothes/bras/sports_bra_small_breasts_blue.png", "images/clothes/bras/sports_bra_large_breasts_blue.png", "images/clothes/bras/sports_bra_large_breasts_blue.png", "images/clothes/bras/sports_bra_large_breasts_blue.png"],
					"school": true,
					"football": true,
					"casual": true
				};
			} else if (currentBra.properName == "Purple sports bra") {
				newBra = {
					"properName": "Purple sports bra",
					"informalName": "purple sports bra",
					"images": ["images/clothes/bras/sports_bra_small_breasts_purple.png", "images/clothes/bras/sports_bra_large_breasts_purple.png", "images/clothes/bras/sports_bra_large_breasts_purple.png", "images/clothes/bras/sports_bra_large_breasts_purple.png"],
					"school": true,
					"football": true,
					"casual": true
				};
			} else if (currentBra.properName == "Black sports bra") {
				newBra = {
					"properName": "Black sports bra",
					"informalName": "black sports bra",
					"images": ["images/clothes/bras/sports_bra_small_breasts_black.png", "images/clothes/bras/sports_bra_large_breasts_black.png", "images/clothes/bras/sports_bra_large_breasts_black.png", "images/clothes/bras/sports_bra_large_breasts_black.png"],
					"school": true,
					"football": true,
					"casual": true
				};
			} else if (currentBra.properName == "Green sports bra") {
				newBra = {
					"properName": "Green sports bra",
					"informalName": "green sports bra",
					"images": ["images/clothes/bras/sports_bra_small_breasts_green.png", "images/clothes/bras/sports_bra_large_breasts_green.png", "images/clothes/bras/sports_bra_large_breasts_green.png", "images/clothes/bras/sports_bra_large_breasts_green.png"],
					"school": true,
					"football": true,
					"casual": true
				};
			}
			var blackBikiniTop = {
				"properName": "Black Bikini Top",
				"informalName": "black bikini top",
				"images": ["images/clothes/bras/black_bikini_top_A-AA.png", "images/clothes/bras/black_bikini_top_B-C.png", "images/clothes/bras/black_bikini_top_B-C.png", "images/clothes/bras/black_bikini_top_D-DD.png"],
				"school": true,
				"football": true,
				"casual": true
			};
			var underwireBra = {
				"properName": "White Underwire Bra",
				"informalName": "white underwire bra",
				"images": ["images/clothes/bras/white_A-AA.png", "images/clothes/bras/white_B-C.png", "images/clothes/bras/white_B-C.png", "images/clothes/bras/white_D-DD.png"],
				"school": true,
				"football": false,
				"casual": true
			};
			if (newBra != null) {
				newBraArray.push(newBra);
			}
			for (var j=0;j<hist[i].variables.clothesInventory.bra.length;j++) {
				if (hist[i].variables.clothesInventory.bra[j].properName == "Black Bikini Top") {
					newBraArray.push(blackBikiniTop);
				} else if (hist[i].variables.clothesInventory.bra[j].properName == "White Underwire Bra") {
					newBraArray.push(underwireBra);
				}
			}
			hist[i].variables.clothesInventory.bra = newBraArray;
			if (hist[i].variables.player.bra == "" || hist[i].variables.player.bra == null) {
				hist[i].variables.player.bra = null;
			} else if (hist[i].variables.player.bra.properName == "Black Bikini Top") {
				hist[i].variables.player.bra = blackBikiniTop;
			} else if (hist[i].variables.player.bra.properName == "White Underwire Bra") {
				hist[i].variables.player.bra = underwireBra;
			} else {
				hist[i].variables.player.bra = newBra;
			}
			if (newBra != null) {
				setUniformBra(hist[i], newBra.properName, newBra);
			}
			setUniformBra(hist[i], "Black Bikini Top", blackBikiniTop);
			setUniformBra(hist[i], "White Underwire Bra", underwireBra);
		}
	}
};

function setUniformPants(history, clothesAsString, clothesAsObject) {
	if (history.variables.schoolUniform.pants.properName == clothesAsString) {
		history.variables.schoolUniform.pants = clothesAsObject;
	}
	if (history.variables.footballUniform.pants.properName == clothesAsString) {
		history.variables.footballUniform.pants = clothesAsObject;
	}
	if (history.variables.casualClothes.pants.properName == clothesAsString) {
		history.variables.casualClothes.pants = clothesAsObject;
	}
}
function setUniformShirt(history, clothesAsString, clothesAsObject) {
	if (history.variables.schoolUniform.shirt.properName == clothesAsString) {
		history.variables.schoolUniform.shirt = clothesAsObject;
	}
	if (history.variables.footballUniform.shirt.properName == clothesAsString) {
		history.variables.footballUniform.shirt = clothesAsObject;
	}
	if (history.variables.casualClothes.shirt.properName == clothesAsString) {
		history.variables.casualClothes.shirt = clothesAsObject;
	}
}
function setUniformUnderwear(history, clothesAsString, clothesAsObject) {
	if (history.variables.schoolUniform.underwear.properName == clothesAsString) {
		history.variables.schoolUniform.underwear = clothesAsObject;
	}
	if (history.variables.footballUniform.underwear.properName == clothesAsString) {
		history.variables.footballUniform.underwear = clothesAsObject;
	}
	if (history.variables.casualClothes.underwear.properName == clothesAsString) {
		history.variables.casualClothes.underwear = clothesAsObject;
	}
}
function setUniformShoes(history, clothesAsString, clothesAsObject) {
	if (history.variables.schoolUniform.shoes == clothesAsString) {
		history.variables.schoolUniform.shoes = clothesAsObject;
	}
	if (history.variables.footballUniform.shoes == clothesAsString) {
		history.variables.footballUniform.shoes = clothesAsObject;
	}
	if (history.variables.casualClothes.shoes == clothesAsString) {
		history.variables.casualClothes.shoes = clothesAsObject;
	}
}
function setUniformSocks(history, clothesAsString, clothesAsObject) {
	if (history.variables.schoolUniform.socks == clothesAsString) {
		history.variables.schoolUniform.socks = clothesAsObject;
	}
	if (history.variables.footballUniform.socks == clothesAsString) {
		history.variables.footballUniform.socks = clothesAsObject;
	}
	if (history.variables.casualClothes.socks == clothesAsString) {
		history.variables.casualClothes.socks = clothesAsObject;
	}
}
function setUniformBra(history, clothesAsString, clothesAsObject) {
	if (history.variables.schoolUniform.bra == clothesAsString) {
		history.variables.schoolUniform.bra = clothesAsObject;
	}
	if (history.variables.footballUniform.bra == clothesAsString) {
		history.variables.footballUniform.bra = clothesAsObject;
	}
	if (history.variables.casualClothes.bra == clothesAsString) {
		history.variables.casualClothes.bra = clothesAsObject;
	}
}

/* Create the Right UI Bar. */
var $rightUiBar = $('<div id="right-ui-bar"></div>').insertAfter("#ui-bar");
/* Automatically show the contents of the StoryRightSidebar passage in the right-ui-bar-body element. */
postrender["Display Right Sidebar Contents"] = function (content, taskName) {
	setPageElement('right-ui-bar', 'StoryRightSidebar');
};

Setting.addHeader("Content Settings");
Setting.addToggle("avatar", {
	label: "Display the player's avatar?",
	default: true,
	onChange: function() {
		if (settings.avatar) {
			$('#right-ui-bar').show();
			document.getElementById("story").style.marginRight = "20em";
		} else {
			$('#right-ui-bar').hide();
			document.getElementById("story").style.marginRight = "5em";
		}
	}
})