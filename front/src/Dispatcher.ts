import {EventEmitter} from 'events';
import Album from './models/Album';
import Artist from './models/Artist';
import Song from './models/Song';
import SongInPlaylist from './models/SongInPlaylist';
import DoubleLinkedListEntry from './utils/DoubleLinkedListEntry';
import {RepeatModeEnum} from './components/RepeatMode';

export interface IRegisterHandler {
    (event: string, handler: IEventHandler): void;
}

export interface IEventHandler {
    (value: any): void;
}

export default class Dispatcher {

    private _when: IRegisterHandler = (eventName: string, handler: IEventHandler) => this.on(eventName, handler);

    get when(): IRegisterHandler {
        return this._when;
    }

    private emitter = new EventEmitter();

    constructor(private render: Function) {

    }

    private on(eventName: string, listener: Function) {
        console.log(`Listener for: ${eventName}`);
        return this.emitter.on(eventName, listener);
    }

    private emit(eventName: string, ...args: any[]): boolean {
        console.log(`Event start: ${eventName}`);
        const value = this.emitter.emit(eventName, ...args);
        value || console.log(`Event NO HANDLERS: ${eventName}`);
        this.render();
        return value;
    }

    playlistPlayAfter(songs: Song[]): void {
        this.emit('playlist.playAfter', songs);
    }

    playlistClearAndPlay(songs: Song[]): void {
        this.emit('playlist.clearAndPlay', songs);
    }

    musiclibraryArtistSet(artist: Artist): void {
        this.emit('musiclibrary.artist.set', artist);
    }

    musiclibraryAlbumSet(album: Album): void {
        this.emit('musiclibrary.album.set', album);
    }

    playlistAppend(songs: Song[]): void {
        this.emit('playlist.append', songs);
    }

    playlistEntryPlay(entry: DoubleLinkedListEntry<SongInPlaylist>): void {
        this.emit('playlist.entry.play', entry);
    }

    playlistEntryRemove(entry: DoubleLinkedListEntry<SongInPlaylist>): void {
        this.emit('playlist.entry.remove', entry);
    }

    playlistEntryMoveup(entry: DoubleLinkedListEntry<SongInPlaylist>): void {
        this.emit('playlist.entry.moveup', entry);
    }

    playlistEntryMovedown(entry: DoubleLinkedListEntry<SongInPlaylist>): void {
        this.emit('playlist.entry.movedown', entry);
    }

    playerAudioReady(audioElement: HTMLAudioElement): void {
        this.emit('player.audio.ready', audioElement);
    }

    playerGoNext(): void {
        this.emit('player.go.next');
    }

    playerGoPrev(): void {
        this.emit('player.go.prev');
    }

    playerGoFirst(): void {
        this.emit('player.go.first');
    }

    playerGoLast(): void {
        this.emit('player.go.last');
    }

    playerEnded(): void {
        this.emit('player.ended');
    }

    playerAudioEventsStalled(event: Event): void {
        this.emit('player.audio.events.stalled', event);
    }

    playerAudioEventsError(event: Event): void {
        this.emit('player.audio.events.error', event);
    }

    playerRepeatSet(mode: RepeatModeEnum): void {
        this.emit('player.repeat.set', mode);
    }

    playlistLoadPlaylist(name: string): void {
        this.emit('playlist.load.byName', name);
    }

    playlistRemove(name: string): void {
        this.emit('playlist.remove', name);
    }

    playlistSaveCurrent(name: string): void {
        this.emit('playlist.save.current', name);
    }

    playlistClear(): void {
        this.emit('playlist.clear');
    }

    playlistRandom(): void {
        this.emit('playlist.random');
    }
}
