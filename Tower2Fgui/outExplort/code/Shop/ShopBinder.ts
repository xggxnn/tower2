/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_ShopMain from "./fui_ShopMain";
import fui_ItemShop from "./fui_ItemShop";

export default class ShopBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_ShopMain.URL, fui_ShopMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_ItemShop.URL, fui_ItemShop);
	}
}