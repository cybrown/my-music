import * as React from 'react';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import stopClickPropagation from '../utils/stopClickPropagation';

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
                <ListGroup>
                    {Object.keys(this.props.playlists).map(playlistName =>
                        <ListGroupItem key={playlistName}
                                       onClick={() => this.props.dispatcher.playlistLoadPlaylist(playlistName)}>
                            <ButtonGroup>
                                <span className="btn btn-default"
                                        onClick={stopClickPropagation(() => this.props.dispatcher.playlistRemove(playlistName))}>
                                    <Glyphicon glyph="minus"/>
                                </span>
                            </ButtonGroup>
                            {playlistName}
                        </ListGroupItem>)}
                </ListGroup>
            </Panel>
        );
    }
}
