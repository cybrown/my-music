import * as React from 'react';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import stopClickPropagation from '../utils/stopClickPropagation';
import ConfirmButton from './ConfirmButton';

export interface IPlaylistManagerDispatcher {
    playlistLoadPlaylist(name: string): void;
    playlistRemove(name: string): void;
}

interface IPlaylistManagerProps {
    playlists: SavedPlaylists;
    dispatcher: IPlaylistManagerDispatcher;
}

export default class PlaylistManager extends React.Component<IPlaylistManagerProps, {}> {

    render() {
        return (
            <Panel header="Saved Playlists">
                <div className="list-group">
                    {Object.keys(this.props.playlists).map(playlistName =>
                        <div key={playlistName}
                             className="list-group-item"
                             onClick={() => this.props.dispatcher.playlistLoadPlaylist(playlistName)}>
                            <ButtonGroup>
                                <ConfirmButton onClick={stopClickPropagation(() => this.props.dispatcher.playlistRemove(playlistName))}>
                                    <Glyphicon glyph="minus"/>
                                </ConfirmButton>
                            </ButtonGroup>
                            {playlistName}
                        </div>)}
                </div>
            </Panel>
        );
    }
}
