import Fun from "../tool/Fun";
import Dictionary from "../tool/Dictionary";

export default class BigPicKey {
    private static _idDict: Dictionary<string, string>;
    static get idDict(): Dictionary<string, string> {
        if (!BigPicKey._idDict) {
            BigPicKey.init();
        }
        return BigPicKey._idDict;
    }


    private static _extDict: Dictionary<string, string>;
    static get extDict(): Dictionary<string, string> {
        if (!BigPicKey._extDict) {
            BigPicKey.init();
        }
        return BigPicKey._extDict;
    }

    public static getId(key: string): string {
        if (!BigPicKey.idDict.hasKey(key)) {
            console.error('BigPicKey 不存在 key=' + key);
            return '';
        }
        return BigPicKey.idDict.getValue(key);
    }

    public static getUrl(key: string): string {
        return `ui://${BigPicKey.SoundPackageId}${BigPicKey.getId(key)}`;
    }


    public static getPath(key: string): string {
        return Fun.getResPath(`${BigPicKey.SoundPackageName}_${BigPicKey.getId(key)}${BigPicKey.extDict.getValue(key)}`, 'fgui');
    }


    private static init() {
        let dict = BigPicKey._idDict = new Dictionary<string, string>();
        dict.add("buzhenditu.png", "j5ctb");
        dict.add("jinwuyuchanbg.png", "qvb62p");
        dict.add("bg02_1.png", "9mhx1x");
        dict.add("bg02_2.png", "9mhx1y");
        dict.add("bg02_3.png", "9mhx1z");
        dict.add("bg02_4.png", "czuw1q");
        dict.add("bg_1.png", "9mhx20");
        dict.add("bg_2.png", "9mhx21");
        dict.add("bg_3.png", "9mhx22");
        dict.add("bg_4.png", "j5ct1j");
        dict.add("cloud01.png", "czuw1r");
        dict.add("losetip.png", "ngrsq");
        dict.add("wintip.png", "ngrst");
        dict.add("bg.png", "bcle27");
        dict.add("bg2.png", "bcle28");
        dict.add("bg3.png", "bcle29");
        dict.add("bg5.png", "bcle2p");
        dict.add("fight.png", "bcle2a");
        dict.add("guaji.png", "bcle2b");
        dict.add("seat.png", "bcle2g");
        dict.add("synthetiseBg.png", "c8j320");
        dict.add("topBg.png", "bcle2k");
        dict.add("zhizhusi.png", "bcle2l");
        dict.add("waveBg_1.png", "9mhx52h");
        dict.add("waveBg_2.png", "9mhx52i");
        dict.add("waveBg_3.png", "9mhx52j");
        dict.add("zhuangshi2.png", "udz4e");
        dict.add("bg4.png", "bcle2o");
        dict.add("bigDi.png", "ajdp54c");
        dict.add("waveBg_4.png", "j5ct1u");
        dict.add("yunwen.png", "gc5ls");
        dict.add("zhuangshi1.png", "udz4d");
        dict.add("zu2.png", "udz4m");

        let exts = BigPicKey._extDict = new Dictionary<string, string>();
        exts.add("buzhenditu.png", ".png");
        exts.add("jinwuyuchanbg.png", ".png");
        exts.add("bg02_1.png", ".png");
        exts.add("bg02_2.png", ".png");
        exts.add("bg02_3.png", ".png");
        exts.add("bg02_4.png", ".png");
        exts.add("bg_1.png", ".png");
        exts.add("bg_2.png", ".png");
        exts.add("bg_3.png", ".png");
        exts.add("bg_4.png", ".png");
        exts.add("cloud01.png", ".png");
        exts.add("losetip.png", ".png");
        exts.add("wintip.png", ".png");
        exts.add("bg.png", ".png");
        exts.add("bg2.png", ".png");
        exts.add("bg3.png", ".png");
        exts.add("bg5.png", ".png");
        exts.add("fight.png", ".png");
        exts.add("guaji.png", ".png");
        exts.add("seat.png", ".png");
        exts.add("synthetiseBg.png", ".png");
        exts.add("topBg.png", ".png");
        exts.add("zhizhusi.png", ".png");
        exts.add("waveBg_1.png", ".png");
        exts.add("waveBg_2.png", ".png");
        exts.add("waveBg_3.png", ".png");
        exts.add("zhuangshi2.png", ".png");
        exts.add("bg4.png", ".png");
        exts.add("bigDi.png", ".png");
        exts.add("waveBg_4.png", ".png");
        exts.add("yunwen.png", ".png");
        exts.add("zhuangshi1.png", ".png");
        exts.add("zu2.png", ".png");

    }

	static SoundPackageName = "BigSprite";
	static SoundPackageId = "3o5nmzs6";


    
}
