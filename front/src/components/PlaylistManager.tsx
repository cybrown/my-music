import * as React from 'react';
import {SavedPlaylists} from '../models/SavedPlaylists';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import stopClickPropagation from '../utils/stopClickPropagation';
import ConfirmButton from './ConfirmButton';
import ListView from './ListView';

class ListViewStringArray extends ListView<string> {}

export interface IPlaylistManagerDispatcher {
    playlistLoadByName(name: string): void;
    playlistRemove(name: string): void;
}

interface IPlaylistManagerProps {
    playlists: SavedPlaylists;
    dispatcher: IPlaylistManagerDispatcher;
}

export default class PlaylistManager extends React.Component<IPlaylistManagerProps, {}> {

    toElement = (playlistName: string) => (
        <div>
            <ButtonGroup>
                <ConfirmButton onClick={stopClickPropagation(() => this.props.dispatcher.playlistRemove(playlistName))}>
                    <Glyphicon glyph="minus"/>
                </ConfirmButton>
            </ButtonGroup>
            {playlistName}
        </div>
    );

    render() {
        return (
            <ListViewStringArray activeItem={null}
                                 header="Saved Playlists"
                                 items={Object.keys(this.props.playlists) as string[]}
                                 keyFor={x => x}
                                 toElement={this.toElement}
                                 onClick={playlistName => this.props.dispatcher.playlistLoadByName(playlistName)}>
            </ListViewStringArray>
        );
    }
}
