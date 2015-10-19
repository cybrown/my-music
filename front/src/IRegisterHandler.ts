export interface IRegisterHandler {
    (event: string, handler: (arg: any) => void): void;
}
