import fui_HeroFetters from "../../Generates/Home/fui_HeroFetters";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import FWindow from "../../../gamemodule/FWindow";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import Association from "../../../gamemodule/DataStructs/Association";
import UI_ItemIcon from "../System/UI_ItemIcon";
import AssociationAttributeInfo from "../../../csvInfo/AssociationAttributeInfo";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroFetters extends fui_HeroFetters {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_HeroFetters {
		return <UI_HeroFetters>(fui_HeroFetters.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroFetters.URL, UI_HeroFetters);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_tuijianbackBtn.onClick(this, this.closeUI);
		this.m_rewardBtn.onClick(this, this.rewardClick);
		this.m_bg.onClick(this, this.closeUI);
		this.m_heroList.setVirtual();
		this.m_heroList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		this.m_heroList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
	}

	// 关闭ui
	closeUI(): void {
		if (!this.isGuide) {
			Game.playData.fettersInfos = null;
			if (this.fwindow) {
				this.fwindow.windowRemoveChild(this);
			}
		}
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		this.isGuide = true;
		EventManager.on(ProtoEvent.FETTERREWARD_CALL_BACK, this, this.closeUI);
		this.showAss(Game.playData.fettersInfos);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
	}

	private rewardClick(): void {
		if (this.guideIndex == 1) {
			this.isGuide = false;
			if (Game.playData.unlockAssociationattribute.indexOf(Game.playData.fettersInfos.attribute_id) != -1) {
				// 已解锁
				if (Game.playData.associationattribute.indexOf(Game.playData.fettersInfos.attribute_id) == -1) {
					// 未领奖
					let data = {
						id: Game.playData.fettersInfos.attribute_id,
					}
					Game.proto.fetterReward(data);
				}
				else {
					// 已领奖
					this.closeUI();
				}
			}
			else {
				Game.popup.showPopup(this.m_rewardBtn, false, false, Game.tipTxt.txts("AssociationUnlockTip"));
			}
		}
	}

	private showAss(datas: Association): void {
		this.heroList = [];
		this.m_typename.text = datas.names;
		let assList = Game.battleData.assItemWAttid(datas.attribute_id);
		let str = "";
		let att1 = AssociationAttributeInfo.getInfo(datas.attribute_id);
		for (let i = assList.length - 1; i >= 0; i--) {
			if (datas.pointF > 0) {
				str += datas.names + "  " + Fun.format(att1.des, assList[i].values) + "\n";
			}
			else {
				str += datas.names + "x" + assList[i].num + "  " + Fun.format(att1.des, assList[i].values) + "\n";
			}
		}
		this.m_tip.text = str;

		for (let i = 1, len = HeroInfoData.getCount(); i <= len; i++) {
			let hero = HeroInfoData.getInfo(i);
			if (datas.race > 0 && hero.race == datas.race) {
				this.heroList.push(hero);
			}
			else if (datas.career > 0 && hero.career == datas.career) {
				this.heroList.push(hero);
			}
			else if (datas.pointF > 0 && hero.point_fetters == datas.pointF) {
				this.heroList.push(hero);
			}
		}
		this.m_heroList.numItems = this.heroList.length;
		this.m_heroList.scrollToView(0);
		if (Game.playData.unlockAssociationattribute.indexOf(datas.attribute_id) != -1) {
			// 已解锁
			if (Game.playData.associationattribute.indexOf(datas.attribute_id) == -1) {
				// 未领奖
				this.m_c1.setSelectedIndex(1);
			}
			else {
				// 已领奖
				this.m_c1.setSelectedIndex(2);
			}
		}
		else {
			this.m_c1.setSelectedIndex(0);
		}
		this.guideIndex = 0;
		if (Game.playData.guideIndex == GuideType.SnythHeroOver) {
			this.moduleWindow.createGuideUI(this.m_rewardBtn, new Laya.Point(this.m_rewardBtn.x, this.m_rewardBtn.y),
				Laya.Handler.create(this, this.rewardClick),
				"领取奖励");
			setTimeout(() => {
				this.guideIndex = 1;
			}, 10);
		} else {
			this.isGuide = false;
			this.guideIndex = 1;
		}
	}
	private isGuide: boolean = false;
	private guideIndex: number = 0;

	private heroList: Array<HeroInfoData> = [];

	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		item.setHero(this.heroList[index]);
	}

	// 点击item
	private onClickItem(obj: fairygui.GObject): void {
		let item = obj as UI_ItemIcon;
		Game.popup.showPopup(obj, true, false, "英雄：{0}", item.hero.id + 11);
	}


}
UI_HeroFetters.bind();
