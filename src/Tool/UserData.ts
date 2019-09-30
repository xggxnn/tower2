export default class UserData {

    private static _Instance: UserData;
    static get Instance(): UserData {
        if (!UserData._Instance) {
            UserData._Instance = new UserData();
        }
        return UserData._Instance;
    }

    /**
     * 微信openid
     */
    private _openid: string = "";
    public get openid(): string {
        return this._openid;
    }
    public set openid(v: string) {
        this._openid = v;
    }

    /**
     * 服务器playerid
     */
    private _playerid: string;
    public get playerid(): string {
        return this._playerid;
    }
    public set playerid(v: string) {
        this._playerid = v;
    }

    /**
     * 密码
     */
    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(v: string) {
        this._password = v;
    }

    /**
     * 邀请人
     */
    private _inviter: string = "";
    public get inviter(): string {
        return this._inviter;
    }
    public set inviter(v: string) {
        this._inviter = v;
    }
}