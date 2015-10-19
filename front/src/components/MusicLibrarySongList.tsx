import * as React from 'react';
import Song from '../models/Song';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Glyphicon} from 'react-bootstrap';
import stopClickPropagation from '../utils/stopClickPropagation';

interface MusicLibrarySongListProps {
    songs: Song[];
    playNow: (song: Song) => void;
    playOneNow: (song: Song) => void;
    playNext: (song: Song) => void;
    playLast: (song: Song) => void;
}

export default class MusicLibrarySongList extends React.Component<MusicLibrarySongListProps, {}> {

    render() {
        return (
            <Panel header="Songs">
                {this.props.songs ?
                    <ListGroup>
                        {this.props.songs.map(song =>
                            <ListGroupItem key={song.uuid}>
                                <ButtonGroup>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.playNow(song))}>
                                        <Glyphicon glyph="play"/>
                                    </span>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.playOneNow(song))}>
                                        <Glyphicon glyph="play"/>1
                                    </span>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.playNext(song))}>
                                        <Glyphicon glyph="play"/>
                                        <Glyphicon glyph="plus"/>
                                    </span>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.playLast(song))}>
                                        <Glyphicon glyph="plus"/>
                                    </span>
                                </ButtonGroup>
                                <span>{song.track} - {song.title}</span>
                            </ListGroupItem>)}
                    </ListGroup> :
                    <div>No songs to display</div>}
            </Panel>
        );
    }
}
