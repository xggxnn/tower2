import ResPackageConfig from "./ResPackageConfig";
import Dictionary from "../Tool/Dictionary";

// 此文件不要修改，会被覆盖
export default class FGUIResPackageConfig {

    static dict: Dictionary<string, ResPackageConfig> = new Dictionary<string, ResPackageConfig>();
    // 添加配置
    static addconfig(config: ResPackageConfig) {
        this.dict.add(config.packageName, config);
    }

    // 获取配置
    static getconfig(packageName: string) {
        return this.dict.getValue(packageName);
    }

    static install() {

        let config: ResPackageConfig;



        config = new ResPackageConfig();
        config.packageName = "Arrangement";
        config.resDir = "fgui";
        config.resBin = "Arrangement.bin";
        config.resAtlas.push("Arrangement_atlas0.png");
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "Bag";
        config.resDir = "fgui";
        config.resBin = "Bag.bin";
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "Battle";
        config.resDir = "fgui";
        config.resBin = "Battle.bin";
        config.resAtlas.push("Battle_atlas0.png");
        config.resAtlas.push("Battle_atlas0_1.png");
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "FSprite";
        config.resDir = "fgui";
        config.resBin = "FSprite.bin";
        config.resAtlas.push("FSprite_atlas0.png");
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "GM";
        config.resDir = "fgui";
        config.resBin = "GM.bin";
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "Home";
        config.resDir = "fgui";
        config.resBin = "Home.bin";
        config.resAtlas.push("Home_atlas0.png");
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "Menus";
        config.resDir = "fgui";
        config.resBin = "Menus.bin";
        config.resAtlas.push("Menus_atlas0.png");
        config.resAtlas.push("Menus_atlas0_1.png");
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "Sound";
        config.resDir = "fgui";
        config.resBin = "Sound.bin";
        config.resSounds.push("Sound_jx3y1.mp3");
        config.resSounds.push("Sound_q0800.mp3");
        this.addconfig(config);


        config = new ResPackageConfig();
        config.packageName = "System";
        config.resDir = "fgui";
        config.resBin = "System.bin";
        config.resAtlas.push("System_atlas0.png");
        this.addconfig(config);
    }
}
