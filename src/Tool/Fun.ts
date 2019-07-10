import Game from "../Game";
import Dictionary from "./Dictionary";

export default class Fun {
	public static format(value, ...args): string {
		try {
			return value.replace(/{(\d+(:.*)?)}/g, function (match, i) {
				var s = match.split(':');
				if (s.length > 1) {
					i = i[0];
					match = s[1].replace('}', '');
				}

				var arg = Fun.formatPattern(match, args[i]);
				return typeof arg != 'undefined' && arg != null ? arg : "";
			});
		}
		catch (e) {
			return "";
		}
	}
	public static formatPattern(match, arg): string {
		switch (match) {
			case 'L':
				arg = arg.toLowerCase();
				break;
			case 'U':
				arg = arg.toUpperCase();
				break;
			default:
				break;
		}

		return arg;
	}

	// int
	// min <= r < max
	public static range(min: number, max: number) {
		let range = max - min;
		let rand = Math.random();
		return min + Math.floor(range * rand);
	}

	// int
	// min <= r <= max
	public static rangeBoth(min: number, max: number) {
		let range = max - min;
		let rand = Math.random();
		return min + Math.round(range * rand);
	}

	// int
	// min < r < max
	public static rangeBetween(min: number, max: number) {
		let range = max - min;
		let rand = Math.random();
		if (Math.round(rand * range) == 0) {
			return min + 1;
		}
		else if (Math.round(rand * max) == max) {
			return max - 1;
		}
		else {
			return min + Math.round(rand * range) - 1;
		}
	}

	/**
     * 计算两点之间的距离
     */
	public static twoPositionDistance(x1: number, y1: number, x2: number, y2: number): number {
		let disX = x1 - x2;
		let disY = y1 - y2;
		let dis = Math.pow(disX * disX + disY * disY, 0.5);
		return dis;
	}
    /**
     * 修整字符串，删除字符串首尾的无效内容
     */
	public static trimString(s: string): string {
		if (s) {
			return s.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
		}
		return "";
	}
    /**
     * 生成随机字符串
     * @param length 字符串长度
     */
	public static randString(length: number = 32): string {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var maxPos = chars.length;
		var str = '';
		for (let i = 0; i < length; i++) {
			str += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return str;
	}

    /**
     * 格式化时间
     * @param second 秒
     * @param length 返回几组信息
     * @example         1表示只返回秒（没什么用）
     *          2表示返回分钟和秒数  3:04
     *          3表示 返回小时分钟和秒数 2:03:04
     *          4表示返回 天数 小时 分钟和秒数 1:02:03:04
	 * @param tab 时间分隔符
     **/
	public static formatTime(second: number, length: number = 3, tab: string = ":"): string {
		second = Math.floor(second);
		length = Math.floor(length);
		if (!(second >= 0)) second = 0;
		if (length < 1) length = 1;
		else if (length > 4) length = 4;
		let _str = "";
		let div_arr: Array<number> = [1, 60, 3600, 86400];
		let rem_arr: Array<number> = [60, 60, 24, 99];
		for (let i = length - 1; i >= 0; i--) {
			let _a = Math.floor(second / div_arr[i]);
			let _b = _a
			if (i != length - 1) {
				_b = _a % rem_arr[i];
			}
			let _s = String(_b);
			if (i != length - 1 && _b < 10) {
				_s = "0" + _s;
			}
			if (_str.length == 0 && _b == 0) {

			}
			else {
				_str += _s;
				if (i != 0) {
					_str += tab;
				}
			}
		}
		return _str;
	}
	public static checkNullObj(obj): boolean {
		if (obj) {
			for (const key in obj) {
				return false;
			}
		}
		return true;
	}
	public static getHashKeyList(_hash: Object): Array<string> {
		let _list: Array<string> = [];
		for (const key in _hash) {
			if (_hash.hasOwnProperty(key)) {
				_list.push(key);
			}
		}
		return _list;
	}

	public static uint8ArrayToBase64(bytes: Uint8Array) {
		var binary = '';
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	}
	public static base64ToUint8Array(base64String) {
		String.prototype["repeat"] = function (count) {
			'use strict';
			if (this == null) {
				throw new TypeError('can\'t convert ' + this + ' to object');
			}
			var str = '' + this;
			count = +count;
			if (count != count) {
				count = 0;
			}
			if (count < 0) {
				throw new RangeError('repeat count must be non-negative');
			}
			if (count == Infinity) {
				throw new RangeError('repeat count must be less than infinity');
			}
			count = Math.floor(count);
			if (str.length == 0 || count == 0) {
				return '';
			}
			// 确保 count 是一个 31 位的整数。这样我们就可以使用如下优化的算法。
			// 当前（2014年8月），绝大多数浏览器都不能支持 1 << 28 长的字符串，所以：
			if (str.length * count >= 1 << 28) {
				throw new RangeError('repeat count must not overflow maximum string size');
			}
			var rpt = '';
			for (; ;) {
				if ((count & 1) == 1) {
					rpt += str;
				}
				count >>>= 1;
				if (count == 0) {
					break;
				}
				str += str;
			}
			return rpt;
		}

		const padding = '='["repeat"]((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');

		const rawData = atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}


	public static getResPath(filename: string, dir: string) {
		if (this.isNullOrEmpty(dir)) {
			return "res/" + filename;
		}
		else {
			return "res/" + dir + "/" + filename;
		}
	}

	private static isNullOrEmpty(x: string | string[]) {
		if (x instanceof Array)
			return x == null || x == undefined;
		return x == null || x == undefined || x == "";
	}
	private static _ScenePoint: Dictionary<string, Laya.Point> = new Dictionary<string, Laya.Point>();
	/**
	 * 屏幕左上角点的坐标
	 */
	public static get leftTopPoint(): Laya.Point {
		if (!this._ScenePoint.hasKey("leftTopPoint")) {
			let xx = Game.scenes.x >= 0 ? 0 : Game.scenes.x * -1;
			let yy = Game.scenes.y >= 0 ? 0 : Game.scenes.y * -1;
			this._ScenePoint.add("leftTopPoint", new Laya.Point(xx, yy));
		}
		return this._ScenePoint.getValue("leftTopPoint");
	}
	/**
	 * 屏幕左下角点的坐标
	 */
	public static get leftBottomPoint(): Laya.Point {
		if (!this._ScenePoint.hasKey("leftBottomPoint")) {
			let xx = Game.scenes.x >= 0 ? 0 : Game.scenes.x * -1;
			let yy = (Game.scenes.y >= 0 ? 0 : Game.scenes.y * -1) + Game.scenesWH.y;
			this._ScenePoint.add("leftBottomPoint", new Laya.Point(xx, yy));
		}
		return this._ScenePoint.getValue("leftBottomPoint");
	}
	/**
	 * 屏幕右上角点的坐标
	 */
	public static get rightTopPoint(): Laya.Point {
		if (!this._ScenePoint.hasKey("rightTopPoint")) {
			let xx = (Game.scenes.x >= 0 ? Game.scenes.x * -1 : 0) + Game.scenesWH.x - Game.scenes.x;
			let yy = Game.scenes.y >= 0 ? 0 : Game.scenes.y * -1;
			this._ScenePoint.add("rightTopPoint", new Laya.Point(xx, yy));
		}
		return this._ScenePoint.getValue("rightTopPoint");
	}
	/**
	 * 屏幕右下角点的坐标
	 */
	public static get rightBottomPoint(): Laya.Point {
		if (!this._ScenePoint.hasKey("rightBottomPoint")) {
			let xx = (Game.scenes.x >= 0 ? Game.scenes.x * -1 : 0) + Game.scenesWH.x - Game.scenes.x;
			let yy = (Game.scenes.y >= 0 ? 0 : Game.scenes.y * -1) + Game.scenesWH.y;
			this._ScenePoint.add("rightBottomPoint", new Laya.Point(xx, yy));
		}
		return this._ScenePoint.getValue("rightBottomPoint");
	}
	/**
	 * 屏幕顶部中心点的坐标
	 */
	public static get topMiddlePoint(): Laya.Point {
		if (!this._ScenePoint.hasKey("topMiddlePoint")) {
			let xx = (Game.scenes.x >= 0 ? 0 : Game.scenes.x * -1) + Game.scenesWH.x * 0.5;
			let yy = Game.scenes.y >= 0 ? 0 : Game.scenes.y * -1;
			this._ScenePoint.add("topMiddlePoint", new Laya.Point(xx, yy));
		}
		return this._ScenePoint.getValue("topMiddlePoint");
	}
}