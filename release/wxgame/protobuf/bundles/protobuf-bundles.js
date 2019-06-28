var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Loginpackage = (function() {

    /**
     * Namespace Loginpackage.
     * @exports Loginpackage
     * @namespace
     */
    var Loginpackage = {};

    Loginpackage.LoginReq = (function() {

        /**
         * Properties of a LoginReq.
         * @memberof Loginpackage
         * @interface ILoginReq
         * @property {number|null} [order] 订单序号
         * @property {number|null} [protoid] 协议id
         * @property {string|null} [code] 微信登录接口的code
         * @property {string|null} [inviter] 邀请人id
         */

        /**
         * Constructs a new LoginReq.
         * @memberof Loginpackage
         * @classdesc Represents a LoginReq.
         * @implements ILoginReq
         * @constructor
         * @param {Loginpackage.ILoginReq=} [properties] Properties to set
         */
        function LoginReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 订单序号
         * @member {number} order
         * @memberof Loginpackage.LoginReq
         * @instance
         */
        LoginReq.prototype.order = 0;

        /**
         * 协议id
         * @member {number} protoid
         * @memberof Loginpackage.LoginReq
         * @instance
         */
        LoginReq.prototype.protoid = 0;

        /**
         * 微信登录接口的code
         * @member {string} code
         * @memberof Loginpackage.LoginReq
         * @instance
         */
        LoginReq.prototype.code = "";

        /**
         * 邀请人id
         * @member {string} inviter
         * @memberof Loginpackage.LoginReq
         * @instance
         */
        LoginReq.prototype.inviter = "";

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @function create
         * @memberof Loginpackage.LoginReq
         * @static
         * @param {Loginpackage.ILoginReq=} [properties] Properties to set
         * @returns {Loginpackage.LoginReq} LoginReq instance
         */
        LoginReq.create = function create(properties) {
            return new LoginReq(properties);
        };

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link Loginpackage.LoginReq.verify|verify} messages.
         * @function encode
         * @memberof Loginpackage.LoginReq
         * @static
         * @param {Loginpackage.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.order != null && message.hasOwnProperty("order"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.order);
            if (message.protoid != null && message.hasOwnProperty("protoid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.protoid);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.code);
            if (message.inviter != null && message.hasOwnProperty("inviter"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.inviter);
            return writer;
        };

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link Loginpackage.LoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Loginpackage.LoginReq
         * @static
         * @param {Loginpackage.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof Loginpackage.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Loginpackage.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Loginpackage.LoginReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.order = reader.int32();
                    break;
                case 2:
                    message.protoid = reader.int32();
                    break;
                case 3:
                    message.code = reader.string();
                    break;
                case 4:
                    message.inviter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Loginpackage.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Loginpackage.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginReq message.
         * @function verify
         * @memberof Loginpackage.LoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.order != null && message.hasOwnProperty("order"))
                if (!$util.isInteger(message.order))
                    return "order: integer expected";
            if (message.protoid != null && message.hasOwnProperty("protoid"))
                if (!$util.isInteger(message.protoid))
                    return "protoid: integer expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.inviter != null && message.hasOwnProperty("inviter"))
                if (!$util.isString(message.inviter))
                    return "inviter: string expected";
            return null;
        };

        return LoginReq;
    })();

    Loginpackage.LoginResp = (function() {

        /**
         * Properties of a LoginResp.
         * @memberof Loginpackage
         * @interface ILoginResp
         * @property {number|null} [order] 订单序号
         * @property {number|null} [protoid] 协议id
         * @property {number|null} [errcode] 错误码，无则不赋值
         * @property {string|null} [userData] 用户数据变更,接入用户数据类的proto.message,暂不定义，无则不赋值
         * @property {number|null} [sysTime] 服务器时间
         */

        /**
         * Constructs a new LoginResp.
         * @memberof Loginpackage
         * @classdesc Represents a LoginResp.
         * @implements ILoginResp
         * @constructor
         * @param {Loginpackage.ILoginResp=} [properties] Properties to set
         */
        function LoginResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 订单序号
         * @member {number} order
         * @memberof Loginpackage.LoginResp
         * @instance
         */
        LoginResp.prototype.order = 0;

        /**
         * 协议id
         * @member {number} protoid
         * @memberof Loginpackage.LoginResp
         * @instance
         */
        LoginResp.prototype.protoid = 0;

        /**
         * 错误码，无则不赋值
         * @member {number} errcode
         * @memberof Loginpackage.LoginResp
         * @instance
         */
        LoginResp.prototype.errcode = 0;

        /**
         * 用户数据变更,接入用户数据类的proto.message,暂不定义，无则不赋值
         * @member {string} userData
         * @memberof Loginpackage.LoginResp
         * @instance
         */
        LoginResp.prototype.userData = "";

        /**
         * 服务器时间
         * @member {number} sysTime
         * @memberof Loginpackage.LoginResp
         * @instance
         */
        LoginResp.prototype.sysTime = 0;

        /**
         * Creates a new LoginResp instance using the specified properties.
         * @function create
         * @memberof Loginpackage.LoginResp
         * @static
         * @param {Loginpackage.ILoginResp=} [properties] Properties to set
         * @returns {Loginpackage.LoginResp} LoginResp instance
         */
        LoginResp.create = function create(properties) {
            return new LoginResp(properties);
        };

        /**
         * Encodes the specified LoginResp message. Does not implicitly {@link Loginpackage.LoginResp.verify|verify} messages.
         * @function encode
         * @memberof Loginpackage.LoginResp
         * @static
         * @param {Loginpackage.ILoginResp} message LoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.order != null && message.hasOwnProperty("order"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.order);
            if (message.protoid != null && message.hasOwnProperty("protoid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.protoid);
            if (message.errcode != null && message.hasOwnProperty("errcode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.errcode);
            if (message.userData != null && message.hasOwnProperty("userData"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.userData);
            if (message.sysTime != null && message.hasOwnProperty("sysTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.sysTime);
            return writer;
        };

        /**
         * Encodes the specified LoginResp message, length delimited. Does not implicitly {@link Loginpackage.LoginResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Loginpackage.LoginResp
         * @static
         * @param {Loginpackage.ILoginResp} message LoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginResp message from the specified reader or buffer.
         * @function decode
         * @memberof Loginpackage.LoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Loginpackage.LoginResp} LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Loginpackage.LoginResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.order = reader.int32();
                    break;
                case 2:
                    message.protoid = reader.int32();
                    break;
                case 3:
                    message.errcode = reader.int32();
                    break;
                case 4:
                    message.userData = reader.string();
                    break;
                case 5:
                    message.sysTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Loginpackage.LoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Loginpackage.LoginResp} LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginResp message.
         * @function verify
         * @memberof Loginpackage.LoginResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.order != null && message.hasOwnProperty("order"))
                if (!$util.isInteger(message.order))
                    return "order: integer expected";
            if (message.protoid != null && message.hasOwnProperty("protoid"))
                if (!$util.isInteger(message.protoid))
                    return "protoid: integer expected";
            if (message.errcode != null && message.hasOwnProperty("errcode"))
                if (!$util.isInteger(message.errcode))
                    return "errcode: integer expected";
            if (message.userData != null && message.hasOwnProperty("userData"))
                if (!$util.isString(message.userData))
                    return "userData: string expected";
            if (message.sysTime != null && message.hasOwnProperty("sysTime"))
                if (!$util.isInteger(message.sysTime))
                    return "sysTime: integer expected";
            return null;
        };

        return LoginResp;
    })();

    return Loginpackage;
})();

$root.TowerUserpackage = (function() {

    /**
     * Namespace TowerUserpackage.
     * @exports TowerUserpackage
     * @namespace
     */
    var TowerUserpackage = {};

    TowerUserpackage.TowerUserMessage = (function() {

        /**
         * Properties of a TowerUserMessage.
         * @memberof TowerUserpackage
         * @interface ITowerUserMessage
         * @property {string|null} [uuid] TowerUserMessage uuid
         */

        /**
         * Constructs a new TowerUserMessage.
         * @memberof TowerUserpackage
         * @classdesc Represents a TowerUserMessage.
         * @implements ITowerUserMessage
         * @constructor
         * @param {TowerUserpackage.ITowerUserMessage=} [properties] Properties to set
         */
        function TowerUserMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TowerUserMessage uuid.
         * @member {string} uuid
         * @memberof TowerUserpackage.TowerUserMessage
         * @instance
         */
        TowerUserMessage.prototype.uuid = "";

        /**
         * Creates a new TowerUserMessage instance using the specified properties.
         * @function create
         * @memberof TowerUserpackage.TowerUserMessage
         * @static
         * @param {TowerUserpackage.ITowerUserMessage=} [properties] Properties to set
         * @returns {TowerUserpackage.TowerUserMessage} TowerUserMessage instance
         */
        TowerUserMessage.create = function create(properties) {
            return new TowerUserMessage(properties);
        };

        /**
         * Encodes the specified TowerUserMessage message. Does not implicitly {@link TowerUserpackage.TowerUserMessage.verify|verify} messages.
         * @function encode
         * @memberof TowerUserpackage.TowerUserMessage
         * @static
         * @param {TowerUserpackage.ITowerUserMessage} message TowerUserMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TowerUserMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            return writer;
        };

        /**
         * Encodes the specified TowerUserMessage message, length delimited. Does not implicitly {@link TowerUserpackage.TowerUserMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TowerUserpackage.TowerUserMessage
         * @static
         * @param {TowerUserpackage.ITowerUserMessage} message TowerUserMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TowerUserMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TowerUserMessage message from the specified reader or buffer.
         * @function decode
         * @memberof TowerUserpackage.TowerUserMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TowerUserpackage.TowerUserMessage} TowerUserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TowerUserMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TowerUserpackage.TowerUserMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TowerUserMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TowerUserpackage.TowerUserMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TowerUserpackage.TowerUserMessage} TowerUserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TowerUserMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TowerUserMessage message.
         * @function verify
         * @memberof TowerUserpackage.TowerUserMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TowerUserMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            return null;
        };

        return TowerUserMessage;
    })();

    TowerUserpackage.Person = (function() {

        /**
         * Properties of a Person.
         * @memberof TowerUserpackage
         * @interface IPerson
         * @property {string|null} [name] Person name
         * @property {number|null} [id] Person id
         * @property {string|null} [email] Person email
         * @property {Array.<TowerUserpackage.Person.IPhoneNumber>|null} [phone] Person phone
         * @property {Array.<number>|null} [tesPhone] Person tesPhone
         * @property {TowerUserpackage.ITowerUserMessage|null} [userMsg] Person userMsg
         * @property {Array.<TowerUserpackage.ITowerUserMessage>|null} [userMsgList] Person userMsgList
         */

        /**
         * Constructs a new Person.
         * @memberof TowerUserpackage
         * @classdesc Represents a Person.
         * @implements IPerson
         * @constructor
         * @param {TowerUserpackage.IPerson=} [properties] Properties to set
         */
        function Person(properties) {
            this.phone = [];
            this.tesPhone = [];
            this.userMsgList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Person name.
         * @member {string} name
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.name = "";

        /**
         * Person id.
         * @member {number} id
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.id = 0;

        /**
         * Person email.
         * @member {string} email
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.email = "";

        /**
         * Person phone.
         * @member {Array.<TowerUserpackage.Person.IPhoneNumber>} phone
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.phone = $util.emptyArray;

        /**
         * Person tesPhone.
         * @member {Array.<number>} tesPhone
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.tesPhone = $util.emptyArray;

        /**
         * Person userMsg.
         * @member {TowerUserpackage.ITowerUserMessage|null|undefined} userMsg
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.userMsg = null;

        /**
         * Person userMsgList.
         * @member {Array.<TowerUserpackage.ITowerUserMessage>} userMsgList
         * @memberof TowerUserpackage.Person
         * @instance
         */
        Person.prototype.userMsgList = $util.emptyArray;

        /**
         * Creates a new Person instance using the specified properties.
         * @function create
         * @memberof TowerUserpackage.Person
         * @static
         * @param {TowerUserpackage.IPerson=} [properties] Properties to set
         * @returns {TowerUserpackage.Person} Person instance
         */
        Person.create = function create(properties) {
            return new Person(properties);
        };

        /**
         * Encodes the specified Person message. Does not implicitly {@link TowerUserpackage.Person.verify|verify} messages.
         * @function encode
         * @memberof TowerUserpackage.Person
         * @static
         * @param {TowerUserpackage.IPerson} message Person message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Person.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.email != null && message.hasOwnProperty("email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            if (message.phone != null && message.phone.length)
                for (var i = 0; i < message.phone.length; ++i)
                    $root.TowerUserpackage.Person.PhoneNumber.encode(message.phone[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.tesPhone != null && message.tesPhone.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.tesPhone.length; ++i)
                    writer.int32(message.tesPhone[i]);
                writer.ldelim();
            }
            if (message.userMsg != null && message.hasOwnProperty("userMsg"))
                $root.TowerUserpackage.TowerUserMessage.encode(message.userMsg, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.userMsgList != null && message.userMsgList.length)
                for (var i = 0; i < message.userMsgList.length; ++i)
                    $root.TowerUserpackage.TowerUserMessage.encode(message.userMsgList[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Person message, length delimited. Does not implicitly {@link TowerUserpackage.Person.verify|verify} messages.
         * @function encodeDelimited
         * @memberof TowerUserpackage.Person
         * @static
         * @param {TowerUserpackage.IPerson} message Person message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Person.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @function decode
         * @memberof TowerUserpackage.Person
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TowerUserpackage.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Person.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TowerUserpackage.Person();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.email = reader.string();
                    break;
                case 4:
                    if (!(message.phone && message.phone.length))
                        message.phone = [];
                    message.phone.push($root.TowerUserpackage.Person.PhoneNumber.decode(reader, reader.uint32()));
                    break;
                case 5:
                    if (!(message.tesPhone && message.tesPhone.length))
                        message.tesPhone = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.tesPhone.push(reader.int32());
                    } else
                        message.tesPhone.push(reader.int32());
                    break;
                case 6:
                    message.userMsg = $root.TowerUserpackage.TowerUserMessage.decode(reader, reader.uint32());
                    break;
                case 7:
                    if (!(message.userMsgList && message.userMsgList.length))
                        message.userMsgList = [];
                    message.userMsgList.push($root.TowerUserpackage.TowerUserMessage.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Person message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof TowerUserpackage.Person
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {TowerUserpackage.Person} Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Person.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Person message.
         * @function verify
         * @memberof TowerUserpackage.Person
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Person.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.phone != null && message.hasOwnProperty("phone")) {
                if (!Array.isArray(message.phone))
                    return "phone: array expected";
                for (var i = 0; i < message.phone.length; ++i) {
                    var error = $root.TowerUserpackage.Person.PhoneNumber.verify(message.phone[i]);
                    if (error)
                        return "phone." + error;
                }
            }
            if (message.tesPhone != null && message.hasOwnProperty("tesPhone")) {
                if (!Array.isArray(message.tesPhone))
                    return "tesPhone: array expected";
                for (var i = 0; i < message.tesPhone.length; ++i)
                    if (!$util.isInteger(message.tesPhone[i]))
                        return "tesPhone: integer[] expected";
            }
            if (message.userMsg != null && message.hasOwnProperty("userMsg")) {
                var error = $root.TowerUserpackage.TowerUserMessage.verify(message.userMsg);
                if (error)
                    return "userMsg." + error;
            }
            if (message.userMsgList != null && message.hasOwnProperty("userMsgList")) {
                if (!Array.isArray(message.userMsgList))
                    return "userMsgList: array expected";
                for (var i = 0; i < message.userMsgList.length; ++i) {
                    var error = $root.TowerUserpackage.TowerUserMessage.verify(message.userMsgList[i]);
                    if (error)
                        return "userMsgList." + error;
                }
            }
            return null;
        };

        /**
         * PhoneType enum.
         * @name TowerUserpackage.Person.PhoneType
         * @enum {string}
         * @property {number} MOBILE=0 MOBILE value
         * @property {number} HOME=1 HOME value
         * @property {number} WORK=2 WORK value
         */
        Person.PhoneType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MOBILE"] = 0;
            values[valuesById[1] = "HOME"] = 1;
            values[valuesById[2] = "WORK"] = 2;
            return values;
        })();

        Person.PhoneNumber = (function() {

            /**
             * Properties of a PhoneNumber.
             * @memberof TowerUserpackage.Person
             * @interface IPhoneNumber
             * @property {string|null} [numbers] PhoneNumber numbers
             * @property {TowerUserpackage.Person.PhoneType|null} [types] PhoneNumber types
             */

            /**
             * Constructs a new PhoneNumber.
             * @memberof TowerUserpackage.Person
             * @classdesc Represents a PhoneNumber.
             * @implements IPhoneNumber
             * @constructor
             * @param {TowerUserpackage.Person.IPhoneNumber=} [properties] Properties to set
             */
            function PhoneNumber(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PhoneNumber numbers.
             * @member {string} numbers
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @instance
             */
            PhoneNumber.prototype.numbers = "";

            /**
             * PhoneNumber types.
             * @member {TowerUserpackage.Person.PhoneType} types
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @instance
             */
            PhoneNumber.prototype.types = 0;

            /**
             * Creates a new PhoneNumber instance using the specified properties.
             * @function create
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @static
             * @param {TowerUserpackage.Person.IPhoneNumber=} [properties] Properties to set
             * @returns {TowerUserpackage.Person.PhoneNumber} PhoneNumber instance
             */
            PhoneNumber.create = function create(properties) {
                return new PhoneNumber(properties);
            };

            /**
             * Encodes the specified PhoneNumber message. Does not implicitly {@link TowerUserpackage.Person.PhoneNumber.verify|verify} messages.
             * @function encode
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @static
             * @param {TowerUserpackage.Person.IPhoneNumber} message PhoneNumber message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PhoneNumber.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.numbers != null && message.hasOwnProperty("numbers"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.numbers);
                if (message.types != null && message.hasOwnProperty("types"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.types);
                return writer;
            };

            /**
             * Encodes the specified PhoneNumber message, length delimited. Does not implicitly {@link TowerUserpackage.Person.PhoneNumber.verify|verify} messages.
             * @function encodeDelimited
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @static
             * @param {TowerUserpackage.Person.IPhoneNumber} message PhoneNumber message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PhoneNumber.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer.
             * @function decode
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {TowerUserpackage.Person.PhoneNumber} PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PhoneNumber.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TowerUserpackage.Person.PhoneNumber();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.numbers = reader.string();
                        break;
                    case 2:
                        message.types = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {TowerUserpackage.Person.PhoneNumber} PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PhoneNumber.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PhoneNumber message.
             * @function verify
             * @memberof TowerUserpackage.Person.PhoneNumber
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PhoneNumber.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.numbers != null && message.hasOwnProperty("numbers"))
                    if (!$util.isString(message.numbers))
                        return "numbers: string expected";
                if (message.types != null && message.hasOwnProperty("types"))
                    switch (message.types) {
                    default:
                        return "types: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };

            return PhoneNumber;
        })();

        return Person;
    })();

    return TowerUserpackage;
})();