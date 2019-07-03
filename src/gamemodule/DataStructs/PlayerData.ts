export default class PlayerData {
    private static _Instance: PlayerData;
    static get Instance(): PlayerData {
        if (!PlayerData._Instance) {
            PlayerData._Instance = new PlayerData();
        }
        return PlayerData._Instance;
    }

    private _newbied: boolean = true;
    public get newbie(): boolean {
        return this._newbied;
    }
    public set newbie(v: boolean) {
        this._newbied = v;
    }
    public newbied(): void {
        console.log("新手结束");
        this._newbied = false;
        return;
    }


}