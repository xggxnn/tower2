import Game from "../Game";

export default class ShareManager {
	private static _title: string = "开局抓到一只唐僧，你能守住多少关？";
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
			title: ShareManager._title,
			imageUrl: ShareManager._url,
			query: "id=" + Game.userData.openid,
		});
	}
}