import * as React from 'react';
import Song from '../models/song';
import {ButtonGroup, Button, Glyphicon, ProgressBar} from 'react-bootstrap';
import {default as RepeatMode, RepeatModeEnum} from './RepeatMode';

export interface IMiniPlayerDispatcher {
    playerActionPlay(): void;
    playerActionPause(): void;
    playerGoNext(): void;
    playerGoPrev(): void;
    playerGoFirst(): void;
    playerGoLast(): void;
    playerRepeatSet(mode: RepeatModeEnum): void;
    playerVolumeSet(volume: number): void;
}

interface IMiniPlayerProps {
    dispatcher: IMiniPlayerDispatcher;
    song: Song;
    audioElement: HTMLAudioElement;
    repeatMode: RepeatModeEnum
}

export default class MiniPlayer extends React.Component<IMiniPlayerProps, {}> {

    pause = () => this.props.dispatcher.playerActionPause();
    play = () => this.props.dispatcher.playerActionPlay();

    get audioDuration() {
        if (this.props.audioElement) {
            return this.props.audioElement.duration;
        }
        return 0;
    }

    get audioCurrentTime() {
        if (this.props.audioElement) {
            return this.props.audioElement.currentTime;
        }
        return 0;
    }

    get audioBufferedTime() {
        if (this.props.audioElement && this.props.audioElement.buffered.length) {
            return this.props.audioElement.buffered.end(this.props.audioElement.buffered.length - 1);
        }
        return 0;
    }

    get audioCurrentTimeMinute(): string {
        const minutes = Math.floor(this.audioCurrentTime / 60);
        const seconds = (Math.round(this.audioCurrentTime % 60) < 10 ? '0' : '') + Math.round(this.audioCurrentTime % 60);
        return `${minutes}:${seconds}`;
    }

    get paused(): boolean {
        return this.props.audioElement && this.props.audioElement.paused;
    }

    get volume(): string {
        return this.props.audioElement ? this.props.audioElement.volume.toString() : '0';
    }

    set volume(value: string) {
        this.props.dispatcher.playerVolumeSet(parseFloat(value));
    }

    constructor () {
        super();
        setInterval(() => this.forceUpdate(), 1000);
    }

    currentTimeLabelStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: 'black',
        textAlign: 'center'
    };

    currentTimeInputStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: 'black',
        textAlign: 'center',
        opacity: 0.2
    };

    setCurrentTime(time: string): void {
        this.props.audioElement.currentTime = parseFloat(time);
    }

    render() {
        return (
            <div className="mini-player-component">
                <ButtonGroup>
                    <Button onClick={() => this.props.dispatcher.playerGoFirst()}>
                        <Glyphicon glyph="fast-backward" />
                    </Button>
                    <Button onClick={() => this.props.dispatcher.playerGoPrev()}>
                        <Glyphicon glyph="step-backward" />
                    </Button>
                    {this.paused ?
                        <Button onClick={this.play}>
                            <Glyphicon glyph="play" />
                        </Button> :
                        <Button onClick={this.pause}>
                            <Glyphicon glyph="pause" />
                        </Button>}
                    <Button onClick={() => this.props.dispatcher.playerGoNext()}>
                        <Glyphicon glyph="step-forward" />
                    </Button>
                    <Button onClick={() => this.props.dispatcher.playerGoLast()}>
                        <Glyphicon glyph="fast-forward" />
                    </Button>
                </ButtonGroup>
                <RepeatMode repeatMode={this.props.repeatMode}
                    setRepeatMode={mode => this.props.dispatcher.playerRepeatSet(mode)} />
                <div style={{position: 'relative'}}>
                    <span style={this.currentTimeLabelStyle}>{this.audioCurrentTimeMinute}</span>
                    <input style={this.currentTimeInputStyle}
                           type="range"
                           min={0}
                           max={this.audioDuration}
                           step={1}
                           value={this.audioCurrentTime.toString()}
                           onChange={(event) => this.setCurrentTime((event.target as HTMLInputElement).value)} />
                    <ProgressBar min={0}
                                 max={this.audioDuration}
                                 now={this.audioBufferedTime}
                                 bsStyle="primary" />
                </div>
                <input type="range"
                       min="0"
                       max="1"
                       step="0.0001"
                       value={this.volume}
                       onChange={(event) => {this.volume = (event.target as HTMLInputElement).value;}} />
            </div>
        );
    }
}
