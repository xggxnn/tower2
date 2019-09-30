import EventManager from "./EventManager";
import EventKey from "./EventKey";
import Game from "../Game";

export default class AdsManager {

    private static get UNIT_VIDEO(): string {
        return 'adunit-2861e2e2d1fdcf6a';
    }

    public static init(): void {
        this.videoAd = Laya.Browser.window.wx.createRewardedVideoAd({
            adUnitId: AdsManager.UNIT_VIDEO
        });
        this.videoAd.onLoad(function () {
            let data = {
                type: "videoAd",
                state: 1,
            }
            Game.proto.logUpload(data);
            AdsManager.loadState = 1;
        });
        this.videoAd.onError(function (err) {
            console.log("videoAd load error:", err);
            let data = {
                type: "videoAd",
                state: 0,
            }
            Game.proto.logUpload(data);
            AdsManager.loadState = 0;
        });
        this.videoAd.onClose(function (res) {
            EventManager.event(EventKey.CLOSE_WAIT);
            console.log("videoAd onClose");
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res === undefined || (res && res.isEnded)) {
                // 正常播放结束，可以下发游戏奖励
                AdsManager.loadState = 0;
                let data = {
                    type: "videoAd",
                    state: 9,
                }
                Game.proto.logUpload(data);
                EventManager.event(EventKey.REWARDED_VIDEO_AD_YES);
            } else {
                let data = {
                    type: "videoAd",
                    state: 10,
                }
                Game.proto.logUpload(data);
                // 播放中途退出，不下发游戏奖励
                EventManager.event(EventKey.REWARDED_VIDEO_AD_CLOSE);
            }
        });
        EventManager.on(EventKey.ENTER_SECOND, this, this.reload);
    }

    public static get usable() {
        return this.loadState == 1;
    }

    /**
    * 视频广告状态
    * 0失败
    * 1成功
    * 2加载中
    */
    private static loadState: number = 0;
    private static videoAd = null;
    private static reload(): void {
        if (this.loadState != 0) {
            return;
        }
        if (this.videoAd == null) {
            return;
        }
        this.loadState = 2;
        this.videoAd.load();
    }

    public static show(): void {
        let data = {
            type: "videoAd",
            state: 8,
        }
        Game.proto.logUpload(data);
        if (this.videoAd) {
            EventManager.event(EventKey.SHOW_WAIT);
            this.videoAd.show().catch(function (err) {
                console.log("videoAd.show err", err);
                AdsManager.loadState = 0;
                EventManager.event(EventKey.REWARDED_VIDEO_AD_NO);
            })
        } else {
            AdsManager.loadState = 0;
            EventManager.event(EventKey.REWARDED_VIDEO_AD_NO);
        }
    }
}