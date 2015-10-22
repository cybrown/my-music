import * as React from 'react';
import {default as PlaylistAndInfo, IPlaylistAndInfoDispatcher} from './PlaylistAndInfo';
import {default as MusicLibrary, IMusicLibraryDispatcher} from './MusicLibrary';
import {IMiniPlayerDispatcher} from './MiniPlayer';
import {Grid} from 'react-bootstrap';
import ApplicationStore from '../stores/ApplicationStore';
import {default as Audio, IAudioDispatcher} from './Audio';
import MusicNavigation from './MusicNavigation';

export interface IMusicApplicationDispatcher extends
    IPlaylistAndInfoDispatcher,
    IMusicLibraryDispatcher,
    IMiniPlayerDispatcher,
    IAudioDispatcher { }

interface MusicApplicationProps {
    store: ApplicationStore;
    dispatcher: IMusicApplicationDispatcher;
}

export default class MusicApplication extends React.Component<MusicApplicationProps, {}> {

    render() {
        return (
            <div className="music-application-main">
                <MusicNavigation dispatcher={this.props.dispatcher}
                                 store={this.props.store} />
                <Audio dispatcher={this.props.dispatcher}
                       song={this.props.store.playlist.song}/>
                <Grid fluid={true}>
                    <MusicLibrary store={this.props.store.musicLibrary}
                                  dispatcher={this.props.dispatcher} />
                    <PlaylistAndInfo playlistStore={this.props.store.playlist}
                                     playerStore={this.props.store.player}
                                     dispatcher={this.props.dispatcher} />
                </Grid>
            </div>
        );
    }
}
