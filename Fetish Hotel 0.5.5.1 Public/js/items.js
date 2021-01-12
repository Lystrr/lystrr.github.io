function GetInventoryObject (id) {

	var picURL; var name; var description; var actions;
	switch (id) {
		
		case "1":
		case 1:
			picURL = "media/items/latex_top1.jpg";
			name = "Black latex top";
			description = "A top made out of black latex.";
			actions = "[[Wear|UseLatexTop1]]";
			break;
		case "2":
		case 2:
			picURL = "media/items/latex_top2.jpg";
			name = "Black latex top";
			description = "A top made out of black latex.";
			actions = "[[Wear|UseLatexTop2]]";
			break;
		case "3":
		case 3:
			picURL = "media/items/redballgag.jpg";
			name = "Red ball gag";
			description = "A big red ball gag that you involuntary received from Ms. Carter...";
			actions = "[[Wear|UseRedBallgag]]";
			break;	
		case "4":
		case 4:
			picURL = "media/items/latexmaidcostume_inv.jpg";
			name = "Latex Maid Costume";
			description = "Your black latex maid costume you got from Moira.";
			actions = "[[Wear|UseLatexMaidCostume]]";
			break;
		case "5":
		case 5:
			picURL = "media/items/maid_heels_inv.jpg";
			name = "Maid heels";
			description = "Your black latex maid heels. They complete your maid costume.";
			actions = "[[Wear|UseMaidHeels]]";
			break;
		case "8":
		case 8:
			picURL = "media/items/latexHobbleDress_inv.jpg";
			name = "Latex Hobble Dress";
			description = "A black shiny latex hobble dress you stole from the closet in room 150.";
			actions = "[[Wear|UseLatexHobbleDress]]";
			break;
		case "11":
		case 11:
			picURL = "media/items/high_heels1.jpg";
			name = "Black high heels";
			description = "A pair of black plateau high heels.";
			actions = "[[Wear|WearHighHeels]]";
			break;
		case "15":
		case 15:
			picURL = "media/items/latex_top3.jpg";
			name = "Red latex top";
			description = "A top made out of red latex.";
			actions = "[[Wear|UseLatexTop3]]";
			break;
		case "16":
		case 16:
			picURL = "media/items/latex_pants1.jpg";
			name = "Black latex pants";
			description = "Black latex pants with little stripes on knee level.";
			actions = "[[Wear|UseLatexPants1]]";
			break;
		case "17":
		case 17:
			picURL = "media/items/latex_pants2.jpg";
			name = "Red latex pants";
			description = "Red short latex pants bindings in the front.";
			actions = "[[Wear|UseLatexPants2]]";
			break;
		case "18":
		case 18:
			picURL = "media/items/latex_pants3.jpg";
			name = "Black latex pants";
			description = "Black long latex pants.";
			actions = "[[Wear|UseLatexPants3]]";
			break;
		case "19":
		case 19:
			picURL = "media/items/latex_heels1.jpg";
			name = "Black latex heels";
			description = "Black latex heels with little wings at the back.";
			actions = "[[Wear|UseLatexHeels1]]";
			break;
		case "20":
		case 20:
			picURL = "media/items/latex_heels2.jpg";
			name = "Latex sneaker";
			description = "Black sneaker made out of latex.";
			actions = "[[Wear|UseLatexHeels2]]";
			break;
		case "21":
		case 21:
			picURL = "media/items/latex_heels3.jpg";
			name = "Red heels";
			description = "Red high heels.";
			actions = "[[Wear|UseLatexHeels3]]";
			break;
		case "22":
		case 22:
			picURL = "media/items/gloves1.jpg";
			name = "Black latex gloves";
			description = "Black latex gloves that reach up over your elbows.";
			actions = "[[Wear|UseGloves1]]";
			break;
		case "23":
		case 23:
			picURL = "media/items/gloves2.jpg";
			name = "Black lacy gloves";
			description = "Black lacy gloves that reach up over your elbows.";
			actions = "[[Wear|UseGloves2]]";
			break;
		case "24":
		case 24:
			picURL = "media/items/gloves3.jpg";
			name = "Mesh gloves";
			description = "A pair of long fingerless mesh gloves.";
			actions = "[[Wear|UseGloves3]]";
			break;
		case "27":
		case 27:
			picURL = "media/items/lilaflyer.jpg";
			name = "Leaflet";
			description = "Leaflet you got from Lila in the music room.";
			actions = "[[Examine|ExamineLeaflet]]";
			break;
		case "28":
		case 28:
			picURL = "media/items/dress_lila.jpg";
			name = "Lounge dress";
			description = "A cute little dress you received from Lila.";
			actions = "[[Wear|UseLoungeDress]]";
			break;
		case "29":
		case 29:
			picURL = "media/items/shoes_lila.jpg";
			name = "Lounge heels";
			description = "Some cute heels you received from Lila.";
			actions = "[[Wear|UseLoungeHeels]]";
			break;
		case "30":
		case 30:
			picURL = "media/items/latex_dress_lila1.jpg";
			name = "Purple latex dress";
			description = "A purple latex dress that you found in the \"butt room\".";
			actions = "[[Wear|UseButtDress]]";
			break;
		case "31":
		case 31:
			picURL = "media/items/keycard.jpg";
			name = "White keycard";
			description = "A white keycard you found in the baggage of a guest.";
			actions = "[[Examine|ExamineKeycard]]";
			break;
		case "32":
		case 32:
			picURL = "media/items/choker_m.jpg";
			name = "Maid choker";
			description = "Your black satin choker. Proof that you're a member of group M.";
			actions = "";
			break;
		case "35":
		case 35:
			picURL = "media/items/latex_stockingsL.jpg";
			name = "Brown latex stockings";
			description = "Brown latex stockings that you got from Natasha.";
			actions = "[[Wear|UseLatexStockingsL]]";
			break;
		case "36":
		case 36:
			picURL = "media/items/latex_glovesL.jpg";
			name = "Black latex gloves";
			description = "Black latex gloves that reach up to your shoulders. You got them from Natasha.";
			actions = "[[Wear|UseLatexGlovesL]]";
			break;
		case "37":
		case 37:
			picURL = "media/items/doll.png";
			name = "Strange doll";
			description = "A strange doll wrapped up in blue bandages. You got it from Natasha.";
			actions = "[[Examine|ExamineDoll]]";
			break;
		case "38":
		case 38:
			picURL = "media/items/jeans1.jpg";
			name = "Jeans";
			description = "A very tight pair of jeans with its zipper at the back.";
			actions = "[[Wear|UseJeans1]]";
			break;
		case "39":
		case 39:
			picURL = "media/items/catsuit1_inv.jpg";
			name = "Burgundy catsuit of Group L";
			description = "The burgundy sleevless catsuit that you've earned as a member of Group L.";
			actions = "[[Wear|UseCatsuit1]]";
			break;
		case "40":
		case 40:
			picURL = "media/items/catsuit2_inv.jpg";
			name = "Red-black catsuit of Group L";
			description = "The red-black latex catsuit with skirt that you've earned as a member of Group L.";
			actions = "[[Wear|UseCatsuit2]]";
			break;
		case "41":
		case 41:
			picURL = "media/items/catsuit3_inv.jpg";
			name = "Black catsuit of Group L";
			description = "The black latex catsuit that you've earned as a member of Group L.";
			actions = "[[Wear|UseCatsuit3]]";
			break;
		case "42":
		case 42:
			picURL = "media/items/lmask1_inv.jpg";
			name = "Black latex mask of Group L";
			description = "A black latex mask with red lips and space for your hair. You got it as a member of Group L.";
			actions = "[[Wear|UseLMask1]]";
			break;
		case "43":
		case 43:
			picURL = "media/items/lmask2_inv.jpg";
			name = "Blue latex mask of Group L";
			description = "A blue latex mask. You got it as a member of Group L.";
			actions = "[[Wear|UseLMask2]]";
			break;
		case "44":
		case 44:
			picURL = "media/items/lmask3_inv.jpg";
			name = "Transparent latex mask of Group L";
			description = "A transparent latex mask that leaves your face open and space for your hair. You got it as a member of Group L.";
			actions = "[[Wear|UseLMask3]]";
			break;
		case "45":
		case 45:
			picURL = "media/items/latex_heels4.jpg";
			name = "Black shiny high heels of Group L";
			description = "Black shiny high heels that are laced in the back. You got them as a member of Group L.";
			actions = "[[Wear|UseLatexHeels4]]";
			break;
		case "46":
		case 46:
			picURL = "media/items/latex_heels5.jpg";
			name = "Latex boots of Group L";
			description = "Knee high latex boots that are open at the sides. You got them as a member of Group L.";
			actions = "[[Wear|UseLatexHeels5]]";
			break;
		case "47":
		case 47:
			picURL = "media/items/latex_heels6.jpg";
			name = "Black pumps of Group L";
			description = "A pair of classic black pumps. You got them as a member of Group L.";
			actions = "[[Wear|UseLatexHeels6]]";
			break;
		case "48":
		case 48:
			picURL = "media/items/orangezipper.jpg";
			name = "Orange jacket";
			description = "An orange jacket with a zipper in the front.";
			actions = "[[Wear|UseOrangeJacket]]";
			break
		case "49":
		case 49:
			picURL = "media/items/choker_l.png";
			name = "Latex choker";
			description = "A black choker maid out of latex. Proof that you are a member of Group L.";
			actions = "";
			break;
		case "50":
		case 50:
			picURL = "media/items/buttplug1.jpg";
			name = "Steel buttplug";
			description = "A buttplug made ot ouf steel. You received it as member of Group L.";
			actions = "";
			break;
		case "51":
		case 51:
			picURL = "media/items/writtennote.png";
			name = "Hastily written note";
			description = "A hastily written note the strange man dropped.";
			actions = "[[Read|ReadWrittenNote]]";
			break;
		case "52":
		case 52:
			picURL = "media/items/silverring1.jpg";
			name = "Silver ring";
			description = "A silver ring you found on a bench.";
			actions = "[[Examine|ExamineSilverRing1]]";
			break;
	}
	var object = {picurl:picURL, name:name, description:description, actions:actions, id:id};
	return object;
}