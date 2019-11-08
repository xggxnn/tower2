import Game from "../Game";

export default class LoadFilesList {

    // res_effect文件夹内的effect类别的加载列表 
    static get res_effect_effect_ResList() {
        let _list: Array<string> = [];
        _list.push("res_effect/effect_1001.sk");
        _list.push("res_effect/effect_1002.sk");
        _list.push("res_effect/effect_1003.sk");
        _list.push("res_effect/effect_1004.sk");
        _list.push("res_effect/effect_1005.sk");
        _list.push("res_effect/effect_1006.sk");
        _list.push("res_effect/effect_1007.sk");
        _list.push("res_effect/effect_1008.sk");
        _list.push("res_effect/effect_1009.sk");
        _list.push("res_effect/effect_1010.sk");
        _list.push("res_effect/effect_1011.sk");
        _list.push("res_effect/effect_1012.sk");
        _list.push("res_effect/effect_1013.sk");
        _list.push("res_effect/effect_1014.sk");
        _list.push("res_effect/effect_1015.sk");
        _list.push("res_effect/effect_1016.sk");
        _list.push("res_effect/effect_1017.sk");
        _list.push("res_effect/effect_1018.sk");
        _list.push("res_effect/effect_1019.sk");
        _list.push("res_effect/effect_1020.sk");
        _list.push("res_effect/effect_1021.sk");
        _list.push("res_effect/effect_1022.sk");
        _list.push("res_effect/effect_1023.sk");
        _list.push("res_effect/effect_1024.sk");
        _list.push("res_effect/effect_1025.sk");
        _list.push("res_effect/effect_1026.sk");
        _list.push("res_effect/effect_1027.sk");
        _list.push("res_effect/effect_1028.sk");
        _list.push("res_effect/effect_1029.sk");
        _list.push("res_effect/effect_1030.sk");
        _list.push("res_effect/effect_1031.sk");
        _list.push("res_effect/effect_1032.sk");
        _list.push("res_effect/effect_2001.sk");
        _list.push("res_effect/effect_2002.sk");
        _list.push("res_effect/effect_2003.sk");
        _list.push("res_effect/effect_2004.sk");
        _list.push("res_effect/effect_2005.sk");
        _list.push("res_effect/effect_2006.sk");
        _list.push("res_effect/effect_3.sk");
        _list.push("res_effect/effect_3001.sk");
        _list.push("res_effect/effect_4.sk");
        _list.push("res_effect/effect_ui01.sk");
        _list.push("res_effect/effect_ui02.sk");
        _list.push("res_effect/effect_ui03.sk");
        _list.push("res_effect/effect_ui04.sk");
        return _list;
    }


    // res_effect文件夹内的effect类别的加载列表 
    static get res_npc_ResList() {
        let _list: Array<string> = [];
        _list.push("res_sk/npc_1.sk");
        return _list;
    }


    // res_sk文件夹内的enemy类别的加载列表
    static get res_sk_enemy_ResList() {
        let _list: Array<string> = [];
        _list.push("res_sk/enemy_1.sk");
        _list.push("res_sk/enemy_10.sk");
        _list.push("res_sk/enemy_11.sk");
        _list.push("res_sk/enemy_12.sk");
        _list.push("res_sk/enemy_13.sk");
        _list.push("res_sk/enemy_14.sk");
        _list.push("res_sk/enemy_15.sk");
        _list.push("res_sk/enemy_16.sk");
        _list.push("res_sk/enemy_17.sk");
        _list.push("res_sk/enemy_18.sk");
        _list.push("res_sk/enemy_19.sk");
        _list.push("res_sk/enemy_2.sk");
        _list.push("res_sk/enemy_20.sk");
        _list.push("res_sk/enemy_21.sk");
        _list.push("res_sk/enemy_22.sk");
        _list.push("res_sk/enemy_23.sk");
        _list.push("res_sk/enemy_24.sk");
        _list.push("res_sk/enemy_25.sk");
        _list.push("res_sk/enemy_26.sk");
        _list.push("res_sk/enemy_27.sk");
        _list.push("res_sk/enemy_28.sk");
        _list.push("res_sk/enemy_29.sk");
        _list.push("res_sk/enemy_3.sk");
        _list.push("res_sk/enemy_30.sk");
        _list.push("res_sk/enemy_31.sk");
        _list.push("res_sk/enemy_32.sk");
        _list.push("res_sk/enemy_33.sk");
        _list.push("res_sk/enemy_34.sk");
        _list.push("res_sk/enemy_35.sk");
        _list.push("res_sk/enemy_36.sk");
        _list.push("res_sk/enemy_37.sk");
        _list.push("res_sk/enemy_38.sk");
        _list.push("res_sk/enemy_39.sk");
        _list.push("res_sk/enemy_4.sk");
        _list.push("res_sk/enemy_40.sk");
        _list.push("res_sk/enemy_41.sk");
        _list.push("res_sk/enemy_42.sk");
        _list.push("res_sk/enemy_43.sk");
        _list.push("res_sk/enemy_5.sk");
        _list.push("res_sk/enemy_6.sk");
        _list.push("res_sk/enemy_7.sk");
        _list.push("res_sk/enemy_8.sk");
        _list.push("res_sk/enemy_9.sk");

        Game.haveEnemyTem = [];
        for (let i = _list.length - 1; i >= 0; i--) {
            let str = _list[i];
            let id = Number(str.substring(str.lastIndexOf('_') + 1, str.lastIndexOf('.')));
            Game.haveEnemyTem.push(id);
        }
        return _list;
    }


    // res_sk文件夹内的hero类别的加载列表 
    static get res_sk_hero_ResList() {
        let _list: Array<string> = [];
        _list.push("res_sk/hero_1.sk");
        _list.push("res_sk/hero_10.sk");
        _list.push("res_sk/hero_11.sk");
        _list.push("res_sk/hero_12.sk");
        _list.push("res_sk/hero_13.sk");
        _list.push("res_sk/hero_14.sk");
        _list.push("res_sk/hero_15.sk");
        _list.push("res_sk/hero_16.sk");
        _list.push("res_sk/hero_17.sk");
        _list.push("res_sk/hero_18.sk");
        _list.push("res_sk/hero_19.sk");
        _list.push("res_sk/hero_2.sk");
        _list.push("res_sk/hero_20.sk");
        _list.push("res_sk/hero_21.sk");
        _list.push("res_sk/hero_22.sk");
        _list.push("res_sk/hero_23.sk");
        _list.push("res_sk/hero_24.sk");
        _list.push("res_sk/hero_25.sk");
        _list.push("res_sk/hero_26.sk");
        _list.push("res_sk/hero_27.sk");
        _list.push("res_sk/hero_28.sk");
        _list.push("res_sk/hero_29.sk");
        _list.push("res_sk/hero_3.sk");
        _list.push("res_sk/hero_30.sk");
        _list.push("res_sk/hero_31.sk");
        _list.push("res_sk/hero_32.sk");
        _list.push("res_sk/hero_33.sk");
        _list.push("res_sk/hero_34.sk");
        _list.push("res_sk/hero_35.sk");
        _list.push("res_sk/hero_4.sk");
        _list.push("res_sk/hero_5.sk");
        _list.push("res_sk/hero_6.sk");
        _list.push("res_sk/hero_7.sk");
        _list.push("res_sk/hero_8.sk");
        _list.push("res_sk/hero_9.sk");

        Game.haveHeroTem = [];
        for (let i = _list.length - 1; i >= 0; i--) {
            let str = _list[i];
            let id = Number(str.substring(str.lastIndexOf('_') + 1, str.lastIndexOf('.')));
            Game.haveHeroTem.push(id);
        }
        return _list;
    }


    /**
     * 加载全部资源
     */
    static get allResList() {
        let _list: Array<string> = [];
        _list = _list.concat(this.res_effect_effect_ResList);
        _list = _list.concat(this.res_npc_ResList);
        _list = _list.concat(this.res_sk_enemy_ResList);
        _list = _list.concat(this.res_sk_hero_ResList);
        return _list;
    }

}
