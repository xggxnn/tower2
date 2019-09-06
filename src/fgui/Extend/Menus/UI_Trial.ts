import fui_Trial from "../../Generates/Menus/fui_Trial";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import Game from "../../../Game";
import { MenuId } from "../../../gamemodule/MenuId";
import EventManager from "../../../tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import EventKey from "../../../tool/EventKey";
import WaveStatus from "../../../gamemodule/DataStructs/WaveStatus";
import Fun from "../../../tool/Fun";
import { FightType } from "../../../gamemodule/DataEnums/FightType";
import UI_RewardItem from "../System/UI_RewardItem";
import WaveRewardInfo from "../../../csvInfo/WaveRewardInfo";
import RewardItem from "../../../gamemodule/DataStructs/RewardItem";
import ResourceInfo from "../../../csvInfo/ResourceInfo";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_Trial extends fui_Trial {

	moduleWindow: MenusWin;

	public static DependPackages: string[] = ["Menus"];

	public static createInstance(): UI_Trial {
		return <UI_Trial>(fui_Trial.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_Trial.URL, UI_Trial);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo

		this.m_startBtn.title = "准备迎战";
		this.m_closeBtn.onClick(this, this.closeUI);
		this.m_startBtn.onClick(this, this.startClick);
		// 设置列表渲染函数
		this.m_rewardList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);
		// this.m_help.onClick(this, this.helpClick);
	}
	private rewardList: Array<RewardItem> = [];
	// 渲染item 列表的item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_RewardItem;
		item.setData(this.rewardList[index]);
	}

	private fight_type: number = 0;
	// 开始挑战
	startClick(): void {
		if (Game.playData.guideIndex >= GuideType.sevenStartFive && this.fight_type == 1 && this.m_fightStatus.selectedIndex == 0 && this.m_speedStatus.selectedIndex == 0 && this.m_critStatus.selectedIndex == 0 && this.m_burstStatus.selectedIndex == 0) {
			Game.tipWin.showTip(Game.tipTxt.FightSkipTip, true, Laya.Handler.create(this, this.skipFight), Laya.Handler.create(this, this.fightReq), "跳过战斗", "继续战斗");
		}
		else {
			this.fightReq();
		}
	}
	private _skipFight: boolean = false;
	// 准备观看视频跳过战斗过程
	private skipFight(): void {
		this._skipFight = true;
		this.fightReq();
	}
	private _clickTime: number = 0;
	private fightReq(): void {
		if (Laya.Browser.now() - this._clickTime <= 3000) {
			return;
		}
		this._clickTime = Laya.Browser.now();
		EventManager.event(EventKey.SHOW_UI_WAIT);
		Game.battleData.fight_type = this.fight_type;
		let data = {
			waveId: Game.battleData.level_id,
			fightType: Game.battleData.fight_type,
		}
		Game.proto.selectWave(data);
	}
	private startFight(): void {
		if (this._skipFight) {
			Game.gameStatus = GameStatus.Win;
			this.moduleWindow.gameResult();
			this.closeUI();
		}
		else {
			this.moduleWindow.menuClose();
			EventManager.event(EventKey.CLOSE_UI_WAIT);
			Game.menu.open(MenuId.Battle);
		}
	}

	// 关闭ui
	closeUI(): void {
		if (!this.moduleWindow.menuParameter.initFunction.hasKey(this.id)) {
			this.moduleWindow.menuParameter.initFunction.remove(this.id);
		}
		this.moduleWindow.windowRemoveChild(this);
	}
	// 返回上一级ui
	backUI(): void {
		this.moduleWindow.menuBack();
	}
	// 显示，相当于enable
	onWindowShow(): void {
		EventManager.on(ProtoEvent.SELECTWAVE_CALL_BACK, this, this.startFight);
		this._skipFight = false;
		let _dic = Game.battleData.getWaveFightInf(Game.battleData.level_id);
		let _seatDic = Game.playData.curFightInf;
		let tip = Game.playData.fightTip(_seatDic);
		this.m_curFight.setVar("count", tip.getValue(FightType.Atk)).flushVars();
		this.m_curSpeed.setVar("count", tip.getValue(FightType.Speed)).flushVars();
		this.m_curCrit.setVar("count", tip.getValue(FightType.Crit)).flushVars();
		this.m_curBrust.setVar("count", tip.getValue(FightType.Burst)).flushVars();
		let tip2 = Game.playData.fightTip(_dic);
		this.m_tjFight.setVar("count", tip2.getValue(FightType.Atk)).flushVars();
		this.m_tjSpeed.setVar("count", tip2.getValue(FightType.Speed)).flushVars();
		this.m_tjcrit.setVar("count", tip2.getValue(FightType.Crit)).flushVars();
		this.m_tjBurst.setVar("count", tip2.getValue(FightType.Burst)).flushVars();

		let statusTip = Game.playData.checkFightVal(_seatDic, _dic, Game.battleData.level_id);
		this.m_fightStatus.setSelectedIndex(statusTip.getValue(FightType.Atk));
		this.m_speedStatus.setSelectedIndex(statusTip.getValue(FightType.Speed));
		this.m_critStatus.setSelectedIndex(statusTip.getValue(FightType.Crit));
		this.m_burstStatus.setSelectedIndex(statusTip.getValue(FightType.Burst));

		this.item = null;
		if (Game.battleMap.waveStatusDict.hasKey(Game.battleData.level_id)) {
			this.item = Game.battleMap.waveStatusDict.getValue(Game.battleData.level_id);
		}
		this.fight_type = 0;
		Game.battleData.trial_level = 0;
		this.m_startBtn.enabled = true;
		let rewardInf = WaveRewardInfo.getInfo(Game.battleData.level_id);
		if (this.item) {
			this.fight_type = 1;
			Game.battleData.trial_level = this.item.level;
			this.m_c1.setSelectedIndex(1);
			(this.m_reward as UI_RewardItem).m_count.setVar("count", Fun.formatNumberUnit(rewardInf.coin_challenge)).flushVars();
			this.m_progress.value = Math.floor((this.item.level - 1) / 5 * 100);
			if (this.item.fightCd > 0) {
				this.m_cdStatus.setSelectedIndex(1);
				this.m_startBtn.enabled = false;
				this.showFightCd(this.item);
				Game.battleMap.sUpdateFightCd.add(this.showFightCd, this);
			}
			else {
				this.m_cdStatus.setSelectedIndex(0);
			}
		}
		else {
			this.m_c1.setSelectedIndex(0);
			this.m_cdStatus.setSelectedIndex(0);
			this.rewardList = [];
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
			this.m_rewardList.numItems = this.rewardList.length;
		}
		let mapLevel = Fun.idToMapLevel(Game.battleData.level_id);
		this.m_mapid.text = mapLevel.map + "-" + mapLevel.level;
		if (Game.playData.guideIndex == GuideType.fiveSelectWave || Game.playData.guideIndex == GuideType.sixSelectWave || Game.playData.guideIndex == GuideType.sevenSelectWave) {
			Game.playData.guideIndex++;
			setTimeout(() => {
				this.moduleWindow.createGuideUI(this.m_startBtn, new Laya.Point(this.m_startBtn.x, this.m_startBtn.y), Laya.Handler.create(this, this.startClick), Game.tipTxt.fiveFight);
			}, 10);
		}
	}
	private showFightCd(waves: WaveStatus): void {
		if (this.item && this.item.id == waves.id) {
			if (waves.fightCd <= 0) {
				this.m_cdStatus.setSelectedIndex(0);
				this.m_startBtn.enabled = true;
			}
			else {
				this.m_cd.text = Fun.format("冷却时间：{0}", Fun.formatTime(waves.fightCd));
			}
		}
	}
	private item: WaveStatus = null;
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.SELECTWAVE_CALL_BACK, this, this.startFight);
		Game.battleMap.sUpdateFightCd.remove(this.showFightCd, this);
	}

}
UI_Trial.bind();