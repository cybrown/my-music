import * as React from 'react';
import Player from './Player';
import {default as PlaylistComponent} from './Playlist';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import Song from '../models/Song';
import {RepeatModeEnum, default as RepeatMode} from './RepeatMode';
import PlaylistStore from '../stores/PlaylistStore';
import {IHasDispatch} from '../utils/IHasDispatch';
import {Row, Col} from 'react-bootstrap';

interface PlaylistAndPlayerProps extends IHasDispatch {
    playlistStore: PlaylistStore;
}

interface PlaylistAndPlayerState {
    currentEntry: DoubleLinkedListEntry<SongInPlaylist>;
    repeatMode: RepeatMode;
}

export default class PlaylistAndPlayer extends React.Component<PlaylistAndPlayerProps, {}> {

    render() {
        return (
            <Row>
                <Col sm={4}>
                    <PlaylistComponent playlist={this.props.playlistStore.playlist}
                                       dispatch={this.props.dispatch} />
                </Col>
                <Col sm={8}>
                    <Player song={this.props.playlistStore.song}
                            stalled={this.props.playlistStore.stalled}
                            repeatMode={this.props.playlistStore.repeatMode}
                            dispatch={this.props.dispatch} />
                </Col>
            </Row>
        );
    }
}
