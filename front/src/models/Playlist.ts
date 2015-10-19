import Song from './Song';
import DoubleLinkedList from '../utils/DoubleLinkedList';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import SongInPlaylist from './SongInPlaylist';

export default class Playlist {

    list = new DoubleLinkedList<SongInPlaylist>();

    appendSong(song: Song) {
        this.list.push(new DoubleLinkedListEntry(new SongInPlaylist(song)));
    }

    clear(): void {
        this.list.clear();
    }

    get first(): DoubleLinkedListEntry<SongInPlaylist> {
        return this.list.first;
    }

    get last(): DoubleLinkedListEntry<SongInPlaylist> {
        return this.list.last;
    }

    remove(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.list.remove(entry);
    }

    movePrev(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.list.movePrev(entry);
    }

    moveNext(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.list.moveNext(entry);
    }

    map<T>(func: (entry: DoubleLinkedListEntry<SongInPlaylist>) => T) {
        return this.list.map(func);
    }
}
