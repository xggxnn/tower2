/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_BagItem from "./fui_BagItem";
import fui_BagMain from "./fui_BagMain";

export default class BagBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_BagItem.URL, fui_BagItem);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_BagMain.URL, fui_BagMain);
	}
}