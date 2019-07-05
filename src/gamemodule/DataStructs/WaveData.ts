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
        this.refrush();
    }

    private refrush(json?: any): void {
        if (json) {

        }
        else {
            this._waveStatus.add(this._curWave, new Dictionary<any, any>());
        }
    }

    // 关卡id，读取配置表
    private _curWave: number = 1;
    // 当前地图
    private _curMap: number = 1;
    // 当前关卡
    private _curLevel: number = 1;
    // 关卡状态
    private _waveStatus: Dictionary<number, Dictionary<any, any>> = new Dictionary<number, Dictionary<any, any>>();

    public waveStatus(waveId: number): Dictionary<any, any> {
        if (this._waveStatus.hasKey(waveId)) {
            return this._waveStatus.getValue(waveId);
        }
        return null;
    }

}