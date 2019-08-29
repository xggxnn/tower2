import EventManager from "../tool/EventManager";
import EventKey from "../Tool/EventKey";
import ColormatrixInfo from "../csvInfo/ColormatrixInfo";

export default class BaseFilter extends Laya.Sprite {
	constructor() {
		super();
	}
	public onEnable(): void {
		// this.filters = [new Laya.ColorFilter(ColormatrixInfo.getMatrix(4))];
		EventManager.on(EventKey.ENTER_FRAME, this, this.updateFilter);
	}
	public onDisable(): void {
		EventManager.offAllCaller(this);
	}
	public updateFilter(): void {
		let _length = this.filterList.length;
		if (_length) {
			for (let i = this.filterList.length - 1; i >= 0; i--) {
				var obj = this.filterList[i];
				if (obj.hasOwnProperty("frame")) {
					obj.frame--;
					if (obj.frame <= 0) {
						this.filterList.splice(i, 1);
					}
				}
			}
			_length = this.filterList.length;
			var cf: Laya.ColorFilter;
			if (_length) {
				var id = this.filterList[_length - 1].id;
				cf = new Laya.ColorFilter(ColormatrixInfo.getMatrix(id));
			} else {
				cf = new Laya.ColorFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
			}
			this.filters = [cf];
		}
	}

	public clearFilters(): void {
		this.clearFilter();
		this.filters = [new Laya.ColorFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0])];
	}

	private filterList = [];

	public addTimerFilter(id: string, frame: number): void {
		this.removeFilter(id);
		this.filterList.push({ "id": id, "frame": frame });
	}
	public addFilter(id: string): void {
		this.removeFilter(id);
		this.filterList.push({ "id": id });
	}
	public removeFilter(id: string): void {
		for (let i = this.filterList.length - 1; i >= 0; i--) {
			var obj = this.filterList[i];
			if (obj.id == id) {
				this.filterList.splice(i, 1);
				break;
			}
		}
	}
	public clearFilter(): void {
		this.filterList = [];
	}
}