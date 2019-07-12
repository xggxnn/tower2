import fui_HeroInfo from "../../Generates/Home/fui_HeroInfo";
import HomeWin from "../../../gamemodule/Windows/HomeWin";
import Game from "../../../Game";
import EventManager from "../../../Tool/EventManager";
import ProtoEvent from "../../../protobuf/ProtoEvent";
import HeroInfo from "../../../dataInfo/HeroInfo";
import Fun from "../../../Tool/Fun";
import FiveElementsInfo from "../../../dataInfo/FiveElementsInfo";
import SpriteKey from "../../SpriteKey";
import EventKey from "../../../Tool/EventKey";
import FWindow from "../../../gamemodule/FWindow";

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
		this.m_gainmethod.onClick(this, this.clickGain);
		this.m_gainmethod.title = "临时合成";
	}
	private clickGain(): void {
		if (Game.playData.curHero.indexOf(this.heroInf.id) == -1) {
			if (Game.playData.curClips.getValue(this.heroInf.id) >= 10) {
				// 英雄合成
				EventManager.event(EventKey.SHOW_UI_WAIT);
				let data = {
					heroId: this.heroInf.id,
				}
				Game.proto.synthetise(data);
			}
			else {
				Game.tipWin.showTip("碎片数量不足，无法合成");
			}
		}
		else {
			Game.tipWin.showTip("你已拥有此英雄，无需再次合成", Laya.Handler.create(this, this.closeUI));
		}
	}
	private synthetiseOver(): void {
		EventManager.event(EventKey.CLOSE_UI_WAIT);
		this.closeUI();
	}
	private heroInf: HeroInfo = null;
	setData(): void {
		this.heroInf = Game.battleData.clickHeroInf;
		if (this.heroInf != null) {
			this.m_heroname.text = this.heroInf.name;
			this.m_race.text = Fun.format("五行：{0}", FiveElementsInfo.getInfoWithType(this.heroInf.race).name);
			this.m_career.text = Fun.format("门派：{0}", FiveElementsInfo.getInfoWithType(this.heroInf.career).name);
			this.m_icons.icon = SpriteKey.getUrl("icon" + this.heroInf.id + ".png");
		}
		else {
			console.log("未发现英雄信息");
			this.closeUI();
		}
	}
	public setWin(fwindow: FWindow, isbag: boolean = false) {
		this.fwindow = fwindow;
		this.m_gainmethod.visible = isbag;
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
		this.setData();
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(ProtoEvent.SYNTHETISE_CALL_BACK, this, this.synthetiseOver);
		Game.battleData.clickHeroInf = null;
		this.heroInf = null;
		this.fwindow = null;
	}


}
UI_HeroInfo.bind();
