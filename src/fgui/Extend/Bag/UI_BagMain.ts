import fui_BagMain from "../../Generates/Bag/fui_BagMain";
import BagWin from "../../../gamemodule/Windows/BagWin";
import Game from "../../../Game";
import Dictionary from "../../../Tool/Dictionary";
import HeroInfo from "../../../dataInfo/HeroInfo";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import UI_PropBtn from "../Arrangement/UI_PropBtn";
import UI_BagItem from "./UI_BagItem";
import EventKey from "../../../Tool/EventKey";

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

		this.m_closeBtn.onClick(this, this.backUI);
		this.m_kabaoBtn.onClick(this, this.changeType, [0]);
		this.m_heroBtn.onClick(this, this.changeType, [1]);
	}

	private curSelect: number = -1;
	// 切换页签
	private changeType(index: number) {
		if (this.curSelect != index) {
			this.curSelect = index;
			this.m_tab.setSelectedIndex(this.curSelect);
			switch (this.curSelect) {
				case 0:
					{
						this.m_list.numItems = Game.playData.curGift.length;
					}
					break;
				case 1:
					{
						let hero = HeroInfo.getList();
						this.datas.clear();
						for (let i = 0, len = hero.length; i < len; i++) {
							if (Game.playData.curClips.hasKey(hero[i].id)) {
								this.datas.add(hero[i].id, Game.playData.curClips.getValue(hero[i].id));
							}
							else {
								this.datas.add(hero[i].id, 0);
							}
						}
						this.idList = this.datas.getKeys();
						this.m_list.numItems = this.datas.count;
					}
					break;
			}
		}
		EventManager.event(EventKey.CLOSE_UI_WAIT);
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
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.changeType, [1]);
		EventManager.on(ProtoEvent.BAGGIFT_CALL_BACK, this, this.changeType, [0]);
		Game.playData.sShowFetters.add(this.moduleWindow.createHeroFetters, this.moduleWindow);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.changeType);
		EventManager.off(ProtoEvent.BAGGIFT_CALL_BACK, this, this.changeType);
		Game.playData.sShowFetters.remove(this.moduleWindow.createHeroFetters, this.moduleWindow);
	}

	private setData(): void {
		this.m_list.numItems = 0;
		this.curSelect = -1;
		EventManager.event(EventKey.SHOW_UI_WAIT);
		Game.proto.bagGift();
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_BagItem;
		switch (this.curSelect) {
			case 0:
				{
					item.giftSetData(index, this.moduleWindow);
				}
				break;
			case 1:
				{
					item.clipsSetData(this.idList[index], this.datas.getValue(this.idList[index]), this.moduleWindow);
				}
				break;
		}
	}
	// 英雄碎片情况
	private datas: Dictionary<number, number> = new Dictionary<number, number>();
	private idList: Array<string> = [];
}
UI_BagMain.bind();
