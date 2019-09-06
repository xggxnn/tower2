/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_HeroItem2 from "./fui_HeroItem2";
import fui_IllustrationMain from "./fui_IllustrationMain";
import fui_HeroItem from "./fui_HeroItem";

export default class IllustrationBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_HeroItem2.URL, fui_HeroItem2);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_IllustrationMain.URL, fui_IllustrationMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_HeroItem.URL, fui_HeroItem);
	}
}