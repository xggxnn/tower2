
/**
 * 获取物品
 */
export default class RewardItem {

    constructor() {
        this.id = 0;
        this.itemId = 0;
        this.itemNum = 0;
        this.isClips = false;
        this.isHero = false;
        this.types = 0;
        this.funIndex = 0;
        this.itemBuyTimes = 0;
    }

    public id: number = 0;
    /**
     * ResourceId
     * 
     * heroid
     */
    public itemId: number = 0;
    /**
     * 数量
     */
    public itemNum: number = 0;
    public itemBuyTimes: number = 0;
    /**
     * 是否英雄碎片
     */
    public isClips: boolean = false;
    /**
     * 是否英雄
     */
    public isHero: boolean = false;
    /**
     * 类型
     */
    public types: number = 0;
    /**
     * 解锁功能序号
     */
    public funIndex: number = 0;

}