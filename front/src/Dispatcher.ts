import {EventEmitter} from 'events';
import Album from './models/Album';
import Artist from './models/Artist';
import Song from './models/Song';
import SongInPlaylist from './models/SongInPlaylist';
import DoubleLinkedListEntry from './utils/DoubleLinkedListEntry';
import {RepeatModeEnum} from './components/RepeatMode';
import {IPlaylistAndInfoDispatcher} from './components/PlaylistAndInfo';
import {IMusicLibraryDispatcher} from './components/MusicLibrary';
import {IMiniPlayerDispatcher} from './components/MiniPlayer';
import {IAudioDispatcher} from './components/Audio';

type FunctionWithOnEvent = Function & {__onEvent: string};
type FunctionWithEmitEvent = Function & {__emitEvent: string};

export type IRegisterHandler = (event: string, handler: IEventHandler) => void;
export type IEventHandler = (...args: any[]) => void;

export function On(target: any, key: string, descriptor: TypedPropertyDescriptor<Object>) {
    if (typeof target[key] === 'function') {
        target[key].__onEvent = key;
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

export function Emit(target: any, key: string, descriptor: TypedPropertyDescriptor<Object>) {
    if (typeof target[key] === 'function') {
        target[key].__emitEvent = key;
    }
}

export function initEmitEvents(emit: (eventName: string, ...args: any[]) => boolean, that: Object) {
    const prototype = Object.getPrototypeOf(that);
    for (let key in prototype) {
        const method = prototype[key];
        if (typeof method === 'function' && method.__emitEvent) {
            (<any> that)[key] = (function (eventName: string) {
                return (...args: any[]) => {
                    console.log(`Event <${eventName}> on ${prototype.constructor.name}`);
                    const value = emit(eventName, ...args);
                    value || console.log(`Event NO HANDLERS: ${eventName}`);
                    return value;
                };
            })(method.__emitEvent);
            console.log(`Emitter <${method.__emitEvent}> on ${prototype.constructor.name}`);
        }
    }
}

export default class Dispatcher implements
    IPlaylistAndInfoDispatcher,
    IMusicLibraryDispatcher,
    IMiniPlayerDispatcher,
    IAudioDispatcher {

    private emitter = new EventEmitter();
    on = (eventName: string, listener: Function) => this.emitter.on(eventName, listener);
    emit = (eventName: string, ...args: any[]): boolean => {
        this.render();
        return this.emitter.emit(eventName, ...args);
    }

    constructor(private render: Function) {
        initEmitEvents(this.emit, this);
    }

    @Emit playlistPlayAfter(songs: Song[]): void { }
    @Emit playlistClearAndPlay(songs: Song[]): void { }
    @Emit musiclibraryArtistSet(artist: Artist): void { }
    @Emit musiclibraryAlbumSet(album: Album): void { }
    @Emit playlistAppend(songs: Song[]): void { }
    @Emit playlistEntryPlay(entry: DoubleLinkedListEntry<SongInPlaylist>): void { }
    @Emit playlistEntryRemove(entry: DoubleLinkedListEntry<SongInPlaylist>): void { }
    @Emit playlistEntryMoveup(entry: DoubleLinkedListEntry<SongInPlaylist>): void { }
    @Emit playlistEntryMovedown(entry: DoubleLinkedListEntry<SongInPlaylist>): void { }
    @Emit playerAudioReady(audioElement: HTMLAudioElement): void { }
    @Emit playlistGoNext(): void { }
    @Emit playlistGoPrev(): void { }
    @Emit playlistGoFirst(): void { }
    @Emit playlistGoLast(): void { }
    @Emit playerEnded(): void { }
    @Emit playerAudioEventsStalled(event: Event): void { }
    @Emit playerAudioEventsError(event: Event): void { }
    @Emit playlistRepeatSet(mode: RepeatModeEnum): void { }
    @Emit playlistLoadByName(name: string): void { }
    @Emit playlistRemove(name: string): void { }
    @Emit playlistSaveCurrent(name: string): void { }
    @Emit playlistClear(): void { }
    @Emit playlistRandom(): void { }
    @Emit playerAudioEventsCanplay(event: Event): void { }
    @Emit playerActionPlay(): void { }
    @Emit playerActionPause(): void { }
    @Emit playerVolumeSet(volume: number): void { }
}
