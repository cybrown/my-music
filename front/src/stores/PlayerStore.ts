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

    @On private playerAudioReady(audio: HTMLAudioElement) {
        this.audioElement = audio;
    }

    @On private playerActionPause() {
        this.audioElement.pause();
    }

    @On private playerAudioEventsStalled() {
        this.stalled = true;
    }

    @On private playerAudioEventsCanplay() {
        this.stalled = false;
    }

    @On private playerActionPlay() {
        this.audioElement.play();
    }

    @On private playerVolumeSet(volume: number) {
        this.audioElement.volume = volume;
    }
}
