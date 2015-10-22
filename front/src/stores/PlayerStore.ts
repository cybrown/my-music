import Song from '../models/Song';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import {IRegisterHandler, On, initEvents} from '../Dispatcher';
import {RepeatModeEnum} from '../components/RepeatMode';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {newDict} from '../utils/Dict';

export default class PlaylistStore {

    //song: Song = null;
    audioElement: HTMLAudioElement = null;
    stalled = false;

    constructor (private when: IRegisterHandler) {
        initEvents(when, this);
    }

    @On('player.audio.ready')
    playerAudioReady(audio: HTMLAudioElement) {
        this.audioElement = audio;
    }

    @On('player.action.pause')
    pause() {
        this.audioElement.pause();
    }

    @On('player.audio.events.stalled')
    setStalled() {
        this.stalled = true;
    }

    @On('player.audio.events.canplay')
    setCanPlay() {
        this.stalled = false;
    }

    @On('player.action.play')
    play() {
        this.audioElement.play();
    }

    @On('player.volume.set')
    setVolume(volume: number) {
        this.audioElement.volume = volume;
    }
}
