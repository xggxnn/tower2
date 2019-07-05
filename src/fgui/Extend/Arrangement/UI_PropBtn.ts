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
		this.onClick(this, this.clickBtn);
	}
	// 按钮被点击
	private clickBtn(): void {
		if (this.heroInf != null) {
			Game.battleData.clickHeroInf = this.heroInf;
			this.moduleWindow.createHeroInfoUI();
		}
	}
	// 上阵英雄拖拽开始
	private ondragStarts(evt: laya.events.Event): void {
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(evt.currentTarget);
		btn.stopDrag();//取消对原目标的拖动，换成一个替代品
		if (this.heroInf != null) {
			Game.battleData.seatPos = this.seatIndex;
			Game.battleData.heroInf = this.heroInf;
			Game.battleData.seatBtn = this;
			fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
			Game.battleData.startDrag = true;
		}
	}
	// 拖拽松手在当前按钮上，替换内容
	private onDrop(data: any, evt: laya.events.Event): void {
		if (this.seatIndex == -1 || Game.battleData.heroInf == null) return;
		if (Game.battleData.seatPos >= 0 && Game.battleData.seatPos == this.seatIndex) return;
		if (Game.battleData.seatPos < 0) {
			// 拖拽上阵
			this.addHero(Game.battleData.heroInf);
		}
		else {
			// 交换位置
			let oldInf = this.heroInf;
			this.addHero(Game.battleData.heroInf);
			if (Game.battleData.seatBtn != null) {
				Game.battleData.seatBtn.addHero(oldInf);
				Game.battleData.seatBtn = null;
			}
		}
	}
	// 上阵英雄
	public addHero(heroInf: HeroInfo): void {
		this.heroInf = heroInf;
		let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
		dic.add(this.seatIndex, this.heroInf != null ? this.heroInf.id : 0);
		this.seatSetData(this.seatIndex, this.heroInf);
		EventManager.event(EventKey.ADD_HERO);
	}
	public heroInf: HeroInfo = null;
	// 列表英雄赋值
	public setData(heroInf: HeroInfo, moduleWindow: ArrangementWin): void {
		if (this.moduleWindow == null) this.moduleWindow = moduleWindow;
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
	public seatSetData(index: number, heroInf: HeroInfo, moduleWindow?: ArrangementWin): void {
		this.seatIndex = index;
		if (!this.seatInit) {
			this.seatInit = true;
			this.draggable = true;
			this.on(fairygui.Events.DRAG_START, this, this.ondragStarts);
		}
		if (heroInf) {
			this.setData(heroInf, moduleWindow);
		}
		else {
			this.m_status.setSelectedIndex(0);
			let dic = Game.battleScene.seatHeroDic.getValue(Game.battleScene.seatHeroSelect);
			if (dic.hasKey(this.seatIndex)) {
				let id = dic.getValue(this.seatIndex);
				if (id > 0) {
					heroInf = HeroInfo.getInfo(id);
					if (heroInf) {
						this.setData(heroInf, moduleWindow);
					}
				}
			}
		}
	}
	private seatInit: boolean = false;

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
