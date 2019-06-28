import { MenuId } from "./MenuId";

export default class ModuleConfig {
	menuId: MenuId;
	windowClass: any;
	constructor(menuId: MenuId, windowClass: any) {
		this.menuId = menuId;
		this.windowClass = windowClass;
	}
}