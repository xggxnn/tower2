import Dictionary from "../tool/Dictionary";
import { MenuId } from "./MenuId";
import ModuleConfig from "./ModuleConfig";
import FWindow from "./FWindow";
import SystemWin from "./Windows/SystemWin";
import BattleWin from "./Windows/BattleWin";
import MenusWin from "./Windows/MenusWin";
import HomeWin from "./Windows/HomeWin";
import ArrangementWin from "./Windows/ArrangementWin";
import BagWin from "./Windows/BagWin";
import GMWin from "./Windows/GMWin";
import ShopWin from "./Windows/ShopWin";
import SurroundWin from "./Windows/SurroundWin";
import IllustrationWin from "./Windows/IllustrationWin";
import AuthorizationWin from "./Windows/AuthorizationWin";

export default class MenuWindows {
	static dict: Dictionary<MenuId, ModuleConfig> = new Dictionary<MenuId, ModuleConfig>();
	static get(menuid: MenuId): ModuleConfig {
		return MenuWindows.dict.getValue(menuid);
	}
	static add<T extends FWindow>(menuId: MenuId, windowClass: { new(): T }) {
		// 请在该地方配置menuId对应的 MWindow
		MenuWindows.dict.add(menuId, new ModuleConfig(menuId, windowClass));
	}

	static install() {
		MenuWindows.add(MenuId.Load, SystemWin);
		MenuWindows.add(MenuId.Home, HomeWin);
		MenuWindows.add(MenuId.Battle, BattleWin);
		MenuWindows.add(MenuId.Arrange, ArrangementWin);
		MenuWindows.add(MenuId.MenuSelect, MenusWin);
		MenuWindows.add(MenuId.Bag, BagWin);
		MenuWindows.add(MenuId.GM, GMWin);
		MenuWindows.add(MenuId.Shop, ShopWin);
		MenuWindows.add(MenuId.Active, SurroundWin);
		MenuWindows.add(MenuId.Hero, IllustrationWin);
		MenuWindows.add(MenuId.Authorization, AuthorizationWin);
	}
}