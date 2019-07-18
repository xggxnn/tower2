import ResourceInfo from "../../dataInfo/ResourceInfo";

/**
 * 获取物品
 */
export default class RewardItem {


    /**
     * 10001 宝石
     * 10002 金币
     * 10003 翡翠
     * 10004 魔尘
     * 
     * heroid
     */
    public itemId: number = 0;
    /**
     * 数量
     */
    public itemNum: number = 0;
    /**
     * 是否英雄碎片
     */
    public isClips: boolean = false;

}