import * as React from 'react';
import Artist from '../models/Artist';
import Album from '../models/Album';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import ListView from './ListView';
import {newDict} from '../utils/Dict';
import * as _ from 'lodash';

class ListViewArtist extends ListView<Artist> {}

interface MusicLibraryArtistListProps {
    artists: Artist[];
    artist: Artist;
    setCurrentArtist: (artist: Artist) => void;
}

export default class MusicLibraryArtistList extends React.Component<MusicLibraryArtistListProps, {}> {

    toElement = (artist: Artist) => <div>{artist.name}</div>;

    getAllArtists(): Artist[] {
        if (this.props.artists.length <= 1) {
            return this.props.artists;
        }
        const allArtists = this.props.artists.sort((a1, a2) => a1.name.localeCompare(a2.name));
        return [{
            name: '* All *',
            albums: _.flatten(allArtists
                                .map(a => Object.keys(a.albums).map(albumName => a.albums[albumName])))
                                .sort((a1, a2) => a1.name.localeCompare(a2.name))
                                .reduce((result, album) => {
                                    result[album.name] = album;
                                    return result;
                                }, newDict<Album>())
        }].concat(allArtists);
    }

    render() {
        return (
            <ListViewArtist items={this.getAllArtists()}
                            activeItem={this.props.artist}
                            onClick={this.props.setCurrentArtist}
                            keyFor={artist => artist.name}
                            toElement={this.toElement}
                            header="Artists" />
        );
    }
}
