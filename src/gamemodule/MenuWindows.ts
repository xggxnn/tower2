import Dictionary from "../Tool/Dictionary";
import { MenuId } from "./MenuId";
import ModuleConfig from "./ModuleConfig";
import FWindow from "./FWindow";
import SystemWin from "./Windows/SystemWin";
import BagWin from "./Windows/BagWin";
import BattleWin from "./Windows/BattleWin";
import MenusWin from "./Windows/MenusWin";

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
		// MenuWindows.add(MenuId.Home, MainUIWindow);
		MenuWindows.add(MenuId.Load, SystemWin);
		MenuWindows.add(MenuId.Bag, BagWin);
		MenuWindows.add(MenuId.Battle, BattleWin);
		MenuWindows.add(MenuId.MenuSelect, MenusWin);
	}
}