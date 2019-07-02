export default class EventKey {




    public static get ENTER_SECOND(): string {
        return "ENTER_SECOND";
    }
    public static get ENTER_MINUTE(): string {
        return "ENTER_MINUTE";
    }
    public static get ENTER_FRAME(): string {
        return "ENTER_FRAME";
    }
    public static get DATA_REQUEST(): string {
        return "DATA_REQUEST";
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
    /**
     * 显示等待界面
     */
    public static get SHOW_WAIT(): string {
        return "SHOW_WAIT";
    }
    /**
     * 关闭等待界面
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
}