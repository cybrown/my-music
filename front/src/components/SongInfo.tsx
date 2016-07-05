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

export default function SongInfo(props: SongInfoProps) {
    return (
        <Panel header="Song info">
            {props.song &&
                <div>
                    <div>Artist: {props.song.artist}</div>
                    <div>Album: {props.song.album}</div>
                    <div>Song title: {props.song.title}</div>
                    <div>Song track: {props.song.track}</div>
                    <div>Song uuid: {props.song.uuid}</div>
                    <div><a href={'#' + props.song.uuid}>Song link</a></div>
                    <div>
                        <a href={`https://www.google.com/search?q=lyrics+${props.song.artist}+${props.song.title}`}
                        target="_blank">
                            Lyrics
                        </a>
                    </div>
                    <div>
                        <a href={`https://www.google.com/search?q=bass+tab+${props.song.artist}+${props.song.title}`}
                        target="_blank">
                            Bass Tab
                        </a>
                    </div>
                </div>}
            <div>
                {props.stalled &&
                    <Label bsStyle="warning">Stalled</Label>}
            </div>
        </Panel>
    );
}
