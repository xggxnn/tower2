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

        let exts = SoundKey._extDict = new Dictionary<string, string>();
        exts.add("click.mp3", ".mp3");
        exts.add("bgm_1.mp3", ".mp3");

    }

	static SoundPackageName = "Sound";
	static SoundPackageId = "32bbq6lk";

	public static click = "click.mp3";
	public static bgm_1 = "bgm_1.mp3";

    
}
