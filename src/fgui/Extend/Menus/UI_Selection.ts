import fui_Selection from "../../Generates/Menus/fui_Selection";
import MenusWin from "../../../gamemodule/Windows/MenusWin";
import UI_selectionBtn from "./UI_selectionBtn";
import Game from "../../../Game";
import Fun from "../../../Tool/Fun";
import WaveStatus from "../../../gamemodule/DataStructs/WaveStatus";
import WaveInfo from "../../../csvInfo/WaveInfo";
import WaveformInfo from "../../../csvInfo/WaveformInfo";
import WaveRewardInfo from "../../../csvInfo/WaveRewardInfo";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";

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
	private updateTime(cd: number): void {
		this.m_time.text = Fun.formatTime(cd);
		if (cd <= 0) {
			if (this.item) {
				this.item.sUpdateExploreTime.remove(this.updateTime, this);
			}
		}
	}
	private selectionBtn: UI_selectionBtn;
	private item: WaveStatus = null;
	private wave: WaveInfo = null;
	public setData(wave: WaveInfo, moduleWindow: MenusWin): void {
		this.moduleWindow = moduleWindow;
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
		this.selectionBtn.setData(mapLevel.map, mapLevel.level, haveBoss);
		this.item = null;
		if (Game.battleMap.waveStatusDict.hasKey(this.wave.id)) {
			this.item = Game.battleMap.waveStatusDict.getValue(this.wave.id);
			if (this.item.level < 11) {
				this.m_status.setSelectedIndex(2);
				this.m_progress.text = Fun.format("{0} %", Math.floor((this.item.level - 1) / 10 * 100));
				let rewardInf = WaveRewardInfo.getInfo(this.wave.id);
				this.m_gain.text = Fun.formatNumberUnit(rewardInf.coin_challenge) + "金币";
				if (this.item.fightCd > 0) {
					this.item.sUpdateFightCd.add(this.showFightCd, this);
					Game.redTip.hideRedTip(this, this.parent.id);
				}
				else {
					Game.redTip.showRedTip(this, this.parent.id);
				}
			}
			else {
				this.updateTime(this.item.exploreTime);
				this.item.sUpdateExploreTime.add(this.updateTime, this);
				this.m_progress.text = Fun.format("{0} %", "100");
				Game.redTip.hideRedTip(this, this.parent.id);
				this.m_status.setSelectedIndex(3);
			}
			this.m_selBtn.enabled = true;
		}
		else {
			Game.redTip.hideRedTip(this, this.parent.id);
			if (Game.battleMap.maxMapId == this.wave.id) {
				this.m_status.setSelectedIndex(1);
				this.m_selBtn.enabled = true;
			}
			else {
				this.m_status.setSelectedIndex(0);
				this.m_selBtn.enabled = false;
			}
		}
		if ((this.wave.id == 2 && Game.playData.guideIndex == GuideType.fiveEnterMenus) || (this.wave.id == 3 && Game.playData.guideIndex == GuideType.sixEnterMenus)) {
			Game.playData.guideIndex++;
			this.moduleWindow.createGuideUI(this.m_selBtn, new Laya.Point(this.x, this.y),
				Laya.Handler.create(this, this.clickBtn), Game.tipTxt.fiveSelectWave);
		}
		if (this.wave.id == 2 && (Game.playData.guideIndex == GuideType.sevenEnterMenus || Game.playData.guideIndex == GuideType.sixWin)) {
			Game.playData.guideIndex = GuideType.sevenSelectWave;
			this.moduleWindow.createGuideUI(this.m_selBtn, new Laya.Point(this.x, this.y),
				Laya.Handler.create(this, this.clickBtn), Game.tipTxt.fiveSelectWave);
		}
	}

	private showFightCd(cd: number): void {
		if (cd <= 0) {
			Game.redTip.showRedTip(this, this.parent.id);
			if (this.item) {
				this.item.sUpdateFightCd.remove(this.showFightCd, this);
			}
		}
	}

	private clickBtn(): void {
		Game.battleData.level_id = this.wave.id;
		if (this.item && this.item.level > 10) {
			if (this.item.exploreTime <= 0) {
				Game.tipWin.showTip(Game.tipTxt.CollectingRewards, true, Laya.Handler.create(this, this.collectDebris));
			}
			else {
				Game.tipWin.showTip(Fun.format(Game.tipTxt.DebrisCollection, Fun.formatTime(this.item.exploreTime)));
			}
		}
		else {
			this.moduleWindow.createTrialUI();
		}
	}
	/**
	 * 收集碎片
	 */
	private collectDebris(): void {
		let data = {
			waveId: this.item.id,
		}
		Game.proto.collectDebris(data);
	}

}
UI_Selection.bind();