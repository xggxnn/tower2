import fui_HeroItem2 from "../../Generates/Illustration/fui_HeroItem2";
import IllustrationWin from "../../../gamemodule/Windows/IllustrationWin";
import Game from "../../../Game";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import HeroqualityInfo from "../../../csvInfo/HeroqualityInfo";
import SpriteKey from "../../SpriteKey";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroItem2 extends fui_HeroItem2 {

	moduleWindow: IllustrationWin;

	public static DependPackages: string[] = ["Illustration"];

	public static createInstance(): UI_HeroItem2 {
		return <UI_HeroItem2>(fui_HeroItem2.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroItem2.URL, UI_HeroItem2);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.onClick(this, this.checkClick);
	}

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
	private heroInf: HeroInfoData = null;
	public setData(id: string, Clips: number, moduleWindow: IllustrationWin, index: number): void {
		this.moduleWindow = moduleWindow;
		this.heroInf = HeroInfoData.getInfo(id);
		this.m_quality.icon = SpriteKey.getUrl("quality" + this.heroInf.quality + ".png");
		this.m_buyNum.setVar("count", Clips.toString()).flushVars();
		this.m_pic.icon = SpriteKey.getUrl("hero_" + this.heroInf.skin + ".png");
		let heroQuality = HeroqualityInfo.getInfoQuality(this.heroInf.quality);
		let upClips = 1;
		if (heroQuality) {
			upClips = heroQuality.clip_hero;
		}
		if (Game.playData.curHeroInfoList.hasKey(this.heroInf.id)) {
			this.m_have.setSelectedIndex(0);
			if (this.heroInf.quality < 5 && upClips <= Clips) {
				Game.redTip.showRedTip(this, this.id);
			}
			else {
				Game.redTip.hideRedTip(this, this.id);
			}
		}
		else {
			this.m_have.setSelectedIndex(1);
			if (Clips >= upClips) {
				Game.redTip.showRedTip(this, this.id);
				if (Game.playData.guideIndex == GuideType.ShowHeroListOver) {
					Game.playData.guideIndex = GuideType.showHeroItem;
					EventManager.event(EventKey.SHOW_WAIT);
					setTimeout(() => {
						let poss = this.localToGlobalRect(0, 0, this.width, this.height);
						let yy = Game.scenes.y >= 0 ? 0 : Game.scenes.y * -1;
						let curPos = index % 6;
						curPos *= (150 + 15);
						curPos += this.parent.x;
						this.moduleWindow.createGuideUI(this, new Laya.Point(curPos, poss.y + yy),
							Laya.Handler.create(this, this.checkClick), Game.tipTxt.Guid3, LocationType.Lower);
					}, 100);
				}
			}
			else {
				Game.redTip.hideRedTip(this, this.id);
			}
		}
	}
	private checkClick(): void {
		if (this.heroInf != null) {
			Game.battleData.clickHeroInf = this.heroInf;
			Game.battleData.isShowGainBtn = true;
			this.moduleWindow.createHeroInfoUI();
		}
	}

}
UI_HeroItem2.bind();
