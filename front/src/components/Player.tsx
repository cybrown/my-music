import * as React from 'react';
import Song from '../models/Song';
import {ButtonGroup, Button} from 'react-bootstrap';
import {IHasDispatch} from '../utils/IHasDispatch';
import {default as RepeatMode, RepeatModeEnum} from './RepeatMode';
import {Panel, Glyphicon, Label } from 'react-bootstrap';

interface PlayerProps extends IHasDispatch {
    song: Song;
    stalled: boolean;
    repeatMode: RepeatModeEnum;
}

export default class Player extends React.Component<PlayerProps, {}> {

    audioElement: HTMLAudioElement;

    componentDidMount() {
        this.props.dispatch('player.audio.ready', this.audioElement);
        this.audioElement.addEventListener('ended', () => this.props.dispatch('player.ended'));
        this.audioElement.addEventListener('stalled', event => this.props.dispatch('player.audio.events.stalled', event));
        this.audioElement.addEventListener('error', event => this.props.dispatch('player.audio.events.error', event));
    }

    render() {
        return (
            <Panel header="Player">
                <div>
                    <audio ref={audio => this.audioElement = (audio as any)}
                           controls={true}
                           src={this.props.song && `/musics/${this.props.song.musicId}`}
                           autoPlay={true} />
                </div>
                <div>
                    <ButtonGroup>
                        <Button onClick={() => this.props.dispatch('player.go.first')}>
                            <Glyphicon glyph="fast-backward" />
                        </Button>
                        <Button onClick={() => this.props.dispatch('player.go.prev')}>
                            <Glyphicon glyph="step-backward" />
                        </Button>
                        <Button onClick={() => this.props.dispatch('player.go.next')}>
                            <Glyphicon glyph="step-forward" />
                        </Button>
                        <Button onClick={() => this.props.dispatch('player.go.last')}>
                            <Glyphicon glyph="fast-forward" />
                        </Button>
                    </ButtonGroup>
                    <RepeatMode repeatMode={this.props.repeatMode}
                                dispatch={this.props.dispatch} />
                </div>
                <div>
                    {this.props.song &&
                        <a href={`https://www.google.com/search?q=lyrics+${this.props.song.artist}+${this.props.song.title}`}
                           target="_blank">
                            Lyrics
                        </a>}
                </div>
                <div>
                    {this.props.stalled &&
                        <Label bsStyle="warning">Stalled</Label>}
                </div>
            </Panel>
        );
    }
}
