import GameInstaller from "./GameInstaller";
import { MenuId } from "./gamemodule/MenuId";
import MenuManager from "./gamemodule/MenuManager";
import GameTimeData from "./gamemodule/DataStructs/GameTimeData";
import ScreenSettingConfig from "./tool/ScreenSettingConfig";
import TimerManager from "./tool/TimerManager";
import SystemManager from "./tool/SystemManager";
import LoaderManager from "./tool/LoaderManager";
import { GameStatus } from "./gamemodule/DataEnums/GameStatus";
import AudioManager from "./gamemodule/Sound/AudioManager";
import GameLocalStorage from "./gamemodule/LocalStorage/GameLocalStorage";
import ProtoManager from "./protobuf/ProtoManager";
import SystemToastMessag from "./gamemodule/System/SystemToastMessag";
import SystemTipWin from "./gamemodule/System/SystemTipWin";
import SystemPopup from "./gamemodule/System/SystemPopup";
import BattleMap from "./gamemodule/DataStructs/BattleMap";
import BattleData from "./gamemodule/DataStructs/BattleData";
import BattleScene from "./gamemodule/Models/BattleScene";
import ServerCSVConfig from "./dataInfo/ServerCSVConfig";
import PlayerData from "./gamemodule/DataStructs/PlayerData";
import UserData from "./tool/UserData";
import EventManager from "./tool/EventManager";
import ProtoEvent from "./protobuf/ProtoEvent";
import WaveData from "./gamemodule/DataStructs/WaveData";
import TickManager from "./tool/TickManager";
import GMData from "./gamemodule/DataStructs/GMData";
import SystemRewardWin from "./gamemodule/System/SystemRewardWin";
import BattleHalo from "./gamemodule/DataStructs/BattleHalo";
import SystemRedTip from "./gamemodule/System/SystemRedTip";
import EventKey from "./tool/EventKey";
import LoadFilesList from "./tool/LoadFilesList";
import RedTipData from "./gamemodule/DataStructs/RedTipData";
import TypeWriteData from "./gamemodule/DataStructs/TypeWriteData";
import ShareManager from "./tool/ShareManager";
import TipTextInfo from "./gamemodule/DataStructs/TipTextInfo";
import { GuideType } from "./gamemodule/DataEnums/GuideType";
import TaskData from "./gamemodule/DataStructs/TaskData";

export default class Game {

	static isIOS: boolean;
	static isAndroid: boolean;
	static isMobile: boolean;
	// 屏幕宽高
	static scenes: Laya.Point;
	static scenesWH: Laya.Point;
	// 光环生成的父节点
	static haloParent: laya.display.Sprite;
	// 怪物生成的父节点
	static parentObject: laya.display.Sprite;
	// 特效生成的父节点
	static EffectsParent: laya.display.Sprite;
	// 血条父节点
	static bloodParent: fairygui.GRoot;
	// 血条父节点
	static shadowParent: laya.display.Sprite;

	// 生成sk的数量
	private static _creatNum: number = 0;
	public static get creatNum(): number {
		this._creatNum++;
		return this._creatNum;
	}
	public static set creatNum(v: number) {
		this._creatNum = v;
	}

	static initOverForLoad: boolean = false;
	static isShowLoadUI: boolean = true;

	// 游戏状态
	static gameStatus: GameStatus = GameStatus.Load;

	static configs: ServerCSVConfig;
	// 模块管理器
	static menu: MenuManager = new MenuManager();
	// 游戏时间
	static time: GameTimeData = new GameTimeData();
	// 加载管理器
	static loadManager: LoaderManager = new LoaderManager();
	// 音效管理器
	static sound: AudioManager = new AudioManager();
	// 本地存储数据
	static localStorage: GameLocalStorage;
	// 协议发送管理器
	static proto: ProtoManager = new ProtoManager();
	// 浮动消息
	static total: SystemToastMessag;
	// 弹出提示窗口
	static tipWin: SystemTipWin;
	// 弹出获得物品窗口
	static rewardWin: SystemRewardWin;
	// 弹出popup
	static popup: SystemPopup;
	// 计时器
	static tick: TickManager;
	// 红点提示
	static redTip: SystemRedTip;
	// 红点逻辑
	static redData: RedTipData;
	// 打字机效果
	static writeEff: TypeWriteData;
	// 提示文本
	static tipTxt: TipTextInfo;


	// 地图信息
	static battleMap: BattleMap;
	// 战斗数据
	static battleData: BattleData;
	// 战斗表现
	static battleScene: BattleScene;
	// 关卡数据
	static waveData: WaveData;
	// 玩家数据
	static playData: PlayerData;
	// 用户信息
	static userData: UserData;
	// 战斗中的光环
	static halo: BattleHalo;
	// 每日任务数据
	static task: TaskData;


	static gm: GMData;

	constructor() {
		let datas = {
			type: "LoadType",
			state: 0,
		}
		Game.proto.logUpload(datas);
		// Laya.Stat.show();
		Game.gameStatus = GameStatus.Load;
		Game.initOverForLoad = false;
		Game.isShowLoadUI = true;
		Laya.init(1280, 720);
		// 是否开启多点触控
		Laya.MouseManager.multiTouchEnabled = false;

		Laya.stage.scaleMode = Laya.Browser.onMobile ? Laya.Stage.SCALE_FIXED_AUTO : Laya.Stage.SCALE_SHOWALL;

		if (window && window.navigator && window.navigator.userAgent) {
			var agent = window.navigator.userAgent;
			Game.isIOS = agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1;
			Game.isAndroid = (agent.indexOf("Android") > -1);
			Game.isMobile = Game.isIOS || Game.isAndroid;
		}
		EventManager.once(ProtoEvent.CONFIG_CALL_BACK, this, this.configGet);
		EventManager.once(ProtoEvent.LOGIN_CALL_BACK, this, this.checkInviteInf);
		EventManager.on(ProtoEvent.FRIEDNPATROL_CALL_BACK, this, this.openHome);
		Game.install();
		LoaderManager.loadCSV();
		LoaderManager.init();
		SystemManager.init();
		TimerManager.init();
		GameInstaller.install();
	}

	static onInstallComplete() {
		this._showLog = window['__wxConfig'].envVersion == undefined;
		LoadFilesList.allResList;
		this.menu.open(MenuId.Load);
		this.loadSKOver();
	}
	private onInstallLoadRes(): void {
		EventManager.event(EventKey.SHOW_UI_WAIT);
		EventManager.once(EventKey.LOADER_OVER, this, this.startFight);
		LoaderManager.resetShowLoad();
		let _list: Array<string> = [];
		_list.push("res_sk/hero_25.sk");
		_list.push("res_sk/hero_30.sk");
		_list.push("res_sk/hero_5.sk");
		_list.push("res_sk/hero_9.sk");
		_list.push("res_sk/enemy_2.sk");
		_list.push("res_font/num_battle_1.fnt");
		_list.push("res_font/num_battle_2.fnt");
		_list.push("res_font/num_battle_3.fnt");
		_list = _list.concat(LoadFilesList.res_npc_ResList);
		// _list = _list.concat(LoadFilesList.res_effect_effect_ResList);
		LoaderManager.addList(_list);
	}
	private onInstallLoadRes2(menuid: MenuId): void {
		EventManager.once(EventKey.LOADER_OVER, this, this.openMenu, [menuid]);
		LoaderManager.resetShowLoad();
		let _list: Array<string> = [];
		_list.push("res_font/num_battle_1.fnt");
		_list.push("res_font/num_battle_2.fnt");
		_list.push("res_font/num_battle_3.fnt");
		_list = _list.concat(LoadFilesList.res_npc_ResList);
		// _list = _list.concat(LoadFilesList.res_effect_effect_ResList);
		LoaderManager.addList(_list);
	}
	private openMenu(menuid: MenuId): void {
		Game.initOverForLoad = true;
		Game.menu.open(menuid);
	}
	static loadSKOver(): void {
		Game.gameStatus = GameStatus.Gaming;
		Game.sound.install();
		Game.sound.autoStopMusic = false;
		Game.proto.reqConfig();
	}
	private configGet(): void {
		ShareManager.init();
		// 配置表加载完毕，登录
		SystemManager.login();
	}
	private checkInviteInf(): void {
		Game._showLog = Game.userData.openid == "o1eJ45IN8ef_1EEZZ_llpoiPyUuk";
		if (Game.userData.inviter) {
			Game.menu.open(MenuId.Authorization, 0);
		}
		else {
			this.openHome();
		}
	}
	private openHome(): void {
		EventManager.off(ProtoEvent.FRIEDNPATROL_CALL_BACK, this, this.openHome);
		let datas = {
			type: "LoadType",
			state: 1,
		}
		Game.proto.logUpload(datas);

		SystemManager.initAllData();
		if (Game.battleMap.maxMapId >= 3) {
			if (Game.playData.guideIndex < GuideType.sevenStartFive) {
				Game.playData.guideIndex = GuideType.sevenStartFive;
			}
			this.onInstallLoadRes2(MenuId.Home);
		}
		else {
			if (Game.playData.guideIndex == GuideType.None && Game.battleMap.maxMapId > 1) {
				if (Game.battleMap.maxMapId >= 3 && Game.playData.guideIndex < GuideType.sevenStartFive) {
					Game.playData.guideIndex = GuideType.sevenStartFive;
				}
				// 登录成功，打开主界面
				this.onInstallLoadRes2(MenuId.Home);
			}
			else {
				if (Game.playData.guideIndex < GuideType.Win) {
					EventManager.event(EventKey.SHOW_UI_WAIT);
					EventManager.once(ProtoEvent.SELECTWAVE_CALL_BACK, this, this.onInstallLoadRes);
					Game.battleData.fight_type = 0;
					Game.battleData.level_id = 1;
					let data = {
						waveId: Game.battleData.level_id,
						fightType: Game.battleData.fight_type,
					}
					Game.proto.selectWave(data);
				}
				else if (Game.playData.guideIndex < GuideType.SnythHeroOver) {
					Game.playData.guideIndex = GuideType.Win;
					this.onInstallLoadRes2(MenuId.Hero);
				}
				else if (Game.playData.guideIndex <= GuideType.fiveFight) {
					Game.playData.guideIndex = GuideType.SnythHeroOver;
					Game.battleData.curEnterFightType = 0;
					this.onInstallLoadRes2(MenuId.Arrange);
				}
				else if (Game.playData.guideIndex >= GuideType.fiveWin && Game.playData.guideIndex < GuideType.fiveUpLevelOver) {
					Game.playData.guideIndex = GuideType.fiveWin;
					Game.battleData.curEnterFightType = 0;
					this.onInstallLoadRes2(MenuId.Arrange);
				}
				else {
					if (Game.playData.guideIndex < GuideType.fiveWin) {
						Game.playData.guideIndex = GuideType.fettersOver;
					}
					else if (Game.playData.guideIndex < GuideType.sixWin) {
						Game.playData.guideIndex = GuideType.fiveUpLevelOver;
					}
					else if (Game.playData.guideIndex < GuideType.sevenStartFive) {
						Game.playData.guideIndex = GuideType.sixWin;
					}
					// 登录成功，打开主界面
					this.onInstallLoadRes2(MenuId.Home);
				}
			}
		}
	}
	private startFight(): void {
		Game.initOverForLoad = true;
		if (Game.playData.guideIndex < GuideType.StartFight) {
			Game.playData.guideIndex = GuideType.lookSceneOver;
		}
		else if (Game.playData.guideIndex < GuideType.Win) {
			Game.playData.guideIndex = GuideType.StartFight;
		}
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		Game.battleData.trial_level = 0;
		Game.battleData.curEnterFightType = 0;
		Game.menu.open(MenuId.Battle);
	}

	static install(): void {
		Game.configs = ServerCSVConfig.Instance;
		Game.total = SystemToastMessag.Instance;
		Game.tipWin = SystemTipWin.Instance;
		Game.rewardWin = SystemRewardWin.Instance;
		Game.popup = SystemPopup.Instance;
		Game.battleMap = BattleMap.Instance;
		Game.battleData = BattleData.Instance;
		Game.battleScene = BattleScene.Instance;
		Game.localStorage = GameLocalStorage.Instance;
		Game.playData = PlayerData.Instance;
		Game.userData = UserData.Instance;
		Game.waveData = WaveData.Instance;
		Game.tick = TickManager.Instance;
		Game.gm = GMData.Instance;
		Game.halo = BattleHalo.Instance;
		Game.redTip = SystemRedTip.Instance;
		Game.redData = RedTipData.Instance;
		Game.writeEff = TypeWriteData.Instance;
		Game.tipTxt = TipTextInfo.Instance;
		Game.task = TaskData.Instance;
	}

	static haveHeroTem = [2];
	static haveEnemyTem = [3];

	static ScreenSetting: ScreenSettingConfig = new ScreenSettingConfig();
	// 屏幕自适应
	public static autoScreenSize(content: fairygui.GObject, alignH?: string, alignV?: string) {
		let rate = this.ScreenSetting.screenScaleExpand;

		content.width = content.sourceWidth * rate;
		content.height = content.sourceHeight * rate;
		if (alignH) {
			let parent = fairygui.GRoot.inst;

			switch (alignH) {
				case Laya.Stage.ALIGN_LEFT:
					content.x = 0;
					break;
				case Laya.Stage.ALIGN_CENTER:
					content.x = (parent.width - content.width) * 0.5;
					break;
				case Laya.Stage.ALIGN_RIGHT:
					content.x = parent.width - content.width;
					break;
			}

			switch (alignV) {
				case Laya.Stage.ALIGN_TOP:
					content.y = 0;
					break;
				case Laya.Stage.ALIGN_MIDDLE:
					content.y = (parent.height - content.height) * 0.5;
					break;
				case Laya.Stage.ALIGN_BOTTOM:
					content.y = parent.height - content.height;
					break;
			}
		}
	}

	private static _showLog: boolean = false;
	static get showLog() {
		return this._showLog;
	}

}
window["Game"] = Game;