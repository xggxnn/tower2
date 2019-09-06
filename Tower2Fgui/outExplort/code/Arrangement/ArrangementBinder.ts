/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_SkillItem from "./fui_SkillItem";
import fui_AssociationItem from "./fui_AssociationItem";
import fui_UpBtn from "./fui_UpBtn";
import fui_HeroIcon55 from "./fui_HeroIcon55";
import fui_FightTip from "./fui_FightTip";
import fui_PropBtn from "./fui_PropBtn";
import fui_ArrangementMain from "./fui_ArrangementMain";
import fui_UpLevel from "./fui_UpLevel";

export default class ArrangementBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_SkillItem.URL, fui_SkillItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_AssociationItem.URL, fui_AssociationItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_UpBtn.URL, fui_UpBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_HeroIcon55.URL, fui_HeroIcon55);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_FightTip.URL, fui_FightTip);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_PropBtn.URL, fui_PropBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_ArrangementMain.URL, fui_ArrangementMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_UpLevel.URL, fui_UpLevel);
	}
}