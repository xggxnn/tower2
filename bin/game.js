if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
	require("swan-game-adapter.js");
	require("libs/laya.bdmini.js");
} else if (typeof wx !== "undefined") {
	require("weapp-adapter.js");
	require("libs/laya.wxmini.js");
}
window.Parser = require("libs/dom_parser.js")
window.loadLib = require;
require("index.js");