import Dictionary from "../Tool/Dictionary";
import DifficultyEfficiencyInfo from "./DifficultyEfficiencyInfo";
import HeroInfo from "./HeroInfo";
import HeroTypeInfo from "./HeroTypeInfo";
import MonsterInfo from "./MonsterInfo";
import SkillInfo from "./SkillInfo";
import WaveformInfo from "./WaveformInfo";
import WaveInfo from "./WaveInfo";

export default class ServerCSVConfig {
    private static _Instance: ServerCSVConfig;
    static get Instance(): ServerCSVConfig {
        if (!ServerCSVConfig._Instance) {
            ServerCSVConfig._Instance = new ServerCSVConfig();
        }
        return ServerCSVConfig._Instance;
    }

    private csvKeyDic: Dictionary<string, string> = new Dictionary<string, string>();
    private infDic: Dictionary<string, Dictionary<string, Dictionary<string, string>>> = new Dictionary<string, Dictionary<string, Dictionary<string, string>>>();

    public setCSVInit(json: any): void {

        for (var key in json) {
            if (!this.csvKeyDic.hasKey(key)) {
                this.csvKeyDic.add(key, key);
            }
            let inf = json[key];
            if (!this.infDic.hasKey(key)) {
                this.infDic.add(key, new Dictionary<string, Dictionary<string, string>>());
            }
            let infval: Dictionary<string, Dictionary<string, string>> = this.infDic.getValue(key);
            for (var key2 in inf) {
                let line = inf[key2];
                if (line.hasOwnProperty("id")) {
                    let lineId = String(line["id"]);
                    if (!infval.hasKey(lineId)) {
                        infval.add(lineId, new Dictionary<string, string>());
                    }
                    let lineVal: Dictionary<string, string> = infval.getValue(lineId);
                    for (var lineKey in line) {
                        lineVal.add(lineKey, line[lineKey]);
                    }
                }
            }

            switch (key) {
                case "DifficultyEfficiencyInfo":
                    DifficultyEfficiencyInfo.serverInit(this.infDic.getValue(key));
                    break;
                case "HeroInfo":
                    HeroInfo.serverInit(this.infDic.getValue(key));
                    break;
                case "HeroTypeInfo":
                    HeroTypeInfo.serverInit(this.infDic.getValue(key));
                    break;
                case "MonsterInfo":
                    MonsterInfo.serverInit(this.infDic.getValue(key));
                    break;
                case "SkillInfo":
                    SkillInfo.serverInit(this.infDic.getValue(key));
                    break;
                case "WaveformInfo":
                    WaveformInfo.serverInit(this.infDic.getValue(key));
                    break;
                case "WaveInfo":
                    WaveInfo.serverInit(this.infDic.getValue(key));
                    break;
            }
        }
    }
}