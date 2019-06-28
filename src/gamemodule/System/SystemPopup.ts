import UI_PopupMenu from "../../fgui/Extend/System/UI_PopupMenu";

export default class SystemPopup {

    private static _Instance: SystemPopup;
    static get Instance(): SystemPopup {
        if (!SystemPopup._Instance) {
            SystemPopup._Instance = new SystemPopup();
        }
        return SystemPopup._Instance;
    }

    private _popupMenu: UI_PopupMenu = null;

    /**
     * 显示popup弹出提示
     * @param button 点击哪个按钮
     * @param showInBtnPos 是否在按钮位置弹出popup，true表示在按钮位置，false表示在鼠标点击的位置弹出
     * @param arg 数据，待定
     */
    showPopup(button: fairygui.GObject, showInBtnPos: boolean = true, ...arg: any[]): void {
        if (this._popupMenu == null) {
            this._popupMenu = UI_PopupMenu.createInstance();
        }
        this._popupMenu.showPopup(button, showInBtnPos, arg);
    }
}