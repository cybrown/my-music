import * as React from 'react';
import Song from '../models/Song';
import {ButtonGroup, Button} from 'react-bootstrap';
import {default as RepeatMode, RepeatModeEnum} from './RepeatMode';
import {Panel, Glyphicon, Label } from 'react-bootstrap';

export interface IPlayerDispatcher {
    playerAudioReady(audioElement: HTMLAudioElement): void; // 'player.audio.ready'
    playerGoNext(): void;
    playerGoPrev(): void;
    playerGoFirst(): void;
    playerGoLast(): void;
    playerEnded(): void;
    playerAudioEventsStalled(event: Event): void;
    playerAudioEventsError(event: Event): void;
    playerRepeatSet(mode: RepeatModeEnum): void;
    playerAudioEventsCanPlay(event: Event): void;
}

interface PlayerProps {
    song: Song;
    stalled: boolean;
    repeatMode: RepeatModeEnum;
    dispatcher: IPlayerDispatcher;
}

export default class Player extends React.Component<PlayerProps, {}> {

    audioElement: HTMLAudioElement;

    componentDidMount() {
        this.props.dispatcher.playerAudioReady(this.audioElement);
        this.audioElement.addEventListener('ended', () => this.props.dispatcher.playerEnded());
        this.audioElement.addEventListener('stalled', event => this.props.dispatcher.playerAudioEventsStalled(event));
        this.audioElement.addEventListener('error', event => this.props.dispatcher.playerAudioEventsError(event));
        this.audioElement.addEventListener('canplay', event => this.props.dispatcher.playerAudioEventsCanPlay(event));
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
                        <Button onClick={() => this.props.dispatcher.playerGoFirst()}>
                            <Glyphicon glyph="fast-backward" />
                        </Button>
                        <Button onClick={() => this.props.dispatcher.playerGoPrev()}>
                            <Glyphicon glyph="step-backward" />
                        </Button>
                        <Button onClick={() => this.props.dispatcher.playerGoNext()}>
                            <Glyphicon glyph="step-forward" />
                        </Button>
                        <Button onClick={() => this.props.dispatcher.playerGoLast()}>
                            <Glyphicon glyph="fast-forward" />
                        </Button>
                    </ButtonGroup>
                    <RepeatMode repeatMode={this.props.repeatMode}
                                setRepeatMode={mode => this.props.dispatcher.playerRepeatSet(mode)} />
                </div>
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
