export default class DoubleLinkedListEntry<T> {
    uuid = Math.random().toString();
    next: DoubleLinkedListEntry<T>;
    prev: DoubleLinkedListEntry<T>;
    isLast: boolean = false;
    isFirst: boolean = false;

    constructor(public value: T) {

    }
}
