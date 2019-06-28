import BaseSK from "../base/BaseSK";
import Dictionary from "./Dictionary";

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
        if (newCls.parent != null) {
            newCls.parent.removeChild(newCls);
        }
        else if (newCls.displayObject.parent != null) {
            newCls.displayObject.parent.removeChild(newCls.displayObject);
        }
        Laya.Pool.recover(url, newCls);
    }

    /************************ sk对象池 ************************** */
    private static skDict: Dictionary<string, Array<BaseSK>> = new Dictionary<string, Array<BaseSK>>();
    /**
     * 获取sk实例
     */
    static skFetch(names: string): BaseSK {
        let result: BaseSK = null;
        if (this.skDict.hasKey(names)) {
            let list = this.skDict.getValue(names);
            if (list.length > 0) {
                result = list[0];
                list.splice(0, 1);
                this.skDict.set(names, list);
            }
        }
        if (result == null) {
            result = BaseSK.create(names);
        }
        result.scale(1, 1, true);
        return result;
    }
    /**
     * 回收sk实例
     */
    static skRecycle(sk: BaseSK): void {
        let names = sk.key;
        let list: Array<BaseSK> = new Array<BaseSK>();
        if (this.skDict.hasKey(names)) {
            list = this.skDict.getValue(names);
            list.push(sk)
        }
        else {
            list.push(sk);
        }
        if (sk.parent != null) {
            sk.parent.removeChild(sk);
        }
        this.skDict.set(names, list);
    }
}