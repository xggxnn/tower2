import fui_selectionBtn from "../../Generates/Menus/fui_selectionBtn";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import SpriteKey from "../../SpriteKey";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_selectionBtn extends fui_selectionBtn {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_selectionBtn {
		return <UI_selectionBtn>(fui_selectionBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_selectionBtn.URL, UI_selectionBtn);
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

	/**
	 * 
	 * @param map 第几个地图
	 * @param level 第几关
	 * @param isboss 是否boss关卡
	 */
	public setData(map: number, level: number, isboss?: boolean): void {
		if (map < 1) map = 1;
		if (map > 4) map = 4;
		if (level < 1) level = 1;
		if (level > 4) level = 4;
		this.m_pic.setSelectedIndex(isboss ? 1 : 0);
		let first = SpriteKey.num1;
		switch (map) {
			case 1:
				first = SpriteKey.num1;
				break;
			case 2:
				first = SpriteKey.num2;
				break;
			case 3:
				first = SpriteKey.num3;
				break;
			case 4:
				first = SpriteKey.num4;
				break;
		}
		let end = SpriteKey.num1;
		switch (level) {
			case 1:
				end = SpriteKey.num1;
				break;
			case 2:
				end = SpriteKey.num2;
				break;
			case 3:
				end = SpriteKey.num3;
				break;
			case 4:
				end = SpriteKey.num4;
				break;
		}
		this.m_first.icon = SpriteKey.getUrl(first);
		this.m_end.icon = SpriteKey.getUrl(end);
	}

}
UI_selectionBtn.bind();