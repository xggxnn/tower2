/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_HeroFetters from "./fui_HeroFetters";
import fui_coinLabel from "./fui_coinLabel";
import fui_seatBtn from "./fui_seatBtn";
import fui_fightBtn from "./fui_fightBtn";
import fui_conquestBtn from "./fui_conquestBtn";
import fui_HomeMain from "./fui_HomeMain";
import fui_GeneralBtns from "./fui_GeneralBtns";
import fui_Synthetise from "./fui_Synthetise";

export default class HomeBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_HeroFetters.URL, fui_HeroFetters);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_coinLabel.URL, fui_coinLabel);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_seatBtn.URL, fui_seatBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_fightBtn.URL, fui_fightBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_conquestBtn.URL, fui_conquestBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_HomeMain.URL, fui_HomeMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_GeneralBtns.URL, fui_GeneralBtns);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_Synthetise.URL, fui_Synthetise);
	}
}