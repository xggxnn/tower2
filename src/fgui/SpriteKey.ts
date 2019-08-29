import Fun from "../Tool/Fun";
import Dictionary from "../Tool/Dictionary";

export default class SpriteKey {
    private static _idDict: Dictionary<string, string>;
    static get idDict(): Dictionary<string, string> {
        if (!SpriteKey._idDict) {
            SpriteKey.init();
        }
        return SpriteKey._idDict;
    }


    private static _extDict: Dictionary<string, string>;
    static get extDict(): Dictionary<string, string> {
        if (!SpriteKey._extDict) {
            SpriteKey.init();
        }
        return SpriteKey._extDict;
    }

    public static getId(key: string): string {
        if (!SpriteKey.idDict.hasKey(key)) {
            console.error('SpriteKey 不存在 key=' + key);
            return '';
        }
        return SpriteKey.idDict.getValue(key);
    }

    public static getUrl(key: string): string {
        return `ui://${SpriteKey.SoundPackageId}${SpriteKey.getId(key)}`;
    }


    public static getPath(key: string): string {
        return Fun.getResPath(`${SpriteKey.SoundPackageName}_${SpriteKey.getId(key)}${SpriteKey.extDict.getValue(key)}`, 'fgui');
    }


    private static init() {
        let dict = SpriteKey._idDict = new Dictionary<string, string>();
        dict.add("icon_1001.png", "9v6l0");
        dict.add("icon_1002.png", "9v6l1");
        dict.add("icon_1003.png", "9v6l2");
        dict.add("icon_1005.png", "9v6l3");
        dict.add("icon_1006.png", "9v6l4");
        dict.add("icon_1007.png", "9v6l5");
        dict.add("icon_1012.png", "9v6l6");
        dict.add("icon_1019.png", "ngrs1d");
        dict.add("icon_1020.png", "ngrs1e");
        dict.add("icon_1021.png", "ngrs1f");
        dict.add("race1.png", "ngrs1a");
        dict.add("star1.png", "gc5l2d");
        dict.add("star2.png", "gc5l2e");
        dict.add("star3.png", "gc5l2f");
        dict.add("Gift.png", "bxj0b");
        dict.add("diamond.png", "j5ct16");
        dict.add("jadeite.png", "j5ct1d");
        dict.add("gold.png", "j5ct17");
        dict.add("hero_12.png", "jg2u2g");
        dict.add("hero_14.png", "jg2u2h");
        dict.add("hero_15.png", "jg2u2i");
        dict.add("hero_18.png", "jg2u2j");
        dict.add("hero_2.png", "jg2u2k");
        dict.add("hero_30.png", "jg2u2l");
        dict.add("hero_5.png", "jg2u2m");
        dict.add("hero_6.png", "jg2u2n");
        dict.add("hero_9.png", "jg2u2o");
        dict.add("hero_21.png", "jg2u2p");
        dict.add("hero_22.png", "jg2u2q");
        dict.add("hero_24.png", "jg2u2r");
        dict.add("hero_25.png", "jg2u2s");
        dict.add("hero_26.png", "jg2u2t");
        dict.add("hero_27.png", "jg2u2u");
        dict.add("hero_34.png", "jg2u2v");
        dict.add("hero_35.png", "jg2u2w");
        dict.add("hero_4.png", "jg2u2x");
        dict.add("career1.png", "ngrs19");
        dict.add("career2.png", "h5p92y");
        dict.add("career3.png", "h5p92z");
        dict.add("career4.png", "h5p930");
        dict.add("career5.png", "h5p931");
        dict.add("career6.png", "h5p932");
        dict.add("career7.png", "h5p933");
        dict.add("race2.png", "h5p934");
        dict.add("race3.png", "h5p935");
        dict.add("race4.png", "h5p936");
        dict.add("race5.png", "h5p937");
        dict.add("icon_1004.png", "11av538");
        dict.add("icon_1008.png", "11av539");
        dict.add("icon_1009.png", "11av53a");
        dict.add("icon_1010.png", "11av53b");
        dict.add("icon_1011.png", "11av53c");
        dict.add("icon_1013.png", "11av53d");
        dict.add("icon_1014.png", "11av53e");
        dict.add("icon_1015.png", "11av53f");
        dict.add("icon_1016.png", "11av53g");
        dict.add("icon_1017.png", "11av53h");
        dict.add("icon_1018.png", "11av53i");
        dict.add("hero_1.png", "qyum53j");
        dict.add("hero_3.png", "qyum53k");
        dict.add("quality1.png", "czuw53l");
        dict.add("quality2.png", "czuw53m");
        dict.add("quality3.png", "czuw53n");
        dict.add("quality4.png", "czuw53o");
        dict.add("quality5.png", "czuw53p");
        dict.add("icon_skill01.png", "czuw53q");
        dict.add("icon_skill02.png", "czuw53r");
        dict.add("icon_skill03.png", "czuw53s");
        dict.add("icon_skill04.png", "czuw53t");
        dict.add("icon_skill05.png", "czuw53u");
        dict.add("icon_skill06.png", "czuw53v");
        dict.add("icon_skill07.png", "czuw53w");
        dict.add("icon_skill08.png", "czuw53x");

        let exts = SpriteKey._extDict = new Dictionary<string, string>();
        exts.add("icon_1001.png", ".png");
        exts.add("icon_1002.png", ".png");
        exts.add("icon_1003.png", ".png");
        exts.add("icon_1005.png", ".png");
        exts.add("icon_1006.png", ".png");
        exts.add("icon_1007.png", ".png");
        exts.add("icon_1012.png", ".png");
        exts.add("icon_1019.png", ".png");
        exts.add("icon_1020.png", ".png");
        exts.add("icon_1021.png", ".png");
        exts.add("race1.png", ".png");
        exts.add("star1.png", ".png");
        exts.add("star2.png", ".png");
        exts.add("star3.png", ".png");
        exts.add("Gift.png", ".png");
        exts.add("diamond.png", ".png");
        exts.add("jadeite.png", ".png");
        exts.add("gold.png", ".png");
        exts.add("hero_12.png", ".png");
        exts.add("hero_14.png", ".png");
        exts.add("hero_15.png", ".png");
        exts.add("hero_18.png", ".png");
        exts.add("hero_2.png", ".png");
        exts.add("hero_30.png", ".png");
        exts.add("hero_5.png", ".png");
        exts.add("hero_6.png", ".png");
        exts.add("hero_9.png", ".png");
        exts.add("hero_21.png", ".png");
        exts.add("hero_22.png", ".png");
        exts.add("hero_24.png", ".png");
        exts.add("hero_25.png", ".png");
        exts.add("hero_26.png", ".png");
        exts.add("hero_27.png", ".png");
        exts.add("hero_34.png", ".png");
        exts.add("hero_35.png", ".png");
        exts.add("hero_4.png", ".png");
        exts.add("career1.png", ".png");
        exts.add("career2.png", ".png");
        exts.add("career3.png", ".png");
        exts.add("career4.png", ".png");
        exts.add("career5.png", ".png");
        exts.add("career6.png", ".png");
        exts.add("career7.png", ".png");
        exts.add("race2.png", ".png");
        exts.add("race3.png", ".png");
        exts.add("race4.png", ".png");
        exts.add("race5.png", ".png");
        exts.add("icon_1004.png", ".png");
        exts.add("icon_1008.png", ".png");
        exts.add("icon_1009.png", ".png");
        exts.add("icon_1010.png", ".png");
        exts.add("icon_1011.png", ".png");
        exts.add("icon_1013.png", ".png");
        exts.add("icon_1014.png", ".png");
        exts.add("icon_1015.png", ".png");
        exts.add("icon_1016.png", ".png");
        exts.add("icon_1017.png", ".png");
        exts.add("icon_1018.png", ".png");
        exts.add("hero_1.png", ".png");
        exts.add("hero_3.png", ".png");
        exts.add("quality1.png", ".png");
        exts.add("quality2.png", ".png");
        exts.add("quality3.png", ".png");
        exts.add("quality4.png", ".png");
        exts.add("quality5.png", ".png");
        exts.add("icon_skill01.png", ".png");
        exts.add("icon_skill02.png", ".png");
        exts.add("icon_skill03.png", ".png");
        exts.add("icon_skill04.png", ".png");
        exts.add("icon_skill05.png", ".png");
        exts.add("icon_skill06.png", ".png");
        exts.add("icon_skill07.png", ".png");
        exts.add("icon_skill08.png", ".png");

    }

	static SoundPackageName = "FSprite";
	static SoundPackageId = "88du1wab";

	public static icon_1001 = "icon_1001.png";
	public static icon_1002 = "icon_1002.png";
	public static icon_1003 = "icon_1003.png";
	public static icon_1005 = "icon_1005.png";
	public static icon_1006 = "icon_1006.png";
	public static icon_1007 = "icon_1007.png";
	public static icon_1012 = "icon_1012.png";
	public static icon_1019 = "icon_1019.png";
	public static icon_1020 = "icon_1020.png";
	public static icon_1021 = "icon_1021.png";
	public static race1 = "race1.png";
	public static star1 = "star1.png";
	public static star2 = "star2.png";
	public static star3 = "star3.png";
	public static Gift = "Gift.png";
	public static diamond = "diamond.png";
	public static jadeite = "jadeite.png";
	public static gold = "gold.png";
	public static hero_12 = "hero_12.png";
	public static hero_14 = "hero_14.png";
	public static hero_15 = "hero_15.png";
	public static hero_18 = "hero_18.png";
	public static hero_2 = "hero_2.png";
	public static hero_30 = "hero_30.png";
	public static hero_5 = "hero_5.png";
	public static hero_6 = "hero_6.png";
	public static hero_9 = "hero_9.png";
	public static hero_21 = "hero_21.png";
	public static hero_22 = "hero_22.png";
	public static hero_24 = "hero_24.png";
	public static hero_25 = "hero_25.png";
	public static hero_26 = "hero_26.png";
	public static hero_27 = "hero_27.png";
	public static hero_34 = "hero_34.png";
	public static hero_35 = "hero_35.png";
	public static hero_4 = "hero_4.png";
	public static career1 = "career1.png";
	public static career2 = "career2.png";
	public static career3 = "career3.png";
	public static career4 = "career4.png";
	public static career5 = "career5.png";
	public static career6 = "career6.png";
	public static career7 = "career7.png";
	public static race2 = "race2.png";
	public static race3 = "race3.png";
	public static race4 = "race4.png";
	public static race5 = "race5.png";
	public static icon_1004 = "icon_1004.png";
	public static icon_1008 = "icon_1008.png";
	public static icon_1009 = "icon_1009.png";
	public static icon_1010 = "icon_1010.png";
	public static icon_1011 = "icon_1011.png";
	public static icon_1013 = "icon_1013.png";
	public static icon_1014 = "icon_1014.png";
	public static icon_1015 = "icon_1015.png";
	public static icon_1016 = "icon_1016.png";
	public static icon_1017 = "icon_1017.png";
	public static icon_1018 = "icon_1018.png";
	public static hero_1 = "hero_1.png";
	public static hero_3 = "hero_3.png";
	public static quality1 = "quality1.png";
	public static quality2 = "quality2.png";
	public static quality3 = "quality3.png";
	public static quality4 = "quality4.png";
	public static quality5 = "quality5.png";
	public static icon_skill01 = "icon_skill01.png";
	public static icon_skill02 = "icon_skill02.png";
	public static icon_skill03 = "icon_skill03.png";
	public static icon_skill04 = "icon_skill04.png";
	public static icon_skill05 = "icon_skill05.png";
	public static icon_skill06 = "icon_skill06.png";
	public static icon_skill07 = "icon_skill07.png";
	public static icon_skill08 = "icon_skill08.png";

    
}
