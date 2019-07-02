import fui_PropBtn from "../../Generates/Arrangement/fui_PropBtn";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_PropBtn extends fui_PropBtn {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_PropBtn {
		return <UI_PropBtn>(fui_PropBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_PropBtn.URL, UI_PropBtn);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.on(fairygui.Events.DROP, this, this.onDrop);
	}
	// 拖拽松手在当前按钮上，替换内容
	private onDrop(data: any, evt: laya.events.Event): void {
		if (this.seatIndex == -1) return;
		this.heroInf = Game.battleData.heroInf;
		let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
		dic.add(Number(this.seatIndex), Number(this.heroInf.id));
		this.seatSetData(this.seatIndex, this.heroInf);
		EventManager.event(EventKey.ADD_HERO);
	}
	public heroInf: HeroInfo = null;
	// 列表英雄赋值
	public setData(heroInf: HeroInfo): void {
		this.heroInf = heroInf;
		this.title = heroInf.name;
		let index: number = Number(this.heroInf.id);
		while (index > 6) {
			index -= 6;
		}
		switch (index) {
			case 0:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1001)
				break;
			case 1:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1002)
				break;
			case 2:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1003)
				break;
			case 3:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1005)
				break;
			case 4:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1006)
				break;
			case 5:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1007)
				break;
			case 6:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1012)
				break;
			default:
				this.icon = SpriteKey.getUrl(SpriteKey.icon_1001)
				break;
		}
		this.m_status.setSelectedIndex(2);
	}

	private seatIndex: number = -1;
	// 上阵英雄赋值
	public seatSetData(index: number, heroInf?: HeroInfo): void {
		this.seatIndex = index;
		if (heroInf) {
			this.setData(heroInf);
		}
		else {
			let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
			if (dic.hasKey(this.seatIndex)) {
				heroInf = HeroInfo.getInfo(dic.getValue(this.seatIndex));
				this.setData(heroInf);
			}
			else {
				this.m_status.setSelectedIndex(0);
			}
		}
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
UI_PropBtn.bind();
