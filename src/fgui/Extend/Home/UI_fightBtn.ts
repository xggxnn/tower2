import fui_fightBtn from "../../Generates/Home/fui_fightBtn";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import WaveInfo from "../../../dataInfo/WaveInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_fightBtn extends fui_fightBtn {

	moduleWindow: HomeWin;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_fightBtn {
		return <UI_fightBtn>(fui_fightBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_fightBtn.URL, UI_fightBtn);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	public setData(): void {
		this.m_fight.text = "2233";
		this.m_speed.setVar("count", "3").flushVars();
		this.m_reward.setVar("count", "1234").flushVars();
		let id = 1;
		if (Game.battleMap.maxMapId > 1) {
			id = Game.battleMap.maxMapId;
		}
		let waveInf = WaveInfo.getInfo(id);
		this.m_cur.setVar("map", waveInf.map.toString()).setVar("level", waveInf.level.toString()).flushVars();
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
UI_fightBtn.bind();
