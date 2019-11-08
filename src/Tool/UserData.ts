import TimerManager from "./TimerManager";

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

    private _InviteData: Array<InviteInfo> = [];
    public get InviteData(): Array<InviteInfo> {
        return this._InviteData;
    }
    public set InviteData(v: Array<InviteInfo>) {
        this._InviteData = v;
    }

    public InviteNum(): number {
        let num: number = 0;
        for (let i = this._InviteData.length - 1; i >= 0; i--) {
            if (this._InviteData[i] && this._InviteData[i].delayTime > 0) {
                num++;
            }
        }
        return num;
    }


}

export class InviteInfo {
    constructor() { }

    public avatarUrl: string;
    public names: string;
    public openId: string;
    public delayTimeKey: string;
    public get delayTime(): number {
        if (this.delayTimeKey) { } else {
            this.delayTimeKey = "InviteInfo" + this.openId;
        }
        return TimerManager.getTimeUpdate("InviteInfo" + this.openId);
    }
    public set delayTime(v: number) {
        this.delayTimeKey = "InviteInfo" + this.openId;
        TimerManager.setTimeUpdate("InviteInfo" + this.openId, v);
    }

}