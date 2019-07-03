import AssociationInfo from "./AssociationInfo";
import DifficultyEfficiencyInfo from "./DifficultyEfficiencyInfo";
import HeroInfo from "./HeroInfo";
import HeroTypeInfo from "./HeroTypeInfo";
import MonsterInfo from "./MonsterInfo";
import SkillInfo from "./SkillInfo";
import WaveInfo from "./WaveInfo";
import WaveformInfo from "./WaveformInfo";

// 会自动覆盖
export default class CSVConfig {
	static InitAll(): void {

		AssociationInfo.init();
		DifficultyEfficiencyInfo.init();
		HeroInfo.init();
		HeroTypeInfo.init();
		MonsterInfo.init();
		SkillInfo.init();
		WaveInfo.init();
		WaveformInfo.init();

	}
}
