import * as React from 'react';
import MusicLibraryArtistList from './MusicLibraryArtistList';
import MusicLibraryAlbumList from './MusicLibraryAlbumList';
import MusicLibrarySongList from './MusicLibrarySongList';
import Album from '../models/Album';
import Artist from '../models/Artist';
import Song from '../models/Song';
import MusicLibraryStore from '../stores/MusicLibraryStore';
import {Row, Col} from 'react-bootstrap';

export interface IMusicLibraryDispatcher {
    playlistPlayAfter(songs: Song[]): void;
    playlistClearAndPlay(songs: Song[]): void;
    musiclibraryArtistSet(artist: Artist): void;
    musiclibraryAlbumSet(album: Album): void;
    playlistAppend(songs: Song[]): void;
}

interface MusicLibraryProps {
    store: MusicLibraryStore;
    dispatcher: IMusicLibraryDispatcher;
}

export default class MusicLibrary extends React.Component<MusicLibraryProps, {}> {

    playAlbum(album: Album) {
        this.props.dispatcher.musiclibraryAlbumSet(album);
        this.props.dispatcher.playlistClearAndPlay(album.songs);
    }

    playAlbumNext(album: Album) {
        this.props.dispatcher.playlistPlayAfter(album.songs);
    }

    appendAlbum(album: Album) {
        this.props.dispatcher.playlistAppend(album.songs);
    }

    playSongNow(song: Song) {
        const songs = this.props.store.songs;
        const index = songs.indexOf(song);
        const firstPart = songs.slice(0, index);
        const lastPart = songs.slice(index + 1, songs.length);
        this.props.dispatcher.playlistClearAndPlay(firstPart);
        this.props.dispatcher.playlistPlayAfter([song]);
        this.props.dispatcher.playlistAppend(lastPart);
    }

    playOneSongNow(song: Song) {
        this.props.dispatcher.playlistClearAndPlay([song]);
    }

    render() {
        return (
            <Row>
                <Col sm={3}>
                    <MusicLibraryArtistList artists={this.props.store.artists}
                                            artist={this.props.store.currentArtist}
                                            setCurrentArtist={artist => this.props.dispatcher.musiclibraryArtistSet(artist)}/>
                </Col>
                <Col sm={3}>
                    <MusicLibraryAlbumList albums={this.props.store.albums}
                                           album={this.props.store.currentAlbum}
                                           setCurrentAlbum={album => this.props.dispatcher.musiclibraryAlbumSet(album)}
                                           playAlbumNext={album => this.playAlbumNext(album)}
                                           appendAlbum={album => this.appendAlbum(album)}
                                           playAlbum={album => this.playAlbum(album)} />
                </Col>
                <Col sm={6}>
                    <MusicLibrarySongList songs={this.props.store.songs}
                                          playNow={song => this.playSongNow(song)}
                                          playOneNow={song => this.playOneSongNow(song)}
                                          playNext={song => this.props.dispatcher.playlistPlayAfter([song])}
                                          playLast={song => this.props.dispatcher.playlistAppend([song])} />
                </Col>
            </Row>
        );
    }
}
