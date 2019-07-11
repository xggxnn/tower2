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
        dict.add("num1.png", "j5ctb");
        dict.add("num2.png", "j5ctc");
        dict.add("num3.png", "j5ctd");
        dict.add("num4.png", "j5cte");
        dict.add("icon1.png", "j5ctf");
        dict.add("icon10.png", "j5ctg");
        dict.add("icon11.png", "j5cth");
        dict.add("icon12.png", "j5cti");
        dict.add("icon13.png", "j5ctj");
        dict.add("icon14.png", "j5ctk");
        dict.add("icon15.png", "j5ctl");
        dict.add("icon16.png", "j5ctm");
        dict.add("icon17.png", "j5ctn");
        dict.add("icon18.png", "j5cto");
        dict.add("icon19.png", "j5ctp");
        dict.add("icon2.png", "j5ctq");
        dict.add("icon20.png", "j5ctr");
        dict.add("icon21.png", "j5cts");
        dict.add("icon22.png", "j5ctt");
        dict.add("icon23.png", "j5ctu");
        dict.add("icon24.png", "j5ctv");
        dict.add("icon25.png", "j5ctw");
        dict.add("icon26.png", "j5ctx");
        dict.add("icon27.png", "j5cty");
        dict.add("icon28.png", "j5ctz");
        dict.add("icon29.png", "j5ct10");
        dict.add("icon3.png", "j5ct11");
        dict.add("icon30.png", "j5ct12");
        dict.add("icon31.png", "j5ct13");
        dict.add("icon32.png", "j5ct14");
        dict.add("icon33.png", "j5ct15");
        dict.add("icon34.png", "j5ct16");
        dict.add("icon35.png", "j5ct17");
        dict.add("icon4.png", "j5ct18");
        dict.add("icon5.png", "j5ct19");
        dict.add("icon6.png", "j5ct1a");
        dict.add("icon7.png", "j5ct1b");
        dict.add("icon8.png", "j5ct1c");
        dict.add("icon9.png", "j5ct1d");

        let exts = SpriteKey._extDict = new Dictionary<string, string>();
        exts.add("icon_1001.png", ".png");
        exts.add("icon_1002.png", ".png");
        exts.add("icon_1003.png", ".png");
        exts.add("icon_1005.png", ".png");
        exts.add("icon_1006.png", ".png");
        exts.add("icon_1007.png", ".png");
        exts.add("icon_1012.png", ".png");
        exts.add("num1.png", ".png");
        exts.add("num2.png", ".png");
        exts.add("num3.png", ".png");
        exts.add("num4.png", ".png");
        exts.add("icon1.png", ".png");
        exts.add("icon10.png", ".png");
        exts.add("icon11.png", ".png");
        exts.add("icon12.png", ".png");
        exts.add("icon13.png", ".png");
        exts.add("icon14.png", ".png");
        exts.add("icon15.png", ".png");
        exts.add("icon16.png", ".png");
        exts.add("icon17.png", ".png");
        exts.add("icon18.png", ".png");
        exts.add("icon19.png", ".png");
        exts.add("icon2.png", ".png");
        exts.add("icon20.png", ".png");
        exts.add("icon21.png", ".png");
        exts.add("icon22.png", ".png");
        exts.add("icon23.png", ".png");
        exts.add("icon24.png", ".png");
        exts.add("icon25.png", ".png");
        exts.add("icon26.png", ".png");
        exts.add("icon27.png", ".png");
        exts.add("icon28.png", ".png");
        exts.add("icon29.png", ".png");
        exts.add("icon3.png", ".png");
        exts.add("icon30.png", ".png");
        exts.add("icon31.png", ".png");
        exts.add("icon32.png", ".png");
        exts.add("icon33.png", ".png");
        exts.add("icon34.png", ".png");
        exts.add("icon35.png", ".png");
        exts.add("icon4.png", ".png");
        exts.add("icon5.png", ".png");
        exts.add("icon6.png", ".png");
        exts.add("icon7.png", ".png");
        exts.add("icon8.png", ".png");
        exts.add("icon9.png", ".png");

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
	public static num1 = "num1.png";
	public static num2 = "num2.png";
	public static num3 = "num3.png";
	public static num4 = "num4.png";
	public static icon1 = "icon1.png";
	public static icon10 = "icon10.png";
	public static icon11 = "icon11.png";
	public static icon12 = "icon12.png";
	public static icon13 = "icon13.png";
	public static icon14 = "icon14.png";
	public static icon15 = "icon15.png";
	public static icon16 = "icon16.png";
	public static icon17 = "icon17.png";
	public static icon18 = "icon18.png";
	public static icon19 = "icon19.png";
	public static icon2 = "icon2.png";
	public static icon20 = "icon20.png";
	public static icon21 = "icon21.png";
	public static icon22 = "icon22.png";
	public static icon23 = "icon23.png";
	public static icon24 = "icon24.png";
	public static icon25 = "icon25.png";
	public static icon26 = "icon26.png";
	public static icon27 = "icon27.png";
	public static icon28 = "icon28.png";
	public static icon29 = "icon29.png";
	public static icon3 = "icon3.png";
	public static icon30 = "icon30.png";
	public static icon31 = "icon31.png";
	public static icon32 = "icon32.png";
	public static icon33 = "icon33.png";
	public static icon34 = "icon34.png";
	public static icon35 = "icon35.png";
	public static icon4 = "icon4.png";
	public static icon5 = "icon5.png";
	public static icon6 = "icon6.png";
	public static icon7 = "icon7.png";
	public static icon8 = "icon8.png";
	public static icon9 = "icon9.png";

    
}
