import fui_PropBtn from "../../Generates/Arrangement/fui_PropBtn";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import BagWin from "../../../gamemodule/Windows/BagWin";
import Dictionary from "../../../tool/Dictionary";
import Fun from "../../../tool/Fun";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import PositionunlockInfo from "../../../csvInfo/PositionunlockInfo";

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
		if (this.isUnlock) return;
		if (this.heroInf != null && Game.battleMap.maxMapId >= 3) {
			Game.battleData.clickHeroInf = this.heroInf;
			Game.battleData.isShowGainBtn = false;
			this.moduleWindow.createHeroInfoUI();
		}
	}
	// 上阵英雄拖拽开始
	private ondragStarts(evt: laya.events.Event): void {
		if (this.isUnlock) return;
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
		if (this.isUnlock) return;
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

	public addSeatEvent(): void {
		Game.battleData.sUpdateDragHero.add(this.seatStatusChange, this);
		Game.battleData.sUpdateDragHeroOver.add(this.seatStatusChangeOver, this);
	}
	public removeSeatEvent(): void {
		Game.battleData.sUpdateDragHero.remove(this.seatStatusChange, this);
		Game.battleData.sUpdateDragHeroOver.remove(this.seatStatusChangeOver, this);
	}
	public seatStatusChange(): void {
		if (this.seatIndex >= 0) {
			if (this.heroInf && Game.battleData.heroInf) {
				let curDic = Game.battleData.getHeroFightVal(this.heroInf.id);
				let _dic = Game.battleData.getHeroFightVal(Game.battleData.heroInf.id);
				let tip = Game.playData.fightTip(curDic);
				this.m_atk.text = String(tip.getValue(FightType.Atk));
				this.m_speed.text = Fun.format("{0}次/秒", tip.getValue(FightType.Speed));
				this.m_crit.text = Fun.format("{0}%", tip.getValue(FightType.Crit));
				this.m_burst.text = Fun.format("{0}%", tip.getValue(FightType.Burst));
				this.m_infAtk.setSelectedIndex(this.checkVal(curDic.getValue(FightType.Atk) + curDic.getValue(FightType.AtkEx), _dic.getValue(FightType.Atk) + _dic.getValue(FightType.AtkEx)))
				this.m_infSpeed.setSelectedIndex(this.checkVal(curDic.getValue(FightType.Speed) + curDic.getValue(FightType.SpeedEx), _dic.getValue(FightType.Speed) + _dic.getValue(FightType.SpeedEx)))
				this.m_infCrit.setSelectedIndex(this.checkVal(curDic.getValue(FightType.Crit) + curDic.getValue(FightType.CritEx), _dic.getValue(FightType.Crit) + _dic.getValue(FightType.CritEx)))
				this.m_infBurst.setSelectedIndex(this.checkVal(curDic.getValue(FightType.Burst) + curDic.getValue(FightType.BurstEx), _dic.getValue(FightType.Burst) + _dic.getValue(FightType.BurstEx)))
				this.m_infs.setSelectedIndex(1);
			}
		}
	}
	private checkVal(val1: number, val2: number): number {
		if (val1 > val2) {
			return 2;
		}
		else if (val2 > val1) {
			return 0;
		}
		return 1;
	}
	private seatStatusChangeOver(): void {
		if (this.seatIndex >= 0) {
			this.m_infs.setSelectedIndex(0);
		}
	}

	public seatIndex: number = -1;
	private seatSk: BaseSK = null;
	private isUnlock: boolean = false;
	// 上阵英雄赋值
	public seatSetData(index: number, heroInf: HeroInfoData, moduleWindow?: ArrangementWin): void {
		this.heroInf = null;
		this.seatIndex = index;
		let unlock = PositionunlockInfo.getSeatInfo(this.seatIndex);
		if (Game.battleMap.maxMapId <= unlock) {
			this.m_status.setSelectedIndex(4);
			let mapLevel = Fun.idToMapLevel(unlock);
			this.m_unlock.text = "通关" + mapLevel.map + "-" + mapLevel.level + "解锁";
			this.isUnlock = true;
			return;
		}
		this.isUnlock = false;
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
			this.m_sk.displayObject.addChild(this.seatSk);
			this.seatSk.scale(0.8, 0.8);
			this.seatSk.pos(25, 25);
			this.seatSk.play(HeroAniEnums.Stand, true);
			this.m_status.setSelectedIndex(2);
		}
		else {
			this.m_status.setSelectedIndex(0);
		}
	}
	public scaleSk(): void {
		this.m_status.setSelectedIndex(3);
	}
	public showTipScale(): void {
		if (this.isUnlock) {
			this.m_status.setSelectedIndex(4);
		}
		else {
			if (!this.seatSk) {
				this.m_status.setSelectedIndex(0);
			}
			else {
				this.m_status.setSelectedIndex(2);
			}
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
