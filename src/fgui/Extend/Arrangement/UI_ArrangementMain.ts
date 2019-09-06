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
import AssociationAttributeInfo from "../../../csvInfo/AssociationAttributeInfo";
import AssociationCareerInfo from "../../../csvInfo/AssociationCareerInfo";
import AssociationRaceInfo from "../../../csvInfo/AssociationRaceInfo";
import TimeHouseInfo from "../../../csvInfo/TimeHouseInfo";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import AssociationSpecialInfo from "../../../csvInfo/AssociationSpecialInfo";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import WaveInfo from "../../../csvInfo/WaveInfo";
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
		this.seatList.push(this.m_seat0 as UI_PropBtn);
		this.seatList.push(this.m_seat1 as UI_PropBtn);
		this.seatList.push(this.m_seat2 as UI_PropBtn);
		this.seatList.push(this.m_seat3 as UI_PropBtn);
		this.seatList.push(this.m_seat4 as UI_PropBtn);
		this.seatList.push(this.m_seat5 as UI_PropBtn);
		this.seatList.push(this.m_seat6 as UI_PropBtn);
		this.seatList.push(this.m_seat7 as UI_PropBtn);
		this.seatList.push(this.m_seat8 as UI_PropBtn);

		// 设置列表渲染函数
		this.m_associationList.itemRenderer = Laya.Handler.create(this, this.initAssociationItem, null, false);
		this.m_associationList.on(fairygui.Events.CLICK_ITEM, this, this.onClickAssociationItem);
		this.m_closeAss.onClick(this, this.closeAssInf);
		this.m_assheroList.itemRenderer = Laya.Handler.create(this, this.initAssItem, null, false);

		// this.m_levelUpBtn.m_titles.text = "金乌";
		// this.m_levelUpBtn.m_icons.icon = SpriteKey.getUrl(SpriteKey.gold);
		// this.m_starUpBtn.m_titles.text = "玉蟾";
		// this.m_starUpBtn.m_icons.icon = SpriteKey.getUrl(SpriteKey.jadeite);
		// 升级
		this.m_levelUpBtn.onClick(this, this.openUpLevel);
		// // 升星
		// this.m_starUpBtn.onClick(this, this.starUpClick);

		this.m_select1.onClick(this, this.selectClick, [0]);
		this.m_select2.onClick(this, this.selectClick, [1]);
		this.m_select3.onClick(this, this.selectClick, [2]);

		fairygui.DragDropManager.inst.dragAgent.setScale(0.5, 0.5);

		// this.tuijianInit();
		// this.qianghuaInit();
		this.m_skillBg.onClick(this, this.closeSkillList, [false]);
		this.m_skillBtn.onClick(this, this.closeSkillList, [true])
		this.m_skillList.itemRenderer = Laya.Handler.create(this, this.initSkillItem, null, false);
		this.m_skillList.on(fairygui.Events.CLICK_ITEM, this, this.onClickSkillItem);

		this.m_help.onClick(this, this.helpClick);
		// this.m_help.visible = false;
		this.m_DropDown.onClick(this, this.clickDropDown);
	}
	private clickDropDown(): void {
		Game.battleData.sUpdateSortSign.addOnce(this.sorHero, this);
		Game.popup.showPopup(this.m_DropDown, false, true, "");
	}


	private seatList: Array<UI_PropBtn> = [];

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
				Pools.recycle(this._guidHand);
				this._guidHand = null;
			}
			if (this._guidTip) {
				Pools.recycle(this._guidTip);
				this._guidTip = null;
			}
			// if (this._guidTip == null) {
			// 	this._guidTip = Pools.fetch(UI_DialogBox);
			// 	this.m_posGold.root.addChild(this._guidTip);
			// }
			// this._guidCurPos = new Laya.Point(this.m_associationList.x, this.m_associationList.y);
			// this._guidTip.setXY(this._guidCurPos.x + 50, this._guidCurPos.y + 50);
			// this._guidTip.m_titles.text = Game.tipTxt...fettersTip;
			Game.playData.guideShowTipLong = true;
			this.moduleWindow.createGuideUI(this.m_associationList, new Laya.Point(this.m_associationList.x, this.m_associationList.y),
				Laya.Handler.create(this, this.fetterNext),
				Game.tipTxt.fettersTip, LocationType.Left);
			// setTimeout(() => {
			// 	this.moduleWindow.createGuideUI(this.m_backBtn, new Laya.Point(this.m_backBtn.x, this.m_backBtn.y),
			// 		Laya.Handler.create(this, this.backUI), Game.tipTxt.continueFightTip, LocationType.Lower);
			// }, 2000);
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
			else if (seatList[8] == 0) {
				this._guidCurPos = new Laya.Point(this.seatList[8].x + 50, this.seatList[8].y)
			}
			this._guidTip.setXY(this._guidCurPos.x, this._guidCurPos.y);
			this._guidTip.m_titles.text = Game.tipTxt.battleDrag;
			fairygui.tween.GTween.to2(this.m_heroList.x + 50, this.m_heroList.y + 50, this._guidCurPos.x, this._guidCurPos.y + 50, 2).setTarget(this._guidHand, this._guidHand.setXY).setRepeat(-1);
		}
		else {
			if (this._guidTip) {
				Pools.recycle(this._guidTip);
				this._guidTip = null;
			}
			if (this._guidHand) {
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
		this.moduleWindow.createGuideUI(this.m_fight, new Laya.Point(this.m_fight.x, this.m_fight.y), Laya.Handler.create(this, this.clickFightBtn), Game.tipTxt.battleFight, LocationType.Left);
	}
	public showToFightGuide(): void {
		if (Game.playData.guideIndex == GuideType.fiveUpLevelOver) {
			Game.playData.guideIndex = GuideType.sixEnterMenus;
			this.moduleWindow.createGuideUI(this.m_fight, new Laya.Point(this.m_fight.x, this.m_fight.y), Laya.Handler.create(this, this.clickFightBtn), Game.tipTxt.battleFight, LocationType.Left);
		}
	}
	///////////// 引导内容结束	//////////////////////

	// 显示或隐藏玩家技能列表
	private closeSkillList(v: boolean): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		Game.redData.skillRed = false;
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
				if (inf.unlock <= Game.playData.curLevel) {
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
		this.refrushTuijianHeroList();
	}

	private openUpLevel(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
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
		if (Game.battleData.seatBtn != null) {
			Game.battleData.seatBtn.addHero(null);
			Game.battleData.seatBtn = null;
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
			Game.battleData.heroInf = null;
			this.dragItem = null;
			Game.battleData.seatPos = -1;
			this.mouseupTimeout = -1;
			Game.battleData.startDrag = false;
		}
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
		this.heroList = Game.playData.curHaveHeroList;
		this.association = Game.battleData.refrushAssociation(true);
		Game.battleData.refrushSeatFightInf();
		let curDic = Game.playData.curFightInf;
		let tip = Game.playData.fightTip(curDic);
		this.m_hit2.text = tip.getValue(FightType.Atk);
		// this.m_hit2.setVar("count", tip.getValue(FightType.Atk)).flushVars();
		this.m_speed2.setVar("count", tip.getValue(FightType.Speed)).flushVars();
		this.m_cirt2.setVar("count", tip.getValue(FightType.Crit)).flushVars();
		this.m_burt2.setVar("count", tip.getValue(FightType.Burst)).flushVars();

		let _dic = Game.battleData.getWaveFightInf(this.showLevelId);
		let tip2 = Game.playData.fightTip(_dic);
		this.m_hit1.text = tip2.getValue(FightType.Atk);
		// this.m_hit1.setVar("count", tip2.getValue(FightType.Atk)).flushVars();
		this.m_speed1.setVar("count", tip2.getValue(FightType.Speed)).flushVars();
		this.m_cirt1.setVar("count", tip2.getValue(FightType.Crit)).flushVars();
		this.m_burt1.setVar("count", tip2.getValue(FightType.Burst)).flushVars();


		let statusTip = Game.playData.checkFightVal(curDic, _dic, this.showLevelId);
		let atk = statusTip.getValue(FightType.Atk);
		if (this.showInMenu) {
			atk = 1;
		}
		this.m_atkStatus.setSelectedIndex(atk);
		(this.m_atkTip as UI_FightTip).setData(curDic.getValue(FightType.Atk) + curDic.getValue(FightType.AtkEx), _dic.getValue(FightType.Atk) + _dic.getValue(FightType.AtkEx), atk);
		let speed = statusTip.getValue(FightType.Speed);
		if (this.showInMenu) {
			speed = 1;
		}
		this.m_speedStatus.setSelectedIndex(speed);
		(this.m_speedTip as UI_FightTip).setData(curDic.getValue(FightType.Speed) + curDic.getValue(FightType.SpeedEx), _dic.getValue(FightType.Speed) + _dic.getValue(FightType.SpeedEx), speed);
		let crit = statusTip.getValue(FightType.Crit);
		if (this.showInMenu) {
			crit = 1;
		}
		this.m_critStatus.setSelectedIndex(crit);
		(this.m_critTip as UI_FightTip).setData(curDic.getValue(FightType.Crit) + curDic.getValue(FightType.CritEx), _dic.getValue(FightType.Crit) + _dic.getValue(FightType.CritEx), crit);
		let brust = statusTip.getValue(FightType.Burst);
		if (this.showInMenu) {
			brust = 1;
		}
		this.m_burstStatus.setSelectedIndex(brust);
		(this.m_burstTip as UI_FightTip).setData(curDic.getValue(FightType.Burst) + curDic.getValue(FightType.BurstEx), _dic.getValue(FightType.Burst) + _dic.getValue(FightType.BurstEx), brust);
		this.sortHero();
		this.initSeatShow();
		this.m_associationList.numItems = this.association.length;
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
		item.setData(this.association[index], index % 2);
	}
	private onClickAssociationItem(obj: fairygui.GObject): void {
		let index = this.m_associationList.getChildIndex(obj);
		// // 转换为点击item在整个列表中的真实索引
		// var realIndex: number = this.m_associationList.childIndexToItemIndex(index);
		this.showAssInf(this.association[index]);
	}
	private assInfHeroList: Array<HeroInfoData> = [];
	private showAssInf(datas: Association): void {
		if (datas.race > 0) {
			this.m_icons.icon = SpriteKey.getUrl("race" + datas.race + ".png");
			let str = "";
			//"职业羁绊：";
			for (let i = 1, len = AssociationRaceInfo.getCount(); i <= len; i++) {
				let item = AssociationRaceInfo.getInfo(i);
				if (item.race == datas.race) {
					let att1 = AssociationAttributeInfo.getInfo(item.attribute);
					str += datas.names + "x" + item.num + "  " + Fun.format(att1.des, item.value) + "\n";
				}
			}
			this.m_assAtt.text = str;
		}
		else if (datas.career > 0) {
			this.m_icons.icon = SpriteKey.getUrl("career" + datas.career + ".png");
			let str = "";
			//"种族羁绊：";
			for (let i = 1, len = AssociationCareerInfo.getCount(); i <= len; i++) {
				let item = AssociationCareerInfo.getInfo(i);
				if (item.career == datas.career) {
					let att1 = AssociationAttributeInfo.getInfo(item.attribute);
					str += datas.names + "x" + item.num + "  " + Fun.format(att1.des, item.value) + "\n";
				}
			}
			this.m_assAtt.text = str;
		}
		else {
			this.m_icons.icon = "";
			this.m_assAtt.text = "";
		}
		this.m_asstitle.text = datas.names + " 羁绊详情";
		let att = AssociationAttributeInfo.getInfo(datas.attribute_id);
		this.m_assinf.text = Fun.format(att.des, datas.values);

		let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
		this.assInfHeroList = [];
		for (let i = 0; i < 9; i++) {
			if (seatList[i] > 0) {
				let hero = HeroInfoData.getInfo(seatList[i]);
				if (datas.race > 0 && hero.race == datas.race) {
					this.assInfHeroList.push(hero);
				}
				else if (datas.career > 0 && hero.career == datas.career) {
					this.assInfHeroList.push(hero);
				}
			}
		}
		this.m_assheroList.numItems = this.assInfHeroList.length;


		this.m_assTip.setSelectedIndex(1);
	}
	private initAssItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon55;
		item.m_icons.icon = SpriteKey.getUrl("hero_" + this.assInfHeroList[index].skin + ".png");
		item.m_quality.icon = SpriteKey.getUrl("quality" + this.assInfHeroList[index].quality + ".png");
	}
	private closeAssInf(): void {
		this.m_assTip.setSelectedIndex(0);
	}

	private heroList: HeroInfoData[] = [];
	private association: Association[] = [];

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
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
			if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
				Game.playData.guideIndex = GuideType.fettersOver;
			}
			this.moduleWindow.menuBack();
		}
	}
	// 显示，相当于enable
	onWindowShow(): void {
		Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
		Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
		EventManager.on(EventKey.ADD_HERO, this, this.refrushHeroList);
		EventManager.on(EventKey.ADD_HERO, this, this.refrushTuijianHeroList);
		EventManager.on(EventKey.ADD_HERO, this, this.refrushQianghuaList);
		EventManager.on(EventKey.HERO_LEVEL_UPDATE, this, this.refreshHeroLevel);
		EventManager.on(EventKey.HERO_STAR_UPDATE, this, this.refreshHeroStar);
		// EventManager.on(EventKey.COIN_GOLD_UPDATE, this, this.refreshCoinGold);
		// EventManager.on(EventKey.COIN_JADEITE_UPDATE, this, this.refreshCoinJadeite);
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.SAVEATT_CALL_BACK, this, this.synthetiseOver);
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
			// _list = _list.concat(LoadFilesList.res_sk_hero_ResList);
			LoaderManager.addList(_list);
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		if (this._guidTip) {
			Pools.recycle(this._guidTip);
			this._guidTip = null;
		}
		if (this._guidHand) {
			Pools.recycle(this._guidHand);
			this._guidHand = null;
		}
		for (let i = 0; i < 9; i++) {
			this.seatList[i].removeSeatEvent();
		}
		this.m_page.setSelectedIndex(0);
		this.closeAssInf();
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
		this.refreshHeroStar();
		// this.refreshCoinGold();
		// this.refreshCoinJadeite();
		this.m_tab.setSelectedIndex(Game.battleScene.seatHeroSelect);
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
				setTimeout(() => {
					this.moduleWindow.createGuideUI(this.m_fight, new Laya.Point(this.m_fight.x, this.m_fight.y), Laya.Handler.create(this, this.clickFightBtn), Game.tipTxt.fiveStartFive, LocationType.Left);
				}, 1000);
			}
			else if (Game.playData.guideIndex == GuideType.fiveWin) {
				Game.playData.guideIndex = GuideType.fiveUpLvelNext;
				setTimeout(() => {
					this.moduleWindow.createGuideUI(this.m_levelUpBtn, new Laya.Point(this.m_levelUpBtn.x, this.m_levelUpBtn.y), Laya.Handler.create(this, this.openUpLevel), Game.tipTxt.fiveUpLevel, LocationType.Left);
				}, 1000);
			}
		}
		if (args.length > 0) {
			this.m_showTitle.setSelectedIndex(0);
			this.showUIStep1();
		}
		else {
			this.m_showTitle.setSelectedIndex(0);
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
		this.m_showTitle.setSelectedIndex(this.titleIndex);
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
		Game.battleScene.setSeat();
		this.closeUI();
		EventManager.event(EventKey.GAMESTART);
	}

	// 连续点击判断
	private _clickTime: number = 0;
	clickFightBtn(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Laya.Browser.now() - this._clickTime <= 3000) {
			return;
		}
		this._clickTime = Laya.Browser.now();

		this._skipFight = false;
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
		this._skipFight = true;
		this.fightReq();
	}

	private _init: boolean = false;
	// 刷新英雄等级
	private refreshHeroLevel(): void {
		this.m_level.setVar("count", (Game.playData.curLevel - 1).toString()).flushVars();
		if (Game.redData.levelRed || Game.redData.starRed) {
			Game.redTip.showRedTip(this.m_levelUpBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_levelUpBtn);
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
		if (Game.redData.levelRed || Game.redData.starRed) {
			Game.redTip.showRedTip(this.m_levelUpBtn);
		}
		else {
			Game.redTip.hideRedTip(this.m_levelUpBtn);
		}
		if (this._init) {
			this.refrushHeroList();
		}
	}




	// 切换状态
	public changeStatus(index: number, type = 0): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		if (this.m_page.selectedIndex != index) {
			this.m_page.setSelectedIndex(index);
			if (index == 1) {
				// 强化
				console.log(type);
				setTimeout(() => {
					this.refrushQianghuaList(type);
				}, 10);
			}
			else if (index == 2) {
				// 推荐阵容
				this.refrushTuijianHeroList();
			}
		}
	}

	/***********************	推荐相关	************************ */
	private tuijianInit(): void {
		this.m_tuijianbackBtn.onClick(this, this.changeStatus, [0]);
		this.m_tuijianheroList.setVirtual();
		// 设置列表渲染函数
		this.m_tuijianheroList.itemRenderer = Laya.Handler.create(this, this.initTuijianItem, null, false);

		this.m_tuijianheroList.on(Laya.Event.MOUSE_MOVE, this, this.onScrollTuijian);
		this.m_tuijianheroList.on(Laya.Event.MOUSE_OUT, this, this.onScrolloutTuijian);
		this.m_tuijianheroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);
	}

	private tuijianHeroList: HeroInfoData[] = [];
	private tuijianAssociation: Association = null;
	// 刷新推荐英雄列表
	private refrushTuijianHeroList(): void {
		if (this.m_page.selectedIndex != 2) return;
		this.tuijianHeroList = [];
		let ass = Game.battleData.association;
		let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
		for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
			let item = HeroInfoData.getInfo(i);
			if (seatList.indexOf(i) != -1) {
				continue;
			}
			if (ass.race != 0) {
				if (item.race == ass.race) {
					this.tuijianHeroList.push(item);
				}
			}
			else if (ass.career != 0) {
				if (item.career == ass.career) {
					this.tuijianHeroList.push(item);
				}
			}
			else if (ass.hero.length > 0) {
				for (let k = ass.hero.length - 1; k >= 0; k--) {
					if (ass.hero[k] == item.id) {
						this.tuijianHeroList.push(item);
					}
				}
			}
		}
		this.m_tuijianheroList.numItems = this.tuijianHeroList.length;
		let assocationLength = 0;
		for (let i = 0, len = seatList.length; i < len; i++) {
			if (ass.race != 0) {
				if (seatList[i] > 0) {
					let hero = HeroInfoData.getInfo(seatList[i]);
					if (hero.race == ass.race) {
						assocationLength++;
					}
				}
			}
			else if (ass.career != 0) {
				if (seatList[i] > 0) {
					let hero = HeroInfoData.getInfo(seatList[i]);
					if (hero.career == ass.career) {
						assocationLength++;
					}
				}
			}
			else if (ass.hero.length > 0) {
				for (let k = ass.hero.length - 1; k >= 0; k--) {
					if (ass.hero.indexOf(seatList[i]) != -1) {
						assocationLength++;
					}
				}
			}
		}

		this.tuijianAssociation = null;
		if (ass.race != 0) {
			//"职业羁绊：";
			for (let i = 1, len = AssociationRaceInfo.getCount(); i <= len; i++) {
				let item = AssociationRaceInfo.getInfo(i);
				if (item.race == ass.race && item.num <= assocationLength) {
					let _ass = new Association();
					_ass.num = item.num;
					_ass.attribute_id = item.attribute;
					_ass.values = item.value;
					_ass.race = item.race;
					if (this.tuijianAssociation == null) {
						this.tuijianAssociation = _ass;
					}
					else {
						if (this.tuijianAssociation.num < _ass.num) {
							this.tuijianAssociation = _ass;
						}
					}
				}
			}
		}
		else if (ass.career != 0) {
			//"种族羁绊：";
			for (let i = 1, len = AssociationCareerInfo.getCount(); i <= len; i++) {
				let item = AssociationCareerInfo.getInfo(i);
				if (item.career == ass.career && item.num <= assocationLength) {
					let _ass = new Association();
					_ass.num = item.num;
					_ass.attribute_id = item.attribute;
					_ass.values = item.value;
					_ass.career = item.career;
					if (this.tuijianAssociation == null) {
						this.tuijianAssociation = _ass;
					}
					else {
						if (this.tuijianAssociation.num < _ass.num) {
							this.tuijianAssociation = _ass;
						}
					}
				}
			}
		}

		if (this.tuijianAssociation != null) {
			let att = AssociationAttributeInfo.getInfo(this.tuijianAssociation.attribute_id)
			this.m_tip.text = Fun.format("{0} X {1} 触发 ", this.tuijianAssociation.names, this.tuijianAssociation.num) + Fun.format(att.des, this.tuijianAssociation.values);
		}
		else {
			if (ass.hero.length > 0) {
				//"特殊羁绊：";
				let assSpecial = AssociationSpecialInfo.getInfo(ass.pointF);
				this.m_tip.text = Fun.format("{0} 触发 ", ass.names) + Fun.format(assSpecial.name, assSpecial.value);
			}
			else {
				this.m_tip.text = "";
			}
		}
	}

	// 渲染item 英雄列表的item
	private initTuijianItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.tuijianHeroList[index], this.moduleWindow);
	}

	// 拖拽推荐英雄列表中
	private onScrollTuijian(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			let listNum: number = this.m_tuijianheroList.numItems;
			for (let cur = 0; cur < listNum; cur++) {
				if (cur >= listNum - this.m_tuijianheroList.getFirstChildInView()) {
					break;
				}
				let item = this.m_tuijianheroList.getChildAt(cur) as UI_PropBtn;
				if (item && item.canDrag) {
					if (this.m_tuijianheroList.scrollPane.isChildInView(item)) {
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
	private onScrolloutTuijian(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.seatPos = -1;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		Game.battleData.startDrag = true;
		this.m_tuijianheroList.scrollPane.scrollToView(this.m_tuijianheroList.getFirstChildInView());
	}

	/***********************	强化相关	************************ */
	private qianghuaInit(): void {
		this.m_qianghuabackBtn.onClick(this, this.changeStatus, [0]);
		// this.m_hitBtn.onClick(this, this.clickHitBtn);
		// this.m_speedBtn.onClick(this, this.changeStatus, [1, 1]);
		// this.m_critBtn.onClick(this, this.changeStatus, [1, 2]);
		// this.m_burstBtn.onClick(this, this.changeStatus, [1, 3]);

		this.m_qianghuaheroList.setVirtual();
		// 设置列表渲染函数
		this.m_qianghuaheroList.itemRenderer = Laya.Handler.create(this, this.initQianghuaItem, null, false);

		this.m_qianghuaheroList.on(Laya.Event.MOUSE_MOVE, this, this.onScrollQianghua);
		this.m_qianghuaheroList.on(Laya.Event.MOUSE_OUT, this, this.onScrolloutQianghua);
		this.m_qianghuaheroList.on(Laya.Event.MOUSE_UP, this, this.onScrollup);

		this.m_qianghuaheroList2.setVirtual();
		// 设置列表渲染函数
		this.m_qianghuaheroList2.itemRenderer = Laya.Handler.create(this, this.initQianghuaItem2, null, false);

		this.m_qianghuaheroList2.on(Laya.Event.MOUSE_MOVE, this, this.onScrollQianghua2);
		this.m_qianghuaheroList2.on(Laya.Event.MOUSE_OUT, this, this.onScrolloutQianghua2);
		this.m_qianghuaheroList2.on(Laya.Event.MOUSE_UP, this, this.onScrollup);
	}
	// 拖拽强化英雄列表中
	private onScrollQianghua(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			let listNum: number = this.m_qianghuaheroList.numItems;
			let firstView: number = listNum - this.m_qianghuaheroList.getFirstChildInView();
			let numbChildrens: number = this.m_qianghuaheroList.numChildren;
			for (let cur = 0; cur < firstView && cur < numbChildrens; cur++) {
				let item = this.m_qianghuaheroList.getChildAt(cur) as UI_PropBtn;
				if (item && item.canDrag) {
					if (this.m_qianghuaheroList.scrollPane.isChildInView(item)) {
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
	// 拖拽出强化列表范围
	private onScrolloutQianghua(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.seatPos = -1;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		Game.battleData.startDrag = true;
		this.m_qianghuaheroList.scrollPane.scrollToView(this.m_qianghuaheroList.getFirstChildInView());
	}
	// 拖拽强化英雄列表中
	private onScrollQianghua2(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null) {
			let listNum = this.m_qianghuaheroList2.numItems;
			for (let cur = 0; cur < listNum; cur++) {
				if (cur >= listNum - this.m_qianghuaheroList2.getFirstChildInView()) {
					break;
				}
				if (this.m_qianghuaheroList2.numChildren > cur) {
					let item = this.m_qianghuaheroList2.getChildAt(cur) as UI_PropBtn;
					if (item && item.canDrag) {
						if (this.m_qianghuaheroList2.scrollPane.isChildInView(item)) {
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
	}
	// 拖拽出强化列表范围
	private onScrolloutQianghua2(): void {
		if (Game.battleData.startDrag) return;
		if (this.dragItem == null || this.dragItem.heroInf == null) return;
		Game.battleData.seatPos = -1;
		Game.battleData.heroInf = this.dragItem.heroInf;
		var btn: fairygui.GButton = <fairygui.GButton>fairygui.GObject.cast(this.dragItem.displayObject);
		fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
		Game.battleData.startDrag = true;
		this.m_qianghuaheroList2.scrollPane.scrollToView(this.m_qianghuaheroList2.getFirstChildInView());
	}


	private qianghuaHeroList: HeroInfoData[] = [];
	private qianghuaHeroList2: HeroInfoData[] = [];
	// 渲染item 英雄列表的item
	private initQianghuaItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.qianghuaHeroList[index], this.moduleWindow);
	}
	private initQianghuaItem2(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_PropBtn;
		item.setData(this.qianghuaHeroList2[index], this.moduleWindow);
	}

	private refrushQianghuaList(type: number): void {
		this.m_qianghuaheroList.numItems = 0;
		this.m_qianghuaheroList2.numItems = 0;
		if (this.m_page.selectedIndex != 1) return;
		this.qianghuaHeroList = [];
		let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
		let wave = WaveInfo.getInfo(this.showLevelId);
		for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
			let item = HeroInfoData.getInfo(i);
			if (item) {
				if (seatList.indexOf(i) != -1) {
					continue;
				}
				if (item.type == wave.type) {
					this.qianghuaHeroList.push(item);
				}
			}
		}
		this.m_qianghuaheroList.numItems = this.qianghuaHeroList.length;
		// 可推荐的职业羁绊
		let ass: Association = null;
		for (let i = 1, len = AssociationRaceInfo.getCount(); i <= len; i++) {
			let item = AssociationRaceInfo.getInfo(i);
			if (item) {
				let attribute = AssociationAttributeInfo.getInfo(item.attribute);
				if (attribute) {
					if (attribute.suggest == wave.type) {
						ass = new Association();
						ass.num = item.num;
						ass.attribute_id = item.attribute;
						ass.values = item.value;
						ass.race = item.race;
						break;
					}
				}
			}
		}
		if (ass == null) {
			// 可推荐种族羁绊
			for (let i = 1, len = AssociationCareerInfo.getCount(); i <= len; i++) {
				let item = AssociationCareerInfo.getInfo(i);
				if (item) {
					let attribute = AssociationAttributeInfo.getInfo(item.attribute);
					if (attribute) {
						if (attribute.suggest == wave.type) {
							ass = new Association();
							ass.num = item.num;
							ass.attribute_id = item.attribute;
							ass.values = item.value;
							ass.career = item.career;
							break;
						}
					}
				}
			}
		}
		if (ass) {
			let att = AssociationAttributeInfo.getInfo(ass.attribute_id);
			this.m_tuijiantip.text = Fun.format("{0} X {1} 触发 ", ass.names, ass.num) + Fun.format(att.des, ass.values);

			this.qianghuaHeroList2 = [];
			let seatList = Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect];
			for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
				let item = HeroInfoData.getInfo(i);
				if (seatList.indexOf(i) != -1) {
					continue;
				}
				if (ass.race != 0) {
					if (item.race == ass.race) {
						this.qianghuaHeroList2.push(item);
					}
				}
				else if (ass.career != 0) {
					if (item.career == ass.career) {
						this.qianghuaHeroList2.push(item);
					}
				}
			}
			this.m_qianghuaheroList2.numItems = this.qianghuaHeroList2.length;
		}
	}

	private clickHitBtn(): void {
		if (Game.playData.guideIndex == GuideType.FightReady) return;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) return;
		let wave = WaveInfo.getInfo(this.showLevelId);
		if (Game.playData.curLevel < wave.lv) {
			Game.tipWin.showTip(Game.tipTxt.UpLevel);
		}
		else if (Game.playData.curStar < (wave.lv - 1) / 10) {
			Game.tipWin.showTip(Game.tipTxt.UpStar);
		}
		else {
			this.changeStatus(1, 0);
		}
	}



}
UI_ArrangementMain.bind();
