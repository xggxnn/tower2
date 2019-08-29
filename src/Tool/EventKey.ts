export default class EventKey {

    public static get CSV_LOAD_OVER(): string {
        return "CSV_LOAD_OVER";
    }

    // 秒触发
    public static get ENTER_SECOND(): string {
        return "ENTER_SECOND";
    }
    // 分钟触发
    public static get ENTER_MINUTE(): string {
        return "ENTER_MINUTE";
    }
    // 帧触发
    public static get ENTER_FRAME(): string {
        return "ENTER_FRAME";
    }
    // 下一秒触发
    public static get DATA_REQUEST(): string {
        return "DATA_REQUEST";
    }

    // 货币资源更新
    public static get COIN_GOLD_UPDATE(): string {
        return "MONEY_REFRUSH";
    }
    public static get COIN_DIAMOND_UPDATE(): string {
        return "COIN_DIAMOND_UPDATE";
    }
    public static get COIN_JADEITE_UPDATE(): string {
        return "COIN_JADEITE_UPDATE";
    }
    public static get HERO_LEVEL_UPDATE(): string {
        return "HERO_LEVEL_UPDATE";
    }
    public static get HERO_STAR_UPDATE(): string {
        return "HERO_STAR_UPDATE";
    }

    public static get CHANGESPEED(): string {
        return "CHANGESPEED";
    }

    // 跳过战斗
    public static get SKIPGAME(): string {
        return "SKIPGAME";
    }

    // 开始当前游戏
    public static get GAMESTART(): string {
        return "GAMESTART";
    }
    // 重新开始当前游戏
    public static get RE_TRYPLAY(): string {
        return "RE_TRYPLAY";
    }
    // 失败
    public static get GAMELOSE(): string {
        return "GAMELOSE";
    }
    // 胜利
    public static get GAMEWIN(): string {
        return "GAMEWIN";
    }
    // 退出战斗
    public static get GAMEEXIT(): string {
        return "GAMEEXIT";
    }
    // 加载完成
    public static get LOADER_COMPLETE(): string {
        return "LOADER_COMPLETE";
    }

    public static get LOADER_OVER(): string {
        return "LOADER_OVER";
    }
    public static get LOADER_PROGRESS(): string {
        return "LOADER_PROGRESS";
    }
    public static get LOADER_ERROR(): string {
        return "LOADER_ERROR";
    }
    public static get LOADER_FAIL(): string {
        return "LOADER_FAIL";
    }
    public static get SHOW_UI_WAIT(): string {
        return "SHOW_UI_WAIT";
    }
    public static get CLOSE_UI_WAIT(): string {
        return "CLOSE_UI_WAIT";
    }
    /**
     * 显示系统等待界面
     */
    public static get SHOW_WAIT(): string {
        return "SHOW_WAIT";
    }
    /**
     * 关闭系统等待界面
     */
    public static get CLOSE_WAIT(): string {
        return "CLOSE_WAIT";
    }


    // 地图信息已更新
    public static get MAP_REFRUSH(): string {
        return "MAP_REFRUSH";
    }
    // 添加英雄
    public static get ADD_HERO(): string {
        return "ADD_HERO";
    }
    // 移除英雄
    public static get REMOVE_HERO(): string {
        return "REMOVE_HERO";
    }
    // 添加敌人
    public static get ADD_ENEMY(): string {
        return "ADD_ENEMY";
    }
    // 移除敌人
    public static get REMOVE_ENEMY(): string {
        return "REMOVE_ENEMY";
    }
    // 暂停
    public static get GAME_PAUSE(): string {
        return "GAME_PAUSE";
    }
    // 继续游戏
    public static get GAME_CONTINUE(): string {
        return "GAME_CONTINUE";
    }
    // 战斗场景是否触发羁绊
    public static get FETTERS_SHOW_HIDE(): string {
        return "FETTERS_SHOW_HIDE";
    }
    // 释放技能
    public static get PLAY_SKILL(): string {
        return "PLAY_SKILL";
    }
    // 引导释放技能
    public static get GUIDE_PLAY_SKILL(): string {
        return "GUIDE_PLAY_SKILL";
    }
}