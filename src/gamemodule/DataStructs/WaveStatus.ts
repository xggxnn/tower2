export default class WaveStatus {

    private _id: number = 0;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _level: number = 0;
    public get level(): number {
        return this._level;
    }
    public set level(v: number) {
        this._level = v;
    }

    private _time: number = 0;
    public get time(): number {
        return this._time;
    }
    public set time(v: number) {
        this._time = v;
    }

    private _status: number = 0;
    public get status(): number {
        return this._status;
    }
    public set status(v: number) {
        this._status = v;
    }
}