type Long = protobuf.Long;

/** Namespace Loginpackage. */
declare namespace Loginpackage {

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** 订单序号 */
        order?: (number|null);

        /** 协议id */
        protoid?: (number|null);

        /** 微信登录接口的code */
        code?: (string|null);

        /** 邀请人id */
        inviter?: (string|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Loginpackage.ILoginReq);

        /** 订单序号 */
        public order: number;

        /** 协议id */
        public protoid: number;

        /** 微信登录接口的code */
        public code: string;

        /** 邀请人id */
        public inviter: string;

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: Loginpackage.ILoginReq): Loginpackage.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link Loginpackage.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Loginpackage.ILoginReq, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link Loginpackage.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Loginpackage.ILoginReq, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Loginpackage.LoginReq;

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Loginpackage.LoginReq;

        /**
         * Verifies a LoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a LoginResp. */
    interface ILoginResp {

        /** 订单序号 */
        order?: (number|null);

        /** 协议id */
        protoid?: (number|null);

        /** 错误码，无则不赋值 */
        errcode?: (number|null);

        /** 用户数据变更,接入用户数据类的proto.message,暂不定义，无则不赋值 */
        userData?: (string|null);

        /** 服务器时间 */
        sysTime?: (number|null);
    }

    /** Represents a LoginResp. */
    class LoginResp implements ILoginResp {

        /**
         * Constructs a new LoginResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: Loginpackage.ILoginResp);

        /** 订单序号 */
        public order: number;

        /** 协议id */
        public protoid: number;

        /** 错误码，无则不赋值 */
        public errcode: number;

        /** 用户数据变更,接入用户数据类的proto.message,暂不定义，无则不赋值 */
        public userData: string;

        /** 服务器时间 */
        public sysTime: number;

        /**
         * Creates a new LoginResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginResp instance
         */
        public static create(properties?: Loginpackage.ILoginResp): Loginpackage.LoginResp;

        /**
         * Encodes the specified LoginResp message. Does not implicitly {@link Loginpackage.LoginResp.verify|verify} messages.
         * @param message LoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Loginpackage.ILoginResp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LoginResp message, length delimited. Does not implicitly {@link Loginpackage.LoginResp.verify|verify} messages.
         * @param message LoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Loginpackage.ILoginResp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LoginResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): Loginpackage.LoginResp;

        /**
         * Decodes a LoginResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): Loginpackage.LoginResp;

        /**
         * Verifies a LoginResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}

/** Namespace TowerUserpackage. */
declare namespace TowerUserpackage {

    /** Properties of a TowerUserMessage. */
    interface ITowerUserMessage {

        /** TowerUserMessage uuid */
        uuid?: (string|null);
    }

    /** Represents a TowerUserMessage. */
    class TowerUserMessage implements ITowerUserMessage {

        /**
         * Constructs a new TowerUserMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: TowerUserpackage.ITowerUserMessage);

        /** TowerUserMessage uuid. */
        public uuid: string;

        /**
         * Creates a new TowerUserMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TowerUserMessage instance
         */
        public static create(properties?: TowerUserpackage.ITowerUserMessage): TowerUserpackage.TowerUserMessage;

        /**
         * Encodes the specified TowerUserMessage message. Does not implicitly {@link TowerUserpackage.TowerUserMessage.verify|verify} messages.
         * @param message TowerUserMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TowerUserpackage.ITowerUserMessage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TowerUserMessage message, length delimited. Does not implicitly {@link TowerUserpackage.TowerUserMessage.verify|verify} messages.
         * @param message TowerUserMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TowerUserpackage.ITowerUserMessage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TowerUserMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TowerUserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): TowerUserpackage.TowerUserMessage;

        /**
         * Decodes a TowerUserMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TowerUserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): TowerUserpackage.TowerUserMessage;

        /**
         * Verifies a TowerUserMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Person. */
    interface IPerson {

        /** Person name */
        name?: (string|null);

        /** Person id */
        id?: (number|null);

        /** Person email */
        email?: (string|null);

        /** Person phone */
        phone?: (TowerUserpackage.Person.IPhoneNumber[]|null);

        /** Person tesPhone */
        tesPhone?: (number[]|null);

        /** Person userMsg */
        userMsg?: (TowerUserpackage.ITowerUserMessage|null);

        /** Person userMsgList */
        userMsgList?: (TowerUserpackage.ITowerUserMessage[]|null);
    }

    /** Represents a Person. */
    class Person implements IPerson {

        /**
         * Constructs a new Person.
         * @param [properties] Properties to set
         */
        constructor(properties?: TowerUserpackage.IPerson);

        /** Person name. */
        public name: string;

        /** Person id. */
        public id: number;

        /** Person email. */
        public email: string;

        /** Person phone. */
        public phone: TowerUserpackage.Person.IPhoneNumber[];

        /** Person tesPhone. */
        public tesPhone: number[];

        /** Person userMsg. */
        public userMsg?: (TowerUserpackage.ITowerUserMessage|null);

        /** Person userMsgList. */
        public userMsgList: TowerUserpackage.ITowerUserMessage[];

        /**
         * Creates a new Person instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Person instance
         */
        public static create(properties?: TowerUserpackage.IPerson): TowerUserpackage.Person;

        /**
         * Encodes the specified Person message. Does not implicitly {@link TowerUserpackage.Person.verify|verify} messages.
         * @param message Person message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TowerUserpackage.IPerson, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Person message, length delimited. Does not implicitly {@link TowerUserpackage.Person.verify|verify} messages.
         * @param message Person message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TowerUserpackage.IPerson, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Person message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): TowerUserpackage.Person;

        /**
         * Decodes a Person message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Person
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): TowerUserpackage.Person;

        /**
         * Verifies a Person message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    namespace Person {

        /** PhoneType enum. */
        enum PhoneType {
            MOBILE = 0,
            HOME = 1,
            WORK = 2
        }

        /** Properties of a PhoneNumber. */
        interface IPhoneNumber {

            /** PhoneNumber numbers */
            numbers?: (string|null);

            /** PhoneNumber types */
            types?: (TowerUserpackage.Person.PhoneType|null);
        }

        /** Represents a PhoneNumber. */
        class PhoneNumber implements IPhoneNumber {

            /**
             * Constructs a new PhoneNumber.
             * @param [properties] Properties to set
             */
            constructor(properties?: TowerUserpackage.Person.IPhoneNumber);

            /** PhoneNumber numbers. */
            public numbers: string;

            /** PhoneNumber types. */
            public types: TowerUserpackage.Person.PhoneType;

            /**
             * Creates a new PhoneNumber instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PhoneNumber instance
             */
            public static create(properties?: TowerUserpackage.Person.IPhoneNumber): TowerUserpackage.Person.PhoneNumber;

            /**
             * Encodes the specified PhoneNumber message. Does not implicitly {@link TowerUserpackage.Person.PhoneNumber.verify|verify} messages.
             * @param message PhoneNumber message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: TowerUserpackage.Person.IPhoneNumber, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Encodes the specified PhoneNumber message, length delimited. Does not implicitly {@link TowerUserpackage.Person.PhoneNumber.verify|verify} messages.
             * @param message PhoneNumber message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: TowerUserpackage.Person.IPhoneNumber, writer?: protobuf.Writer): protobuf.Writer;

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): TowerUserpackage.Person.PhoneNumber;

            /**
             * Decodes a PhoneNumber message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PhoneNumber
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): TowerUserpackage.Person.PhoneNumber;

            /**
             * Verifies a PhoneNumber message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);
        }
    }
}
