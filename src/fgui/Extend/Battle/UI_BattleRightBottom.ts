import fui_BattleRightBottom from "../../Generates/Battle/fui_BattleRightBottom";
import BattleWin from "../../../gamemodule/Windows/BattleWin";
import Game from "../../../Game";
import EventManager from "../../../tool/EventManager";
import EventKey from "../../../tool/EventKey";
import UI_SkillBtn from "./UI_SkillBtn";
import UI_AddSpeedBtn from "./UI_AddSpeedBtn";
import PlayerSkillInfo from "../../../csvInfo/PlayerSkillInfo";
import SpriteKey from "../../SpriteKey";
import { LocationType } from "../../../gamemodule/DataEnums/LocationType";
import { GameStatus } from "../../../gamemodule/DataEnums/GameStatus";
import { GuideType } from "../../../gamemodule/DataEnums/GuideType";
import UI_EnemyItem from "./UI_EnemyItem";
import Dictionary from "../../../tool/Dictionary";
import BattleMapEnemy from "../../../gamemodule/DataStructs/BattleMapEnemy";

/** 此文件自动生成，可以直接修改，后续不会覆盖 **/
export default class UI_BattleRightBottom extends fui_BattleRightBottom {

	moduleWindow: BattleWin;

	public static DependPackages: string[] = ["Battle"];

	public static createInstance(): UI_BattleRightBottom {
		return <UI_BattleRightBottom>(fui_BattleRightBottom.createInstance());
	}
	public static bind(): void {
		fairygui.UIObjectFactory.setPackageItemExtension(UI_BattleRightBottom.URL, UI_BattleRightBottom);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		// 此处可以引入初始化信息，比如初始化按钮点击，相当于awake()
		// ToDo
		this.m_enemyList.itemRenderer = Laya.Handler.create(this, this.initItem, null, false);

		this.addSpeedBtn = this.m_addSpeed as UI_AddSpeedBtn;
		this.addSpeedBtn.onClick(this, this.doubleSpeed);
		this.addSpeedBtn.m_changeStatus.setSelectedIndex(0);
		this.m_waveBtn.onClick(this, this.showHideList);
	}
	private addSpeedBtn: UI_AddSpeedBtn;

	private doubleSpeed(): void {
		if (Game.battleMap.maxMapId < 3) {
			Game.tipWin.showTip(Game.tipTxt.AddSpeedTip);
		}
		else {
			if (Game.playData.gameSpeed < 1.5) {
				Game.playData.gameSpeed = 2;
				this.addSpeedBtn.m_changeStatus.setSelectedIndex(1);
			}
			else if (Game.playData.gameSpeed > 1.5) {
				Game.playData.gameSpeed = 1;
				this.addSpeedBtn.m_changeStatus.setSelectedIndex(0);
			}
			EventManager.event(EventKey.CHANGESPEED);
		}
	}

	private mapSkillInf: PlayerSkillInfo = null;
	private mapSkillCD: number = 0;
	private mapSkillCDMax: number = 0;
	private setData(): void {
		if (Game.playData.gameSpeed < 1.5) {
			this.addSpeedBtn.m_changeStatus.setSelectedIndex(0);
		}
		else if (Game.playData.gameSpeed > 1.5) {
			this.addSpeedBtn.m_changeStatus.setSelectedIndex(1);
		}
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
		EventManager.on(EventKey.GAMESTART, this, this.setData);
		this.setData();
		this.clearThis();
		this.m_waveBtn.title = "";
		this.curSelect = 0;
		this.m_showHide.setSelectedIndex(0);
		Game.battleMap.sUpdateExitBattleMain.add(this.clearThis, this);
		Game.battleData.countdown.add(this.countdown, this);
	}
	// 关闭时调用，相当于disable
	onWindowHide(): void {
		EventManager.off(EventKey.GAMESTART, this, this.setData);
		Game.battleData.countdown.remove(this.countdown, this);
		Game.battleMap.sUpdateExitBattleMain.remove(this.clearThis, this);
		this.curSelect = 0;
		this.m_showHide.setSelectedIndex(0);
	}

	private enemySkDic: Dictionary<number, enemySkInf> = new Dictionary<number, enemySkInf>();
	private enemySkList: Array<enemySkInf> = [];
	private enemyNumb: number = 0;

	private initInf(): void {
		this.clearThis();
		let nums = 0;
		for (let i = 0, len = Game.battleMap.curBattleEnemyListNumber.length; i < len; i++) {
			let item: BattleMapEnemy = Game.battleMap.curBattleEnemyDic.getValue(Game.battleMap.curBattleEnemyListNumber[i]);
			if (!this.enemySkDic.hasKey(item.enemy.monsterInf.id)) {
				let eni: enemySkInf = new enemySkInf();
				eni.id = item.enemy.monsterInf.id;
				eni.skin = item.enemy.monsterInf.sk;
				eni.num = 1;
				this.enemySkDic.add(item.enemy.monsterInf.id, eni);
				nums++;
			}
			else {
				let val = this.enemySkDic.getValue(item.enemy.monsterInf.id);
				val.num++;
				nums++;
			}
		}
		this.m_waveBtn.title = "剩余敌人：" + nums;
		this.enemySkList = this.enemySkDic.getValues();
		this.m_enemyList.width = this.enemySkList.length * 50;
		this.m_enemyList.numItems = this.enemySkList.length;
		if (this.enemySkList.length <= 0) {
			this.curSelect = 0;
			this.m_showHide.setSelectedIndex(0);
		}
		this.enemyNumb = Game.battleMap.curBattleEnemyListNumber.length;
	}

	countdown(): void {
		// 初始化
		if (this.enemyNumb == 0 && Game.battleMap.curBattleEnemyListNumber.length > 0) {
			this.initInf();
			this.curSelect = 1;
			this.m_showHide.setSelectedIndex(1);
		}

		if (this.enemyNumb > Game.battleMap.curBattleEnemyListNumber.length) {
			this.initInf();
		}
	}

	private clearThis(): void {
		this.enemyNumb = 0;
		this.m_enemyList.numItems = 0;
		this.enemySkDic.clear();
	}

	// 渲染item 英雄列表的item
	private initItem(index: number, obj: fairygui.GObject): void {
		let item = obj as UI_EnemyItem;
		item.m_titles.text = "x" + this.enemySkList[index].num;
		item.m_icons.icon = SpriteKey.getUrl("enemy_" + this.enemySkList[index].skin + ".png");
	}
	private curSelect: number = 0;
	private showHideList(): void {
		if (this.enemySkList.length <= 0) {
			this.curSelect = 0;
			this.m_showHide.setSelectedIndex(0);
		}
		else {
			if (this.curSelect == 1) {
				this.curSelect = 0;
			}
			else {
				this.curSelect = 1;
			}
			this.m_showHide.setSelectedIndex(this.curSelect);
		}
	}

}
export class enemySkInf {
	public id: number = 0;
	public skin: number = 0;
	public num: number = 0;
}
UI_BattleRightBottom.bind();