import Dictionary from "../tool/Dictionary";
import HeroInfo from "../csvInfo/HeroInfo";
import AssociationAttributeInfo from "../csvInfo/AssociationAttributeInfo";
import AssociationCareerInfo from "../csvInfo/AssociationCareerInfo";
import AssociationRaceInfo from "../csvInfo/AssociationRaceInfo";
import AssociationSpecialInfo from "../csvInfo/AssociationSpecialInfo";
import DifficultyEfficiencyInfo from "../csvInfo/DifficultyEfficiencyInfo";
import HeroTypeInfo from "../csvInfo/HeroTypeInfo";
import WaveformInfo from "../csvInfo/WaveformInfo";
import WaveInfo from "../csvInfo/WaveInfo";
import TimeHouseInfo from "../csvInfo/TimeHouseInfo";
import SkillHitTypeInfo from "../csvInfo/SkillHitTypeInfo";
import SkillInfo from "../csvInfo/SkillInfo";
import ShopInfo from "../csvInfo/ShopInfo";
import ResourceInfo from "../csvInfo/ResourceInfo";
import PlayerSkillInfo from "../csvInfo/PlayerSkillInfo";
import MonsterInfo from "../csvInfo/MonsterInfo";
import TrialInfo from "../csvInfo/TrialInfo";
import FiveElementsInfo from "../csvInfo/FiveElementsInfo";
import CardsInfo from "../csvInfo/CardsInfo";
import HeroqualityInfo from "../csvInfo/HeroqualityInfo";
import WaveRewardInfo from "../csvInfo/WaveRewardInfo";
import KingInfo from "../csvInfo/KingInfo";
import SignInfo from "../csvInfo/SignInfo";
import BossSkillInfo from "../csvInfo/BossSkillInfo";
import LevelchallengesuggestInfo from "../csvInfo/LevelchallengesuggestInfo";
import PositionunlockInfo from "../csvInfo/PositionunlockInfo";
import TipsInfo from "../csvInfo/TipsInfo";
import LevelmapInfo from "../csvInfo/LevelmapInfo";

export default class ServerCSVConfig {
    private static _Instance: ServerCSVConfig;
    static get Instance(): ServerCSVConfig {
        if (!ServerCSVConfig._Instance) {
            ServerCSVConfig._Instance = new ServerCSVConfig();
        }
        return ServerCSVConfig._Instance;
    }

    private infDic: Dictionary<string, Dictionary<string, Dictionary<string, string>>> = new Dictionary<string, Dictionary<string, Dictionary<string, string>>>();

    public setCSVInit(json: any): void {
        for (var key in json) {
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
            let dic = this.infDic.getValue(key).getValues();
            switch (key) {
                case "associationattribute":
                    AssociationAttributeInfo.server(dic);
                    break;
                case "associationcareer":
                    AssociationCareerInfo.server(dic);
                    break;
                case "associationrace":
                    AssociationRaceInfo.server(dic);
                    break;
                case "associationspecial":
                    AssociationSpecialInfo.server(dic);
                    break;
                case "bossskill":
                    BossSkillInfo.server(dic);
                    break;
                case "card":
                    CardsInfo.server(dic);
                    break;
                case "difficultyefficiency":
                    DifficultyEfficiencyInfo.server(dic);
                    break;
                case "fiveelements":
                    FiveElementsInfo.server(dic);
                    break;
                case "hero":
                    HeroInfo.server(dic);
                    break;
                case "heroquality":
                    HeroqualityInfo.server(dic);
                    break;
                case "herotype":
                    HeroTypeInfo.server(dic);
                    break;
                case "king":
                    KingInfo.server(dic);
                    break;
                case "monster":
                    MonsterInfo.server(dic);
                    break;
                case "playskill":
                    PlayerSkillInfo.server(dic);
                    break;
                case "positionunlock":
                    PositionunlockInfo.server(dic);
                    break;
                case "resource":
                    ResourceInfo.server(dic);
                    break;
                case "shop":
                    ShopInfo.server(dic);
                    break;
                case "signin":
                    SignInfo.server(dic);
                    break;
                case "skill":
                    SkillInfo.server(dic);
                    break;
                case "skillhittype":
                    SkillHitTypeInfo.server(dic);
                    break;
                case "timehouse":
                    TimeHouseInfo.server(dic);
                    break;
                case "tips":
                    TipsInfo.server(dic);
                    break;
                case "trial":
                    TrialInfo.server(dic);
                    break;
                case "wave":
                    WaveInfo.server(dic);
                    break;
                case "waveform":
                    WaveformInfo.server(dic);
                    break;
                case "waverewards":
                    WaveRewardInfo.server(dic);
                    break;
                case "levelchallengesuggest":
                    LevelchallengesuggestInfo.server(dic);
                    break;
                case "levelmap":
                    LevelmapInfo.server(dic);
                    break;
            }
        }
    }
}