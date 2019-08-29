import { MenuLayerType } from "./DataEnums/MenuLayerType";
import Dictionary from "../Tool/Dictionary";

// 层级管理器
export default class MenuLayer {
    // 根容器
    static root: fairygui.GRoot;

    // 默认背景
    static homeTop: fairygui.GRoot;

    // 主界面
    static home: fairygui.GRoot;

    // 模块
    static module: fairygui.GRoot;

    // 主UI
    static mainUI: fairygui.GRoot;

    // 对话框
    static dialog: fairygui.GRoot;

    // 引导
    static guide: fairygui.GRoot;

    // 加载面板
    static loader: fairygui.GRoot;

    // 浮动对话框
    static floatMsg: fairygui.GRoot;

    // 字典
    static dict: Dictionary<MenuLayerType, fairygui.GRoot> = new Dictionary<MenuLayerType, fairygui.GRoot>();


    // 初始化
    static install() {
        // 根容器
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        MenuLayer.root = fairygui.GRoot.inst;


        MenuLayer.home = MenuLayer.createLayer("MenuLayer-home");
        MenuLayer.homeTop = MenuLayer.createLayer("MenuLayer-homeTop");
        MenuLayer.module = MenuLayer.createLayer("MenuLayer-module");
        MenuLayer.mainUI = MenuLayer.createLayer("MenuLayer-mainUI");
        MenuLayer.dialog = MenuLayer.createLayer("MenuLayer-dialog");
        MenuLayer.guide = MenuLayer.createLayer("MenuLayer-guide");
        MenuLayer.loader = MenuLayer.createLayer("MenuLayer-loader");
        MenuLayer.floatMsg = MenuLayer.createLayer("MenuLayer-floatMsg");
        MenuLayer.floatMsg.sortingOrder = 1000;
        MenuLayer.dict.add(MenuLayerType.Home, MenuLayer.home);
        MenuLayer.dict.add(MenuLayerType.HomeTop, MenuLayer.homeTop);
        MenuLayer.dict.add(MenuLayerType.Module, MenuLayer.module);
        MenuLayer.dict.add(MenuLayerType.MainUI, MenuLayer.mainUI);
        MenuLayer.dict.add(MenuLayerType.Dialog, MenuLayer.dialog);
        MenuLayer.dict.add(MenuLayerType.Guide, MenuLayer.guide);
        MenuLayer.dict.add(MenuLayerType.Loader, MenuLayer.loader);
        MenuLayer.dict.add(MenuLayerType.FloatMsg, MenuLayer.floatMsg);
    }

    static getLayer(layerType: MenuLayerType): fairygui.GRoot {
        return MenuLayer.dict.getValue(layerType);
    }
    private static visDict: Dictionary<MenuLayerType, boolean> = new Dictionary<MenuLayerType, boolean>();
    static showHideLayer(layerType: MenuLayerType, show: boolean): void {
        let preShow = MenuLayer.visDict.hasKey(layerType) ? MenuLayer.visDict.getValue(layerType) : true;
        if (preShow != show) {
            MenuLayer.dict.getValue(layerType).visible = show;
            MenuLayer.visDict.set(layerType, show);
        }
    }

    private static createLayer(name?: string): fairygui.GRoot {
        let root = MenuLayer.root;
        let v = new fairygui.GRoot();
        if (name) {
            v.name = name;
        }
        v.setSize(root.width, root.height);
        root.addChild(v);
        return v;
    }
}