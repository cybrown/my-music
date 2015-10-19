import * as React from 'react';
import Artist from '../models/Artist';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

interface MusicLibraryArtistListProps {
    artists: Artist[];
    artist: Artist;
    setCurrentArtist: (artist: Artist) => void;
}

export default class MusicLibraryArtistList extends React.Component<MusicLibraryArtistListProps, {}> {

    render() {
        return (
            <Panel header="Artists">
                {this.props.artists ?
                    <ListGroup>
                        {this.props.artists.sort((a1, a2) => a1.name.localeCompare(a2.name)).map(artist =>
                            <ListGroupItem key={artist.name}
                                           active={this.props.artist === artist}
                                           onClick={() => this.props.setCurrentArtist(artist)}>
                                {artist.name}
                            </ListGroupItem>)}
                    </ListGroup>:
                    <div>No artists to display</div>}
            </Panel>
        );
    }
}
