import fui_BagItem from "../../Generates/Bag/fui_BagItem";
import BagWin from "../../../gamemodule/Windows/BagWin";
import HeroInfo from "../../../dataInfo/HeroInfo";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import GiftData from "../../../gamemodule/DataStructs/GiftData";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";

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
	private types: number = 0;
	private cardId: number = 0;
	private checkClick(): void {
		if (this.moduleWindow) {
			switch (this.types) {
				case 1:
					{
						EventManager.event(EventKey.SHOW_UI_WAIT);
						let data = {
							id: this.cardId,
						}
						Game.proto.openCard(data);
					}
					break;
				case 2:
					{
						if (this.heroInf != null) {
							Game.battleData.clickHeroInf = this.heroInf;
							this.moduleWindow.createHeroInfoUI();
						}
					}
					break;
			}
		}
	}

	public giftSetData(index: number, moduleWindow: BagWin): void {
		this.moduleWindow = moduleWindow;
		this.types = 1;
		let giftdata: GiftData = Game.playData.curGift[index];
		this.cardId = giftdata.id;
		this.m_tip.text = giftdata.dataInf.name;
		this.m_price.setVar("name", giftdata.dataInf.name).flushVars();
		this.m_buyNum.setVar("count", giftdata.count.toString()).flushVars();
		this.m_pic.icon = SpriteKey.getUrl(SpriteKey.Gift);
		this.m_have.setSelectedIndex(0);
		this.m_type.setSelectedIndex(0);
		this.m_checkBtn.title = "打开";
	}
	private heroInf: HeroInfo = null;
	// 显示碎片
	public clipsSetData(id: string, Clips: number, moduleWindow: BagWin): void {
		this.moduleWindow = moduleWindow;
		this.types = 2;
		this.heroInf = HeroInfo.getInfo(id);
		this.m_clipsNum.setVar("count", Clips.toString()).flushVars();
		this.m_heroName.setVar("name", this.heroInf.name).flushVars();
		this.m_pic.icon = SpriteKey.getUrl("icon" + this.heroInf.id + ".png");
		if (Game.playData.curHero.indexOf(this.heroInf.id) != -1) {
			this.m_have.setSelectedIndex(0);
		}
		else {
			this.m_have.setSelectedIndex(1);
		}
		this.m_type.setSelectedIndex(1);
		this.m_checkBtn.title = "查看";
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {

	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_BagItem.bind();
