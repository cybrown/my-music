import Song from './Song';

export default class SongInPlaylist {
    isPlaying: boolean;
    constructor (public song: Song) {}
}
