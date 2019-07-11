export default class LoadFilesList {

    // effect文件夹内的effect类别的加载列表 
    static get effect_effect_ResList() {
        let _list: Array<string> = [];
        _list.push("res/effect/effect_1.sk");
        return _list;
    }

    // sk文件夹内的enemy类别的加载列表 
    static get sk_enemy_ResList() {
        let _list: Array<string> = [];
        _list.push("res/sk/enemy_28.sk");
        return _list;
    }

    // sk文件夹内的hero类别的加载列表 
    static get sk_hero_ResList() {
        let _list: Array<string> = [];
        _list.push("res/sk/hero_12.sk");
        return _list;
    }

    /**
     * 加载全部资源
     */
    static get allResList() {
        let _list: Array<string> = [];
        _list = _list.concat(this.effect_effect_ResList); 
        _list = _list.concat(this.sk_enemy_ResList); 
        _list = _list.concat(this.sk_hero_ResList); 
        return _list;
    }

}
