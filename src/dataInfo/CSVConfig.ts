import DifficultyEfficiencyInfo from "./DifficultyEfficiencyInfo";
import HeroInfo from "./HeroInfo";
import HeroTypeInfo from "./HeroTypeInfo";
import MonsterInfo from "./MonsterInfo";
import WaveInfo from "./WaveInfo";
import WaveformInfo from "./WaveformInfo";

// 会自动覆盖
export default class CSVConfig {
	static InitAll(): void {

		DifficultyEfficiencyInfo.init();
		HeroInfo.init();
		HeroTypeInfo.init();
		MonsterInfo.init();
		WaveInfo.init();
		WaveformInfo.init();

	}
}
