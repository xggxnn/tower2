import { LocationType } from "../DataEnums/LocationType";
import Dictionary from "../../tool/Dictionary";
import UI_RedTips from "../../fgui/Extend/System/UI_RedTips";
import Pools from "../../tool/Pools";

export default class SystemRedTip {

    private static _Instance: SystemRedTip;
    static get Instance(): SystemRedTip {
        if (!SystemRedTip._Instance) {
            SystemRedTip._Instance = new SystemRedTip();
        }
        return SystemRedTip._Instance;
    }

    private redDic: Dictionary<string, UI_RedTips> = new Dictionary<string, UI_RedTips>();
    private pools: UI_RedTips[] = [];

    /**
     * @param target 哪个UI
     * @param parentId 父节点id
     * @param location 具体位置 枚举 LocationType
     */
    showRedTip(target: fairygui.GObject, parentId: string = "", location: LocationType = LocationType.RightUpper) {
        let item: UI_RedTips;
        let key = target.id + parentId;
        if (!this.redDic.hasKey(key)) {
            if (this.pools.length > 0) {
                item = this.pools.pop();
            }
            else {
                item = Pools.fetch(UI_RedTips);
            }
            this.redDic.add(key, item);
        }
        else {
            item = this.redDic.getValue(key);
            return;
        }
        if (!item) return;
        (target as fairygui.GRoot).addChild(item);
        let rect = target.localToGlobalRect(-50, -50, target.width / target.scaleX, target.height / target.scaleY);
        item.setScale(1 / target.scaleX, 1 / target.scaleY);
        switch (location) {
            case LocationType.Center:
                item.setXY(rect.width / 2, rect.height / 2);
                break;
            case LocationType.LeftUpper:
                item.setXY(0, 0);
                break;
            case LocationType.RightUpper:
                item.setXY(rect.width - 10, 10);
                break;
            case LocationType.LeftLower:
                item.setXY(0, rect.height);
                break;
            case LocationType.RightLower:
                item.setXY(rect.width, rect.height);
                break;
            case LocationType.Upper:
                item.setXY(rect.width / 2, 0);
                break;
            case LocationType.Lower:
                item.setXY(rect.width / 2, rect.height);
                break;
            case LocationType.Left:
                item.setXY(0, rect.height / 2);
                break;
            case LocationType.Right:
                item.setXY(rect.width, rect.height / 2);
                break;
        }
    }
    hideRedTip(target: fairygui.GObject, parentId: string = "") {
        let key = target.id + parentId;
        let item = this.redDic.getValue(key);
        if (item != null) {
            item.removeFromParent();
            this.pools.push(item);
            this.redDic.remove(key);
        }
    }
}