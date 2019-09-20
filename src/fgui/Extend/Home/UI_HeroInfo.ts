import fui_HeroInfo from "../../Generates/Home/fui_HeroInfo";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import Fun from "../../../tool/Fun";
import EventKey from "../../../tool/EventKey";
import FWindow from "../../../gamemodule/FWindow";
import SkillInfo from "../../../csvInfo/SkillInfo";
import TimeHouseInfo from "../../../csvInfo/TimeHouseInfo";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationSpecialInfo from "../../../csvInfo/AssociationSpecialInfo";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import HeroqualityInfo from "../../../csvInfo/HeroqualityInfo";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import UI_DialogBox from "../System/UI_DialogBox";
import Pools from "../../../tool/Pools";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import HeroTypeInfo from "../../../csvInfo/HeroTypeInfo";
import AssociationRaceInfo from "../../../csvInfo/AssociationRaceInfo";
import AssociationCareerInfo from "../../../csvInfo/AssociationCareerInfo";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroInfo extends fui_HeroInfo {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_HeroInfo {
		return <UI_HeroInfo>(fui_HeroInfo.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroInfo.URL, UI_HeroInfo);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_bg.onClick(this, this.closeUI);
		this.m_gainmethod.onClick(this, this.clickGain);
		this.m_gainmethod.title = "获得方式";
		this.m_lookrace.onClick(this, this.clickLookFetters, [0]);
		this.m_lookcareer.onClick(this, this.clickLookFetters, [1]);
		this.m_lookspecial.onClick(this, this.clickLookFetters, [2]);
		this.m_icons.onClick(this, this.clikcHero);
		this.m_help.onClick(this, this.helpClick);

		this.m_upQuality.onClick(this, this.clickUpQuality);
		this.m_upAtk.onClick(this, this.clickUpAtt, [0]);
		this.m_upSpeed.onClick(this, this.clickUpAtt, [1]);
		this.m_upCrit.onClick(this, this.clickUpAtt, [2]);
		this.m_upBurst.onClick(this, this.clickUpAtt, [3]);
	}
	// 提升品质确认框
	private clickUpQuality(): void {
		if (this.heroInf.quality < 5) {
			let heroClips = Game.playData.curClips.getValue(this.heroInf.id);
			if (!heroClips) heroClips = 0;
			if (this.upClips <= heroClips) {
				Game.tipWin.showTip(Fun.format(Game.tipTxt.UpHeroQuality, this.heroInf.name,
					this.qualityName(this.heroInf.quality), this.qualityName(this.heroInf.quality + 1), this.upClips, heroClips),
					true, Laya.Handler.create(this, this.upQuality));
			}
			else {
				Game.tipWin.showTip(Fun.format(Game.tipTxt.NoReqClips, this.upClips, heroClips));
			}
		}
		else {
			Game.tipWin.showTip(Game.tipTxt.MaxQualityTip);
		}
	}
	private qualityName(quality: number): string {
		if (quality < 0) quality = 0;
		if (quality > 5) quality = 5;
		return Game.tipTxt.QualityName[quality - 1];
	}
	// 发送服务器请求提升品质
	private upQuality(): void {
		let data = {
			heroId: this.heroInf.id,
		}
		Game.proto.upQuality(data);
	}
	// 洗属性提示框
	private clickUpAtt(index: number): void {
		if (this.heroInf.quality < 5) {
			Game.tipWin.showTip(Game.tipTxt.ReqMaxQuality);
		}
		else {
			if (Game.playData.curLevel < 50) {
				Game.tipWin.showTip(Game.tipTxt.LevelNoEnoughToResetAtt);
			}
			else {
				let heroClips = Game.playData.curClips.getValue(this.heroInf.id);
				if (!heroClips) heroClips = 0;
				if (this.upClips <= heroClips) {
					Game.tipWin.showTip(Fun.format(Game.tipTxt.UpHeroAttribute, this.heroInf.name, Game.tipTxt.AttributeName[index], this.upClips, heroClips),
						true, Laya.Handler.create(this, this.resetAtt, [index]));
				}
				else {
					Game.tipWin.showTip(Fun.format(Game.tipTxt.NoReqClips, this.upClips, heroClips));
				}
			}
		}
	}
	// 洗属性发送服务器请求
	private resetAtt(index: number): void {
		Game.playData.resetAttribute.clear();
		let data = {
			heroId: this.heroInf.id,
			attribute: index,
		}
		Game.proto.resetAttribute(data);
	}
	private resetAttOver(): void {
		let key = Number(Game.playData.resetAttribute.getKeys()[0]);
		let val = Game.playData.resetAttribute.getValue(key);
		Game.tipWin.showTip(this.checkVal(), true, Laya.Handler.create(this, this.saveAtt), null, "保存", "取消");
	}
	private checkVal(): string {
		let key = Number(Game.playData.resetAttribute.getKeys()[0]);
		let val = Game.playData.resetAttribute.getValue(key);
		let val0 = 0;
		let val1 = 0;
		let max = 0;
		let heroTYpes = HeroTypeInfo.getInfo(this.heroInf.type);
		switch (key) {
			case 0:
				{
					let timehouse = TimeHouseInfo.getInfoLv(Game.playData.curLevel);
					let star = timehouse.vals[Game.playData.curStar];
					val0 = this.heroInf.basicattckpointCur * star * 0.01 * this.heroInf.atkscale * 0.01;
					val1 = val * star * 0.01 * this.heroInf.atkscale * 0.01;
					max = heroTYpes.benchmark_atk_max * star * 0.01 * this.heroInf.atkscale * 0.01;
				}
				break;
			case 1:
				{
					val0 = 1 / this.heroInf.cd;
					val1 = val;
					max = heroTYpes.bench_atk_speed_max;
				}
				break;
			case 2:
				{
					val0 = this.heroInf.crit;
					val1 = val;
					max = heroTYpes.benchmark_crit_max;
				}
				break;
			case 3:
				{
					val0 = this.heroInf.burst;
					val1 = val;
					max = heroTYpes.benchmark_critatt_max;
				}
				break;
		}
		return Fun.format(Game.tipTxt.saveAttTip, this.heroInf.name, Game.tipTxt.AttributeName[key], val0.toFixed(2), val1.toFixed(2), max.toFixed(2));
	}
	// 保存属性
	private saveAtt(): void {
		Game.proto.saveAttribute({});
	}
	private saveAttOver(): void {
		let key = Number(Game.playData.resetAttribute.getKeys()[0]);
		let val = Game.playData.resetAttribute.getValue(key);
		switch (key) {
			case 0:
				{
					this.heroInf.basicattckpointCur = val;
				}
				break;
			case 1:
				{
					this.heroInf.cd = 1 / val;
				}
				break;
			case 2:
				{
					this.heroInf.crit = val;
				}
				break;
			case 3:
				{
					this.heroInf.burst = val;
				}
				break;
		}
		Game.playData.resetAttribute.clear();
		this.closeUI();
	}

	private fetterId: number[] = [];
	private clickLookFetters(types: number): void {
		Game.playData.fettersInfos = null;
		let fettinf = Game.battleData.assItem(this.fetterId[types], types);
		if (Game.playData.unlockAssociationattribute.indexOf(fettinf.attribute_id) != -1) {
			Game.playData.fettersInfos = fettinf;
		}
		if (Game.playData.fettersInfos != null) {
			Game.playData.sShowFetters.dispatch();
		}
		else {
			let str: number = 2 + types;
			Game.popup.showPopup(this.m_lookrace, false, false, Game.tipTxt.txts("AssociationLockTip" + str));
		}
	}
	private helpClick(): void {
		Game.popup.showPopup(this.m_help, true, false, Game.tipTxt.HeroInfTip);
	}


	private showTip: boolean = false;
	private clickGain(): void {
		if (this.showTip) {
			Game.popup.showPopup(this.m_gainmethod, false, false, "获取途径：\n1、闯关\n2、挂机");
		}
		else {
			// 英雄合成
			let data = {
				heroId: this.heroInf.id,
			}
			Game.proto.synthetise(data);
		}
	}
	private synthetiseOver(): void {
		this.closeUI();
	}
	private heroInf: HeroInfoData = null;
	private upClips: number = 0;
	private _sk: BaseSK = null;
	setData(): void {
		this.fetterId = [0, 0, 0];
		this.heroInf = Game.battleData.clickHeroInf;
		let heroTYpes = HeroTypeInfo.getInfo(this.heroInf.type);
		this.upClips = 0;
		if (this.heroInf != null) {
			this.m_heroname.text = this.heroInf.name;
			this.m_race.text = Fun.format("五行：{0}", Association.raceName(this.heroInf.race));
			this.fetterId[0] = this.heroInf.race;
			this.m_career.text = Fun.format("门派：{0}", Association.careerName(this.heroInf.career));
			this.fetterId[1] = this.heroInf.career;
			if (this.heroInf.point_fetters > 0) {
				this.m_teshu.setSelectedIndex(1);
				let assSpecail = AssociationSpecialInfo.getInfo(this.heroInf.point_fetters);
				if (assSpecail) {
					this.fetterId[2] = this.heroInf.point_fetters;
					this.m_special.setVar("count", Association.attributeIdToName(assSpecail.attribute)).flushVars();
					this.m_teshu.setSelectedIndex(1);
				}
				else {
					this.m_teshu.setSelectedIndex(0);
				}
			}
			else {
				this.m_teshu.setSelectedIndex(0);
			}
			let _id = 18;
			if (Game.haveHeroTem.indexOf(this.heroInf.skin) != -1) {
				_id = this.heroInf.skin;
			}
			if (this._sk) {
				this._sk.destroyThis();
				this._sk = null;
			}
			this._sk = BaseSK.create("hero_" + _id);
			this.displayObject.addChild(this._sk);
			this._sk.pos(this.m_icons.x, this.m_icons.y);
			this._sk.play(HeroAniEnums.Sign, true);
			this._sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
			let curDic = Game.battleData.getHeroFightVal(this.heroInf.id);
			let tip = Game.playData.fightTip(curDic);
			this.m_atk.setVar("count", tip.getValue(FightType.Atk)).flushVars();
			this.m_atkspeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
			this.m_cirt.setVar("count", tip.getValue(FightType.Crit)).flushVars();
			this.m_burst.setVar("count", tip.getValue(FightType.Burst)).flushVars();
			let skill2 = SkillInfo.getInfo(this.heroInf.skill_id_2);
			this.m_skillname.setVar("name", skill2.des).setVar("count", skill2.explain).flushVars();
			this.m_gainmethod.enabled = true;
			this.showTip = false;
			let heroQuality = HeroqualityInfo.getInfoQuality(this.heroInf.quality);
			this.upClips = heroQuality.clip_hero;
			let heroClips: number = Game.playData.curClips.getValue(this.heroInf.id);
			if (!heroClips) heroClips = 0;
			let str = "";
			if (this.upClips > heroClips) {
				str = "[color=#ff0000]" + heroClips + "[/color]/[color=#33ff00]" + this.upClips + "[/color]";
			}
			else {
				str = "[color=#33ff00]" + heroClips + "[/color]/[color=#33ff00]" + this.upClips + "[/color]";
			}
			this.m_upQuality.title = "提升品质(" + str + ")";
			this.m_gainmethod.title = "合成(" + str + ")";
			this.m_up.setSelectedIndex(0);
			if (Game.haveHeroTem.indexOf(this.heroInf.skin) != -1) {
				if (!Game.playData.curHeroInfoList.hasKey(this.heroInf.id)) {
					if (heroClips >= this.upClips) {
						if (Game.playData.guideIndex == GuideType.showHeroItem) {
							Game.playData.guideIndex = GuideType.SnythHero;
							EventManager.event(EventKey.SHOW_WAIT);
							setTimeout(() => {
								this.moduleWindow.createGuideUI(this.m_gainmethod, new Laya.Point(this.m_gainmethod.x, this.m_gainmethod.y),
									Laya.Handler.create(this, this.clickGain), Game.tipTxt.Guid4, LocationType.Upper);
							}, 10);
						}
					}
					else {
						this.showTip = true;
					}
				}
				else {
					this.showTip = true;
					this.m_up.setSelectedIndex(1);
					if (this.heroInf.quality < 5 && this.upClips <= heroClips) {
						Game.redTip.showRedTip(this.m_upQuality, this.id);
					}
					else {
						Game.redTip.hideRedTip(this.m_upQuality, this.id);
					}
				}
			}
			if (!Game.battleData.isShowGainBtn) {
				this.m_gainmethod.enabled = true;
				this.showTip = true;
			}
		}
		else {
			console.log("未发现英雄信息");
			this.closeUI();
		}
	}
	private tip: UI_DialogBox = null;
	private clikcHero(): void {
		if (this._sk) {
			this._sk.play(HeroAniEnums.Attack, false);
		}
		if (this.tip == null) {
			this.tip = Pools.fetch(UI_DialogBox);
			this.m_icons.root.addChild(this.tip);
			this.tip.m_titles.width = 400;
			Game.writeEff.startTypeWrite(50, this.heroInf.story, this.tip.m_titles, null);
			this.tip.setXY(this.m_icons.x, this.m_icons.y - this.m_icons.height * 0.7);
			this.tip.onClick(this, this.tipClick);
		}
		else {
			this.tip.visible = true;
		}
	}
	private tipClick(): void {
		if (this.tip) {
			this.tip.visible = false;
		}
	}
	private overEvent(): void {
		this._sk.play(HeroAniEnums.Stand, true);
	}
	// 关闭ui
	closeUI(): void {
		if (this.fwindow) {
			this.fwindow.windowRemoveChild(this);
		}
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this, this.closeUI);
		EventManager.on(ProtoEvent.RESETATT_CALL_BACK, this, this.resetAttOver);
		EventManager.on(ProtoEvent.SAVEATT_CALL_BACK, this, this.saveAttOver);
		EventManager.on(EventKey.GAMELOSE, this, this.closeUI);
		EventManager.on(EventKey.GAMEWIN, this, this.closeUI);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.offAllCaller(this);
		Game.battleData.clickHeroInf = null;
		this.heroInf = null;
		this.fwindow = null;
		if (this.tip) {
			this.tip.offClick(this, this.tipClick);
			this.tip.removeFromParent();
			Pools.recycle(this.tip);
		}
		this.tip = null;
	}


}
UI_HeroInfo.bind();
