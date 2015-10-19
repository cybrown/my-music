import {EventEmitter} from 'events';

export default class Dispatcher {

    private _dispatch: IDispatchFunction = this.createDispatchFunction();
    private _when: IRegisterHandler = this.createWhenFunction();

    get dispatch(): IDispatchFunction {
        return this._dispatch;
    }

    get when(): IRegisterHandler {
        return this._when;
    }

    private emitter = new EventEmitter();

    constructor(private render: Function) {
        this.createDispatchFunction
    }

    on(eventName: string, listener: Function) {
        console.log(`Listener for: ${eventName}`);
        return this.emitter.on(eventName, listener);
    }

    emit(eventName: string, ...args: any[]): boolean {
        console.log(`Event start: ${eventName}`);
        const value = this.emitter.emit(eventName, ...args);
        value || console.log(`Event NO HANDLERS: ${eventName}`);
        this.render();
        return value;
    }

    private createWhenFunction (): IRegisterHandler {
        return (eventName: string, handler: IEventHandler) => this.on(eventName, handler);
    }

    private createDispatchFunction (): IDispatchFunction {
        return (eventName: string, value: any) => this.emit(eventName, value);
    }
}

export interface IRegisterHandler {
    (event: string, handler: IEventHandler): void;
}

export interface IEventHandler {
    (value: any): void;
}

export interface IDispatchFunction {
    (eventName: string, value?: any): boolean;
}
