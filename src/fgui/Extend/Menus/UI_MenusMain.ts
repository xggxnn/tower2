import fui_MenusMain from "../../Generates/Menus/fui_MenusMain";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import UI_Selection from "./UI_Selection";
import Game from "../../../Game";
import { SelectionStatus } from "../../../gamemodule/DataEnums/SelectionStatus";
import UI_selectionBtn from "./UI_selectionBtn";
import Fun from "../../../Tool/Fun";
import { MenuId } from "../../../gamemodule/MenuId";
import ShareManager from "../../../Tool/ShareManager";

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

		this.selectList.push(this.m_select1 as UI_Selection);
		this.selectList.push(this.m_select2 as UI_Selection);
		this.selectList.push(this.m_select3 as UI_Selection);
		this.selectList.push(this.m_select4 as UI_Selection);
		this.selectList.push(this.m_select5 as UI_Selection);
		this.selectList.push(this.m_select6 as UI_Selection);
		this.selectList.push(this.m_select7 as UI_Selection);
		this.selectList.push(this.m_select8 as UI_Selection);
		this.selectList.push(this.m_select9 as UI_Selection);
		this.selectList.push(this.m_select10 as UI_Selection);
		this.selectList.push(this.m_select11 as UI_Selection);
		this.selectList.push(this.m_select12 as UI_Selection);
		this.selectList.push(this.m_select13 as UI_Selection);
		for (let i = 0, len = this.selectList.length; i < len; i++) {
			(this.selectList[i].m_selBtn as UI_selectionBtn).onClick(this, this.slelectClick, [i]);
		}

		this.m_backBtn.onClick(this, this.backClick);
		ShareManager.init();
	}
	private selectList: Array<UI_Selection> = [];

	slelectClick(index: number): void {
		Game.battleData.play_map = this.selectList[index].map;
		Game.battleData.play_level = this.selectList[index].level;
		this.moduleWindow.createTrialUI();
		// Game.proto.reqConfig();
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
	// 显示，相当于enable
	onWindowShow(): void {
		this.m_select2.m_selBtn.m_end.setSelectedIndex(1);
		let map = 0;
		let level = 0;
		for (let i = 0, len = this.selectList.length; i < len; i++) {
			let boss = (i + 1) % 4;
			level = boss;
			if (boss == 0) {
				level = 4;
			}
			if (level == 1) {
				map++;
			}
			let status = SelectionStatus.None;
			if (i == 0) {
				status = SelectionStatus.Complete;
			}
			else if (i == 1) {
				status = SelectionStatus.Progress;
			}
			else if (i == 2) {
				status = SelectionStatus.Fighting;
			}
			this.selectList[i].setData(status, boss == 0, map, level);
		}
		if (this.moduleWindow.menuParameter.initFunction.count > 0) {
			let fun: Function[] = this.moduleWindow.menuParameter.initFunction.getValues();
			for (let i = 0, len = fun.length; i < len; i++) {
				if (fun[i]) {
					fun[i].apply(this.moduleWindow);
				}
			}
		}
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_MenusMain.bind();