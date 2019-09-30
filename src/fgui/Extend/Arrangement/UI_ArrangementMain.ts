import fui_ArrangementMain from "../../Generates/Arrangement/fui_ArrangementMain";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";
import UI_PropBtn from "./UI_PropBtn";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import Dictionary from "../../../tool/Dictionary";
import Association from "../../../gamemodule/DataStructs/Association";
import Fun from "../../../tool/Fun";
import SpriteKey from "../../SpriteKey";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import { MenuId } from "../../../gamemodule/MenuId";
import PlayerSkillInfo from "../../../csvInfo/PlayerSkillInfo";
import UI_DialogBox from "../System/UI_DialogBox";
import Pools from "../../../tool/Pools";
import UI_Hand from "../System/UI_Hand";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import UI_AssociationItem from "./UI_AssociationItem";
import UI_SkillItem from "./UI_SkillItem";
import UI_FightTip from "./UI_FightTip";
import UI_HeroIcon55 from "./UI_HeroIcon55";
import LoadFilesList from "../../../tool/LoadFilesList";
import LoaderManager from "../../../tool/LoaderManager";
import UI_FightProgress from "./UI_FightProgress";
import UI_GeneralBtn from "../System/UI_GeneralBtn";
import AdsManager from "../../../tool/AdsManager";
import UI_SeatBtn from "./UI_SeatBtn";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ArrangementMain extends fui_ArrangementMain {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_ArrangementMain {
		return <UI_ArrangementMain>(fui_ArrangementMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ArrangementMain.URL, UI_ArrangementMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_backBtn.onClick(this, this.backUI);
		this.m_fight.onClick(this, this.clickFightBtn);
		this.m_heroList.setVirtual();
		// 设置列表渲染函数
		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);

		this.m_heroList.on(Laya.Event.MOUSE_MOVE, this, this.onScroll);
		this.m_heroList.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		this.m_heroList.on(Laya.Event.MOUSE_UP, this, this.onScrollupHero);
		// this.m_sortBtn.onClick(this, this.sortHeroList, [false]);

		this.seatList = [];
		this.seatList.push(this.m_seat0 as UI_SeatBtn);
		this.seatList.push(this.m_seat1 as UI_SeatBtn);
		this.seatList.push(this.m_seat2 as UI_SeatBtn);
		this.seatList.push(this.m_seat3 as UI_SeatBtn);
		this.seatList.push(this.m_seat4 as UI_SeatBtn);
		this.seatList.push(this.m_seat5 as UI_SeatBtn);
		this.seatList.push(this.m_seat6 as UI_SeatBtn);
		this.seatList.push(this.m_seat7 as UI_SeatBtn);
		this.seatList.push(this.m_seat8 as UI_SeatBtn);

		// 设置列表渲染函数
		this.m_associationList.itemRenderer = Laya.Handler.create(this, this.initAssociationItem, null, false);
		this.m_associationList.on(fairygui.Events.CLICK_ITEM, this, this.onClickAssociationItem);

		// 升级

		this.m_levelUpBtn.onClick(this, this.openUpLevel);
		this.m_select1.onClick(this, this.selectClick, [0]);
		this.m_select2.onClick(this, this.selectClick, [1]);
		this.m_select3.onClick(this, this.selectClick, [2]);

		fairygui.DragDropManager.inst.dragAgent.setScale(0.5, 0.5);

		this.m_skillBg.onClick(this, this.closeSkillList, [false]);
		this.m_skillBtn.onClick(this, this.closeSkillList, [true])
		this.m_skillList.itemRenderer = Laya.Handler.create(this, this.initSkillItem, null, false);
		this.m_skillList.on(fairygui.Events.CLICK_ITEM, this, this.onClickSkillItem);

		this.m_help.onClick(this, this.helpClick);
		this.m_DropDown.onClick(this, this.clickDropDown);

	}
	private clickDropDown(): void {
		Game.battleData.sUpdateSortSign.addOnce(this.sorHero, this);
		Game.popup.showPopup(this.m_DropDown, false, true, "");
	}


	private seatList: Array<UI_SeatBtn> = [];

	private helpClick(): void {
		Game.tipWin.showTip(Game.tipTxt.txts("SuggestPowerTip"), false, null, null, "确定", "", 0);
	}
	///////////// 引导内容开始	//////////////////////
	// 此界面引导顺序
	private _guidIndex: number = 0;
	// 提示box
	private _guidTip: UI_DialogBox = null;
	// 当前需要定位的位置
	private _guidCurPos: Laya.Point = null;
	private _guidHand: UI_Hand = null;
	private fetterNext(): void {
		setTimeout(() => {
			this.showStartFightGuide();
		}, 100);
	}
	private showGuid(): void {
		if (this._guidHand) {
			fairygui.tween.GTween.kill(this._guidHand);
		}
		if (this._guidIndex == 12) {
			if (this._guidHand) {
				this._guidHand.removeFromParent();
				Pools.recycle(this._guidHand);
				this._guidHand = null;
			}
			if (this._guidTip) {
				this._guidTip.removeFromParent();
				Pools.recycle(this._guidTip);
				this._guidTip = null;
			}
			Game.playData.guideShowTipLong = true;
			EventManager.event(EventKey.SHOW_WAIT);
			this.moduleWindow.createGuideUI(this.m_associationList, new Laya.Point(this.m_associationList.x, this.m_associationList.y),
				Laya.Handler.create(this, this.fetterNext),
				Game.tipTxt.fettersTip, LocationType.Left);
		}
		else if (this._guidIndex == 11) {
			if (this._guidTip == null) {
				this._guidTip = Pools.fetch(UI_DialogBox);
				this.m_posGold.root.addChild(this._guidTip);
			}
			if (this._guidHand == null) {
				this._guidHand = Pools.fetch(UI_Hand);
				this.m_posGold.root.addChild(this._guidHand);
			}
			let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
			if (seatList[1] == 0) {
				this._guidCurPos = new Laya.Point(this.seatList[1].x + 50, this.seatList[1].y)
			}
			this._guidTip.setXY(this._guidCurPos.x, this._guidCurPos.y);
			this._guidTip.m_titles.text = Game.tipTxt.battleDrag;
			fairygui.tween.GTween.to2(this.m_heroList.x + 50, this.m_heroList.y + 50, this._guidCurPos.x, this._guidCurPos.y + 50, 2).setTarget(this._guidHand, this._guidHand.setXY).setRepeat(-1);
		}
		else if (this._guidIndex < 3) {
			if (this._guidTip == null) {
				this._guidTip = Pools.fetch(UI_DialogBox);
				this.m_posGold.root.addChild(this._guidTip);
			}
			if (this._guidHand == null) {
				this._guidHand = Pools.fetch(UI_Hand);
				this.m_posGold.root.addChild(this._guidHand);
			}
			let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
			if (seatList[2] == 0) {
				this._guidCurPos = new Laya.Point(this.seatList[2].x + 50, this.seatList[2].y)
			}
			else if (seatList[5] == 0) {
				this._guidCurPos = new Laya.Point(this.seatList[5].x + 50, this.seatList[5].y)
			}
			else {
				this._guidCurPos = new Laya.Point(this.seatList[8].x + 50, this.seatList[8].y)
			}
			this._guidTip.setXY(this._guidCurPos.x, this._guidCurPos.y);
			this._guidTip.m_titles.text = Game.tipTxt.battleDrag;
			fairygui.tween.GTween.to2(this.m_heroList.x + 50, this.m_heroList.y + 50, this._guidCurPos.x, this._guidCurPos.y + 50, 2).setTarget(this._guidHand, this._guidHand.setXY).setRepeat(-1);
		}
		else {
			if (this._guidTip) {
				this._guidTip.removeFromParent();
				Pools.recycle(this._guidTip);
				this._guidTip = null;
			}
			if (this._guidHand) {
				this._guidHand.removeFromParent();
				Pools.recycle(this._guidHand);
				this._guidHand = null;
			}
			setTimeout(() => {
				this.showStartFightGuide();
			}, 100);
		}
	}
	private showStartFightGuide(): void {
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
			Game.playData.guideIndex = GuideType.fiveEnterMenus;
		}
		else {
			Game.playData.guideIndex = GuideType.SetSeat;
		}
		EventManager.event(EventKey.SHOW_WAIT);
		this.moduleWindow.createGuideUI(this.m_fight, new Laya.Point(this.m_fight.x, this.m_fight.y), Laya.Handler.create(this, this.clickFightBtn), Game.tipTxt.battleFight, LocationType.Left);
	}
	public showToFightGuide(): void {
		if (Game.playData.guideIndex == GuideType.fiveUpLevelOver) {
			Game.playData.guideIndex = GuideType.sixEnterMenus;
			EventManager.event(EventKey.SHOW_WAIT);
			this.moduleWindow.createGuideUI(this.m_fight, new Laya.Point(this.m_fight.x, this.m_fight.y), Laya.Handler.create(this, this.clickFightBtn), Game.tipTxt.battleFight, LocationType.Left);
		}
	}
	///////////// 引导内容结束	//////////////////////

	// 显示或隐藏玩家技能列表
	private closeSkillList(v: boolean): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (Game.playData.guideIndex == GuideType.fiveUpLvelNext) return;
		Game.redData.skillRed = false;
		Game.redTip.hideRedTip(this.m_skillBtn);
		this.m_showHideSkill.setSelectedIndex(v ? 1 : 0);
		if (v) {
			this.m_skillList.numItems = PlayerSkillInfo.getCount();
			this.m_skillList.scrollToView(0);
		}
	}
	// 渲染技能item
	private initSkillItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_SkillItem;
		item.setData(PlayerSkillInfo.getInfo(index + 1), index % 2);
	}
	// skills点击item
	private onClickSkillItem(obj: fairygui.GObject): void {
		let index = this.m_skillList.getChildIndex(obj);
		// // 转换为点击item在整个列表中的真实索引
		// var realIndex: number = this.m_skillList.childIndexToItemIndex(index);
		let unlock = PlayerSkillInfo.getInfo(index + 1).unlock;
		if (unlock <= Game.playData.curLevel) {
			Game.playData.curPlaySkillIndex = index + 1;
			this.closeSkillList(false);
			this.refrushSkillInf();
		}
	}
	private refrushSkillInf(): void {
		let inf = PlayerSkillInfo.getInfo(Game.playData.curPlaySkillIndex);
		this.m_skillName.text = inf.name;
		this.m_skillBtn.icon = SpriteKey.getUrl("icon_skill0" + inf.id + ".png");
		if (Game.playData.preSkillUnLock < Game.playData.curLevel) {
			for (let i = 1, len = PlayerSkillInfo.getCount(); i <= len; i++) {
				let inf = PlayerSkillInfo.getInfo(i);
				if (inf.unlock > 1 && inf.unlock <= Game.playData.curLevel) {
					if (Game.playData.preSkillUnLock < inf.unlock) {
						Game.redData.skillRed = true;
						break;
					}
				}
			}
			Game.playData.preSkillUnLock = Game.playData.curLevel;
		}
		if (Game.redData.skillRed) {
			Game.redTip.showRedTip(this.m_skillBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_skillBtn);
		}
	}

	/**
	 * 合成英雄，更新列表
	 */
	private synthetiseOver(): void {
		this.refrushHeroList();
	}

	private openUpLevel(): void {
		// if (Game.playData.guideIndex == GuideType.FightReady) return;
		// if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (Game.playData.guideIndex < GuideType.fiveUpLvelNext) return;
		this.moduleWindow.createUpLevelUI();
	}

	// 切换布阵
	private selectClick(index: number): void {
		Game.battleScene.seatHeroSelect = index;
		this.refrushHeroList();
	}

	private dragItem: UI_PropBtn = null;
	// 拖拽英雄列表中
	private onScroll(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			let listNum = this.m_heroList.numItems;
			for (let cur = 0; cur < listNum; cur++) {
				if (cur >= listNum - this.m_heroList.getFirstChildInView()) {
					break;
				}
				let item = this.m_heroList.getChildAt(cur) as UI_PropBtn;
				if (item) {
					if (this.m_heroList.scrollPane.isChildInView(item)) {
						let itemRect = item.localToGlobalRect(0, 0, item.width, item.height);
						if (Laya.stage.mouseX < itemRect.x) {
							break;
						}
						if (Laya.stage.mouseX > itemRect.x) {
							this.dragItem = item
						}
					}
				}
			}
		}
	}
	// 拖拽出英雄列表范围
	private onScrollout(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.seatPos = -1;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		Game.battleData.startDrag = true;
		this.m_heroList.scrollPane.scrollToView(this.m_heroList.getFirstChildInView());
		Game.battleData.sUpdateDragHero.dispatch();
	}
	// 在下阵列表范围内抬起鼠标
	private onScrollupHero(): void {
		if (!Game.battleData.MenuEnterDay) {
			if (Game.battleData.seatBtn != null) {
				Game.battleData.seatBtn.addHero(null);
				Game.battleData.seatBtn = null;
			}
		}
		Game.battleData.heroInf = null;
		this.dragItem = null;
		Game.battleData.sUpdateDragHeroOver.dispatch();
	}
	// 在列表范围内抬起鼠标
	private onScrollup(): void {
		Game.battleData.heroInf = null;
		this.dragItem = null;
		Game.battleData.sUpdateDragHeroOver.dispatch();
	}
	// 鼠标抬起
	private mouseUp(): void {
		if (this.mouseupTimeout == -1 && Game.battleData.heroInf != null) {
			this.mouseupTimeout = setTimeout(() => {
				Game.battleData.heroInf = null;
				this.dragItem = null;
				Game.battleData.seatPos = -1;
				this.mouseupTimeout = -1;
				Game.battleData.startDrag = false;
				clearTimeout(this.mouseupTimeout);
			}, 10);
		}
		else {
			this.mouseupTimeout = setTimeout(() => {
				Game.battleData.heroInf = null;
				this.dragItem = null;
				Game.battleData.seatPos = -1;
				this.mouseupTimeout = -1;
				Game.battleData.startDrag = false;
				clearTimeout(this.mouseupTimeout);
			}, 10);
		}
		// Game.battleData.seatBtn = null;
		Game.battleData.sUpdateDragHeroOver.dispatch();
	}
	private mouseupTimeout: number = -1;

	// 渲染item 英雄列表的item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.heroList[index], this.moduleWindow);
	}
	// 刷新英雄列表
	private refrushHeroList(): void {
		if (Game.battleData.MenuEnterDay) {
			this.heroList = Game.battleData.dayHeroNoSeat;
		}
		else {
			this.heroList = Game.playData.curHaveHeroList;
		}
		this.association = Game.battleData.refrushAssociation();
		Game.battleData.refrushSeatFightInf();
		let curDic = Game.playData.curFightInf;
		let tip = Game.playData.fightTip(curDic);
		this.m_hit2.text = tip.getValue(FightType.Atk);
		this.m_speed2.setVar("count", tip.getValue(FightType.Speed)).flushVars();
		this.m_cirt2.setVar("count", tip.getValue(FightType.Crit)).flushVars();
		this.m_burt2.setVar("count", tip.getValue(FightType.Burst)).flushVars();
		if (Game.battleData.MenuEnterDay) {
			this.m_atkStatus.setSelectedIndex(0);
			this.m_speedStatus.setSelectedIndex(0);
			this.m_critStatus.setSelectedIndex(0);
			this.m_burstStatus.setSelectedIndex(0);
		}
		else {
			let _dic = Game.battleData.getWaveFightInf(this.showLevelId);
			let statusTip = Game.playData.checkFightVal(curDic, _dic, this.showLevelId);
			let atk = statusTip.getValue(FightType.Atk);
			if (this.showInMenu) {
				atk[0] = 1;
			}
			else {
				(this.m_atkPro as UI_FightProgress).setData(atk[1], atk[2], atk[3]);
			}
			this.m_atkStatus.setSelectedIndex(atk[0]);
			let speed = statusTip.getValue(FightType.Speed);
			if (this.showInMenu) {
				speed[0] = 1;
			}
			else {
				(this.m_speedPro as UI_FightProgress).setData(speed[1], speed[2], speed[3]);
			}
			this.m_speedStatus.setSelectedIndex(speed[0]);
			let crit = statusTip.getValue(FightType.Crit);
			if (this.showInMenu) {
				crit[0] = 1;
			}
			else {
				(this.m_critPro as UI_FightProgress).setData(crit[1], crit[2], crit[3]);
			}
			this.m_critStatus.setSelectedIndex(crit[0]);
			let brust = statusTip.getValue(FightType.Burst);
			if (this.showInMenu) {
				brust[0] = 1;
			}
			else {
				(this.m_burtPro as UI_FightProgress).setData(brust[1], brust[2], brust[3]);
			}
			this.m_burstStatus.setSelectedIndex(brust[0]);
		}
		this.sortHero();
		this.initSeatShow();
		this.associationGrayIndex = this.association.length - 1;
		this.association = this.association.concat(Game.battleData.refrushAssociationGray());
		this.m_associationList.numItems = this.association.length;
		this.m_associationList.scrollToView(0);
		if (Game.playData.guideIndex == GuideType.FightReady || Game.playData.guideIndex == GuideType.SnythHeroOver) {
			let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
			let curHave = 0;
			for (let i = 0; i < 9; i++) {
				if (seatList[i] != 0) {
					curHave++;
				}
			}
			if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
				if (curHave == 4) {
					this._guidIndex = 12;
					this.showGuid();
				}
			}
			if (Game.playData.guideIndex == GuideType.FightReady) {
				if (this._guidIndex < curHave) {
					this._guidIndex = curHave;
					this.showGuid();
				}
			}
		}
	}
	private _sortHeroType: number = 0;
	private sortInf = ["攻击排序", "攻频排序", "暴击排序", "爆伤排序"];
	private sorHero(index: number) {
		this._sortHeroType = index;
		this.m_dropTitle.text = this.sortInf[this._sortHeroType];
		this.sortHero();
	}
	private sortHeroList(init: boolean = false): void {
		if (!init) {
			this._sortHeroType++;
			if (this._sortHeroType > 3) {
				this._sortHeroType = 0;
			}
			this.sorHero(this._sortHeroType);
			this.sortHero();
		}
	}
	private sortHero(): void {
		switch (this._sortHeroType) {
			case 0:
				this.heroList.sort(this.sortCompare0);
				break;
			case 1:
				this.heroList.sort(this.sortCompare1);
				break;
			case 2:
				this.heroList.sort(this.sortCompare2);
				break;
			case 3:
				this.heroList.sort(this.sortCompare3);
				break;
		}
		this.m_heroList.numItems = this.heroList.length;
	}
	private sortCompare0(a: HeroInfoData, b: HeroInfoData): number {
		let curDicA = Game.battleData.getHeroFightVal(a.id);
		let curDicB = Game.battleData.getHeroFightVal(b.id);
		let aa = curDicA.getValue(FightType.Atk) + curDicA.getValue(FightType.AtkEx);
		let bb = curDicB.getValue(FightType.Atk) + curDicB.getValue(FightType.AtkEx);
		if (aa < bb) {
			return 1;
		}
		else if (aa > bb) {
			return -1;
		}
		return 0;
	}
	private sortCompare1(a: HeroInfoData, b: HeroInfoData): number {
		let curDicA = Game.battleData.getHeroFightVal(a.id);
		let curDicB = Game.battleData.getHeroFightVal(b.id);
		let aa = curDicA.getValue(FightType.Speed) + curDicA.getValue(FightType.SpeedEx);
		let bb = curDicB.getValue(FightType.Speed) + curDicB.getValue(FightType.SpeedEx);
		if (aa < bb) {
			return 1;
		}
		else if (aa > bb) {
			return -1;
		}
		return 0;
	}
	private sortCompare2(a: HeroInfoData, b: HeroInfoData): number {
		let curDicA = Game.battleData.getHeroFightVal(a.id);
		let curDicB = Game.battleData.getHeroFightVal(b.id);
		let aa = curDicA.getValue(FightType.Crit) + curDicA.getValue(FightType.CritEx);
		let bb = curDicB.getValue(FightType.Crit) + curDicB.getValue(FightType.CritEx);
		if (aa < bb) {
			return 1;
		}
		else if (aa > bb) {
			return -1;
		}
		return 0;
	}
	private sortCompare3(a: HeroInfoData, b: HeroInfoData): number {
		let curDicA = Game.battleData.getHeroFightVal(a.id);
		let curDicB = Game.battleData.getHeroFightVal(b.id);
		let aa = curDicA.getValue(FightType.Burst) + curDicA.getValue(FightType.BurstEx);
		let bb = curDicB.getValue(FightType.Burst) + curDicB.getValue(FightType.BurstEx);
		if (aa < bb) {
			return 1;
		}
		else if (aa > bb) {
			return -1;
		}
		return 0;
	}

	private initSeatShow(): void {
		for (let i = 0; i < 9; i++) {
			this.seatList[i].seatSetData(i, null, this.moduleWindow);
		}
	}


	// Association渲染item
	private initAssociationItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_AssociationItem;
		item.setData(this.association[index], index, this.associationGrayIndex);
	}
	private onClickAssociationItem(obj: fairygui.GObject): void {
		let index = this.m_associationList.getChildIndex(obj);
		// // 转换为点击item在整个列表中的真实索引
		// var realIndex: number = this.m_associationList.childIndexToItemIndex(index);
		if (Game.playData.unlockAssociationattribute.indexOf(this.association[index].attribute_id) != -1) {
			Game.playData.fettersInfos = this.association[index];
			Game.playData.sShowFetters.dispatch();
		}
		else {
			let str = "";
			if (this.association[index].race > 0) {
				str = "AssociationLockTip2";
			}
			else if (this.association[index].career > 0) {
				str = "AssociationLockTip3";
			}
			else if (this.association[index].pointF > 0) {
				str = "AssociationLockTip4";
			}
			Game.popup.showPopup(obj, false, false, Game.tipTxt.txts(str));
		}
	}


	private heroList: HeroInfoData[] = [];
	private association: Association[] = [];
	private associationGrayIndex: number = 0;

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (Game.playData.guideIndex == GuideType.fiveUpLvelNext) return;
		Game.battleScene.setSeat();
		if (this.moduleWindow.menuParameter.args.length == 2) {
			this.closeUI();
			setTimeout(() => {
				EventManager.event(EventKey.GAMEEXIT);
				Game.battleScene.stoneReset();
				Game.battleScene.clearEnemy();
				Game.battleScene.clearHero();
				Game.menu.open(MenuId.MenuSelect);
			}, 10);
		}
		else {
			// if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
			// 	Game.playData.guideIndex = GuideType.fettersOver;
			// }
			this.moduleWindow.menuBack();
		}
	}
	// 显示，相当于enable
	onWindowShow(): void {
		Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
		EventManager.on(EventKey.ADD_HERO, this, this.refrushHeroList);
		EventManager.on(ProtoEvent.FETTERREWARD_CALL_BACK, this, this.refrushHeroList);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.refreshHeroLevel);
		EventManager.on(EventKey.HERO_STAR_UPDATE, this, this.refreshHeroLevel);
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.SAVEATT_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.DAYFIGHTSTART_CALL_BACK, this, this.enterBattle);
		EventManager.on(EventKey.REWARDED_VIDEO_AD_YES, this, this.skipOk);
		Game.playData.sShowFetters.add(this.moduleWindow.createHeroFetters, this.moduleWindow);
		for (let i = 0; i < 9; i++) {
			this.seatList[i].addSeatEvent();
		}
		this.moduleWindow.closeOtherWindow();
		if (Game.playData.guideIndex < GuideType.Win) {
			this.setData();
		}
		else {
			EventManager.event(EventKey.SHOW_UI_WAIT);
			EventManager.once(EventKey.LOADER_OVER, this, this.setData);
			let _list: Array<string> = [];
			_list = _list.concat(LoadFilesList.res_effect_effect_ResList);
			LoaderManager.addList(_list);
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		if (this._guidTip) {
			this._guidTip.removeFromParent();
			Pools.recycle(this._guidTip);
			this._guidTip = null;
		}
		if (this._guidHand) {
			this._guidHand.removeFromParent();
			Pools.recycle(this._guidHand);
			this._guidHand = null;
		}
		for (let i = 0; i < 9; i++) {
			this.seatList[i].removeSeatEvent();
		}
		Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
		Game.playData.sShowFetters.remove(this.moduleWindow.createHeroFetters, this.moduleWindow);
		EventManager.offAllCaller(this);
	}
	private showLevelId: number = 1;
	private showInMenu: boolean = false;
	// 界面赋值
	private setData(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		var args: Array<any> = this.moduleWindow.menuParameter.args;
		if (args.length > 0) {
			this.showInMenu = false;
			this.showLevelId = Game.battleData.level_id;
			let mapLevel = Fun.idToMapLevel(Game.battleData.level_id);
			this.m_titleMap.text = mapLevel.map + "-" + mapLevel.level;
			this.titleIndex = args[0] + 1;
			this.m_fight.title = "开始战斗";
		}
		else {
			this.showInMenu = true;
			this.showLevelId = Game.battleMap.maxMapId;
			this.m_fight.title = "去闯关";
		}
		this.sortHeroList(true);
		// this.changeStatus(0);
		this._init = false;
		this.refrushHeroList();
		if (this.heroList.length > 0) {
			this.m_heroList.scrollToView(0);
		}
		this.refreshHeroLevel();
		if (Game.battleData.MenuEnterDay) {
			this.m_tab.setSelectedIndex(0);
		}
		else {
			this.m_tab.setSelectedIndex(Game.battleScene.seatHeroSelect);
		}
		this._init = true;
		this.refrushSkillInf();
		if (Game.playData.guideIndex == GuideType.FightReady) {
			this.m_select2.enabled = false;
			this.m_select3.enabled = false;
			this._guidIndex = 0;
			setTimeout(() => {
				this.showGuid();
			}, 1000);
		}
		else if (Game.playData.guideIndex == GuideType.StartFight) {
			this.m_select2.enabled = true;
			this.m_select3.enabled = true;
			setTimeout(() => {
				this.showStartFightGuide();
			}, 1000);
		}
		else if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
			this.m_select2.enabled = false;
			this.m_select3.enabled = false;
			if (this._guidIndex != 12) {
				this._guidIndex = 11;
			}
			setTimeout(() => {
				this.showGuid();
			}, 1000);
		}
		else {
			this.m_select2.enabled = true;
			this.m_select3.enabled = true;
			if (Game.playData.guideIndex == GuideType.fiveFight || Game.playData.guideIndex == GuideType.sixFight || Game.playData.guideIndex == GuideType.sevenFight) {
				Game.playData.guideIndex++;
				EventManager.event(EventKey.SHOW_WAIT);
				setTimeout(() => {
					this.moduleWindow.createGuideUI(this.m_fight, new Laya.Point(this.m_fight.x, this.m_fight.y), Laya.Handler.create(this, this.clickFightBtn), Game.tipTxt.fiveStartFive, LocationType.Left);
				}, 1000);
			}
			else if (Game.playData.guideIndex == GuideType.fiveWin) {
				EventManager.event(EventKey.SHOW_WAIT);
				setTimeout(() => {
					Game.playData.guideIndex = GuideType.fiveUpLvelNext;
					this.moduleWindow.createGuideUI(this.m_levelUpBtn, new Laya.Point(this.m_levelUpBtn.x, this.m_levelUpBtn.y), Laya.Handler.create(this, this.openUpLevel), Game.tipTxt.fiveUpLevel, LocationType.Left);
				}, 1000);
			}
		}
		if (Game.battleData.MenuEnterDay) {
			this.m_select2.enabled = false;
			this.m_select3.enabled = false;
			this.m_showTitle.setSelectedIndex(3);
		}
		else {
			this.m_showTitle.setSelectedIndex(0);
		}
		if (args.length > 0) {
			this.showUIStep1();
		}
		else {
			this.m_seatFight.setSelectedIndex(0);
			this.m_initStatus.setSelectedIndex(0);
			this.m_main.play();
		}
	}
	// 底座起飞
	private showUIStep1(): void {
		this.m_seatFight.setSelectedIndex(0);
		this.m_initStatus.setSelectedIndex(1);
		this.m_ArrangeTobattle.playReverse(Laya.Handler.create(this, this.showUIStep2));
		for (let i = 0; i < 9; i++) {
			this.seatList[i].m_small.play();
			this.seatList[i].m_status.setSelectedIndex(3);
		}
	}
	// UI显示
	private showUIStep2(): void {
		this.m_initStatus.setSelectedIndex(0);
		this.m_aniShow.play(Laya.Handler.create(this, this.showUIStep3));
	}
	private titleIndex: number = 0;
	// 显示战斗UI
	private showUIStep3(): void {
		this.m_seatFight.setSelectedIndex(1);
		if (Game.battleData.MenuEnterDay) {
			this.m_showTitle.setSelectedIndex(3);
		}
		else {
			this.m_showTitle.setSelectedIndex(this.titleIndex);
		}
		for (let i = 0; i < 9; i++) {
			this.seatList[i].showTipScale();
		}
	}
	// 隐藏战斗UI
	private hideUIStep1(): void {
		this.m_aniHide.play(Laya.Handler.create(this, this.hideUIStep2));
	}
	// 进入战斗场景
	private hideUIStep2(): void {
		this.m_ArrangeTobattle.play(Laya.Handler.create(this, this.hideUIStep3));
		for (let i = 0; i < 9; i++) {
			this.seatList[i].m_big.play();
			this.seatList[i].scaleSk();
		}
	}
	private hideUIStep3(): void {
		if (Game.battleData.MenuEnterDay) {
			let heros1: Array<number> = [];
			let heros2: Array<number> = [];
			for (let i = 0; i < 12; i++) {
				if (i < 9) {
					heros1.push(Game.battleData.dayFightHeroSort[i]);
				}
				else {
					heros2.push(Game.battleData.dayFightHeroSort[i]);
				}
			}
			let data = {
				progress: Game.battleData.dayFightProgress,
				hero1: heros1,
				hero2: heros2,
			}
			Game.proto.dayFightStart(data);
		}
		else {
			Game.battleScene.setSeat();
			this.enterBattle();
		}
	}
	private enterBattle(): void {
		this.closeUI();
		EventManager.event(EventKey.GAMESTART);
	}

	// 连续点击判断
	private _clickTime: number = 0;
	clickFightBtn(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (Game.playData.guideIndex == GuideType.fiveUpLvelNext) return;
		if (Laya.Browser.now() - this._clickTime <= 3000) {
			return;
		}
		this._clickTime = Laya.Browser.now();

		this._skipFight = false;
		if (Game.battleData.MenuEnterDay) {
			this.fightReq();
		}
		else {
			if (this.moduleWindow.menuParameter.args.length == 0) {
				this.enterMenu();
			}
			else {
				if (this.m_atkStatus.selectedIndex == 2 || this.m_speedStatus.selectedIndex == 2 || this.m_critStatus.selectedIndex == 2 || this.m_burstStatus.selectedIndex == 2) {
					Game.tipWin.showTip(Game.tipTxt.FightFailReqTip, true, Laya.Handler.create(this, this.fightReq), Laya.Handler.create(this, this.backUI), "继续挑战", "暂不挑战");
				}
				else {
					if (Game.playData.guideIndex >= GuideType.sevenStartFive && Game.battleData.fight_type == 1 && this.m_atkStatus.selectedIndex == 0 && this.m_speedStatus.selectedIndex == 0 && this.m_critStatus.selectedIndex == 0 && this.m_burstStatus.selectedIndex == 0) {
						Game.tipWin.showTip(Game.tipTxt.FightSkipTip, true, Laya.Handler.create(this, this.skipFight), Laya.Handler.create(this, this.fightReq), "跳过战斗", "继续战斗");
					}
					else {
						this.fightReq();
					}
				}
			}
		}
	}
	private enterMenu(): void {
		Game.battleScene.setSeat();
		this.closeUI();
		Game.menu.open(MenuId.MenuSelect);
	}
	private fightReq(): void {
		if (this._skipFight) {
			Game.battleScene.setSeat();
			this.closeUI();
			EventManager.event(EventKey.SKIPGAME);
		}
		else {
			this.m_seatFight.setSelectedIndex(0);
			Game.playData.guideDeathEnemy = 0;
			this.hideUIStep1();
		}
	}
	private _skipFight: boolean = false;
	// 准备观看视频跳过战斗过程
	private skipFight(): void {
		if (AdsManager.usable) {
			AdsManager.show();
		}
		else {
			Game.tipWin.showTip("视频加载失败，请稍后再试!", false);
		}
	}
	private skipOk(): void {
		this._skipFight = true;
		this.fightReq();
	}

	private _init: boolean = false;
	// 刷新英雄等级
	private refreshHeroLevel(): void {
		this.m_level.setVar("count", (Game.playData.curLevel - 1).toString()).flushVars();
		if (Game.redData.levelRed || Game.redData.starRed) {
			(this.m_levelUpBtn as UI_GeneralBtn).m_redTip.setSelectedIndex(1);
		}
		else {
			(this.m_levelUpBtn as UI_GeneralBtn).m_redTip.setSelectedIndex(0);
		}
		this.refrushSkillInf();
		if (this._init) {
			this.refrushHeroList();
		}
		this.refreshHeroStar();
	}
	// 刷新英雄星级
	private refreshHeroStar(): void {
		this.m_star.setVar("count", Game.playData.curStar.toString()).flushVars();
		if (this._init) {
			this.refrushHeroList();
		}
	}


}
UI_ArrangementMain.bind();
