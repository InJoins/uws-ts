import * as Http from "http";
import * as Https from "https";
import * as EventEmitter from "events";

export type AddressInfo = {
    address: string;
    family: string;
    port: number;
};

export class WebSocket {
    protected constructor(external: any);

    readonly upgradeReq: any;
    readonly ready: number;
    readonly address: AddressInfo;

    // "event name": callback type
    // "message": (message: any) => void
    // "open": () => void
    // "close": (code?: number, reason?: string) => void
    // "error": (error: string, stack?: string) => void
    // "ping": (arg: any) => void
    // "pong": (arg: any) => void
    emit(eventName: string, arg1: any, arg2?: any): WebSocket;
    on(eventName: string, f: any): WebSocket;
    once(eventName: string, f: any): WebSocket;

    removeAllListeners(eventName?: string): WebSocket;
    removeListener(eventName: string, cb: any): WebSocket;

    // from here down, functions are not common between client and server
    send(message?: any, cb?: ((error: Error) => void), binary?: boolean, compress?: boolean): void;
    ping(message?: any, options?: any, dontFailWhenClosed?: boolean): void;
    terminate(): void;
    close(code?: number, reason?: string): void;
}

export class WebSocketClient extends WebSocket {
    constructor(uri: string);
}

export type ConnectionInfo = {
    req: Http.IncomingMessage;
    headers: Http.IncomingHttpHeaders;
    secure: boolean;
};

export type ServerOptions = {
    path?: string;
    port?: number;
    portAutoIncTo?: number;
    host?: string;
    server?: Http.Server | Https.Server;
    noDelay?: boolean;
    allowHalfOpen?: boolean;
    backlog?: number;
    maxPayload?: number;
    perMessageDeflate?: {
        serverNoContextTakeover: boolean;
    };
    verifyClient?: (info: ConnectionInfo, next?: ((result: boolean, code: number, name: string) => void)) => boolean;
};

export class WebSocketServer extends EventEmitter {
    constructor(options: ServerOptions, callback?: (() => void));

    readonly httpServer: Http.Server | Https.Server;

    broadcast(message: any, binary?: boolean): void;
    startAutoPing(interval: number, userMessage?: any): void;
    close(cb?: (() => void)): void;

    readonly clients: { length: number, forEach: ((cb: ((client: WebSocket) => void)) => void) };
}
