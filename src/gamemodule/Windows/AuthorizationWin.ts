import FWindow from "../FWindow";
import UI_FriendItem from "../../fgui/Extend/Authorization/UI_FriendItem";
import UI_FriendPatrol from "../../fgui/Extend/Authorization/UI_FriendPatrol";
import UI_AuthorizationMain from "../../fgui/Extend/Authorization/UI_AuthorizationMain";
/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class AuthorizationWin extends FWindow {

	content: UI_AuthorizationMain;

	constructor() {
		super();
		this.addAssetForFguiComponent(UI_AuthorizationMain);
		this.addAssetForFguiComponent(UI_FriendItem);
		this.addAssetForFguiComponent(UI_FriendPatrol);
	}

	protected onMenuCreate(): void {
		this.content = UI_AuthorizationMain.createInstance();
		this.contentPane = this.content;
		super.onMenuCreate();
	}
}
