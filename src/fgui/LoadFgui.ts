import FGUIResPackageConfig from "./FGUIResPackageConfig";
import SoundKey from "./SoundKey";
export default class LoadFgui {
    static install() {

        FGUIResPackageConfig.install();

        // 设置fgui文件后缀
        fairygui.UIConfig.packageFileExtension = "bin";
    }
}