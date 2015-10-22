import {EventEmitter} from 'events';
import Album from './models/Album';
import Artist from './models/Artist';
import Song from './models/Song';
import SongInPlaylist from './models/SongInPlaylist';
import DoubleLinkedListEntry from './utils/DoubleLinkedListEntry';
import {RepeatModeEnum} from './components/RepeatMode';

type FunctionWithOnEvent = Function & {__onEvent: string};

export interface IRegisterHandler {
    (event: string, handler: IEventHandler): void;
}

export interface IEventHandler {
    (...args: any[]): void;
}

export function On(eventName: string): MethodDecorator {
    return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<Object>) {
        if (typeof target[key] === 'function') {
            target[key].__onEvent = eventName;
        }
    }
}

export function initEvents(when: IRegisterHandler, that: Object) {
    const prototype = Object.getPrototypeOf(that);
    for (let key in prototype) {
        const method = prototype[key];
        if (typeof method === 'function' && method.__onEvent) {
            ((method: FunctionWithOnEvent) => when(method.__onEvent, (...args: any[]) => method.call(that, ...args)))(method);
            console.log(`Listener <${method.__onEvent}> on ${prototype.constructor.name}`);
        }
    }
}

export default class Dispatcher {

    private emitter = new EventEmitter();

    constructor(private render: Function) {

    }

    on = (eventName: string, listener: Function) => {
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

    playlistGoNext(): void {
        this.emit('playlist.go.next');
    }

    playlistGoPrev(): void {
        this.emit('playlist.go.prev');
    }

    playlistGoFirst(): void {
        this.emit('playlist.go.first');
    }

    playlistGoLast(): void {
        this.emit('playlist.go.last');
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

    playlistRepeatSet(mode: RepeatModeEnum): void {
        this.emit('playlist.repeat.set', mode);
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

    playerAudioEventsCanPlay(event: Event): void {
        this.emit('player.audio.events.canplay');
    }

    playerActionPlay(): void {
        this.emit('player.action.play');
    }

    playerActionPause(): void {
        this.emit('player.action.pause');
    }

    playerVolumeSet(volume: number): void {
        this.emit('player.volume.set', volume);
    }
}
