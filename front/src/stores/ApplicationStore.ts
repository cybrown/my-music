import MusicLibraryStore from './MusicLibraryStore';
import PlaylistStore from './PlaylistStore';
import {IRegisterHandler} from '../Dispatcher';
import Song from '../models/Song';

export default class ApplicationStore {
    musicLibrary = new MusicLibraryStore(this.when);
    playlist = new PlaylistStore(this.when, this.songs);

    constructor (private when: IRegisterHandler, private songs: Song[]) {

    }
}
