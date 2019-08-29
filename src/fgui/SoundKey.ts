import Fun from "../Tool/Fun";
import Dictionary from "../Tool/Dictionary";

export default class SoundKey {
    private static _idDict: Dictionary<string, string>;
    static get idDict(): Dictionary<string, string> {
        if (!SoundKey._idDict) {
            SoundKey.init();
        }
        return SoundKey._idDict;
    }


    private static _extDict: Dictionary<string, string>;
    static get extDict(): Dictionary<string, string> {
        if (!SoundKey._extDict) {
            SoundKey.init();
        }
        return SoundKey._extDict;
    }

    public static getId(key: string): string {
        if (!SoundKey.idDict.hasKey(key)) {
            console.error('SoundKey 不存在 key=' + key);
            return '';
        }
        return SoundKey.idDict.getValue(key);
    }

    public static getUrl(key: string): string {
        return `ui://${SoundKey.SoundPackageId}${SoundKey.getId(key)}`;
    }


    public static getPath(key: string): string {
        return Fun.getResPath(`${SoundKey.SoundPackageName}_${SoundKey.getId(key)}${SoundKey.extDict.getValue(key)}`, 'fgui');
    }


    private static init() {
        let dict = SoundKey._idDict = new Dictionary<string, string>();
        dict.add("click.mp3", "q0800");
        dict.add("bgm_1.mp3", "jx3y1");
        dict.add("upgrade.mp3", "11av5q");
        dict.add("s1.mp3", "11av5r");
        dict.add("s100.mp3", "11av5s");
        dict.add("s101.mp3", "11av5t");
        dict.add("s102.mp3", "11av5u");
        dict.add("s103.mp3", "11av5v");
        dict.add("s104.mp3", "11av5w");
        dict.add("s105.mp3", "11av5x");
        dict.add("s106.mp3", "11av5y");
        dict.add("s107.mp3", "11av5z");
        dict.add("s2.mp3", "11av510");
        dict.add("s200.mp3", "11av511");
        dict.add("s201.mp3", "11av512");
        dict.add("s202.mp3", "11av513");
        dict.add("s203.mp3", "11av514");
        dict.add("s204.mp3", "11av515");
        dict.add("s205.mp3", "11av516");
        dict.add("s206.mp3", "11av517");
        dict.add("s207.mp3", "11av518");
        dict.add("s208.mp3", "11av519");
        dict.add("s3.mp3", "11av51a");
        dict.add("s4.mp3", "11av51b");
        dict.add("s80.mp3", "11av51c");
        dict.add("s81.mp3", "11av51d");
        dict.add("s82.mp3", "11av51e");

        let exts = SoundKey._extDict = new Dictionary<string, string>();
        exts.add("click.mp3", ".mp3");
        exts.add("bgm_1.mp3", ".mp3");
        exts.add("upgrade.mp3", ".mp3");
        exts.add("s1.mp3", ".mp3");
        exts.add("s100.mp3", ".mp3");
        exts.add("s101.mp3", ".mp3");
        exts.add("s102.mp3", ".mp3");
        exts.add("s103.mp3", ".mp3");
        exts.add("s104.mp3", ".mp3");
        exts.add("s105.mp3", ".mp3");
        exts.add("s106.mp3", ".mp3");
        exts.add("s107.mp3", ".mp3");
        exts.add("s2.mp3", ".mp3");
        exts.add("s200.mp3", ".mp3");
        exts.add("s201.mp3", ".mp3");
        exts.add("s202.mp3", ".mp3");
        exts.add("s203.mp3", ".mp3");
        exts.add("s204.mp3", ".mp3");
        exts.add("s205.mp3", ".mp3");
        exts.add("s206.mp3", ".mp3");
        exts.add("s207.mp3", ".mp3");
        exts.add("s208.mp3", ".mp3");
        exts.add("s3.mp3", ".mp3");
        exts.add("s4.mp3", ".mp3");
        exts.add("s80.mp3", ".mp3");
        exts.add("s81.mp3", ".mp3");
        exts.add("s82.mp3", ".mp3");

    }

	static SoundPackageName = "Sound";
	static SoundPackageId = "32bbq6lk";

	public static click = "click.mp3";
	public static bgm_1 = "bgm_1.mp3";
	public static upgrade = "upgrade.mp3";
	public static s1 = "s1.mp3";
	public static s100 = "s100.mp3";
	public static s101 = "s101.mp3";
	public static s102 = "s102.mp3";
	public static s103 = "s103.mp3";
	public static s104 = "s104.mp3";
	public static s105 = "s105.mp3";
	public static s106 = "s106.mp3";
	public static s107 = "s107.mp3";
	public static s2 = "s2.mp3";
	public static s200 = "s200.mp3";
	public static s201 = "s201.mp3";
	public static s202 = "s202.mp3";
	public static s203 = "s203.mp3";
	public static s204 = "s204.mp3";
	public static s205 = "s205.mp3";
	public static s206 = "s206.mp3";
	public static s207 = "s207.mp3";
	public static s208 = "s208.mp3";
	public static s3 = "s3.mp3";
	public static s4 = "s4.mp3";
	public static s80 = "s80.mp3";
	public static s81 = "s81.mp3";
	public static s82 = "s82.mp3";

    
}
