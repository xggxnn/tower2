export default class Association {

    private _names: string;
    public get names(): string {
        return this._names;
    }
    public set names(v: string) {
        this._names = v;
    }


    private _num: number;
    public get num(): number {
        return this._num;
    }
    public set num(v: number) {
        this._num = v;
    }


    private _hero: Array<number> = [];
    public get hero(): Array<number> {
        return this._hero;
    }
    public set hero(v: Array<number>) {
        this._hero = v;
    }


    private _career: number = 0;
    public get career(): number {
        return this._career;
    }
    public set career(v: number) {
        this._career = v;
    }



    private _race: number = 0;
    public get race(): number {
        return this._race;
    }
    public set race(v: number) {
        this._race = v;
    }


    private _attribute_id: number;
    public get attribute_id(): number {
        return this._attribute_id;
    }
    public set attribute_id(v: number) {
        this._attribute_id = v;
    }


    private _values: number;
    public get values(): number {
        return this._values;
    }
    public set values(v: number) {
        this._values = v;
    }


}