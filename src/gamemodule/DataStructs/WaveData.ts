import Dictionary from "../../Tool/Dictionary";

export default class WaveData {
    private static _Instance: WaveData;
    static get Instance(): WaveData {
        if (!WaveData._Instance) {
            WaveData._Instance = new WaveData();
        }
        return WaveData._Instance;
    }

    public init(): void {

    }


}