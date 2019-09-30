import fui_KingItem from "../../Generates/Surround/fui_KingItem";
import SurroundWin from "../../../gamemodule/Windows/SurroundWin";
import KingInfo from "../../../csvInfo/KingInfo";
import UI_ItemIcon from "../System/UI_ItemIcon";
import Game from "../../../Game";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_KingItem extends fui_KingItem {

	moduleWindow: SurroundWin;

	public static DependPackages: string[] = ["Surround"];

	public static createInstance(): UI_KingItem {
		return <UI_KingItem>(fui_KingItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_KingItem.URL, UI_KingItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_btn1.onClick(this, this.clikcBtn, [1]);
		this.m_btn2.onClick(this, this.clikcBtn, [2]);
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

	private clikcBtn(index: number): void {
		if (this.lock && index == 2) {
			Game.tipWin.showTip(Game.tipTxt.KingVIPLimit);
		}
		else {
			if (!Game.playData.getKingStatus(this.kingInf.id, index)) {
				if (Game.playData.curLevel >= this.kingInf.level) {
					let data = {
						id: this.kingInf.id,
						type: index,
					}
					Game.proto.king(data);
				}
				else {
					Game.tipWin.showTip(Game.tipTxt.KingLevelLimit);
				}
			}
			else {
				Game.tipWin.showTip(Game.tipTxt.KingHave);
			}
		}
	}
	private kingInf: KingInfo = null;
	public setData(index: number): void {
		this.kingInf = KingInfo.getInfo(index + 10);
		this.m_level.text = (this.kingInf.level - 1).toString();
		let showNum = 0;
		if (this.kingInf.rid1 > 0 && this.kingInf.count1 > 0 && this.kingInf.rid2 > 0 && this.kingInf.count2 > 0) {
			showNum = 2;
		}
		else if (this.kingInf.rid1 > 0 && this.kingInf.count1 > 0) {
			showNum = 0;
		}
		else if (this.kingInf.rid2 > 0 && this.kingInf.count2 > 0) {
			showNum = 1;
		}
		if (showNum == 0 || showNum == 2) {
			let item1 = this.m_item1 as UI_ItemIcon;
			if (Game.playData.getKingStatus(this.kingInf.id, 1)) {
				this.m_item1Control.setSelectedIndex(2);
			}
			else {
				if (Game.playData.curLevel >= this.kingInf.level) {
					this.m_item1Control.setSelectedIndex(1);
				}
				else {
					this.m_item1Control.setSelectedIndex(0);
				}
			}
			this.itemSet(this.kingInf.rid1, this.kingInf.count1, item1);
		}
		if (showNum == 1 || showNum == 2) {
			let item2 = this.m_item2 as UI_ItemIcon;
			if (Game.playData.getKingStatus(this.kingInf.id, 2)) {
				this.m_item2Control.setSelectedIndex(2);
			}
			else {
				// if (Game.playData.curLevel >= this.kingInf.level) {
				// 	this.m_item2Control.setSelectedIndex(1);
				// }
				// else {
				this.m_item2Control.setSelectedIndex(0);
				// }
			}
			this.itemSet(this.kingInf.rid2, this.kingInf.count2, item2);
		}
		this.m_show.setSelectedIndex(showNum);


		if (showNum == 1 || showNum == 2) {
			this.m_lock.setSelectedIndex(1);
			this.lock = true;
		}
		else {
			this.m_lock.setSelectedIndex(0);
			this.lock = false;
		}
	}
	private lock: boolean = false;

	private itemSet(id: number, count: number, item: UI_ItemIcon): void {
		item.m_number.setVar("count", count.toString()).flushVars();
		item.m_headIcon.icon = Game.playData.getIcon(id);
		if (id > 11) {
			item.m_c1.setSelectedIndex(1);
		}
		else {
			item.m_c1.setSelectedIndex(2);
		}
	}

}
UI_KingItem.bind();
