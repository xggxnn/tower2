export default class ShareManager {
	private static _title: string = "一边撸着猫一边就能玩的塔防--守护家园塔防";
	public static set title(v: string) {
		this._title = v;
	}

	private static _url: string = "https://ms.yz063.com/iron_throne/share/share.jpg";
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
				// query: "id=" + UserData.openid,
			};
		});
	}
	// 主动分享
	public static share(): void {
		wx["shareAppMessage"]({
			title: ShareManager._title,
			imageUrl: ShareManager._url,
			// query: "id=" + UserData.openid,
		});
		// BJManager.BJstat("share");
	}
}