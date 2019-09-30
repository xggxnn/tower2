import ColormatrixInfo from "./ColormatrixInfo";
import TipsInfo from "./TipsInfo";
import UnlockInfo from "./UnlockInfo";


// 会自动覆盖
export default class CSVKV {
        public static kv = {

                "color_matrix.csv": ColormatrixInfo,
                "tips.csv": TipsInfo,
                "unlock.csv": UnlockInfo,

        }
}
