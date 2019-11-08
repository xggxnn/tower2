import fui_ShopBtn from "../../Generates/Shop/fui_ShopBtn";
import ShopWin from "../../../gamemodule/Windows/ShopWin";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_ShopBtn extends fui_ShopBtn {

	moduleWindow: ShopWin;

	public static DependPackages: string[] = ["Shop"];

	public static createInstance(): UI_ShopBtn { 
		return <UI_ShopBtn>(fui_ShopBtn.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_ShopBtn.URL, UI_ShopBtn);
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
UI_ShopBtn.bind();
