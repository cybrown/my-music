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

    constructor (private when: IRegisterHandler, private songs: Song[]) {
        initEvents(when, this);
        if (localStorage.getItem('savedPlaylists')) {
            this.savedPlaylists = JSON.parse(localStorage.getItem('savedPlaylists'));
        }
    }

    @On('playlist.entry.play')
    playEntry(playingEntry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playlist.map(entry => entry.value.isPlaying = false);
        playingEntry.value.isPlaying = true;
        this.currentEntry = playingEntry;
        this.song = playingEntry.value.song;
        this.forcePlayerRestart();
    }

    playNone() {
        if (this.currentEntry) {
            this.currentEntry.value.isPlaying = false;
        }
        this.currentEntry = null;
        this.song = null;
    }

    @On('playlist.playAfter')
    playSongsNext(songs: Song[]) {
        if (songs.length) {
            this.playlist.appendSong(songs[0]);
            this.playEntry(this.playlist.last);
            songs.slice(1).forEach(song => this.playlist.appendSong(song));
        }
    }

    @On('playlist.go.first')
    playFirst() {
        if (this.playlist.first) {
            this.playEntry(this.playlist.first);
        }
    }

    @On('playlist.go.prev')
    playPrev() {
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

    @On('playlist.go.next')
    playNext() {
        if (this.currentEntry) {
            if (this.currentEntry.isLast && this.repeatMode === RepeatModeEnum.ALL) {
                this.playEntry(this.playlist.first);
            } else if (!this.currentEntry.isLast) {
                this.playEntry(this.currentEntry.next);
            }
        }
    }

    @On('playlist.go.last')
    playLast() {
        if (this.playlist.last) {
            this.playEntry(this.playlist.last);
        }
    }

    @On('player.ended')
    onPlayerEnded() {
        if (this.repeatMode === RepeatModeEnum.ONE) {
            this.playEntry(this.currentEntry);
        } else if (this.currentEntry.isLast && this.repeatMode === RepeatModeEnum.ALL) {
            this.playEntry(this.currentEntry.next);
        } else if (!this.currentEntry.isLast) {
            this.playEntry(this.currentEntry.next);
        }
    }

    forcePlayerRestart() {
        if (this.audioElement) {
            this.audioElement.currentTime = 0;
            this.audioElement.play();
        }
    }

    @On('playlist.entry.remove')
    playlistEntryRemove(entry: DoubleLinkedListEntry<SongInPlaylist>) {
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

    @On('player.audio.ready')
    playerAudioReady(audio: HTMLAudioElement) {
        this.audioElement = audio;
    }

    @On('playlist.clearAndPlay')
    playlistClearAndPlay(songs: Song[]) {
        this.playlist.clear();
        this.playSongsNext(songs);
    }

    @On('playlist.append')
    playlistAppend(songs: Song[]) {
        songs.forEach(song => this.playlist.appendSong(song));
    }

    @On('playlist.entry.moveup')
    playlistEntryMoveup(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playlist.movePrev(entry);
    }

    @On('playlist.entry.movedown')
    playlistEntryMovedown(entry: DoubleLinkedListEntry<SongInPlaylist>) {
        this.playlist.moveNext(entry);
    }

    @On('playlist.repeat.set')
    playlistRepeatSet(mode: RepeatModeEnum) {
        this.repeatMode = mode;
    }

    @On('playlist.load.byName')
    playlistLoadByName(name: string) {
        const songs = this.savedPlaylists[name].map(uuid => this.songs.filter(song => song.uuid === uuid)[0]);
        this.playlist.clear();
        this.playSongsNext(songs);
    }

    @On('playlist.save.current')
    playlistSaveCurrent(name: string) {
        this.savedPlaylists[name] = this.playlist.map(entry => entry.value.song.uuid);
        localStorage.setItem('savedPlaylists', JSON.stringify(this.savedPlaylists));
    }

    @On('playlist.clear')
    playlistClear() {
        this.playlist.clear();
        this.song = null;
    }

    @On('playlist.remove')
    playlistRemove(name: string) {
        delete this.savedPlaylists[name];
        localStorage.setItem('savedPlaylists', JSON.stringify(this.savedPlaylists));
    }

    @On('playlist.random')
    playlistRandom() {
        this.playlist.randomize();
    }
}
