import LoadFgui from "./fgui/LoadFgui";
import GamePreload from "./fgui/GamePreload";
import Game from "./Game";
import MenuWindows from "./gamemodule/MenuWindows";
import MenuLayer from "./gamemodule/MenuLayer";
import SoundKey from "./fgui/SoundKey";

export default class GameInstaller {
	static install() {
		if (Laya.stage.width < 1280) {
			Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
			Laya.stage.setScreenSize(Laya.stage.width, Laya.stage.height);
		}
		this.installSystem();
	}

	static installSystem() {
		// 初始化UI窗口配置
		MenuWindows.install();

		// 加载配置文件

		// 加载声音
		// 设置按钮声音
		fairygui.UIConfig.buttonSound = SoundKey.getUrl(SoundKey.click);
		fairygui.UIConfig.popupMenu = "ui://System/PopupMenu";

		// 加载fgui组件
		LoadFgui.install();
		GamePreload.begin(this, this.onLoadRes);
	}

	private static onLoadRes() {
		console.log("load over");
		let _scene: laya.display.Sprite = fairygui.GRoot.inst.displayObject;
		_scene.x = (Laya.stage.width - 1280) * 0.5;
		_scene.y = (Laya.stage.height - 960) * 0.5;
		Laya.stage.addChild(_scene);
		Game.scenes = new Laya.Point(_scene.x, _scene.y);
		Game.scenesWH = new Laya.Point(_scene.width, _scene.height);
		MenuLayer.install();
		Game.onInstallComplete();

	}
}