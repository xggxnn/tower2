import Game from "../Game";
import EventManager from "./EventManager";
import EventKey from "./EventKey";
import SystemManager from "./SystemManager";

export default class ShareManager {
	private static _title: string = "开局抓到一只唐僧，你能守住多少关？";
	private static _title2: string = "来帮我巡山，我分你吃唐僧肉！";
	public static set title(v: string) {
		this._title = v;
	}

	private static _url: string = "https://ms.yz063.com/iron_throne/share/750600.png";
	public static set url(v: string) {
		this._url = v;
	}

    /**
     * 初始化
     */
	public static init(): void {
		this.userinf = null;
		this.showMenu();
		this.onShare();
	}
	// 显示右上角列表里的分享按钮
	private static showMenu(): void {
		wx.showShareMenu({
			withShareTicket: false,
			success: null,
			fail: null,
			complete: null,
		});
	}
	// 被动转发 监听点击右上角转发
	private static onShare(): void {
		wx["onShareAppMessage"](function () {
			return {
				title: ShareManager._title,
				imageUrl: ShareManager._url,
				query: "id=" + Game.userData.openid,
			};
		});
	}
	// 主动分享
	public static share(): void {
		wx["shareAppMessage"]({
			title: ShareManager._title2,
			imageUrl: ShareManager._url,
			query: "id=" + Game.userData.openid,
		});
	}

	public static subscribe(): void {
		const ids = '9diFqoELCMDT7MfBwNHneo-8SlUwpLGrA5Zx0vIAbVU';
		wx["requestSubscribeMessage"]({
			tmplIds: [ids],//刚申请的订阅模板id
			success(res) {
				if (res[ids] == 'accept') {
					//用户同意了订阅
					wx.showToast({
						title: '订阅成功',
						icon: "",
						image: "",
						duration: 1500,
						mask: true,
						success: function () {
							// console.log("accept success");
						},
						fail: function () {
							// console.log("accept fail");
						},
						complete: function () {
							// console.log("accept complete");
						},
					});
				} else {
					//用户拒绝了订阅或当前游戏被禁用订阅消息
					wx.showToast({
						title: '订阅失败',
						icon: "",
						image: "",
						duration: 1500,
						mask: true,
						success: function () {
							// console.log("else accept complete");
						},
						fail: function () {
							// console.log("else accept complete");
						},
						complete: function () {
							// console.log("else accept complete");
						},
					});
				}
			},
			fail(res) {
				// console.log("fail:res");
				// console.log(res);
			},
			complete(res) {
				// console.log("complete:res");
				// console.log(res);
			}
		})
	}

	public static userinf = null;


	private static userInfoBtn = null;
	private static userInfoState: boolean = false;
	public static UserInfHome(pos: Laya.Rectangle): void {
		if (this.userinf != null) {
			this.hideUserInfHomeBtn();
			let data = {
				myOpenId: Game.userData.openid,
				myName: this.userinf["nickName"],
				myAvatarUrl: this.userinf["avatarUrl"],
				friendOpenId: "",
			}
			Game.proto.reqFriendPatrol(data);
			Game.proto.friendPatrolData();
		} else {
			if (this.userInfoBtn == null) {
				let r = Math.min(SystemManager.screenWidth / 1280, SystemManager.screenHeight / 720);
				this.userInfoBtn = Laya.Browser.window.wx.createUserInfoButton({
					type: 'image',
					image: 'https://ms.yz063.com/iron_throne/img/empty.png',
					style: {
						left: pos.x * r,
						top: pos.y * r,
						width: pos.width * r,
						height: pos.height * r,
					}
				})
				this.userInfoBtn.onTap((res) => {
					if (res.userInfo) {
						this.userinf = res.userInfo;
						// console.log(res, "res");
						if (this.userInfoState) {
							this.userInfoState = false;
							this.userInfoBtn.hide();
							let data = {
								myOpenId: Game.userData.openid,
								myName: res.userInfo["nickName"],
								myAvatarUrl: res.userInfo["avatarUrl"],
								friendOpenId: "",
							}
							Game.proto.reqFriendPatrol(data);
							Game.proto.friendPatrolData();
						}
					}
				});
				this.userInfoState = false;
			}
			if (!this.userInfoState) {
				this.userInfoState = true;
				this.userInfoBtn.show();
			}
		}
	}
	public static hideUserInfHomeBtn(): void {
		if (this.userInfoBtn != null && this.userInfoState) {
			this.userInfoState = false;
			this.userInfoBtn.hide();
		}
	}

	private static userInfoBtn1 = null;
	private static userInfoState1: boolean = false;
	public static UserInfHomeEndless(pos: Laya.Rectangle): void {
		if (this.userinf != null) {
			this.hideUserInfHomeEndlessBtn();

		} else {
			if (this.userInfoBtn1 == null) {
				let r = Math.min(SystemManager.screenWidth / 1280, SystemManager.screenHeight / 720);
				this.userInfoBtn1 = Laya.Browser.window.wx.createUserInfoButton({
					type: 'image',
					image: 'https://ms.yz063.com/iron_throne/img/empty.png',
					style: {
						left: pos.x * r,
						top: pos.y * r,
						width: pos.width * r,
						height: pos.height * r,
					}
				})
				this.userInfoBtn1.onTap((res) => {
					if (res.userInfo) {
						this.userinf = res.userInfo;
						// console.log(res, "res");
						if (this.userInfoState1) {
							this.userInfoState1 = false;
							this.userInfoBtn1.hide();
							let data = {
								myName: res.userInfo["nickName"],
								myAvatarUrl: res.userInfo["avatarUrl"],
							}
							Game.proto.endlessSort(data);
						}
					}
				});
				this.userInfoState1 = false;
			}
			if (!this.userInfoState1) {
				this.userInfoState1 = true;
				this.userInfoBtn1.show();
			}
		}
	}
	public static hideUserInfHomeEndlessBtn(): void {
		if (this.userInfoBtn1 != null && this.userInfoState1) {
			this.userInfoState1 = false;
			this.userInfoBtn1.hide();
		}
	}

	private static userInfoBtn2 = null;
	private static userInfoState2: boolean = false;
	public static UserInfMenu(pos: Laya.Rectangle): void {
		if (this.userinf != null) {
			this.hideUserInfMenuBtn();
			let data = {
				myOpenId: Game.userData.openid,
				myName: this.userinf["nickName"],
				myAvatarUrl: this.userinf["avatarUrl"],
				friendOpenId: "",
			}
			Game.proto.reqFriendPatrol(data);
			Game.proto.friendPatrolData();
		} else {
			if (this.userInfoBtn2 == null) {
				let r = Math.min(SystemManager.screenWidth / 1280, SystemManager.screenHeight / 720);
				this.userInfoBtn2 = Laya.Browser.window.wx.createUserInfoButton({
					type: 'image',
					image: 'https://ms.yz063.com/iron_throne/img/empty.png',
					style: {
						left: pos.x * r,
						top: pos.y * r,
						width: pos.width * r,
						height: pos.height * r,
					}
				})
				this.userInfoBtn2.onTap((res) => {
					if (res.userInfo) {
						this.userinf = res.userInfo;
						// console.log(res, "res");
						if (this.userInfoState2) {
							this.userInfoState2 = false;
							this.userInfoBtn2.hide();
							let data = {
								myOpenId: Game.userData.openid,
								myName: res.userInfo["nickName"],
								myAvatarUrl: res.userInfo["avatarUrl"],
								friendOpenId: "",
							}
							Game.proto.reqFriendPatrol(data);
							Game.proto.friendPatrolData();
						}
					}
				});
				this.userInfoState2 = false;
			}
			if (!this.userInfoState2) {
				this.userInfoState2 = true;
				this.userInfoBtn2.show();
			}
		}
	}
	public static hideUserInfMenuBtn(): void {
		if (this.userInfoBtn2 != null && this.userInfoState2) {
			this.userInfoState2 = false;
			this.userInfoBtn2.hide();
		}
	}
	private static userInfoBtn0 = null;
	private static userInfoState0: boolean = false;
	public static UserInfLogin(pos: Laya.Rectangle): void {
		if (this.userinf != null) {
			this.hideUserInfLogin();
			let data = {
				myOpenId: Game.userData.openid,
				myName: this.userinf["nickName"],
				myAvatarUrl: this.userinf["avatarUrl"],
				friendOpenId: Game.userData.inviter,
			}
			Game.proto.reqFriendPatrol(data);
		}
		else {
			if (this.userInfoBtn0 == null) {
				let r = Math.min(SystemManager.screenWidth / 1280, SystemManager.screenHeight / 720);
				this.userInfoBtn0 = Laya.Browser.window.wx.createUserInfoButton({
					type: 'image',
					image: 'https://ms.yz063.com/iron_throne/img/empty.png',
					style: {
						left: pos.x * r,
						top: pos.y * r,
						width: pos.width * r,
						height: pos.height * r,
					}
				})
				this.userInfoBtn0.onTap((res) => {
					if (res.userInfo) {
						this.userinf = res.userInfo;
						// console.log(res, "res");
						if (this.userInfoState0) {
							this.userInfoState0 = false;
							this.userInfoBtn0.hide();
							let data = {
								myOpenId: Game.userData.openid,
								myName: res.userInfo["nickName"],
								myAvatarUrl: res.userInfo["avatarUrl"],
								friendOpenId: Game.userData.inviter,
							}
							Game.proto.reqFriendPatrol(data);
						}
					}
				});
				this.userInfoState0 = false;
			}
			if (!this.userInfoState0) {
				this.userInfoState0 = true;
				this.userInfoBtn0.show();
			}
		}
	}
	public static hideUserInfLogin(): void {
		if (this.userInfoBtn0 != null && this.userInfoState0) {
			this.userInfoState0 = false;
			this.userInfoBtn0.hide();
		}
	}
}