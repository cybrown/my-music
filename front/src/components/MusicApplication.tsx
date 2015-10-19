import * as React from 'react';
import {default as PlaylistAndPlayer, IPlaylistAndPlayerDispatcher} from './PlaylistAndPlayer';
import {default as MusicLibrary, IMusicLibraryDispatcher} from './MusicLibrary';
import {Grid} from 'react-bootstrap';
import ApplicationStore from '../stores/ApplicationStore';

export interface IMusicApplicationDispatcher extends
    IPlaylistAndPlayerDispatcher,
    IMusicLibraryDispatcher {

}

interface MusicApplicationProps {
    store: ApplicationStore;
    dispatcher: IMusicApplicationDispatcher;
}

export default class MusicApplication extends React.Component<MusicApplicationProps, {}> {

    render() {
        return (
            <Grid fluid={true}>
                <MusicLibrary store={this.props.store.musicLibrary}
                              dispatcher={this.props.dispatcher} />
                <PlaylistAndPlayer playlistStore={this.props.store.playlist}
                                   dispatcher={this.props.dispatcher} />
            </Grid>
        );
    }
}
