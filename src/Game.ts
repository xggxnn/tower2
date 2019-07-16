import GameInstaller from "./GameInstaller";
import { MenuId } from "./gamemodule/MenuId";
import MenuManager from "./gamemodule/MenuManager";
import GameTimeData from "./gamemodule/DataStructs/GameTimeData";
import ScreenSettingConfig from "./Tool/ScreenSettingConfig";
import TimerManager from "./Tool/TimerManager";
import SystemManager from "./Tool/SystemManager";
import LoaderManager from "./Tool/LoaderManager";
import { GameStatus } from "./gamemodule/DataEnums/GameStatus";
import AudioManager from "./gamemodule/Sound/AudioManager";
import GameLocalStorage from "./gamemodule/LocalStorage/GameLocalStorage";
import ProtoManager from "./protobuf/ProtoManager";
import SystemToastMessag from "./gamemodule/System/SystemToastMessag";
import SystemTipWin from "./gamemodule/System/SystemTipWin";
import SystemGuide from "./gamemodule/System/SystemGuide";
import SystemPopup from "./gamemodule/System/SystemPopup";
import BattleMap from "./gamemodule/DataStructs/BattleMap";
import BattleData from "./gamemodule/DataStructs/BattleData";
import BattleScene from "./gamemodule/Models/BattleScene";
import CSVConfig from "./dataInfo/CSVConfig";
import ServerCSVConfig from "./dataInfo/ServerCSVConfig";
import PlayerData from "./gamemodule/DataStructs/PlayerData";
import UserData from "./Tool/UserData";
import EventManager from "./Tool/EventManager";
import ProtoEvent from "./protobuf/ProtoEvent";
import WaveData from "./gamemodule/DataStructs/WaveData";
import TickManager from "./Tool/TickManager";
import GMData from "./gamemodule/DataStructs/GMData";

export default class Game {

	static isIOS: boolean;
	static isAndroid: boolean;
	static isMobile: boolean;
	// 屏幕宽高
	static scenes: Laya.Point;
	static scenesWH: Laya.Point;
	// 怪物生成的父节点
	static parentObject: laya.display.Sprite;
	// 血条父节点
	static bloodParent: fairygui.GRoot;

	// 生成sk的数量
	private static _creatNum: number = 0;
	public static get creatNum(): number {
		this._creatNum++;
		return this._creatNum;
	}
	public static set creatNum(v: number) {
		this._creatNum = v;
	}

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
	// 引导
	static guide: SystemGuide;
	// 弹出popup
	static popup: SystemPopup;
	static tick: TickManager;


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


	static gm: GMData;

	constructor() {
		Game.gameStatus = GameStatus.Load;
		Laya.init(1280, 720);
		// 是否开启多点触控
		Laya.MouseManager.multiTouchEnabled = false;

		Laya.stage.scaleMode = Laya.Browser.onMobile ? Laya.Stage.SCALE_FIXED_AUTO : Laya.Stage.SCALE_SHOWALL;

		if (window && window.navigator && window.navigator.userAgent) {
			var agent = window.navigator.userAgent;
			console.log(agent);
			Game.isIOS = agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1;
			Game.isAndroid = (agent.indexOf("Android") > -1);
			Game.isMobile = Game.isIOS || Game.isAndroid;
		}
		EventManager.once(ProtoEvent.LOGIN_CALL_BACK, this, this.openHome);
		Game.install();
		LoaderManager.init();
		GameInstaller.install();
		SystemManager.init();
		TimerManager.init();
	}

	static onInstallComplete() {
		Game.proto.reqConfig();
		Game.gameStatus = GameStatus.Gaming;
		Game.sound.install();
		Game.sound.autoStopMusic = false;
		CSVConfig.InitAll();
		Game.battleData.init();
		Game.battleScene.init();
		this.menu.open(MenuId.Load);
		// 资源加载完毕，登录
		SystemManager.login();
	}

	private openHome(): void {
		SystemManager.initAllData();
		// 登录完毕，打开主界面
		Game.menu.open(MenuId.Home);
	}

	static install(): void {
		Game.configs = ServerCSVConfig.Instance;
		Game.total = SystemToastMessag.Instance;
		Game.tipWin = SystemTipWin.Instance;
		Game.guide = SystemGuide.Instance;
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
	}

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
}
window["Game"] = Game;