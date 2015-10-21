import * as React from 'react';
import {default as MiniPlayer, IMiniPlayerDispatcher} from './MiniPlayer';
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import ApplicationStore from '../stores/ApplicationStore';

export interface IMusicNavigationDispatcher extends
    IMiniPlayerDispatcher { }

interface MusicNavigationProps {
    store: ApplicationStore;
    dispatcher: IMusicNavigationDispatcher;
}

export default class MusicNavigation extends React.Component<MusicNavigationProps, {}> {

    render() {
        return (
            <Navbar inverse staticTop>
                <NavBrand>
                    Music
                </NavBrand>
                <Nav right>
                    <MiniPlayer dispatcher={this.props.dispatcher}
                                song={this.props.store.playlist.song}
                                audioElement={this.props.store.playlist.audioElement}
                                repeatMode={this.props.store.playlist.repeatMode} />
                </Nav>
                <Nav right>
                    <NavItem>{this.props.store.playlist.song ? `${this.props.store.playlist.song.artist} - ${this.props.store.playlist.song.album} - [${this.props.store.playlist.song.track}] - ${this.props.store.playlist.song.title}` : null}</NavItem>
                </Nav>
            </Navbar>
        );
    }
}
