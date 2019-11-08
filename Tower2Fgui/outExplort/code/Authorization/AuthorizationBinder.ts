/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import fui_AuthorizationMain from "./fui_AuthorizationMain";
import fui_FriendPatrol from "./fui_FriendPatrol";
import fui_FriendItem from "./fui_FriendItem";

export default class AuthorizationBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(fui_AuthorizationMain.URL, fui_AuthorizationMain);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_FriendPatrol.URL, fui_FriendPatrol);
		fairygui.UIObjectFactory.setPackageItemExtension(fui_FriendItem.URL, fui_FriendItem);
	}
}