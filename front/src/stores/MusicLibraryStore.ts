import Album from '../models/Album';
import Artist from '../models/Artist';
import Song from '../models/Song';
import {IRegisterHandler, On, initEvents} from '../Dispatcher';
import {toArray} from '../utils/Dict';

export default class MusicLibraryStore {

    artists: Artist[] = [];
    albums: Album[] = [];
    songs: Song[] = [];
    currentArtist: Artist;
    currentAlbum: Album;

    constructor (private when: IRegisterHandler) {
        initEvents(when, this);
    }

    @On private musiclibraryArtistSet(artist: Artist) {
        this.albums = toArray(artist.albums);
        this.currentAlbum = null;
        this.currentArtist = artist;
        this.songs = [];
    }

    @On private musiclibraryAlbumSet(album: Album) {
        this.songs = album.songs;
        this.currentAlbum = album;
    }

    @On private setSong(pSong: Song) {
        this.artists.forEach(artist => {
            toArray(artist.albums).forEach(album => {
                album.songs.forEach(song => {
                    if (song.uuid === pSong.uuid) {
                        this.currentArtist = artist;
                        this.albums = toArray(this.currentArtist.albums);
                        this.currentAlbum = album;
                        this.songs = this.currentAlbum.songs;
                    }
                });
            });
        });
    }
}
