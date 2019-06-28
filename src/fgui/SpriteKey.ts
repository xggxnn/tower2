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
        dict.add("1.png", "udz47");
        dict.add("2.png", "udz48");
        dict.add("3.png", "udz49");
        dict.add("4.png", "udz4a");

        let exts = SpriteKey._extDict = new Dictionary<string, string>();
        exts.add("icon_1001.png", ".png");
        exts.add("icon_1002.png", ".png");
        exts.add("icon_1003.png", ".png");
        exts.add("icon_1005.png", ".png");
        exts.add("icon_1006.png", ".png");
        exts.add("icon_1007.png", ".png");
        exts.add("icon_1012.png", ".png");
        exts.add("1.png", ".png");
        exts.add("2.png", ".png");
        exts.add("3.png", ".png");
        exts.add("4.png", ".png");

    }

	static SoundPackageName = "fSprite";
	static SoundPackageId = "88du1wab";

	public static icon_1001 = "icon_1001.png";
	public static icon_1002 = "icon_1002.png";
	public static icon_1003 = "icon_1003.png";
	public static icon_1005 = "icon_1005.png";
	public static icon_1006 = "icon_1006.png";
	public static icon_1007 = "icon_1007.png";
	public static icon_1012 = "icon_1012.png";
	public static 1 = "1.png";
	public static 2 = "2.png";
	public static 3 = "3.png";
	public static 4 = "4.png";

    
}
