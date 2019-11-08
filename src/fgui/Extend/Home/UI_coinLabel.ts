import fui_coinLabel from "../../Generates/Home/fui_coinLabel";
import HomeWin from "../../../gamemodule/Windows/HomeWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_coinLabel extends fui_coinLabel {

	moduleWindow: HomeWin;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_coinLabel { 
		return <UI_coinLabel>(fui_coinLabel.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_coinLabel.URL, UI_coinLabel);
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
UI_coinLabel.bind();
