// ===========================
// 打开menu参数接口
// ---------------------------
export interface MenuOpenParameter {

	// 索引
	openIndex: number | string;

	// 额外参数
	args: any[];

	// 不关闭其他子面板
	dontCloseOther: boolean;

}