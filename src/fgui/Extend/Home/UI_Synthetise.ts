import fui_Synthetise from "../../Generates/Home/fui_Synthetise";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import FWindow from "../../../gamemodule/FWindow";
import BaseSK from "../../../base/BaseSK";
import { HeroAniEnums } from "../../../gamemodule/DataEnums/HeroAniEnums";
import { MenuId } from "../../../gamemodule/MenuId";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import Fun from "../../../tool/Fun";
import HeroTypeInfo from "../../../csvInfo/HeroTypeInfo";
import SpriteKey from "../../SpriteKey";
import Association from "../../../gamemodule/DataStructs/Association";
import AssociationSpecialInfo from "../../../csvInfo/AssociationSpecialInfo";
import SkillInfo from "../../../csvInfo/SkillInfo";
import UI_FightTip from "../System/UI_FightTip";
import TimeHouseInfo from "../../../csvInfo/TimeHouseInfo";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import Dictionary from "../../../tool/Dictionary";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Synthetise extends fui_Synthetise {

	moduleWindow: HomeWin;
	private fwindow: FWindow;

	public static DependPackages: string[] = ["Home"];

	public static createInstance(): UI_Synthetise {
		return <UI_Synthetise>(fui_Synthetise.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Synthetise.URL, UI_Synthetise);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_backBtn.setXY(Fun.leftTopPoint.x + 15, Fun.leftTopPoint.y + 15);
		this.m_middle.setXY(Fun.topMiddlePoint.x, Fun.topMiddlePoint.y + 5);
		this.m_backBtn.onClick(this, this.closeUI);
		this.m_ok.onClick(this, this.clickOk);
		this.m_setSeat.onClick(this, this.clickSeat);
		this.m_upAtk.onClick(this, this.clickUpAtt, [0]);
		this.m_upSpeed.onClick(this, this.clickUpAtt, [1]);
		this.m_upCrit.onClick(this, this.clickUpAtt, [2]);
		this.m_upBurst.onClick(this, this.clickUpAtt, [3]);
		this.m_lookrace.onClick(this, this.clickLookFetters, [0]);
		this.m_lookcareer.onClick(this, this.clickLookFetters, [1]);
		this.m_lookspecial.onClick(this, this.clickLookFetters, [2]);
		this.m_closeBtn.onClick(this, this.closeResetAtt);
		this.m_tipleftBtn.onClick(this, this.clickTipLeft);
		this.m_tiprightBtn.onClick(this, this.clickTipRight);
	}

	// 关闭ui
	closeUI(): void {
		if (Game.playData.guideIndex < GuideType.SnythHeroOver) return;
		if (this._sk) {
			this._sk.destroyThis();
			this._sk = null;
		}
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
		EventManager.on(ProtoEvent.UPQUALITY_CALL_BACK, this, this.upQualityOver);
		EventManager.on(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetiseOver);
		EventManager.on(ProtoEvent.RESETATT_CALL_BACK, this, this.resetAttOver);
		EventManager.on(ProtoEvent.SAVEATT_CALL_BACK, this, this.saveAttOver);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {

	}
	private okStatus: number = 0;
	/**
	 * 确定按钮
	 */
	private clickOk(): void {
		switch (this.okStatus) {
			case 0:
				{
					// 合成// 英雄合成
					let data = {
						heroId: this.heroInf.id,
					}
					Game.proto.synthetise(data);
				}
				break;
			case 1:
				{
					// 碎片不足
					Game.popup.showPopup(this.m_ok, false, false, "获取途径：\n1、闯关\n2、挂机");
				}
				break;
			case 2:
				{
					// 提升品质	
					this.clickUpQuality();
				}
				break;
		}
	}
	/**
	 * 洗属性
	 * @param index 
	 */
	private clickUpAtt(index: number): void {
		if (this.heroInf.quality < 5) {
			Game.tipWin.showTip(Game.tipTxt.ReqMaxQuality);
		}
		else {
			if (Game.playData.curLevel < 50) {
				Game.tipWin.showTip(Game.tipTxt.LevelNoEnoughToResetAtt);
			}
			else {
				let heroClips: number = 0;
				if (Game.playData.curClips.hasKey(this.heroInf.id)) {
					heroClips = Game.playData.curClips.getValue(this.heroInf.id);
				}
				if (!heroClips) heroClips = 0;
				if (this.upClips <= heroClips) {
					this.showResetAtt(index);
				}
				else {
					Game.tipWin.showTip(Fun.format(Game.tipTxt.NoReqClips, this.upClips, heroClips));
				}
			}
		}
	}
	private resetAttIndex: number = 0;
	private showResetAtt(index: number): void {
		this.resetAttIndex = index;
		this.m_upd.setSelectedIndex(0);
		this.m_tipStatus.setSelectedIndex(2);
		let heroClips: number = 0;
		if (Game.playData.curClips.hasKey(this.heroInf.id)) {
			heroClips = Game.playData.curClips.getValue(this.heroInf.id);
		}
		this.m_suipian.text = heroClips.toString();
		(this.m_fightTips as UI_FightTip).m_att.setSelectedIndex(index);
		let att = this.checkVal(index);
		this.m_maxTip.setVar("count1", Game.tipTxt.AttributeName[index]).setVar("count2", att[2].toFixed(2)).flushVars();
		this.m_costTip.setVar("count", this.upqualityClips.toString()).flushVars();
		this.m_cur.text = att[0].toFixed(2);
		this.tipRightBtnStatus = 1;
	}
	private checkVal(key: number): Array<number> {
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
		return [val0, val1, max];
	}
	// 洗属性发送服务器请求
	private resetAtt(): void {
		this.m_upd.setSelectedIndex(0);
		Game.playData.resetAttribute.clear();
		let data = {
			heroId: this.heroInf.id,
			attribute: this.resetAttIndex,
		}
		Game.proto.resetAttribute(data);
	}
	private resetAttOver(): void {
		this.updateClips();
		this.m_tipStatus.setSelectedIndex(3);
		let heroClips: number = 0;
		if (Game.playData.curClips.hasKey(this.heroInf.id)) {
			heroClips = Game.playData.curClips.getValue(this.heroInf.id);
		}
		this.m_suipian.text = heroClips.toString();
		let att = this.checkVal(this.resetAttIndex);
		this.m_cur.text = att[0].toFixed(2);
		this.m_pro.text = att[1].toFixed(2);
		if (att[0] < att[1]) {
			this.m_upd.setSelectedIndex(1);
		} else if (att[0] > att[1]) {
			this.m_upd.setSelectedIndex(3);
		} else {
			this.m_upd.setSelectedIndex(2);
		}
		this.tipRightBtnStatus = 1;
		this.tipLeftBtnStatus = 2;
	}
	// 保存属性
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
		this.updateClips();
		let curDic = Game.battleData.getHeroFightVal(this.heroInf.id, false);
		let tip = Game.playData.fightTip(curDic, 2);
		this.m_atk.setVar("count", tip.getValue(FightType.Atk)).flushVars();
		this.m_atkspeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
		this.m_crit.setVar("count", tip.getValue(FightType.Crit)).flushVars();
		this.m_burst.setVar("count", tip.getValue(FightType.Burst)).flushVars();
	}
	private clickUpQuality(): void {
		this.m_upd.setSelectedIndex(0);
		this.m_tipStatus.setSelectedIndex(1);
		this.tipLeftBtnStatus = 1;
		this.tipRightBtnStatus = 0;
		let heroClips: number = 0;
		if (Game.playData.curClips.hasKey(this.heroInf.id)) {
			heroClips = Game.playData.curClips.getValue(this.heroInf.id);
		}
		this.m_suipian.text = heroClips.toString();
		this.m_tips.text = Fun.format(Game.tipTxt.UpHeroQuality, this.heroInf.name,
			this.qualityName(this.heroInf.quality), this.qualityName(this.heroInf.quality + 1), this.upqualityClips, heroClips);
	}
	private qualityName(quality: number): string {
		if (quality < 0) quality = 0;
		if (quality > 5) quality = 5;
		return Game.tipTxt.QualityName[quality - 1];
	}
	private closeResetAtt(): void {
		this.m_upd.setSelectedIndex(0);
		this.m_tipStatus.setSelectedIndex(0);
	}
	// 提示界面左按钮状态
	private tipLeftBtnStatus: number = 0;
	private tipRightBtnStatus: number = 0;
	private upQoldInf: Dictionary<string, number> = new Dictionary<string, number>();
	private clickTipLeft(): void {
		switch (this.tipLeftBtnStatus) {
			case 1:
				{
					if (this.okStatus == 1) {
						Game.popup.showPopup(this.m_tipleftBtn, false, false, "获取途径：\n1、闯关\n2、挂机");
					}
					else {
						// 提升品质
						this.upQoldInf = Game.battleData.getHeroFightVal(this.heroInf.id, false);
						let data = {
							heroId: this.heroInf.id,
						}
						Game.proto.upQuality(data);
					}
				}
				break;
			case 2:
				{
					// 保存洗点属性
					Game.proto.saveAttribute();
				}
				break;
		}
		this.closeResetAtt();
	}
	private clickTipRight(): void {
		switch (this.tipRightBtnStatus) {
			case 0:
				this.closeResetAtt();
				break;
			case 1:
				{
					let heroClips: number = 0;
					if (Game.playData.curClips.hasKey(this.heroInf.id)) {
						heroClips = Game.playData.curClips.getValue(this.heroInf.id);
					}
					this.upClips = Game.redData.requestClips(this.heroInf, true);
					if (!heroClips) heroClips = 0;
					if (this.upClips <= heroClips) {
						this.resetAtt();
					}
					else {
						Game.tipWin.showTip(Fun.format(Game.tipTxt.NoReqClips, this.upClips, heroClips));
					}
				}
				break;
		}
	}
	private upQualityOver(): void {
		this.m_showMask.setSelectedIndex(1);
		this.m_quality.setSelectedIndex(3);
		this.updateClips();
		if (this.eff) {
			this.eff.replay(false);
		}
		else {
			this.eff = this.addBattleEffect("ui04", false);
		}
		setTimeout(() => {
			this.m_showMask.setSelectedIndex(1);
			this.m_qualitys.icon = SpriteKey.getUrl("QualityName_" + (this.heroInf.quality - 1) + ".png");
			this.m_quality.setSelectedIndex(1);
			setTimeout(() => {
				this.upQualityOver2();
			}, 2000);
		}, 1500);
	}
	private upQualityOver2(): void {
		this.m_showMask.setSelectedIndex(1);
		this.updateClips();

		// 旧数据
		this.oldData = [];
		let a1 = this.upQoldInf.getValue(FightType.Atk);
		this.oldData.push(a1 ? a1 : 0);
		let a2 = this.upQoldInf.getValue(FightType.Speed);
		this.oldData.push(a2 ? a2 : 0);
		let a3 = this.upQoldInf.getValue(FightType.Crit);
		this.oldData.push(a3 ? a3 : 0);
		let a4 = this.upQoldInf.getValue(FightType.Burst);
		this.oldData.push(a4 ? a4 : 0);
		this.m_atk.setVar("count", this.oldData[0].toFixed(2)).flushVars();
		this.m_atkspeed.setVar("count", this.oldData[1].toFixed(2)).flushVars();
		this.m_crit.setVar("count", this.oldData[2].toFixed(2)).flushVars();
		this.m_burst.setVar("count", this.oldData[3].toFixed(2)).flushVars();
		// 升品质加的数据
		let curDic = Game.battleData.getHeroFightVal(this.heroInf.id, false);
		this.addData = [];
		this.addDataper = [];
		this.addData.push((curDic.getValue(FightType.Atk) - this.upQoldInf.getValue(FightType.Atk)));
		this.addData.push((curDic.getValue(FightType.Speed) - this.upQoldInf.getValue(FightType.Speed)));
		this.addData.push((curDic.getValue(FightType.Crit) - this.upQoldInf.getValue(FightType.Crit)));
		this.addData.push((curDic.getValue(FightType.Burst) - this.upQoldInf.getValue(FightType.Burst)));
		this.addDataper.push(this.addData[0] / 30);
		this.addDataper.push(this.addData[1] / 30);
		this.addDataper.push(this.addData[2] / 30);
		this.addDataper.push(this.addData[3] / 30);

		this.m_atk2.setVar("count", this.addData[0].toFixed(2)).flushVars();
		this.m_atkspeed2.setVar("count", this.addData[1].toFixed(2)).flushVars();
		this.m_cirt2.setVar("count", this.addData[2].toFixed(2)).flushVars();
		this.m_burst2.setVar("count", this.addData[3].toFixed(2)).flushVars();

		this.m_quality.setSelectedIndex(2);
		EventManager.on(EventKey.ENTER_FRAME, this, this.updateAddData);
	}
	private oldData: Array<number> = [];
	private addData: Array<number> = [];
	private addDataper: Array<number> = [];
	private updateAddData(): void {
		if (this.addData[0] > 0) {
			this.addData[0] -= this.addDataper[0];
			this.oldData[0] += this.addDataper[0];
		}
		else {
			this.addData[0] = 0;
			if (this.addData[1] > 0) {
				this.addData[1] -= this.addDataper[1];
				this.oldData[1] += this.addDataper[1];
			}
			else {
				this.addData[1] = 0;
				if (this.addData[2] > 0) {
					this.addData[2] -= this.addDataper[2];
					this.oldData[2] += this.addDataper[2];
				}
				else {
					this.addData[2] = 0;
					if (this.addData[3] > 0) {
						this.addData[3] -= this.addDataper[3];
						this.oldData[3] += this.addDataper[3];
					}
					else {
						this.addData[3] = 0;
					}
				}
			}
		}
		this.m_atk2.setVar("count", this.addData[0].toFixed(2)).flushVars();
		this.m_atkspeed2.setVar("count", this.addData[1].toFixed(3)).flushVars();
		this.m_cirt2.setVar("count", this.addData[2].toFixed(2)).flushVars();
		this.m_burst2.setVar("count", this.addData[3].toFixed(2)).flushVars();

		this.m_atk.setVar("count", this.oldData[0].toFixed(2)).flushVars();
		this.m_atkspeed.setVar("count", this.oldData[1].toFixed(3)).flushVars();
		this.m_crit.setVar("count", this.oldData[2].toFixed(2)).flushVars();
		this.m_burst.setVar("count", this.oldData[3].toFixed(2)).flushVars();
		if (this.addData[3] <= 0) {
			EventManager.off(EventKey.ENTER_FRAME, this, this.updateAddData);
			let curDic = Game.battleData.getHeroFightVal(this.heroInf.id, false);
			let tip = Game.playData.fightTip(curDic, 2);
			this.m_atk.setVar("count", tip.getValue(FightType.Atk)).flushVars();
			this.m_atkspeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
			this.m_crit.setVar("count", tip.getValue(FightType.Crit)).flushVars();
			this.m_burst.setVar("count", tip.getValue(FightType.Burst)).flushVars();
			this.m_quality.setSelectedIndex(1);
			this.m_showMask.setSelectedIndex(0);
		}
	}
	/**
	 * 查看羁绊
	 */
	private clickLookFetters(types: number): void {
		Game.playData.fettersInfos = Game.battleData.assItem(this.fetterId[types], types);
		Game.playData.sShowFetters.dispatch();
	}

	private synthetiseOver(): void {
		this.m_quality.setSelectedIndex(3);
		if (this.eff) {
			this.eff.replay(false);
		}
		else {
			this.eff = this.addBattleEffect("ui04", false);
		}
		this.m_t5.play();
		setTimeout(() => {
			this.syntheTiseSkOver();
		}, 1500);
	}
	private syntheTiseSkOver(): void {
		setTimeout(() => {
			this.updateClips();
			this.m_quality.setSelectedIndex(1);
			if (Game.playData.guideIndex == GuideType.SnythHero) {
				EventManager.event(EventKey.SHOW_WAIT);
				setTimeout(() => {
					Game.playData.guideIndex = GuideType.SnythHeroOver;
					this.moduleWindow.createGuideUI(this.m_setSeat, new Laya.Point(this.m_setSeat.x, this.m_setSeat.y),
						Laya.Handler.create(this, this.clickSeat), Game.tipTxt.synthetise, LocationType.Upper);
				}, 2000);
			}
		}, 1000);
		this.m_resetAtt.setSelectedIndex(1);


		let _id = 18;
		if (Game.haveHeroTem.indexOf(this.heroInf.skin) != -1) {
			_id = this.heroInf.skin;
		}
		if (this._sk) {
			this._sk.destroyThis();
			this._sk = null;
		}
		this._sk = BaseSK.create("hero_" + _id);
		this.m_skbg.displayObject.addChild(this._sk);
		this._sk.scale(1.5, 1.5);
		this._sk.pos(this.width / 2, this.height / 2 + 150);
		this._sk.play(HeroAniEnums.Sign, true);
		this._sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
	}

	private updateClips(): void {
		let heroClips: number = 0;
		if (Game.playData.curClips.hasKey(this.heroInf.id)) {
			heroClips = Game.playData.curClips.getValue(this.heroInf.id);
		}
		this.upClips = Game.redData.requestClips(this.heroInf, true);
		this.upqualityClips = Game.redData.requestClips(this.heroInf, false);
		this.m_progress.value = heroClips;
		this.m_progress.max = this.upqualityClips;
		if (this.heroInf.quality < 5 && this.upqualityClips <= heroClips) {
			this.m_ok.m_redTip.setSelectedIndex(1);
			this.m_heroStatus.setSelectedIndex(1);
			this.okStatus = 2;
		}
		else {
			this.m_ok.m_redTip.setSelectedIndex(0);
			this.m_heroStatus.setSelectedIndex(2);
			this.okStatus = 1;
		}
		this.tipLeftBtnStatus = 1;
		this.tipRightBtnStatus = 0;
	}

	private _sk: BaseSK = null;
	private fetterId: number[] = [];
	private heroInf: HeroInfoData = null;
	private upClips: number = 0;
	private upqualityClips: number = 0;

	private setData(): void {
		if (this._sk) {
			this._sk.destroyThis();
			this._sk = null;
		}
		this.m_showMask.setSelectedIndex(0);
		this.fetterId = [0, 0, 0];
		this.upClips = 0;
		this.upqualityClips = 0;
		this.okStatus = 0;
		this.m_tipStatus.setSelectedIndex(0);
		this.heroInf = Game.battleData.clickHeroInf;
		let heroTYpes = HeroTypeInfo.getInfo(this.heroInf.type);
		if (this.heroInf != null) {
			this.m_nam.icon = SpriteKey.getUrl("hero_name_" + this.heroInf.skin + ".png");
			this.fetterId[0] = this.heroInf.race;
			this.fetterId[1] = this.heroInf.career;
			this.m_race.icon = SpriteKey.getUrl("race" + this.heroInf.race + ".png");
			this.m_career.icon = SpriteKey.getUrl("career" + this.heroInf.career + ".png");
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
			let curDic = Game.battleData.getHeroFightVal(this.heroInf.id, false);

			let tip = Game.playData.fightTip(curDic, 2);
			this.m_atk.setVar("count", tip.getValue(FightType.Atk)).flushVars();
			this.m_atkspeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
			this.m_crit.setVar("count", tip.getValue(FightType.Crit)).flushVars();
			this.m_burst.setVar("count", tip.getValue(FightType.Burst)).flushVars();

			let skill2 = SkillInfo.getInfo(this.heroInf.skill_id_2);
			this.m_skillInf.title = skill2.des + "：" + skill2.explain;
			this.m_qualitys.icon = SpriteKey.getUrl("QualityName_" + (this.heroInf.quality - 1) + ".png");
			let heroClips: number = 0;
			if (Game.playData.curClips.hasKey(this.heroInf.id)) {
				heroClips = Game.playData.curClips.getValue(this.heroInf.id);
			}
			this.upClips = Game.redData.requestClips(this.heroInf, true);
			this.upqualityClips = Game.redData.requestClips(this.heroInf, false);
			this.m_progress.value = heroClips;
			if (Game.haveHeroTem.indexOf(this.heroInf.skin) != -1) {
				if (!Game.playData.curHeroInfoList.hasKey(this.heroInf.id)) {
					this.m_quality.setSelectedIndex(1);
					this.m_resetAtt.setSelectedIndex(0);
					this.m_heroStatus.setSelectedIndex(0);
					this.m_progress.max = this.upClips;
					if (heroClips >= this.upClips) {
						this.m_ok.m_redTip.setSelectedIndex(1);
						this.okStatus = 0;
						if (Game.playData.guideIndex == GuideType.showHeroItem) {
							Game.playData.guideIndex = GuideType.SnythHero;
							EventManager.event(EventKey.SHOW_WAIT);
							setTimeout(() => {
								this.moduleWindow.createGuideUI(this.m_ok, new Laya.Point(this.m_ok.x, this.m_ok.y),
									Laya.Handler.create(this, this.clickOk), Game.tipTxt.Guid4, LocationType.Upper);
							}, 10);
						}
					}
					else {
						this.okStatus = 1;
						this.m_ok.m_redTip.setSelectedIndex(0);
					}
				}
				else {
					this.m_quality.setSelectedIndex(1);
					this.m_progress.max = this.upqualityClips;
					this.m_resetAtt.setSelectedIndex(1);
					if (this.heroInf.quality < 5 && this.upqualityClips <= heroClips) {
						this.m_ok.m_redTip.setSelectedIndex(1);
						this.m_heroStatus.setSelectedIndex(1);
						this.okStatus = 2;
					}
					else {
						this.m_ok.m_redTip.setSelectedIndex(0);
						this.m_heroStatus.setSelectedIndex(2);
						this.okStatus = 1;
					}

					let _id = 18;
					if (Game.haveHeroTem.indexOf(this.heroInf.skin) != -1) {
						_id = this.heroInf.skin;
					}
					this._sk = BaseSK.create("hero_" + _id);
					this.m_skbg.displayObject.addChild(this._sk);
					this._sk.scale(1.5, 1.5);
					this._sk.pos(this.width / 2, this.height / 2 + 150);
					this._sk.play(HeroAniEnums.Sign, true);
					this._sk.addStopEvent(Laya.Handler.create(this, this.overEvent));
				}
			}
		}
	}

	private overEvent(): void {
		this._sk.play(HeroAniEnums.Stand, true);
	}


	private eff: BattleEffectEnemy = null;
	private addBattleEffect(id: string, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		this.m_skbg.displayObject.addChild(_effect.sk);
		_effect.scale(1, 1, true);
		_effect.sk.pos(this.width / 2, this.height / 2 + 150);
		return _effect;
	}
	private clickSeat(): void {
		if (Game.playData.guideIndex < GuideType.SnythHeroOver) return;
		this.closeUI();
		Game.battleData.curEnterFightType = -1;
		Game.menu.open(MenuId.Arrange);
	}

}
UI_Synthetise.bind();
