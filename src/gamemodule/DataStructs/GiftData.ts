import CardInfo from "../../dataInfo/CardInfo";

export default class GiftData {
    public id: number;
    public count: number;

    private _dataInf: CardInfo = null;
    public get dataInf(): CardInfo {
        return this._dataInf;
    }
    public setDataInf() {
        this._dataInf = CardInfo.getInfo(this.id);
    }

}