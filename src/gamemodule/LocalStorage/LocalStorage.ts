import Game from "../../Game";

export default class LocalStorage {

    private _openid: string;
    get openid(): string {
        if (!this._openid) {
            this._openid = this.getString("openid", true);
        }
        return this._openid;
    }
    set openid(value: string) {
        this._openid = value;
        this.setString("openid", value, true);
        Game.sound.onLogin();
    }
    private _password: string;
    get password(): string {
        if (!this._password) {
            this._password = this.getString("password", true);
        }
        return this._password;
    }
    set password(value: string) {
        this._password = value;
        this.setString("password", value, true);
    }

    private getKey(key: string, isGobal: boolean = false) {
        if (isGobal) {
            return key;
        }
        else {
            return this.openid + "_" + key;
        }
    }

    // string
    setItem(key: string, value: string, isGobal: boolean = false): void {
        Laya.LocalStorage.setItem(this.getKey(key, isGobal), value);
    }

    getItem(key: string, isGobal: boolean = false): string {
        return Laya.LocalStorage.getItem(this.getKey(key, isGobal));
    }


    // string
    setString(key: string, value: string, isGobal: boolean = false): void {
        Laya.LocalStorage.setItem(this.getKey(key, isGobal), value);
    }

    getString(key: string, isGobal: boolean = false): string {
        let val = Laya.LocalStorage.getItem(this.getKey(key, isGobal));
        if (val === undefined || val === null) {
            val = "";
        }
        return val;
    }


    // boolean
    setBoolean(key: string, value: boolean, isGobal: boolean = false): void {
        Laya.LocalStorage.setItem(this.getKey(key, isGobal), value ? "true" : "false");
    }

    getBoolean(key: string, isGobal: boolean = false): boolean {
        return Laya.LocalStorage.getItem(this.getKey(key, isGobal)) == "true";
    }


    // int
    setInt(key: string, value: number, isGobal: boolean = false): void {
        Laya.LocalStorage.setItem(this.getKey(key, isGobal), value.toString());
    }

    getInt(key: string, isGobal: boolean = false): number {
        let val = Laya.LocalStorage.getItem(this.getKey(key, isGobal));
        if (val) {
            return parseInt(val);
        }
        return 0;
    }


    // float
    setFloat(key: string, value: number, isGobal: boolean = false): void {
        Laya.LocalStorage.setItem(this.getKey(key, isGobal), value.toString());
    }

    getFloat(key: string, isGobal: boolean = false): number {
        let val = Laya.LocalStorage.getItem(this.getKey(key, isGobal));
        if (val) {
            return parseFloat(val);
        }
        return 0;
    }




    setJSON(key: string, value: any, isGobal: boolean = false): void {
        Laya.LocalStorage.setJSON(this.getKey(key, isGobal), value);
    }

    getJSON(key: string, isGobal: boolean = false): any {
        return Laya.LocalStorage.getJSON(this.getKey(key, isGobal));
    }


    removeItem(key: string, isGobal: boolean = false): void {
        return Laya.LocalStorage.removeItem(this.getKey(key, isGobal));
    }


    hasItem(key: string, isGobal: boolean = false): boolean {
        return Laya.LocalStorage.getItem(this.getKey(key, isGobal)) !== null;
    }


    clear() {
        return Laya.LocalStorage.clear();
    }

}