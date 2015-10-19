import * as React from 'react';
import MusicLibraryArtistList from './MusicLibraryArtistList';
import MusicLibraryAlbumList from './MusicLibraryAlbumList';
import MusicLibrarySongList from './MusicLibrarySongList';
import Album from '../models/Album';
import Song from '../models/Song';
import MusicLibraryStore from '../stores/MusicLibraryStore';
import {IHasDispatch} from '../utils/IHasDispatch';
import {Row, Col} from 'react-bootstrap';

interface MusicLibraryProps extends IHasDispatch {
    store: MusicLibraryStore;
}

export default class MusicLibrary extends React.Component<MusicLibraryProps, {}> {

    playAlbum(album: Album) {
        this.props.dispatch('musiclibrary.album.set', album);
        this.props.dispatch('playlist.clearAndPlay', album.songs);
    }

    playAlbumNext(album: Album) {
        this.props.dispatch('playlist.playAfter', album.songs);
    }

    appendAlbum(album: Album) {
        this.props.dispatch('playlist.append', album.songs);
    }

    playSongNow(song: Song) {
        const songs = this.props.store.currentAlbum.songs;
        const index = songs.indexOf(song);
        const firstPart = songs.slice(0, index);
        const lastPart = songs.slice(index + 1, songs.length);
        this.props.dispatch('playlist.clearAndPlay', firstPart);
        this.props.dispatch('playlist.playAfter', [song]);
        this.props.dispatch('playlist.append', lastPart);
    }

    render() {
        return (
            <Row>
                <Col sm={3}>
                    <MusicLibraryArtistList artists={this.props.store.artists}
                                            artist={this.props.store.currentArtist}
                                            setCurrentArtist={artist => this.props.dispatch('musiclibrary.artist.set', artist)}/>
                </Col>
                <Col sm={3}>
                    <MusicLibraryAlbumList albums={this.props.store.albums}
                                           album={this.props.store.currentAlbum}
                                           setCurrentAlbum={album => this.props.dispatch('musiclibrary.album.set', album)}
                                           playAlbumNext={album => this.playAlbumNext(album)}
                                           appendAlbum={album => this.appendAlbum(album)}
                                           playAlbum={album => this.playAlbum(album)} />
                </Col>
                <Col sm={6}>
                    <MusicLibrarySongList songs={this.props.store.songs}
                                          playNow={song => this.playSongNow(song)}
                                          playNext={song => this.props.dispatch('playlist.playAfter', [song])}
                                          playLast={song => this.props.dispatch('playlist.append', [song])} />
                </Col>
            </Row>
        );
    }
}
