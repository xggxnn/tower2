import fui_GameOver from "../../Generates/Battle/fui_GameOver";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../tool/EventKey";
import { Tick } from "../../../tool/TickManager";
import UI_HeroIcon from "../System/UI_HeroIcon";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import UnlockInfo from "../../../csvInfo/UnlockInfo";

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
		this.m_upBtn.onClick(this, this.gainClick);
		this.m_upLevelBtn.onClick(this, this.clickUpLevelBtn);
		this.m_rewardList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);

		this.m_quitBtn.onClick(this, this.quitClick);
		this.m_reFight.onClick(this, this.reFightClick);
	}
	private quitClick(): void {
		this.closeUI();
		Game.menu.open(MenuId.Home);
	}
	private reFightClick(): void {
		Game.battleScene.clearBattleScene();
		Game.battleMap.sUpdateExitBattleMain.dispatch();
		this.moduleWindow.closeGameResult();
		if (Game.gameStatus == GameStatus.Win) {
			Game.proto.endlessConfig();
		} else if (Game.gameStatus == GameStatus.Failed) {
			this.moduleWindow.continueRefight();
		}
	}
	// 渲染item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_HeroIcon;
		item.setData(Game.battleData.fight_result[index]);
	}
	gainClick(): void {
		this.closeUI();
		if (Game.battleData.curEnterFightType == 2 && Game.battleData.dayFightProgress > 5) {
			Game.menu.open(MenuId.Home);
		}
		else {
			Game.menu.open(MenuId.MenuSelect);
		}
	}
	private scrolltoViewHeroId = 0;
	private synthClick(): void {
		this.closeUI();
		Game.battleData.curEnterFightType = 0;
		Game.menu.open(MenuId.Hero, this.scrolltoViewHeroId);
	}
	private clickUpLevelBtn(): void {
		this.closeUI();
		Game.battleData.curEnterFightType = -1;
		Game.menu.open(MenuId.Arrange);
	}
	private unlockFuns(): void {
		this.closeUI();
		if (Game.playData.unlockInit == 7) {
			Game.playData.unlockInit = 8;
			Game.menu.open(MenuId.MenuSelect);
		}
		else {
			Game.menu.open(MenuId.Home);
		}
	}

	setData(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		this.m_rewardList.numItems = 0;
		this.m_gainBtn.visible = false;
		this.m_synthBtn.visible = false;
		this.m_upLevelBtn.visible = false;
		this.m_c1.setSelectedIndex(Game.gameStatus == GameStatus.Win ? 0 : 1);
		this.m_endlessStatus.setSelectedIndex(0);
		if (Game.battleData.curEnterFightType == 3) {
			this.m_endlessStatus.setSelectedIndex(1);
			let data = {
				waveId: Game.battleData.level_id,
				win: Game.gameStatus == GameStatus.Win,
			}
			Game.proto.endlessReward(data);
		}
		else if (Game.battleData.curEnterFightType == 2) {
			let data = {
				progress: Game.battleData.dayFightProgress,
				win: Game.gameStatus == GameStatus.Win,
			}
			Game.proto.dayFightReward(data);
		}
		else {
			let curDic = Game.playData.curFightInf;
			let ass = Game.battleData.refrushAssociation();
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
	}
	private unlockFun: boolean = false;
	private tick: Tick = null;
	private showResult(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		// 添加解锁功能icon
		this.unlockFun = false;
		if (Game.gameStatus == GameStatus.Win && Game.battleData.curEnterFightType < 2) {
			let index = Game.playData.unlockLoginInit;
			if (Game.playData.unlockInit > 0) {
				index = Game.playData.unlockInit;
			}
			let unlock = UnlockInfo.getInfo(index + 1);
			if (unlock) {
				if (unlock.mapId == Game.battleMap.maxMapId - 1) {
					for (let i = 0, len = unlock.unLock.length; i < len; i++) {
						let item: RewardItem = new RewardItem();
						item.funIndex = unlock.unLock[i];
						Game.battleData.fight_result.push(item);
						this.unlockFun = true;
					}
				}
			}
			if (!this.unlockFun && Game.battleData.level_id == 14 && Game.battleData.trial_level == 0 && Game.playData.unlockEndless != 2) {
				let item: RewardItem = new RewardItem();
				item.funIndex = 11;
				Game.battleData.fight_result.push(item);
				this.unlockFun = true;
			}
		}

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
		if (Game.battleData.curEnterFightType == 3) {
			this.m_endlessStatus.setSelectedIndex(2);
			return;
		}
		this.m_gainBtn.title = "继续闯关";
		this.m_gainBtn.visible = true;
		if (Game.battleData.curEnterFightType == 2) {
			this.m_synthBtn.visible = false;
			this.m_upLevelBtn.visible = false;
			return;
		}
		this.m_synthBtn.visible = false;
		// 获取金币和去升级按钮显示哪个？
		if (Game.playData.upLevelCost() > 0 && Game.playData.upLevelCost() <= Game.playData.curGold) {
			this.m_upLevelBtn.visible = true;
		}
		else {
			this.m_upLevelBtn.visible = false;
		}
		this.scrolltoViewHeroId = 0;
		if (this.unlockFun) {
			if (Game.playData.guideIndex >= GuideType.sixStartFive && Game.playData.guideIndex < GuideType.sevenStartFive) {
				Game.playData.guideIndex = GuideType.sevenStartFive;
			}
			this.m_gainBtn.title = "解锁功能";
			EventManager.event(EventKey.SHOW_WAIT);
			this.moduleWindow.createGuideUI(this.m_gainBtn, new Laya.Point(this.m_gainBtn.x, this.m_gainBtn.y), Laya.Handler.create(this, this.unlockFuns), "你有新的功能可解锁！", LocationType.Upper);
		}
		else {
			// 英雄碎片确定合成按钮是否显示
			for (let i = 0, len = Game.battleData.fight_result.length; i < len; i++) {
				let item: RewardItem = Game.battleData.fight_result[i];
				if (item.isClips) {
					let heroId = item.itemId - 11;
					let heroInf = HeroInfoData.getInfo(heroId);
					let Clips = Game.playData.curClips.getValue(heroId);
					if (Game.playData.curHeroInfoList.hasKey(heroId)) {
						// 判断是否能提升品质
						if (Game.redData.checkHeroCanUpQuality(heroInf)) {
							this.m_synthBtn.title = "提升品质";
							this.m_synthBtn.visible = true;
							this.scrolltoViewHeroId = heroId;
						}
						else {
							// 判断是否能洗属性
							if (Game.playData.curLevel < 50) {
								this.m_synthBtn.visible = false;
							}
							else {
								if (Game.redData.requestClips(heroInf, true) <= Clips) {
									this.m_synthBtn.title = "洗属性";
									this.m_synthBtn.visible = true;
									this.scrolltoViewHeroId = heroId;
								}
							}
						}
					}
					else {
						if (Clips >= Game.redData.requestClips(heroInf, true)) {
							this.m_synthBtn.title = "合成英雄";
							this.m_synthBtn.visible = true;
							this.scrolltoViewHeroId = heroId;
						}
					}
					break;
				}
			}
			if (Game.gameStatus == GameStatus.Win) {
				if (Game.playData.guideIndex <= GuideType.CastSkillOver) {
					Game.playData.guideIndex = GuideType.Win;
					let xx = this.m_rewardList.x + 149 * 2 + 40;
					let yy = this.m_rewardList.y;
					EventManager.event(EventKey.SHOW_WAIT);
					this.moduleWindow.createGuideUI(this.m_rewardList.getChildAt(0) as UI_HeroIcon, new Laya.Point(xx, yy), Laya.Handler.create(this, this.synNext), Game.tipTxt.txts("Guide6"));
				}
				else if (Game.playData.guideIndex == GuideType.fiveStartFive || Game.playData.guideIndex == GuideType.fiveMoveHeroSeat2 || Game.playData.guideIndex == GuideType.fiveMoveHeroSeat) {
					Game.playData.guideIndex = GuideType.fiveWin;
					EventManager.event(EventKey.SHOW_WAIT);
					this.moduleWindow.createGuideUI(this.m_upLevelBtn, new Laya.Point(this.m_upLevelBtn.x, this.m_upLevelBtn.y), Laya.Handler.create(this, this.clickUpLevelBtn), Game.tipTxt.clickUpLevelBtn, LocationType.Left);
				}
				else if (Game.playData.guideIndex >= GuideType.sixStartFive && Game.playData.guideIndex < GuideType.sevenStartFive) {
					Game.playData.guideIndex = GuideType.sevenStartFive;
				}
			}
		}
	}
	private synNext(): void {
		EventManager.event(EventKey.SHOW_WAIT);
		setTimeout(() => {
			this.moduleWindow.createGuideUI(this.m_synthBtn, new Laya.Point(this.m_synthBtn.x, this.m_synthBtn.y), Laya.Handler.create(this, this.synthClick), Game.tipTxt.battleSynth);
		}, 30);
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
		EventManager.on(ProtoEvent.ENDLESSGAIN_CALL_BACK, this, this.showResult);
		EventManager.on(ProtoEvent.DAYFIGHTREWARD_CALL_BACK, this, this.showResult);
		Game.sound.stopAndClear();
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.PASSWAVE_CALL_BACK, this, this.showResult);
		EventManager.off(ProtoEvent.DAYFIGHTREWARD_CALL_BACK, this, this.showResult);
		Game.battleData.fight_result = [];
	}


}
UI_GameOver.bind();