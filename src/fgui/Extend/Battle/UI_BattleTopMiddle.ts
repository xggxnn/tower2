import fui_BattleTopMiddle from "../../Generates/Battle/fui_BattleTopMiddle";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import UI_AssociationBtn from "./UI_AssociationBtn";
import SpriteKey from "../../SpriteKey";
import Association from "../../../gamemodule/DataStructs/Association";
import Game from "../../../Game";
import Fun from "../../../Tool/Fun";
import AssociationAttributeInfo from "../../../dataInfo/AssociationAttributeInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleTopMiddle extends fui_BattleTopMiddle {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleTopMiddle {
		return <UI_BattleTopMiddle>(fui_BattleTopMiddle.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleTopMiddle.URL, UI_BattleTopMiddle);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		// 设置列表渲染函数
		this.m_associationList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// 列表内容单个item被点击
		this.m_associationList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_AssociationBtn;
		let t = index + 1;
		item.icon = SpriteKey.getUrl("icon_100" + t + ".png");
		item.m_titles.text = (index + 1).toString();
	}
	private inRichText: fairygui.GRichTextField = null;
	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let index = this.m_associationList.getChildIndex(obj);
		this.m_t0.stop();
		let att = AssociationAttributeInfo.getInfo(this.association[index].attribute_id);
		this.m_title.text = Fun.format("[color=#61aa66]{0}[/color] X [color=#51FC55]{1}[/color] <br /> ", this.association[index].names, this.association[index].num) + Fun.format(att.des, this.association[index].values);//"神谕：同时上阵N位天神时<br />[color=#51FC55]（2），攻击力提高15%[/color]<br />[color=#51FC55]（4），攻击力提高25%[/color]";
		this.m_title.height = 39 + 34 * 2;
		this.m_c1.setSelectedIndex(1);
		this.m_t0.play(Laya.Handler.create(this, this.hideMethod));
	}
	hideMethod(): void {
		this.m_c1.setSelectedIndex(0);
	}

	// 关闭ui
	closeUI(): void {
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	private association: Association[] = [];
	// 显示，相当于enable
	onWindowShow(): void {
		this.association = Game.battleData.refrushAssociation();
		this.m_associationList.numItems = this.association.length;
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}


}
UI_BattleTopMiddle.bind();