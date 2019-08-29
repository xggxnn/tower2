import fui_Stone from "../../Generates/Battle/fui_Stone";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Stone extends fui_Stone {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_Stone {

		return <UI_Stone>(fui_Stone.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Stone.URL, UI_Stone);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

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
	private baseHp: number = 100;
	private maxHp: number = 100;
	private curHp: number = 100;
	private _breaked: boolean = false;
	public get breaked(): boolean {
		return this._breaked;
	}
	public set breaked(v: boolean) {
		this._breaked = v;
	}
	private selectIndex = 0;
	public hit(ap: number): void {
		this.curHp -= ap;
		this.selectIndex = 0;
		if (this.curHp <= 0) {
			this.selectIndex = 3;
			this.breaked = true;
		}
		else if (this.curHp < this.maxHp / 3) {
			this.selectIndex = 2;
		}
		else if (this.curHp < this.maxHp / 3 * 2) {
			this.selectIndex = 1;
		}
		this.m_c1.setSelectedIndex(this.selectIndex);
	}

	private _init: boolean = false;
	public reInit(): void {
		this.maxHp = this.baseHp;
		this.curHp = this.maxHp;
		if (!this._init) {
			this._init = true;
			Game.halo.sUpdateStoneHp.add(this.initHp, this);
		}
		this.selectIndex = 0;
		this.breaked = false;
		this.m_c1.setSelectedIndex(this.selectIndex);
	}
	private initHp(hp: number): void {
		this.maxHp += this.baseHp * (100 + hp) * 0.01;
		this.curHp = this.maxHp;
	}

}
UI_Stone.bind();