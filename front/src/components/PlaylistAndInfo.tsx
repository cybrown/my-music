import * as React from 'react';
import {default as Player, IPlayerDispatcher} from './Player';
import {default as PlaylistComponent, IPlaylistDispatcher} from './Playlist';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import Song from '../models/Song';
import {RepeatModeEnum, default as RepeatMode} from './RepeatMode';
import PlaylistStore from '../stores/PlaylistStore';
import {Row, Col} from 'react-bootstrap';
import {default as PlaylistManager, IPlaylistManagerDispatcher} from './PlaylistManager';

export interface IPlaylistAndInfoDispatcher extends
    IPlayerDispatcher,
    IPlaylistDispatcher,
    IPlaylistManagerDispatcher {

}

interface PlaylistAndInfoProps {
    playlistStore: PlaylistStore;
    dispatcher: IPlaylistAndInfoDispatcher;
}

export default class PlaylistAndInfo extends React.Component<PlaylistAndInfoProps, {}> {

    render() {
        return (
            <Row>
                <Col sm={3}>
                    <PlaylistManager playlists={this.props.playlistStore.savedPlaylists}
                                     dispatcher={this.props.dispatcher} />
                </Col>
                <Col sm={3}>
                    <PlaylistComponent playlist={this.props.playlistStore.playlist}
                                       dispatcher={this.props.dispatcher} />
                </Col>
                <Col sm={6}>
                    <Player song={this.props.playlistStore.song}
                            stalled={this.props.playlistStore.stalled}
                            repeatMode={this.props.playlistStore.repeatMode}
                            dispatcher={this.props.dispatcher} />
                </Col>
            </Row>
        );
    }
}
