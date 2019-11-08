import fui_Selection from "../../Generates/Menus/fui_Selection";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import UI_selectionBtn from "./UI_selectionBtn";
import Game from "../../../Game";
import Fun from "../../../tool/Fun";
import WaveStatus from "../../../gamemodule/DataStructs/WaveStatus";
import WaveInfo from "../../../csvInfo/WaveInfo";
import WaveformInfo from "../../../csvInfo/WaveformInfo";
import WaveRewardInfo from "../../../csvInfo/WaveRewardInfo";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import BattleEffectEnemy from "../../../gamemodule/Models/BattleEffectEnemy";
import TrialInfo from "../../../csvInfo/TrialInfo";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import SpriteKey from "../../SpriteKey";
import UnlockInfo from "../../../csvInfo/UnlockInfo";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import ResourceInfo from "../../../csvInfo/ResourceInfo";
import UI_RewardItem from "../System/UI_RewardItem";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Selection extends fui_Selection {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_Selection {
		return <UI_Selection>(fui_Selection.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Selection.URL, UI_Selection);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.selectionBtn = this.m_selBtn as UI_selectionBtn;
		this.selectionBtn.onClick(this, this.clickBtn);

		this.m_unLockTipList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// this.m_unLockTipList.itemProvider = Laya.Handler.create(this, this.getListItemResource, null, false);
	}
	private rewardList: Array<RewardItem> = [];
	private tipTxt: Array<string> = [];
	// 渲染item 列表的item
	initItem(index: number, obj: fairygui.GObject) {
		let item = obj as UI_RewardItem;
		if (index < this.rewardList.length) {
			item.setData(this.rewardList[index]);
		}
		else {
			item.setDataTxt(this.tipTxt[index - this.rewardList.length]);
		}
	}
	// getListItemResource(index: number) {
	// 	if (index < this.rewardList.length) {
	// 		return UI_RewardItem.URL;
	// 	}
	// 	else {
	// 		return UI_ScrollTxtNormal.URL;
	// 	}
	// }

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
	private updateTime(waves: WaveStatus): void {
		if (this.item && this.item.id == waves.id && this.item.level > this.wave.levelcounts) {
			this.m_comtime.text = Fun.formatTimeEN(waves.exploreTime);
			this.m_comMask.fillAmount = waves.exploreTime / waves.exploreTotalTime;
			if (waves.exploreTime <= 0) {
				this.m_comMask.visible = false;
				this.m_redTip.setSelectedIndex(1);
				Game.battleMap.sUpdateExploreTime.remove(this.updateTime, this);
			}
			else {
				if (!this.m_comMask.visible) {
					this.m_comMask.visible = true;
				}
				this.m_redTip.setSelectedIndex(0);
			}
		}
	}
	private selectionBtn: UI_selectionBtn;
	private item: WaveStatus = null;
	private wave: WaveInfo = null;
	private canClick: boolean = false;
	public setData(wave: WaveInfo, moduleWindow: MenusWin): void {
		if (this._sk) {
			this._sk.sk.destroySk();
			this._sk = null;
		}
		this.moduleWindow = moduleWindow;
		this.m_starNum.setSelectedIndex(0);
		this.wave = wave;
		let mapLevel = Fun.idToMapLevel(this.wave.id);
		let waveForm = WaveformInfo.getInfoWithType(this.wave.waveform);
		let haveBoss = false;
		for (let i = waveForm.length - 1; i >= 0; i--) {
			if (waveForm[i].boss > 0) {
				haveBoss = true;
				break;
			}
		}
		// 功能解锁情况
		this.m_unlockstatus.setSelectedIndex(0);
		let unlock = UnlockInfo.getInfo(Game.playData.unlockIndex + 1);
		this.tipTxt = [];
		this.rewardList = [];
		if (unlock) {
			if (unlock.mapId == this.wave.id) {
				this.tipTxt.push(unlock.tip[0]);
				if (unlock.tip.length > 1) {
					for (let i = 1; i < unlock.tip.length; i++) {
						this.tipTxt.push(unlock.tip[i]);
					}
				}
				if (Game.battleMap.maxMapId != this.wave.id) {
					this.m_unLockTipList.numItems = this.tipTxt.length;
					this.m_unlockstatus.setSelectedIndex(1);
				}
			}
		} else {
			if (this.wave.id == 14 && this.wave.id >= Game.battleMap.maxMapId) {
				this.tipTxt.push("解锁无尽天宫");
				if (Game.battleMap.maxMapId != this.wave.id) {
					this.m_unLockTipList.numItems = this.tipTxt.length;
					this.m_unlockstatus.setSelectedIndex(1);
				}
			}
		}
		this.canClick = true;
		this.selectionBtn.setData(mapLevel.map, mapLevel.level, haveBoss);
		this.item = null;
		if (Game.battleMap.waveStatusDict.hasKey(this.wave.id)) {
			if (this.wave.unlock >= Game.battleMap.maxMapId) {
				this.m_status.setSelectedIndex(0);
				this._sk = this.addBattleEffect("ui02", true);
				this.m_selBtn.enabled = true;
				this.canClick = false;
				this.m_redTip.setSelectedIndex(0);
			}
			else {
				this.item = Game.battleMap.waveStatusDict.getValue(this.wave.id);
				if (this.item.level <= this.wave.levelcounts) {
					this.m_status.setSelectedIndex(2);
					this.m_starNum.setSelectedIndex(this.item.level - 1);
					this.m_starMax.setSelectedIndex(this.wave.levelcounts);
					let rewardInf = WaveRewardInfo.getInfo(this.wave.id);
					this.m_progress.text = Fun.formatNumberUnit(rewardInf.coin_challenge);
					if (this.item.fightCd > 0) {
						this.curMaxCd = TrialInfo.getInfo(this.item.level - 1).cooldown;
						this.m_mask.visible = true;
						this.showFightCd(this.item);
						Game.battleMap.sUpdateFightCd.add(this.showFightCd, this);
						this.m_redTip.setSelectedIndex(0);
					}
					else {
						this.m_mask.fillAmount = 0;
						this.m_mask.visible = false;
						this.m_protime.text = "";
						this.m_redTip.setSelectedIndex(1);
					}
				}
				else {
					this.m_redTip.setSelectedIndex(0);
					this.m_comMask.visible = true;
					this.updateTime(this.item);
					Game.battleMap.sUpdateExploreTime.add(this.updateTime, this);
					if (this.item.exploreHeroId > 1000) {
						let hero = HeroInfoData.getInfo(this.item.exploreHeroId - 1000);
						this.m_comquality.icon = SpriteKey.getUrl("quality" + hero.quality + ".png");
					}
					else {
						this.m_comquality.icon = SpriteKey.getUrl("quality1.png");
					}
					this.m_status.setSelectedIndex(3);
				}
				this._sk = this.addBattleEffect("ui02", true);
				this.m_selBtn.enabled = true;
			}
		}
		else {
			this.m_redTip.setSelectedIndex(0);
			// 测试专用
			// if (Game.battleMap.maxMapId == this.wave.id) {
			if (Game.battleMap.maxMapId >= this.wave.id) {
				this.m_status.setSelectedIndex(1);
				this.m_selBtn.enabled = true;
				this._sk = this.addBattleEffect("ui03", true);
				this._sk.sk.pos(0, -20);
				// 设置显示
				this.m_unlockstatus.setSelectedIndex(1);
				let rewardInf = WaveRewardInfo.getInfo(this.wave.id);
				if (rewardInf.coin_first > 0) {
					let itemRew = new RewardItem();
					itemRew.itemId = ResourceInfo.gold;
					itemRew.itemNum = rewardInf.coin_first;
					this.rewardList.push(itemRew);
				}
				if (rewardInf.jade > 0) {
					let itemRew = new RewardItem();
					itemRew.itemId = ResourceInfo.jadeite;
					itemRew.itemNum = rewardInf.jade;
					this.rewardList.push(itemRew);
				}
				if (rewardInf.card_count > 0 && rewardInf.card_type > 0) {
					let itemRew = new RewardItem();
					itemRew.itemId = rewardInf.card_type;
					itemRew.itemNum = rewardInf.card_count;
					this.rewardList.push(itemRew);
				}
				if (rewardInf.hero_id > 0 && rewardInf.hero_clips > 0) {
					let itemRew = new RewardItem();
					itemRew.itemId = rewardInf.hero_id;
					itemRew.itemNum = rewardInf.hero_clips;
					itemRew.isClips = true;
					this.rewardList.push(itemRew);
				}
				this.m_unLockTipList.numItems = this.rewardList.length + this.tipTxt.length;
			}
			else {
				this.m_status.setSelectedIndex(0);
				this.m_selBtn.enabled = false;
			}
		}
		if (Game.playData.unlockInit == 9 && this.wave.id == 1) {
			Game.playData.unlockInit = 10;
			if (this.item) {
				EventManager.event(EventKey.SHOW_WAIT);
				setTimeout(() => {
					this.moduleWindow.createGuideUI(this.m_selBtn, new Laya.Point(this.x - this.m_selBtn.width / 2, this.y - this.m_selBtn.height / 2),
						Laya.Handler.create(this, this.clickBtn), Game.tipTxt.clickGoldBtn);
				}, 10);
			}
		}
		else if ((this.wave.id == 2 && Game.playData.guideIndex == GuideType.fiveEnterMenus) || (this.wave.id == 3 && Game.playData.guideIndex == GuideType.sixEnterMenus)) {
			Game.playData.guideIndex++;
			EventManager.event(EventKey.SHOW_WAIT);
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_selBtn, new Laya.Point(this.x - this.m_selBtn.width / 2, this.y - this.m_selBtn.height / 2),
					Laya.Handler.create(this, this.clickBtn), Game.tipTxt.fiveSelectWave);
			}, 10);
		}
		else if (this.wave.id == 2 && (Game.playData.guideIndex == GuideType.sevenEnterMenus || Game.playData.guideIndex == GuideType.sixWin)) {
			Game.playData.guideIndex = GuideType.sevenSelectWave;
			EventManager.event(EventKey.SHOW_WAIT);
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_selBtn, new Laya.Point(this.x - this.m_selBtn.width / 2, this.y - this.m_selBtn.height / 2),
					Laya.Handler.create(this, this.clickBtn), Game.tipTxt.fiveSelectWave);
			}, 10);
		}
	}
	private _sk: BattleEffectEnemy = null;
	private addBattleEffect(id: string, loop: boolean): BattleEffectEnemy {
		let key: string = String(id);
		let _effect: BattleEffectEnemy = BattleEffectEnemy.create(id, loop);
		this.m_selBtn.m_sk.displayObject.addChild(_effect.sk);
		_effect.scale(1, 1, true);
		return _effect;
	}

	private curMaxCd: number = 0;
	private showFightCd(waves: WaveStatus): void {
		if (this.item && this.item.id == waves.id && this.item.level <= this.wave.levelcounts) {
			if (waves.fightCd <= 0) {
				this.m_protime.text = "";
				this.m_mask.fillAmount = 0;
				this.m_mask.visible = false;
				this.m_redTip.setSelectedIndex(1);
				Game.battleMap.sUpdateFightCd.remove(this.showFightCd, this);
			}
			else {
				this.m_mask.fillAmount = waves.fightCd / this.curMaxCd;
				this.m_protime.text = Fun.formatTimeEN(waves.fightCd);
				this.m_redTip.setSelectedIndex(0);
			}
		}
	}
	private _clickTime: number = 0;
	private clickBtn(): void {
		if (Laya.Browser.now() - this._clickTime <= 1000) {
			return;
		}
		this._clickTime = Laya.Browser.now();
		if (this.canClick) {
			Game.battleData.level_id = this.wave.id;
			if (this.item && this.item.level > this.wave.levelcounts) {
				if (this.item.exploreTime <= 0) {
					let data = {
						waveId: this.item.id,
					}
					Game.proto.collectDebris(data);
				}
				else {
					Game.tipWin.showTip(Fun.format(Game.tipTxt.DebrisCollection, Fun.formatTime(this.item.exploreTime)));
				}
			}
			else {
				this.moduleWindow.createTrialUI();
			}
		}
	}

}
UI_Selection.bind();