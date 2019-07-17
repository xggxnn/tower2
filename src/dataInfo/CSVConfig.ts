import AssociationAttributeInfo from "./AssociationAttributeInfo";
import AssociationCareerInfo from "./AssociationCareerInfo";
import AssociationRaceInfo from "./AssociationRaceInfo";
import AssociationSpecialInfo from "./AssociationSpecialInfo";
import CardInfo from "./CardInfo";
import DifficultyEfficiencyInfo from "./DifficultyEfficiencyInfo";
import FiveElementsInfo from "./FiveElementsInfo";
import HeroInfo from "./HeroInfo";
import HeroTypeInfo from "./HeroTypeInfo";
import MonsterInfo from "./MonsterInfo";
import NormalSkillInfo from "./NormalSkillInfo";
import PlaySkillInfo from "./PlaySkillInfo";
import ShopInfo from "./ShopInfo";
import SkillInfo from "./SkillInfo";
import SkillHitTypeInfo from "./SkillHitTypeInfo";
import TimeHouseInfo from "./TimeHouseInfo";
import TrialInfo from "./TrialInfo";
import WaveInfo from "./WaveInfo";
import WaveformInfo from "./WaveformInfo";
import WaveRewardsInfo from "./WaveRewardsInfo";

// 会自动覆盖
export default class CSVConfig {
	static InitAll(): void {

		AssociationAttributeInfo.init();
		AssociationCareerInfo.init();
		AssociationRaceInfo.init();
		AssociationSpecialInfo.init();
		CardInfo.init();
		DifficultyEfficiencyInfo.init();
		FiveElementsInfo.init();
		HeroInfo.init();
		HeroTypeInfo.init();
		MonsterInfo.init();
		NormalSkillInfo.init();
		PlaySkillInfo.init();
		ShopInfo.init();
		SkillInfo.init();
		SkillHitTypeInfo.init();
		TimeHouseInfo.init();
		TrialInfo.init();
		WaveInfo.init();
		WaveformInfo.init();
		WaveRewardsInfo.init();

	}
}
