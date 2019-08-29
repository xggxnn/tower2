import fui_MenusMain from "../../Generates/Menus/fui_MenusMain";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import Fun from "../../../Tool/Fun";
import { MenuId } from "../../../gamemodule/MenuId";
import UI_MapItem from "./UI_MapItem";
import WaveInfo from "../../../csvInfo/WaveInfo";

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

		this.m_backBtn.setXY(Fun.leftTopPoint.x + 5, Fun.leftTopPoint.y + 5);
		this.m_middle.setXY(Fun.topMiddlePoint.x, Fun.topMiddlePoint.y + 5);

		this.m_backBtn.onClick(this, this.backClick);

		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_list.on(Laya.Event.MOUSE_DOWN, this, this.onScrollDown);
		this.m_list.on(Laya.Event.MOUSE_OUT, this, this.onScrollout);
		this.m_leftBtn.onClick(this, this.clickLeft);
		this.m_rightBtn.onClick(this, this.clickRight);
	}

	backClick(): void {
		Game.menu.open(MenuId.Home);
		this.closeUI();
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	private curShow: number = -1;
	// 显示，相当于enable
	onWindowShow(): void {
		this.moduleWindow.closeOtherWindow();
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

	}

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_MapItem;
		item.setData(index, this.moduleWindow);
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
		let firstView: number = this.m_list.getFirstChildInView();
		if (firstView > 0) {
			this.m_list.scrollToView(firstView - 1, true);
		}
		this.checkLeftRight(firstView - 1);
	}
	private clickRight(): void {
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
	}

}
UI_MenusMain.bind();