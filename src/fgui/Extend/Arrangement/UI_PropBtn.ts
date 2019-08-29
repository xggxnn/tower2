import fui_PropBtn from "../../Generates/Arrangement/fui_PropBtn";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import EventKey from "../../../Tool/EventKey";
import BagWin from "../../../gamemodule/Windows/BagWin";
import Dictionary from "../../../Tool/Dictionary";
import Fun from "../../../Tool/Fun";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";

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
		this.canDrag = true;
	}
	// 能否拖拽
	public canDrag: boolean = true;
	// 按钮被点击
	private clickBtn(): void {
		if (this.heroInf != null && Game.battleMap.maxMapId >= 3) {
			Game.battleData.clickHeroInf = this.heroInf;
			Game.battleData.isShowGainBtn = false;
			this.moduleWindow.createHeroInfoUI();
		}
	}
	// 上阵英雄拖拽开始
	private ondragStarts(evt: laya.events.Event): void {
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(evt.currentTarget);
		btn.stopDrag();//取消对原目标的拖动，换成一个替代品
		if (Game.playData.guideIndex < GuideType.sevenStartFive) {
			return;
		}
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
		if (Game.playData.guideIndex == GuideType.FightReady) {
			if (this.seatIndex != 2 && this.seatIndex != 5 && this.seatIndex != 8) {
				return;
			}
		}
		else if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
			if (this.seatIndex != 1) {
				return;
			}
		}
		if (this.seatIndex == -1 || Game.battleData.heroInf == null) return;
		if (Game.battleData.seatPos >= 0 && Game.battleData.seatPos == this.seatIndex) return;
		if (Game.battleData.seatPos < 0) {
			// 拖拽上阵
			this.addHero(Game.battleData.heroInf);
		}
		else {
			// 交换位置
			let oldInf = this.heroInf;
			if (Game.battleData.seatBtn != null) {
				Game.battleData.seatBtn.addHero(oldInf);
				Game.battleData.seatBtn = null;
			}
			this.addHero(Game.battleData.heroInf);
		}
	}
	// 上阵英雄
	public addHero(heroInf: HeroInfoData): void {
		this.heroInf = heroInf;
		Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect][this.seatIndex] = this.heroInf != null ? this.heroInf.id : 0;
		this.seatSetData(this.seatIndex, this.heroInf);
		EventManager.event(EventKey.ADD_HERO);
	}
	public heroInf: HeroInfoData = null;
	// 列表英雄赋值
	public setData(heroInf: HeroInfoData, moduleWindow: ArrangementWin, showicon: boolean = true): void {
		if (this.moduleWindow == null) this.moduleWindow = moduleWindow;
		this.heroInf = heroInf;
		this.title = heroInf.name;
		this.icon = Game.playData.getIcon(this.heroInf.id + 11);
		this.m_quality.icon = SpriteKey.getUrl("quality" + this.heroInf.quality + ".png");
		this.m_race.icon = SpriteKey.getUrl("race" + this.heroInf.race + ".png");
		this.m_career.icon = SpriteKey.getUrl("career" + this.heroInf.career + ".png");

		this.m_status.setSelectedIndex(1);
		this.canDrag = Game.playData.curHeroInfoList.hasKey(this.heroInf.id);
	}

	public seatIndex: number = -1;
	private seatSk: BaseSK = null;
	// 上阵英雄赋值
	public seatSetData(index: number, heroInf: HeroInfoData, moduleWindow?: ArrangementWin): void {
		this.heroInf = null;
		this.seatIndex = index;
		if (!this.seatInit) {
			this.seatInit = true;
			this.draggable = true;
			this.on(fairygui.Events.DRAG_START, this, this.ondragStarts);
		}
		if (heroInf) {
			this.setData(heroInf, moduleWindow, false);
		}
		else {
			let id = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect][this.seatIndex];
			if (id > 0) {
				heroInf = HeroInfoData.getInfo(id);
				if (heroInf) {
					this.setData(heroInf, moduleWindow, false);
				}
			}
		}
		if (this.seatSk) {
			this.seatSk.destroy();
			this.seatSk = null;
		}
		if (heroInf) {
			this.seatSk = BaseSK.create("hero_" + heroInf.skin);
			this.displayObject.addChild(this.seatSk);
			this.seatSk.scale(0.8, 0.8);
			this.seatSk.pos(50, 50);
			this.seatSk.play(HeroAniEnums.Stand, true);
			this.m_status.setSelectedIndex(2);
		}
		else {
			this.m_status.setSelectedIndex(0);
		}
	}
	public scaleSk(): void {
		this.m_status.setSelectedIndex(3);
		if (this.seatSk) {
			fairygui.tween.GTween.to2(0.8, 0.8, 1, 1, 0.83).setTarget(this.seatSk, this.seatSk.scale);
		}
	}
	public showTipScale(): void {
		if (!this.seatSk) {
			this.m_status.setSelectedIndex(0);
		}
		else {
			this.m_status.setSelectedIndex(2);
		}
	}
	private seatInit: boolean = false;
	// 显示碎片
	public clipsSetData(id: string, Clips: number, moduleWindow?: BagWin): void {
		let heroInf = HeroInfoData.getInfo(id);
		this.title = Fun.format("{0}X{1}", heroInf.name, Clips);
		this.icon = Game.playData.getIcon(heroInf.id + 11);// SpriteKey.getUrl("hero_" + heroInf.skin + ".png");
		this.m_status.setSelectedIndex(1);
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
