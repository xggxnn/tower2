import fui_BagItem from "../../Generates/Bag/fui_BagItem";
import BagWin from "../../../gamemodule/Windows/BagWin";
import HeroInfo from "../../../dataInfo/HeroInfo";
import SpriteKey from "../../SpriteKey";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BagItem extends fui_BagItem {

	moduleWindow: BagWin;

	public static DependPackages: string[] = ["Bag"];

	public static createInstance(): UI_BagItem {
		return <UI_BagItem>(fui_BagItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BagItem.URL, UI_BagItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

	}

	// 显示碎片
	public clipsSetData(id: string, Clips: number): void {
		let heroInf = HeroInfo.getInfo(id);
		this.m_clipsNum.setVar("count", Clips.toString()).flushVars();
		this.m_heroName.setVar("name", heroInf.name).flushVars();
		this.m_pic.icon = SpriteKey.getUrl("icon" + heroInf.id + ".png");
		this.m_type.setSelectedIndex(1);
		this.m_checkBtn.title = "查看";
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
UI_BagItem.bind();
