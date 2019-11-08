/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_boxItem from "./fui_boxItem";
import fui_SurroundMain from "./fui_SurroundMain";
import fui_EndlessItem from "./fui_EndlessItem";
import fui_KingItem from "./fui_KingItem";
import fui_TaskItem from "./fui_TaskItem";

export default class SurroundBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_boxItem.URL, fui_boxItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_SurroundMain.URL, fui_SurroundMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_EndlessItem.URL, fui_EndlessItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_KingItem.URL, fui_KingItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_TaskItem.URL, fui_TaskItem);
	}
}