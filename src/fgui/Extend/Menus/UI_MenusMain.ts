import fui_MenusMain from "../../Generates/Menus/fui_MenusMain";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import { MenuId } from "../../../gamemodule/MenuId";
import UI_MapItem from "./UI_MapItem";
import WaveInfo from "../../../csvInfo/WaveInfo";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import LoaderManager from "../../../tool/LoaderManager";
import LoadFilesList from "../../../tool/LoadFilesList";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import UI_DayFight from "./UI_DayFight";
import LevelmapInfo from "../../../csvInfo/LevelmapInfo";
import UI_ScrollTxt from "../System/UI_ScrollTxt";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_MenusMain extends fui_MenusMain {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_MenusMain {
		return <UI_MenusMain>(fui_MenusMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_MenusMain.URL, UI_MenusMain);
	}


	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_backBtn.setXY(Fun.leftTopPoint.x + 15, Fun.leftTopPoint.y + 15);
		this.m_middle.setXY(Fun.topMiddlePoint.x, Fun.topMiddlePoint.y + 5);
		this.m_help.setXY(Fun.bottomMiddlePoint.x, Fun.bottomMiddlePoint.y - 80);
		this.m_help.onClick(this, this.helpClick);
		this.tipTxt = UI_ScrollTxt.createInstance();
		this.addChild(this.tipTxt);
		this.tipTxt.setXY(this.m_help.x + 42, this.m_help.y);
		this.tipTxt.title = Game.tipTxt.txts("QInfo");

		this.m_backBtn.onClick(this, this.backClick);

		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_list.on(Laya.Event.MOUSE_DOWN, this, this.onScrollDown);
		this.m_list.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		this.m_leftBtn.onClick(this, this.clickLeft);
		this.m_rightBtn.onClick(this, this.clickRight);
		this.m_clearBtn.onClick(this, this.clearData);
		this.m_clearBtn.setXY(Fun.rightBottomPoint.x - 100, Fun.rightBottomPoint.y - 64);


		this.m_listDay.itemRenderer = Laya.Handler.create(this, this.initItemDay, null, false);
	}
	private tipTxt: UI_ScrollTxt = null;
	private helpClick(): void {
		if (Game.battleData.MenuEnterDay) {
			Game.tipWin.showTip(Game.tipTxt.txts("DailyChallengeHelp"), false, null, null, "确定", "", 0);
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.TrialTip, false, null, null, "确定", "", 0);
		}
	}

	private clearNum: number = 0;
	clearData(): void {
		if (this.clearNum < 5) {
			this.clearNum++;
		}
		else {
			this.clearNum = 0;
			Game.tipWin.showTip("是否确认删除数据，删除后无法恢复，请谨慎操作，确定后请重启客户端进行体验。", true, Laya.Handler.create(this, () => {
				Game.proto.clearData();
			}), null, "删除数据", "继续游戏");
		}
	}

	backClick(): void {
		Game.battleData.MenuEnterDay = false;
		Game.menu.open(MenuId.Home);
		this.closeUI();
	}

	// 关闭ui
	closeUI(): void {
		this.clearNum = 0;
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.clearNum = 0;
		this.moduleWindow.menuBack();
	}

	enterBattle(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		Game.menu.open(MenuId.Battle);
		this.closeUI();
	}

	private curShow: number = -1;
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		EventManager.on(ProtoEvent.DAYFIGHTDATA_CALL_BACK, this, this.setDataDay);
		EventManager.on(EventKey.DAYFIGHTSELECT, this, this.enterBattle);
		EventManager.once(EventKey.LOADER_OVER, this, this.setData);
		EventManager.on(ProtoEvent.COLLECTDEBRIS_CALL_BACK, this, this.setData);
		let _list: Array<string> = [];
		_list = _list.concat(LoadFilesList.res_effect_effect_ResList);
		LoaderManager.addList(_list);
	}
	private setData(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		this.clearNum = 0;
		this.moduleWindow.closeOtherWindow(true);
		if (Game.battleData.MenuEnterDay) {
			Game.proto.dayFightData();
		}
		else {
			this.setDataWave();
			if (Game.playData.unlockInit == 7) {
				Game.playData.unlockInit = 8;
				EventManager.event(EventKey.SHOW_WAIT);
				setTimeout(() => {
					this.moduleWindow.createGuideUI(this.m_leftBtn, new Laya.Point(this.m_leftBtn.x, this.m_leftBtn.y), Laya.Handler.create(this, this.clickLeft), "返回上一张地图！");
				}, 100);
			}
		}
	}
	private dayFight: UI_DayFight = null;
	private setDataDay(): void {
		this.m_waveDay.setSelectedIndex(1);
		this.maxNum = 1;
		this.m_listDay.numItems = 1;
		if (!Game.redData.dayFightTip) {
			Game.redData.dayFightTip = true;
			Game.tipWin.showTip(Game.tipTxt.txts("DailyChallengeHelp"), false, null, null, "确定", "", 0);
		}
	}
	private setDataWave(): void {
		this.m_waveDay.setSelectedIndex(0);
		Game.battleData.refrushSeatFightInf();
		let waveCount = WaveInfo.getCount();
		let maxNumss = Math.floor(waveCount / 10) + (waveCount % 10 > 0 ? 1 : 0);
		this.maxNum = Math.floor(Game.battleMap.maxMapId / 10) + (Game.battleMap.maxMapId % 10 > 0 ? 1 : 0);
		if (this.maxNum > maxNumss) {
			this.maxNum = maxNumss;
		}
		this.m_list.numItems = this.maxNum;
		if (this.moduleWindow.menuParameter.args.length > 0) {
			let showId = this.moduleWindow.menuParameter.args[0];
			this.curShow = Math.floor(showId / 10) + (showId % 10 > 0 ? 1 : 0) - 1;
			if (this.curShow >= this.maxNum) {
				this.curShow = this.maxNum - 1;
			}
			this.m_list.scrollToView(this.curShow, false);
			this.checkLeftRight(this.curShow);
			Game.battleData.level_id = showId;
			this.moduleWindow.createTrialUI();
		}
		else {
			if (this.curShow < 0) {
				this.curShow = this.maxNum - 1;
				this.m_list.scrollToView(this.curShow, false);
			}
			this.checkLeftRight(this.curShow);
			if (this.moduleWindow.menuParameter.initFunction.count > 0) {
				let fun: Function[] = this.moduleWindow.menuParameter.initFunction.getValues();
				for (let i = 0, len = fun.length; i < len; i++) {
					if (fun[i]) {
						fun[i].apply(this.moduleWindow);
					}
				}
			}
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		Game.battleMap.sUpdateExploreTime.removeAll();
		Game.battleMap.sUpdateFightCd.removeAll();
		EventManager.offAllCaller(this);
	}

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_MapItem;
		item.setData(index, this.moduleWindow);
	}
	private initItemDay(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_DayFight;
		item.setData();
	}

	private startMouseX: number = 0;
	private maxNum: number = 0;
	private onScrollDown(a: any): void {
		this.startMouseX = a.stageX;
	}
	private onScrollout(a: any): void {
		let firstView: number = this.m_list.getFirstChildInView();
		if (Math.abs(a.stageX - this.startMouseX) < 100) {
			this.m_list.scrollToView(firstView, true);
			this.checkLeftRight(firstView);
		}
		else {
			if (a.stageX < this.startMouseX) {
				if (this.maxNum > firstView + 1) {
					this.m_list.scrollToView(firstView + 1, true);
					this.checkLeftRight(firstView + 1);
				}
			}
			else {
				this.m_list.scrollToView(firstView, true);
				this.checkLeftRight(firstView);
			}
		}
	}
	private clickLeft(): void {
		this.clearNum = 0;
		let firstView: number = this.m_list.getFirstChildInView();
		if (firstView > 0) {
			this.m_list.scrollToView(firstView - 1, true);
		}
		this.checkLeftRight(firstView - 1);
	}
	private clickRight(): void {
		this.clearNum = 0;
		let firstView: number = this.m_list.getFirstChildInView();
		if (firstView + 1 < this.maxNum) {
			this.m_list.scrollToView(firstView + 1, true);
		}
		this.checkLeftRight(firstView + 1);
	}
	private checkLeftRight(cur: number): void {
		this.curShow = cur;
		this.m_leftBtn.visible = cur > 0;
		this.m_rightBtn.visible = cur < this.maxNum - 1;
		let levelmap = LevelmapInfo.getInfo(this.curShow + 1);
		this.m_bgStatus.setSelectedIndex(levelmap.levelbg - 1);
	}

}
UI_MenusMain.bind();