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

export default function MusicNavigation(props: MusicNavigationProps) {
    return (
        <Navbar inverse staticTop>
            <NavBrand>
                Music
            </NavBrand>
            <Nav right>
                <MiniPlayer dispatcher={props.dispatcher}
                            song={props.store.playlist.song}
                            audioElement={props.store.player.audioElement}
                            repeatMode={props.store.playlist.repeatMode} />
            </Nav>
            <Nav right>
                <NavItem>{props.store.playlist.song ? `${props.store.playlist.song.artist} - ${props.store.playlist.song.album} - [${props.store.playlist.song.track}] - ${props.store.playlist.song.title}` : null}</NavItem>
            </Nav>
        </Navbar>
    );
}
