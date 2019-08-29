import fui_GameOver from "../../Generates/Battle/fui_GameOver";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../Tool/EventKey";
import { Tick } from "../../../Tool/TickManager";
import UI_HeroIcon from "../System/UI_HeroIcon";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import HeroqualityInfo from "../../../csvInfo/HeroqualityInfo";
import { FightType } from "../../../gamemodule/DataEnums/FightType";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_GameOver extends fui_GameOver {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_GameOver {
		return <UI_GameOver>(fui_GameOver.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_GameOver.URL, UI_GameOver);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_gainBtn.onClick(this, this.gainClick);
		this.m_synthBtn.onClick(this, this.synthClick);
		this.m_upBtn.onClick(this, this.upClick);
		this.m_upLevelBtn.onClick(this, this.clickUpLevelBtn);
		this.m_getGoldBtn.onClick(this, this.clickGoldBtn);
		this.m_rewardList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon;
		item.setData(Game.battleData.fight_result[index]);
	}
	gainClick(): void {
		this.closeUI();
		Game.menu.open(MenuId.MenuSelect, Game.battleMap.maxMapId);
	}
	private synthClick(): void {
		this.closeUI();
		Game.menu.open(MenuId.Hero);
	}
	private clickUpLevelBtn(): void {
		this.closeUI();
		Game.menu.open(MenuId.Arrange);
	}
	private clickGoldBtn(): void {
		this.closeUI();
		Game.menu.open(MenuId.MenuSelect);
	}
	upClick(): void {
		this.closeUI();
		Game.menu.open(MenuId.MenuSelect);
	}

	setData(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		this.m_rewardList.numItems = 0;
		this.m_gainBtn.visible = false;
		this.m_synthBtn.visible = false;
		this.m_upLevelBtn.visible = false;
		this.m_getGoldBtn.visible = false;
		let value: number = Game.gameStatus == GameStatus.Win ? 0 : 1;
		this.m_c1.setSelectedIndex(value);
		let curDic = Game.playData.curFightInf;
		let ass = Game.battleData.refrushAssociation(true);
		let list = {};
		if (ass.length > 0) {
			for (let i = ass.length - 1; i >= 0; i--) {
				list[ass[i].names] = ass[i].num;
			}
		}
		let data = {
			winLose: Game.gameStatus == GameStatus.Win,
			waveId: Game.battleData.level_id,
			fightType: Game.battleData.fight_type,
			level: Game.battleData.trial_level,
			seat: Game.battleScene.seatHeroList[Game.battleScene.seatHeroSelect].concat(),
			fightValue: [curDic.getValue(FightType.Atk), curDic.getValue(FightType.AtkEx), curDic.getValue(FightType.Speed), curDic.getValue(FightType.SpeedEx), curDic.getValue(FightType.Crit), curDic.getValue(FightType.CritEx), curDic.getValue(FightType.Burst), curDic.getValue(FightType.BurstEx)],
			association: list,
		}
		Game.proto.passWave(data);
	}
	private tick: Tick = null;
	private showResult(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		if (Game.gameStatus == GameStatus.Win && Game.battleData.fight_result.length > 0) {
			for (let i = 0, len = Game.battleData.fight_result.length; i < len; i++) {
				let item: RewardItem = Game.battleData.fight_result[i];
				if (item.isClips) {
					break;
				}
			}
			if (this.tick) {
				this.tick.Stop();
				Game.tick.clearTick(this.tick);
				this.tick = null;
			}
			let times = Game.battleData.fight_result.length - 1;
			if (times < 1) times = 1;
			this.tick = Game.tick.addTick(times, Laya.Handler.create(this, this.updateNum, null, false), Laya.Handler.create(this, this.addNumOver, null, false), 20);
			this.tick.Start();
		}
		else {
			this.addNumOver();
		}
	}
	private updateNum(): void {
		if (Game.battleData.fight_result.length > this.m_rewardList.numItems) {
			this.m_rewardList.numItems++;
			this.m_rewardList.scrollToView(this.m_rewardList.numItems - 1);
		}
	}
	private addNumOver(): void {
		if (this.tick) {
			this.tick.Stop();
			Game.tick.clearTick(this.tick);
			this.tick = null;
		}
		this.m_gainBtn.visible = true;
		this.m_synthBtn.visible = false;
		// 获取金币和去升级按钮显示哪个？
		if (Game.playData.upLevelCost() > 0 && Game.playData.upLevelCost() <= Game.playData.curGold) {
			this.m_upLevelBtn.visible = true;
			this.m_getGoldBtn.visible = false;
		}
		else {
			this.m_upLevelBtn.visible = false;
			this.m_getGoldBtn.visible = true;
		}
		// 英雄碎片确定合成按钮是否显示
		for (let i = 0, len = Game.battleData.fight_result.length; i < len; i++) {
			let item: RewardItem = Game.battleData.fight_result[i];
			if (item.isClips) {
				let heroId = item.itemId - 11;
				let heroInf = HeroInfoData.getInfo(heroId);
				let Clips = Game.playData.curClips.getValue(heroId);
				let heroQuality = HeroqualityInfo.getInfoQuality(heroInf.quality);
				if (Game.playData.curHeroInfoList.hasKey(heroId)) {
					// 已经存在的英雄
					if (heroInf.quality < 5) {
						// 判断是否能提升品质
						if (heroQuality.clip_hero <= Clips) {
							this.m_synthBtn.title = "提升品质";
							this.m_synthBtn.visible = true;
						}
					}
					else {
						// 判断是否能洗属性
						if (Game.playData.curLevel < 50) {
							this.m_synthBtn.visible = false;
						}
						else {
							if (heroQuality.clip_hero <= Clips) {
								this.m_synthBtn.title = "洗属性";
								this.m_synthBtn.visible = true;
							}
						}
					}
				}
				else {
					if (heroQuality && Clips >= heroQuality.clip_hero) {
						this.m_synthBtn.title = "合成英雄";
						this.m_synthBtn.visible = true;
					}
				}
				break;
			}
		}
		if (Game.gameStatus == GameStatus.Win) {
			if (Game.playData.guideIndex <= GuideType.CastSkillOver) {
				Game.playData.guideIndex = GuideType.Win;
				this.moduleWindow.createGuideUI(this.m_synthBtn, new Laya.Point(this.m_synthBtn.x, this.m_synthBtn.y), Laya.Handler.create(this, this.synthClick), Game.tipTxt.battleSynth);
			}
			if (Game.playData.guideIndex == GuideType.fiveStartFive) {
				Game.playData.guideIndex++;
				this.moduleWindow.createGuideUI(this.m_upLevelBtn, new Laya.Point(this.m_upLevelBtn.x, this.m_upLevelBtn.y), Laya.Handler.create(this, this.clickUpLevelBtn), Game.tipTxt.clickUpLevelBtn, LocationType.Left);
			}
			if (Game.playData.guideIndex == GuideType.sixStartFive) {
				Game.playData.guideIndex++;
				this.moduleWindow.createGuideUI(this.m_getGoldBtn, new Laya.Point(this.m_getGoldBtn.x, this.m_getGoldBtn.y), Laya.Handler.create(this, this.clickGoldBtn), Game.tipTxt.clickGoldBtn, LocationType.Left);
			}
		}
	}

	// 关闭ui
	closeUI(): void {
		Game.battleScene.clearBattleScene();
		this.moduleWindow.menuClose();
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(ProtoEvent.PASSWAVE_CALL_BACK, this, this.showResult);
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.PASSWAVE_CALL_BACK, this, this.showResult);
	}


}
UI_GameOver.bind();