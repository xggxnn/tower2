import Proto1000 from "./Proto1000";
import Proto1001 from "./Proto1001";
import Proto1002 from "./Proto1002";
import Proto1003 from "./Proto1003";
import Proto1004 from "./Proto1004";
import Proto1005 from "./Proto1005";
import Proto1006 from "./Proto1006";
import Proto1007 from "./Proto1007";
import Proto1008 from "./Proto1008";
import Proto1009 from "./Proto1009";
import Proto1010 from "./Proto1010";
import Proto1011 from "./Proto1011";
import Proto101 from "./Proto101";

export default class ProtoHash {
    static protoHash: Object = {
        "1000": new Proto1000(),
        "1001": new Proto1001(),
        "1002": new Proto1002(),
        "1003": new Proto1003(),
        "1004": new Proto1004(),
        "1005": new Proto1005(),
        "1006": new Proto1006(),
        "1007": new Proto1007(),
        "1008": new Proto1008(),
        "1009": new Proto1009(),
        "1010": new Proto1010(),
        "1011": new Proto1011(),
        "101": new Proto101(),
    }
}
