import * as React from 'react';
import PlaylistAndPlayer from './PlaylistAndPlayer';
import MusicLibrary from './MusicLibrary';
import {Grid} from 'react-bootstrap';
import ApplicationStore from '../stores/ApplicationStore';
import {IHasDispatch} from '../utils/IHasDispatch';

interface MusicApplicationProps extends IHasDispatch {
    store: ApplicationStore;
}

export default class MusicApplication extends React.Component<MusicApplicationProps, {}> {

    render() {
        return (
            <Grid fluid={true}>
                <MusicLibrary store={this.props.store.musicLibrary}
                              dispatch={this.props.dispatch} />
                <PlaylistAndPlayer playlistStore={this.props.store.playlist}
                                   dispatch={this.props.dispatch} />
            </Grid>
        );
    }
}
