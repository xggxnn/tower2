export default class EndlessRankData {

    constructor(id: number, openId: string, name: string, avatarUrl: string, progress: number) {
        this.id = id;
        this.openId = openId;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.progress = progress;
    }

    public id: number;
    public openId: string;
    public name: string;
    public avatarUrl: string;
    public progress: number;

}