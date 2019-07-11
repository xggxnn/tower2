import fui_BagMain from "../../Generates/Bag/fui_BagMain";
import BagWin from "../../../gamemodule/Windows/BagWin";
import Game from "../../../Game";
import Dictionary from "../../../Tool/Dictionary";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import UI_PropBtn from "../Arrangement/UI_PropBtn";
import UI_HeroIcon from "../Menus/UI_HeroIcon";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BagMain extends fui_BagMain {

	moduleWindow: BagWin;

	public static DependPackages: string[] = ["Bag"];

	public static createInstance(): UI_BagMain {
		return <UI_BagMain>(fui_BagMain.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BagMain.URL, UI_BagMain);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_list.setVirtual();
		// 设置列表渲染函数
		this.m_list.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表内容单个item被点击
		this.m_list.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);

		this.m_backBtn.onClick(this, this.backUI);
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
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.setData);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.setData);
	}

	private setData(): void {
		this.datas = Game.playData.curClips;
		this.idList = Game.playData.curClips.getKeys();
		this.m_list.numItems = this.datas.count;
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		// let item = obj as UI_PropBtn;
		// item.clipsSetData(this.idList[index], this.datas.getValue(this.idList[index]));
		let item = obj as UI_HeroIcon;
		item.clipsSetData(this.idList[index], this.datas.getValue(this.idList[index]));
	}
	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_list.getChildIndex(obj);
		// 转换为点击item在整个列表中的真实索引
		var realIndex: number = this.m_list.childIndexToItemIndex(index);
		let heroInf = HeroInfo.getInfo(this.idList[realIndex]);;
		if (heroInf != null) {
			Game.battleData.clickHeroInf = heroInf;
			this.moduleWindow.createHeroInfoUI();
		}
	}
	private datas: Dictionary<number, number> = new Dictionary<number, number>();
	private idList: Array<string> = [];
}
UI_BagMain.bind();
