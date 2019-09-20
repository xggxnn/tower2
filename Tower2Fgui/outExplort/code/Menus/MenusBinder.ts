/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_MapItem from "./fui_MapItem";
import fui_DayFight from "./fui_DayFight";
import fui_SelectionDay from "./fui_SelectionDay";
import fui_Selection from "./fui_Selection";
import fui_MenusMain from "./fui_MenusMain";
import fui_selectionBtn from "./fui_selectionBtn";
import fui_Trial from "./fui_Trial";

export default class MenusBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_MapItem.URL, fui_MapItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_DayFight.URL, fui_DayFight);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_SelectionDay.URL, fui_SelectionDay);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_Selection.URL, fui_Selection);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_MenusMain.URL, fui_MenusMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_selectionBtn.URL, fui_selectionBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_Trial.URL, fui_Trial);
	}
}