import MusicLibraryStore from './MusicLibraryStore';
import PlaylistStore from './PlaylistStore';
import {IRegisterHandler} from '../Dispatcher';

export default class ApplicationStore {
    musicLibrary = new MusicLibraryStore(this.when);
    playlist = new PlaylistStore(this.when);

    constructor (private when: IRegisterHandler) {

    }
}
