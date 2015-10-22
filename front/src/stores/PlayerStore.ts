import Song from '../models/Song';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import {IRegisterHandler} from '../Dispatcher';
import {RepeatModeEnum} from '../components/RepeatMode';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {newDict} from '../utils/Dict';

export default class PlaylistStore {

    //song: Song = null;
    audioElement: HTMLAudioElement = null;
    stalled = false;

    constructor (private when: IRegisterHandler) {

        when('player.audio.ready', (audio: HTMLAudioElement) => {
            this.audioElement = audio;
        });

        when('player.audio.events.stalled', () => this.stalled = true);

        when('player.audio.events.canplay', () => {
            this.stalled = false;
        });

        when('player.action.pause', () => {
            this.audioElement.pause();
        });

        when('player.action.play', () => {
            this.audioElement.play();
        });

        when('player.volume.set', (volume: number) => {
            this.audioElement.volume = volume;
        });
    }
}
