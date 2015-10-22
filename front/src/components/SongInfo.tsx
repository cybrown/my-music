import * as React from 'react';
import Song from '../models/Song';
import {ButtonGroup, Button} from 'react-bootstrap';
import {default as RepeatMode, RepeatModeEnum} from './RepeatMode';
import {Panel, Glyphicon, Label } from 'react-bootstrap';
import Audio from './Audio';

interface SongInfoProps {
    song: Song;
    stalled: boolean;
}

export default class SongInfo extends React.Component<SongInfoProps, {}> {

    render() {
        return (
            <Panel header="Song info">
                {this.props.song &&
                    <div>
                        <div>Artist: {this.props.song.artist}</div>
                        <div>Album: {this.props.song.album}</div>
                        <div>Song title: {this.props.song.title}</div>
                        <div>Song track: {this.props.song.track}</div>
                        <div>Song uuid: {this.props.song.uuid}</div>
                        <div>
                            <a href={`https://www.google.com/search?q=lyrics+${this.props.song.artist}+${this.props.song.title}`}
                            target="_blank">
                                Lyrics
                            </a>
                        </div>
                    </div>}
                <div>
                    {this.props.stalled &&
                        <Label bsStyle="warning">Stalled</Label>}
                </div>
            </Panel>
        );
    }
}
