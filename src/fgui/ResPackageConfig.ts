import Loader = laya.net.Loader;
import Fun from "../Tool/Fun";

export default class ResPackageConfig {

    packageName: string;
    // 目录文件夹
    resDir: string;
    // bin
    resBin: string;
    // atlasX.png
    resAtlas: string[] = [];
    // sound
    resSounds: string[] = [];

    private _loadList: { url: string, type: Loader }[];

    get loadList(): { url: string, type: Loader }[] {
        if (!this._loadList) {
            let list = [];


            list.push({ url: Fun.getResPath(this.resBin, this.resDir), type: Loader.BUFFER });

            if (this.resAtlas) {
                for (let i = 0; i < this.resAtlas.length; i++) {
                    list.push({ url: Fun.getResPath(this.resAtlas[i], this.resDir), type: Loader.IMAGE });
                }
            }

            if (this.resSounds) {
                for (let i = 0; i < this.resSounds.length; i++) {
                    list.push({ url: Fun.getResPath(this.resSounds[i], this.resDir), type: Loader.SOUND });
                }
            }

            this._loadList = list;
        }

        return this._loadList;
    }

    get packagePath(): string {
        return Fun.getResPath(this.packageName, this.resDir)
    }


}