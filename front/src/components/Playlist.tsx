import * as React from 'react';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistModel from '../models/Playlist';
import {IHasDispatch} from '../utils/IHasDispatch';
import stopClickPropagation from '../utils/stopClickPropagation';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon} from 'react-bootstrap';

interface PlaylistProps extends IHasDispatch {
    playlist: PlaylistModel;
}

export default class Playlist extends React.Component<PlaylistProps, {}> {

    render() {
        return (
            <Panel header="Playlist">
                <ListGroup>
                    {this.props.playlist.map(entry =>
                        <ListGroupItem key={entry.uuid}
                                       onClick={() => this.props.dispatch('playlist.entry.play', entry)}
                                       className={entry.value.isPlaying ? 'active' : null}>
                            <ButtonGroup>
                                <span className="btn btn-default"
                                      onClick={stopClickPropagation(event => this.props.dispatch('playlist.entry.remove', entry))}>
                                    <Glyphicon glyph="minus"/>
                                </span>
                                <span className="btn btn-default"
                                      onClick={stopClickPropagation(event => this.props.dispatch('playlist.entry.moveup', entry))}>
                                    <Glyphicon glyph="arrow-up"/>
                                </span>
                                <span className="btn btn-default"
                                      onClick={stopClickPropagation(event => this.props.dispatch('playlist.entry.movedown', entry))}>
                                    <Glyphicon glyph="arrow-down"/>
                                </span>
                            </ButtonGroup>
                            <span>{entry.value.song.title}</span>
                        </ListGroupItem>)}
                </ListGroup>
            </Panel>
        );
    }
}
