import Dictionary from "../Tool/Dictionary";

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

	// 打开此窗口需要调用的函数
	initFunction: Dictionary<string, Function>;
}