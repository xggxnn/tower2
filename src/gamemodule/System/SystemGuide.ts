import Handler = Laya.Handler;
import UI_GuideLayer from "../../fgui/Extend/System/UI_GuideLayer";

export default class SystemGuide {

    private static _Instance: SystemGuide;
    static get Instance(): SystemGuide {
        if (!SystemGuide._Instance) {
            SystemGuide._Instance = new SystemGuide();
        }
        return SystemGuide._Instance;
    }

    private _guideLayer: UI_GuideLayer = null;
    showGuide(target: fairygui.GObject, onComplete: Handler) {
        if (this._guideLayer == null) {
            this._guideLayer = UI_GuideLayer.createInstance();
        }
        this._guideLayer.showGuide(target, onComplete);
    }
    hideGuide() {
        if (this._guideLayer != null) {
            this._guideLayer.hideGuide();
        }
    }
}