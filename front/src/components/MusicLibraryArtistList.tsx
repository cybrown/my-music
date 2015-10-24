import * as React from 'react';
import Artist from '../models/Artist';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import ListView from './ListView';

class ListViewArtist extends ListView<Artist> {}

interface MusicLibraryArtistListProps {
    artists: Artist[];
    artist: Artist;
    setCurrentArtist: (artist: Artist) => void;
}

export default class MusicLibraryArtistList extends React.Component<MusicLibraryArtistListProps, {}> {

    toElement = (artist: Artist) => <div>{artist.name}</div>;

    render() {
        return (
            <ListViewArtist items={this.props.artists.sort((a1, a2) => a1.name.localeCompare(a2.name))}
                            activeItem={this.props.artist}
                            onClick={this.props.setCurrentArtist}
                            keyFor={artist => artist.name}
                            toElement={this.toElement}
                            header="Artists" />
        );
    }
}
