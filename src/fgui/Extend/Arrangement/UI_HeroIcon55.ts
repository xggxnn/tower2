import fui_HeroIcon55 from "../../Generates/Arrangement/fui_HeroIcon55";
import ArrangementWin from "../../../gamemodule/Windows/ArrangementWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroIcon55 extends fui_HeroIcon55 {

	moduleWindow: ArrangementWin;

	public static DependPackages: string[] = ["Arrangement"];

	public static createInstance(): UI_HeroIcon55 { 
		return <UI_HeroIcon55>(fui_HeroIcon55.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroIcon55.URL, UI_HeroIcon55);
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


}
UI_HeroIcon55.bind();
