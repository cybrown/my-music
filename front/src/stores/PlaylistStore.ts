import Song from '../models/Song';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import {IRegisterHandler, On, initEvents} from '../Dispatcher';
import {RepeatModeEnum} from '../components/RepeatMode';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {newDict} from '../utils/Dict';

export default class PlaylistStore {

    playlist = new Playlist();
    song: Song = null;
    currentEntry: DoubleLinkedListEntry<SongInPlaylist> = null;
    repeatMode: RepeatModeEnum = RepeatModeEnum.NONE;
    audioElement: HTMLAudioElement = null;
    savedPlaylists: SavedPlaylists = newDict<string[]>();

    constructor (private on: IRegisterHandler, private songs: Song[]) {
        initEvents(on, this);
        if (localStorage.getItem('savedPlaylists')) {
            this.savedPlaylists = JSON.parse(localStorage.getItem('savedPlaylists'));
        }
    }

    @On private playlistEntryPlay(playingEntry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playEntry(playingEntry);
    }

    @On private playlistPlayAfter(songs: Song[]) {
        if (songs.length) {
            this.playlist.appendSong(songs[0]);
            this.playEntry(this.playlist.last);
            songs.slice(1).forEach(song => this.playlist.appendSong(song));
        }
    }

    @On private playlistGoFirst() {
        if (this.playlist.first) {
            this.playEntry(this.playlist.first);
        }
    }

    @On private playlistGoPrev() {
        if (this.currentEntry) {
            if ((this.audioElement && this.audioElement.currentTime >= 3)) {
                this.playEntry(this.currentEntry);
            } else if (this.currentEntry.isFirst && this.repeatMode === RepeatModeEnum.NONE) {
                this.playEntry(this.currentEntry);
            } else if (this.currentEntry.isFirst && this.repeatMode === RepeatModeEnum.ALL) {
                this.playEntry(this.playlist.last);
            } else if (!this.currentEntry.isFirst) {
                this.playEntry(this.currentEntry.prev);
            }
        }
    }

    @On private playlistGoNext() {
        if (this.currentEntry) {
            if (this.currentEntry.isLast && this.repeatMode === RepeatModeEnum.ALL) {
                this.playEntry(this.playlist.first);
            } else if (!this.currentEntry.isLast) {
                this.playEntry(this.currentEntry.next);
            }
        }
    }

    @On private playlistGoLast() {
        if (this.playlist.last) {
            this.playEntry(this.playlist.last);
        }
    }

    @On private playerEnded() {
        if (this.repeatMode === RepeatModeEnum.ONE) {
            this.playEntry(this.currentEntry);
        } else if (this.currentEntry.isLast && this.repeatMode === RepeatModeEnum.ALL) {
            this.playEntry(this.currentEntry.next);
        } else if (!this.currentEntry.isLast) {
            this.playEntry(this.currentEntry.next);
        }
    }

    @On private playlistEntryRemove(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        if (entry.value.isPlaying) {
            if (entry.isFirst && entry.isLast) {
                this.playNone();
            } else if (entry.isLast) {
                this.playEntry(entry.prev);
            } else {
                this.playEntry(entry.next);
            }
        }
        this.playlist.remove(entry);
    }

    @On private playerAudioReady(audio: HTMLAudioElement) {
        this.audioElement = audio;
    }

    @On private playlistClearAndPlay(songs: Song[]) {
        this.playlist.clear();
        this.playlistPlayAfter(songs);
    }

    @On private playlistAppend(songs: Song[]) {
        songs.forEach(song => this.playlist.appendSong(song));
    }

    @On private playlistEntryMoveup(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playlist.movePrev(entry);
    }

    @On private playlistEntryMovedown(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playlist.moveNext(entry);
    }

    @On private playlistRepeatSet(mode: RepeatModeEnum) {
        this.repeatMode = mode;
    }

    @On private playlistLoadByName(name: string) {
        const songs = this.savedPlaylists[name].map(uuid => this.songs.filter(song => song.uuid === uuid)[0]);
        this.playlist.clear();
        this.playlistPlayAfter(songs);
    }

    @On private playlistSaveCurrent(name: string) {
        this.savedPlaylists[name] = this.playlist.map(entry => entry.value.song.uuid);
        localStorage.setItem('savedPlaylists', JSON.stringify(this.savedPlaylists));
    }

    @On private playlistClear() {
        this.playlist.clear();
        this.song = null;
    }

    @On private playlistRemove(name: string) {
        delete this.savedPlaylists[name];
        localStorage.setItem('savedPlaylists', JSON.stringify(this.savedPlaylists));
    }

    @On private playlistRandom() {
        this.playlist.randomize();
    }

    private forcePlayerRestart() {
        if (this.audioElement) {
            this.audioElement.currentTime = 0;
            this.audioElement.play();
        }
    }

    private playEntry(playingEntry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playlist.map(entry => entry.value.isPlaying = false);
        playingEntry.value.isPlaying = true;
        this.currentEntry = playingEntry;
        this.song = playingEntry.value.song;
        this.forcePlayerRestart();
    }

    private playNone() {
        if (this.currentEntry) {
            this.currentEntry.value.isPlaying = false;
        }
        this.currentEntry = null;
        this.song = null;
    }
}
