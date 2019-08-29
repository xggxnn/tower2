import FGUIResPackageConfig from "./FGUIResPackageConfig";
export default class LoadFgui {
    static install() {

        FGUIResPackageConfig.install();

        // 设置fgui文件后缀
        fairygui.UIConfig.packageFileExtension = "bin";
    }
}