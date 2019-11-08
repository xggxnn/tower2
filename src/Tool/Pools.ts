import Dictionary from "./Dictionary";
import BattleBaseSK from "../base/BattleBaseSK";

export default class Pools {
    /**
     * 从对象池中获取fgui组件实例
     * @param newCls 组件类名
     */
    static fetch<T extends fairygui.GComponent>(newCls: { new(): T }): T {
        let url = newCls["URL"];
        let fun: Function = newCls["createInstance"];
        return Laya.Pool.getItemByCreateFun(url, fun);
    }
    /**
     * fgui组件实例放回对象池，并从舞台移除
     * @param newCls 实例对象
     */
    static recycle<T extends fairygui.GComponent>(newCls: T) {
        let url = newCls["resourceURL"];
        // if (newCls.parent != null) {
        //     newCls.parent.removeChild(newCls);
        // }
        // else if (newCls.displayObject.parent != null) {
        //     newCls.displayObject.parent.removeChild(newCls.displayObject);
        // }
        Laya.Pool.recover(url, newCls);
    }

    /************************ sk对象池 ************************** */
    private static skDic: Dictionary<string, Array<Laya.Skeleton>> = new Dictionary<string, Array<Laya.Skeleton>>();
    /**
     * 获取、创建sk实例
     * @param key 
     * @param templet 
     */
    public static pops(key: string, templet: Laya.Templet): Laya.Skeleton {
        let list: Array<Laya.Skeleton> = [];
        let result: Laya.Skeleton = null;
        if (this.skDic.hasKey(key)) {
            let list: Array<Laya.Skeleton> = this.skDic.getValue(key);
            if (list.length > 0) {
                result = list.shift();
            }
        }
        this.skDic.add(key, list);
        if (result == null) {
            result = templet.buildArmature(0);
        }
        return result;
    }
    /**
     * 回收sk实例
     * @param key 
     * @param sk 
     */
    public static pushs(key: string, sk: Laya.Skeleton) {
        if (sk && sk != undefined && sk != null) {
            let list: Array<Laya.Skeleton> = this.skDic.getValue(key);
            if (list.length < 30) {
                sk.removeSelf();
                list.push(sk);
            }
        }
    }

    // public static pops(names: string) {
    //     let fun: Function = BattleBaseSK.create;
    //     fun.prototype = names;
    //     return Laya.Pool.getItemByCreateFun(names, fun);
    //     // if (!this.skDict.hasKey(names)) {
    //     //     this.skDict.add(names, []);
    //     // }
    //     // let list = this.skDict.getValue(names);
    //     // if (list.length > 0) {
    //     //     let item = list.shift();
    //     //     item.poolInit();
    //     //     return item;
    //     // }
    //     // else {
    //     //     let item = BattleBaseSK.create(names);
    //     //     item.objectPoolKey = names;
    //     //     return item;
    //     // }
    // }
    // public static pushs(sk: BattleBaseSK) {
    //     let url = sk.key;
    //     sk.removeSelf();
    //     Laya.Pool.recover(url, sk);
    //     // if (obj == null) {
    //     //     return;
    //     // }
    //     // let refKey = obj.objectPoolKey;
    //     // if (this.skDict.hasKey(refKey)) {
    //     //     obj.removeSelf();
    //     //     this.skDict.getValue(refKey).push(obj);
    //     // }
    //     // else {
    //     //     obj.destroy();
    //     // }
    // }
    // private static skDict: Dictionary<string, Array<BattleBaseSK>> = new Dictionary<string, Array<BattleBaseSK>>();
    // /**
    //  * 获取sk实例
    //  */
    // static skFetch(names: string): BattleBaseSK {
    //     let result: BattleBaseSK = null;
    //     if (this.skDict.hasKey(names)) {
    //         let list = this.skDict.getValue(names);
    //         if (list.length > 0) {
    //             result = list.shift()
    //             this.skDict.set(names, list);
    //         }
    //     }
    //     if (result == null) {
    //         result = BattleBaseSK.create(names);
    //     }
    //     return result;
    // }
    // /**
    //  * 回收sk实例
    //  */
    // static skRecycle(sk: BattleBaseSK): void {
    //     let names = sk.key;
    //     console.log(names);
    //     let list: Array<BattleBaseSK> = [];
    //     if (this.skDict.hasKey(names)) {
    //         list = this.skDict.getValue(names);
    //         list.push(sk)
    //     }
    //     else {
    //         list.push(sk);
    //     }
    //     if (sk.parent != null) {
    //         sk.parent.removeChild(sk);
    //     }
    //     this.skDict.set(names, list);
    // }
}