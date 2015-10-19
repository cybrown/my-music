import Song from '../models/Song';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import {IRegisterHandler} from '../Dispatcher';
import {RepeatModeEnum} from '../components/RepeatMode';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {newDict} from '../utils/Dict';

export default class PlaylistStore {

    playlist = new Playlist();
    song: Song = null;
    currentEntry: DoubleLinkedListEntry<SongInPlaylist> = null;
    repeatMode: RepeatModeEnum = RepeatModeEnum.NONE;
    audioElement: HTMLAudioElement = null;
    stalled = false;
    savedPlaylists: SavedPlaylists = newDict<string[]>();

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

    playSongsNext(songs: Song[]) {
        if (songs.length) {
            this.playlist.appendSong(songs[0]);
            this.playEntry(this.playlist.last);
            songs.slice(1).forEach(song => this.playlist.appendSong(song));
        }
    }

    playFirst() {
        if (this.playlist.first) {
            this.playEntry(this.playlist.first);
        }
    }

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

    playNext() {
        if (this.currentEntry) {
            if (this.currentEntry.isLast && this.repeatMode === RepeatModeEnum.ALL) {
                this.playEntry(this.playlist.first);
            } else if (!this.currentEntry.isLast) {
                this.playEntry(this.currentEntry.next);
            }
        }
    }

    playLast() {
        if (this.playlist.last) {
            this.playEntry(this.playlist.last);
        }
    }

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

    constructor (private when: IRegisterHandler, private songs: Song[]) {

        if (localStorage.getItem('savedPlaylists')) {
            this.savedPlaylists = JSON.parse(localStorage.getItem('savedPlaylists'));
        }

        when('player.ended', () =>  this.onPlayerEnded());

        when('player.audio.ready', (audio: HTMLAudioElement) => {
            this.audioElement = audio;
        });

        when('playlist.clearAndPlay', (songs: Song[]) => {
            this.playlist.clear();
            this.playSongsNext(songs);
        });

        when('playlist.playAfter', (songs: Song[]) => {
            this.playSongsNext(songs);
        });

        when('playlist.append', (songs: Song[]) => {
            songs.forEach(song => this.playlist.appendSong(song));
        });

        when('playlist.entry.play', (entry: DoubleLinkedListEntry<SongInPlaylist>) =>  {
            this.playEntry(entry);
        });

        when('playlist.entry.remove', (entry: DoubleLinkedListEntry<SongInPlaylist>) => {
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
        });

        when('playlist.entry.moveup', (entry: DoubleLinkedListEntry<SongInPlaylist>) => {
            this.playlist.movePrev(entry);
        });

        when('playlist.entry.movedown', (entry: DoubleLinkedListEntry<SongInPlaylist>) => {
            this.playlist.moveNext(entry);
        });

        when('player.repeat.set', (mode: RepeatModeEnum) => this.repeatMode = mode);

        when('player.go.first', () => this.playFirst());
        when('player.go.prev', () => this.playPrev());
        when('player.go.next', () => this.playNext());
        when('player.go.last', () => this.playLast());

        when('player.audio.events.stalled', () => this.stalled = true);

        when('playlist.load.byName', (name: string) => {
            const songs = this.savedPlaylists[name].map(uuid => this.songs.filter(song => song.uuid === uuid)[0]);
            this.playlist.clear();
            this.playSongsNext(songs);
        });

        when('playlist.save.current', (name: string) => {
            this.savedPlaylists[name] = this.playlist.map(entry => entry.value.song.uuid);
            localStorage.setItem('savedPlaylists', JSON.stringify(this.savedPlaylists));
        });

        when('playlist.clear', () => {
            this.playlist.clear();
            this.song = null;
        });

        when('playlist.remove', (name: string) => {
            delete this.savedPlaylists[name];
            localStorage.setItem('savedPlaylists', JSON.stringify(this.savedPlaylists));
        });
    }
}
