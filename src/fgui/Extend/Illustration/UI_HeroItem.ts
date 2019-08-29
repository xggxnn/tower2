import fui_HeroItem from "../../Generates/Illustration/fui_HeroItem";
import IllustrationWin from "../../../gamemodule/Windows/IllustrationWin";
import HeroInfoData from "../../../gamemodule/DataStructs/HeroInfoData";
import SpriteKey from "../../SpriteKey";
import Game from "../../../Game";
import HeroqualityInfo from "../../../csvInfo/HeroqualityInfo";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_HeroItem extends fui_HeroItem {

	moduleWindow: IllustrationWin;

	public static DependPackages: string[] = ["Illustration"];

	public static createInstance(): UI_HeroItem {
		return <UI_HeroItem>(fui_HeroItem.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_HeroItem.URL, UI_HeroItem);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_checkBtn.onClick(this, this.checkClick);
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
		this.m_heroName.setVar("name", this.heroInf.name).flushVars();
		this.m_pic.icon = SpriteKey.getUrl("hero_" + this.heroInf.skin + ".png");
		let heroQuality = HeroqualityInfo.getInfoQuality(this.heroInf.quality);
		let upClips = 1;
		if (heroQuality) {
			upClips = heroQuality.clip_hero;
		}
		if (Game.playData.curHeroInfoList.hasKey(this.heroInf.id)) {
			this.m_have.setSelectedIndex(0);
			if (this.heroInf.quality < 5 && upClips <= Clips) {
				Game.redTip.showRedTip(this.m_checkBtn, this.id);
			}
			else {
				Game.redTip.hideRedTip(this.m_checkBtn, this.id);
			}
		}
		else {
			this.m_have.setSelectedIndex(1);
			if (Clips >= upClips) {
				Game.redTip.showRedTip(this.m_checkBtn, this.id);
				if (Game.playData.guideIndex == GuideType.ShowHeroListOver) {
					Game.playData.guideIndex = GuideType.showHeroItem;
					setTimeout(() => {
						let curPos = index % 3;
						curPos *= (245 + 40);
						this.moduleWindow.createGuideUI(this.m_checkBtn, new Laya.Point(this.parent.x + curPos + this.m_checkBtn.x, this.parent.y + this.m_checkBtn.y),
							Laya.Handler.create(this, this.checkClick), Game.tipTxt.Guid3, LocationType.Lower);
					}, 30);
				}
			}
			else {
				Game.redTip.hideRedTip(this.m_checkBtn, this.id);
			}
		}
		this.m_checkBtn.title = "查看";
	}
	private checkClick(): void {
		if (this.heroInf != null) {
			Game.battleData.clickHeroInf = this.heroInf;
			Game.battleData.isShowGainBtn = true;
			this.moduleWindow.createHeroInfoUI();
		}
	}
}
UI_HeroItem.bind();
