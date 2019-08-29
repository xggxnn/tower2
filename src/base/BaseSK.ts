import BaseFilter from "../base/BaseFilter";
import EventManager from "../tool/EventManager";
import TempletManager from "../Tool/TempletManager";
import EventKey from "../Tool/EventKey";
import Game from "../Game";

export default class BaseSK extends BaseFilter {
	public static create(key: string): BaseSK {
		return new BaseSK(key);
	}
	constructor(key: string) {
		super();
		this._key = key;
		let _templet: Laya.Templet = TempletManager.getTemplet(this._key);
		if (_templet) {
			this.init(_templet);
		} else {
			EventManager.on(TempletManager.TEMPLET_INIT_COMPLETE, this, this.templetInitOver);
			//添加高权资源
		}
	}
	public onDisable(): void {
		EventManager.offAllCaller(this);
		if (this._skeleton) this._skeleton.offAll();
	}

	private _key: string = "";
	public get key(): string {
		return this._key;
	}
	private templetInitOver(key: string, templet: Laya.Templet): void {
		if (key != this._key) return;
		EventManager.off(TempletManager.TEMPLET_INIT_COMPLETE, this, this.templetInitOver);
		this.init(templet);
	}
	private init(templet: Laya.Templet): void {
		this._skeleton = templet.buildArmature(0);
		this._skeleton.x = 0;
		this._skeleton.y = 0;
		this.addChild(this._skeleton);
		if (this._currAnimation) this._skeleton.play(this._currAnimation, this._isLoop);
		let num = this._skeleton.getAnimNum();
		if (this._isPause) this._skeleton.paused();
		this.speed = this._speed;
		for (let i = 0; i < this._lableHandlerList.length; i++) {
			let _handler: Laya.Handler = this._lableHandlerList[i];
			this._skeleton.on(Laya.Event.LABEL, _handler.caller, _handler.method, _handler.args);
		}
		for (let i = 0; i < this._stopHandlerList.length; i++) {
			let _handler: Laya.Handler = this._stopHandlerList[i];
			this._skeleton.on(Laya.Event.STOPPED, _handler.caller, _handler.method, _handler.args);
		}
		this._lableHandlerList = [];
		this._stopHandlerList = [];
	}
	private _skeleton: Laya.Skeleton = null;
	private _currAnimation: string = "";
	private _isLoop: boolean = true;
	private _isPause: boolean = false;
	protected _speed: number = 1;
	public get skeleton(): Laya.Skeleton {
		return this._skeleton;
	}
	private _lableHandlerList: Array<Laya.Handler> = [];
	private _stopHandlerList: Array<Laya.Handler> = [];
	public addLableEvent(handler: Laya.Handler): void {
		if (this._skeleton) {
			this._skeleton.on(Laya.Event.LABEL, handler.caller, handler.method, handler.args);
		} else {
			this._lableHandlerList.push(handler);
		}
	}
	public removeLableEvent(handler: Laya.Handler): void {
		if (this._skeleton) {
			this._skeleton.off(Laya.Event.LABEL, handler.caller, handler.method);
		} else {
			if (this._lableHandlerList.length) {
				for (let i = this._lableHandlerList.length - 1; i >= 0; i--) {
					let _handler: Laya.Handler = this._lableHandlerList[i];
					if (_handler.caller == handler.caller && _handler.method == handler.method) {
						this._lableHandlerList.splice(i, 1);
					}
				}
			}
		}
	}
	public addStopEvent(handler: Laya.Handler): void {
		if (this._skeleton) {
			this._skeleton.on(Laya.Event.STOPPED, handler.caller, handler.method, handler.args);
		} else {
			this._stopHandlerList.push(handler);
		}
	}
	public removeStopEvent(handler: Laya.Handler): void {
		if (this._skeleton) {
			this._skeleton.off(Laya.Event.STOPPED, handler.caller, handler.method);
		} else {
			if (this._stopHandlerList.length) {
				for (let i = this._stopHandlerList.length - 1; i >= 0; i--) {
					let _handler: Laya.Handler = this._stopHandlerList[i];
					if (_handler.caller == handler.caller && _handler.method == handler.method) {
						this._stopHandlerList.splice(i, 1);
					}
				}
			}
		}
	}
	public play(animation: string, loop: boolean): void {
		if (this._skeleton) {
			if (this._skeleton.templet) {
				this._skeleton.play(animation, loop);
			}
		} else {
			this._currAnimation = animation;
			this._isLoop = loop;
		}
	}
	public stop(): void {
		if (this._skeleton) {
			this._skeleton.paused();
		} else {
			this._isPause = true;
		}
	}
    /**
     * 动画的播放速度 [ 0: 停止播放, (0~1): 慢速播放, 1: 正常播放, (1~N): 快速播放 ]
     */
	public set speed(v: number) {
		if (this._skeleton) {
			this._skeleton.playbackRate(v * Game.playData.gameSpeed);
		} else {
			this._speed = v;
		}
	}

	public pauseAni(): void {
		if (this._skeleton) {
			this._skeleton.paused();
		}
	}
	public resumeAni(): void {
		if (this._skeleton) {
			this._skeleton.resume();
		}
	}

}