import * as React from 'react';
import Song from '../models/Song';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Glyphicon} from 'react-bootstrap';
import stopClickPropagation from '../utils/stopClickPropagation';
import ListView from './ListView';

class ListViewSong extends ListView<Song> {}

interface MusicLibrarySongListProps {
    songs: Song[];
    playNow: (song: Song) => void;
    playOneNow: (song: Song) => void;
    playNext: (song: Song) => void;
    playLast: (song: Song) => void;
}

export default class MusicLibrarySongList extends React.Component<MusicLibrarySongListProps, {}> {

    toElement = (song: Song) => (
        <div>
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
        </div>
    );

    render() {
        return (
            <ListViewSong activeItem={null}
                          header="Songs"
                          items={this.props.songs}
                          keyFor={song => song.uuid}
                          toElement={this.toElement} />
        );
    }
}
