import MusicLibraryStore from './MusicLibraryStore';
import PlaylistStore from './PlaylistStore';
import PlayerStore from './PlayerStore';
import {IRegisterHandler} from '../Dispatcher';
import Song from '../models/Song';

export default class ApplicationStore {
    musicLibrary = new MusicLibraryStore(this.when);
    playlist = new PlaylistStore(this.when, this.songs);
    player = new PlayerStore(this.when);

    constructor (private when: IRegisterHandler, private songs: Song[]) {

    }
}
