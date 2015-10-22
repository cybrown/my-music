import * as React from 'react';
import Song from '../models/Song';

export interface IAudioDispatcher {
    playerEnded(): void;
    playerAudioReady(audioElement: HTMLAudioElement): void;
    playerAudioEventsStalled(event: Event): void;
    playerAudioEventsError(event: Event): void;
    playerAudioEventsCanPlay(event: Event): void;
}

interface AudioProps {
    song: Song;
    dispatcher: IAudioDispatcher;
    showControls?: boolean;
}

export default class Audio extends React.Component<AudioProps, {}> {

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
            <audio ref={audio => this.audioElement = (audio as any)}
                   controls={this.props.showControls}
                   src={this.props.song && `/musics/${this.props.song.musicId}`}
                   autoPlay />
        );
    }
}
