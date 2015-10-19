import DoubleLinkedListEntry from './DoubleLinkedListEntry';

export default class DoubleLinkedList<T> {
    first: DoubleLinkedListEntry<T>;
    last: DoubleLinkedListEntry<T>;

    push(entry: DoubleLinkedListEntry<T>): void {
        entry.isLast = true;
        if (!this.first) {
            this.first = entry;
            this.last = entry;
            entry.prev = entry;
            entry.next = entry;
            entry.isLast = true;
            entry.isFirst = true;
        } else {
            this.last.next = entry;
            this.last.isLast = false;
            entry.prev = this.last;
            entry.next = this.first;
            this.first.prev = entry;
            this.last = entry;
        }
    }

    clear() {
        this.first = null;
        this.last = null;
    }

    toArray(): DoubleLinkedListEntry<T>[] {
        return this.map(x => x);
    }

    remove(entry: DoubleLinkedListEntry<T>) {
        if (entry !== entry.next) {
            entry.next.prev = entry.prev;
            entry.prev.next = entry.next;
            if (entry.isLast) {
                entry.prev.isLast = true;
                this.last = <any> entry.prev;
            }
            if (entry.isFirst) {
                entry.next.isFirst = true;
                this.first = <any> entry.next;
            }
        } else {
            this.first = null;
            this.last = null;
        }
        entry.isFirst = false;
        entry.isLast = false;
    }

    insertAfter(newEntry: DoubleLinkedListEntry<T>, afterEntry: DoubleLinkedListEntry<T>) {
        newEntry.prev = afterEntry;
        newEntry.next = afterEntry.next;
        newEntry.prev.next = newEntry;
        newEntry.next.prev = newEntry;
        if (newEntry.prev.isLast) {
            newEntry.prev.isLast = false;
            newEntry.isLast = true;
            this.last = newEntry;
        }
    }

    insertBefore(newEntry: DoubleLinkedListEntry<T>, beforeEntry: DoubleLinkedListEntry<T>) {
        newEntry.next = beforeEntry;
        newEntry.prev = beforeEntry.prev;
        newEntry.prev.next = newEntry;
        newEntry.next.prev = newEntry;
        if (newEntry.next.isFirst) {
            newEntry.next.isFirst = false;
            newEntry.isFirst = true;
            this.first = newEntry;
        }
    }

    movePrev(entry: DoubleLinkedListEntry<T>) {
        if (!entry.isFirst) {
            const previousPrev = entry.prev;
            this.remove(entry);
            this.insertBefore(entry, <any> previousPrev);
        }
    }

    moveNext(entry: DoubleLinkedListEntry<T>) {
        if (!entry.isLast) {
            const previousNext = entry.next;
            this.remove(entry);
            this.insertAfter(entry, <any> previousNext);
        }
    }

    map<U>(func: (entry: DoubleLinkedListEntry<T>) => U) {
        const results: U[] = [];
        if (this.first) {
            let cur = this.first;
            do {
                results.push(func(cur));
            } while (!cur.isLast && (cur = <any> cur.next));
        }
        return results;
    }
}
