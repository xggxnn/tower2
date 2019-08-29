import fui_BagItem from "../../Generates/Bag/fui_BagItem";
import BagWin from "../../../gamemodule/Windows/BagWin";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import ResourceInfo from "../../../csvInfo/ResourceInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BagItem extends fui_BagItem {

	moduleWindow: BagWin;

	public static DependPackages: string[] = ["Bag"];

	public static createInstance(): UI_BagItem {
		return <UI_BagItem>(fui_BagItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BagItem.URL, UI_BagItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_checkBtn.onClick(this, this.checkClick);
	}
	private cardId: number = 0;
	private checkClick(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		let data = {
			id: this.cardId,
		}
		Game.proto.openCard(data);
	}

	public giftSetData(index: number): void {
		let giftdata: RewardItem = Game.playData.curGift[index];
		this.cardId = giftdata.itemId;
		let resource = ResourceInfo.getInfo(this.cardId);
		this.m_tip.text = resource.desc;
		this.m_price.setVar("name", resource.desc).flushVars();
		this.m_buyNum.setVar("count", giftdata.itemNum.toString()).flushVars();
		this.m_pic.icon = SpriteKey.getUrl(SpriteKey.Gift);
		this.m_have.setSelectedIndex(0);
		this.m_type.setSelectedIndex(0);
		this.m_checkBtn.title = "打开";
		Game.redTip.hideRedTip(this.m_checkBtn, this.id);
	}


}
UI_BagItem.bind();
