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

    @On musiclibraryArtistSet(artist: Artist) {
        this.albums = toArray(artist.albums);
        this.currentAlbum = null;
        this.currentArtist = artist;
        this.songs = [];
    }

    @On musiclibraryAlbumSet(album: Album) {
        this.songs = album.songs;
        this.currentAlbum = album;
    }
}
