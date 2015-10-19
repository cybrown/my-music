export interface Dict<T> {
    [key: string]: T;
}

export function newDict<T>(): Dict<T> {
    return Object.create(null);
}

export function toArray<T>(dict: Dict<T>): T[] {
    return Object.keys(dict).map(key => dict[key]);
}
