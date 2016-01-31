import * as React from 'react';
import SongInfo from './SongInfo';
import {default as PlaylistComponent, IPlaylistDispatcher} from './Playlist';
import Playlist from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import Song from '../models/Song';
import {RepeatModeEnum, default as RepeatMode} from './RepeatMode';
import PlaylistStore from '../stores/PlaylistStore';
import PlayerStore from '../stores/PlayerStore';
import {Row, Col} from 'react-bootstrap';
import {default as PlaylistManager, IPlaylistManagerDispatcher} from './PlaylistManager';

export interface IPlaylistAndInfoDispatcher extends
    IPlaylistDispatcher,
    IPlaylistManagerDispatcher { }

interface PlaylistAndInfoProps {
    playlistStore: PlaylistStore;
    playerStore: PlayerStore;
    dispatcher: IPlaylistAndInfoDispatcher;
}

export default function PlaylistAndInfo(props: PlaylistAndInfoProps) {
    return (
        <Row>
            <Col sm={3}>
                <PlaylistManager playlists={props.playlistStore.savedPlaylists}
                                 dispatcher={props.dispatcher} />
            </Col>
            <Col sm={3}>
                <PlaylistComponent playlist={props.playlistStore.playlist}
                                   dispatcher={props.dispatcher} />
            </Col>
            <Col sm={6}>
                <SongInfo song={props.playlistStore.song}
                          stalled={props.playerStore.stalled} />
            </Col>
        </Row>
    );
}
