import * as React from 'react';
import Album from '../models/Album';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Glyphicon, Button} from 'react-bootstrap';
import stop from '../utils/stopClickPropagation';
import ListView from './ListView';
import * as _ from 'lodash';

class ListViewAlbum extends ListView<Album> {}

interface MusicLibraryAlbumListProps {
    albums: Album[];
    album: Album;
    setCurrentAlbum: (album: Album) => void;
    playAlbum: (album: Album) => void;
    playAlbumNext: (album: Album) => void;
    appendAlbum: (album: Album) => void;
}

export default class MusicLibraryAlbumList extends React.Component<MusicLibraryAlbumListProps, {}> {

    toElement = (album: Album) => (
        <div>
            <ButtonGroup>
                <Button onClick={stop(() => this.props.playAlbum(album))}>
                    <Glyphicon glyph="play"/>
                </Button>
                <Button onClick={stop(() => this.props.playAlbumNext(album))}>
                    <Glyphicon glyph="play"/>
                    <Glyphicon glyph="plus"/>
                </Button>
                <Button onClick={stop(() => this.props.appendAlbum(album))}>
                    <Glyphicon glyph="plus"/>
                </Button>
            </ButtonGroup>
            <span>{album.name}</span>
        </div>
    );

    getAllAlbums(): Album[] {
        if (this.props.albums.length <= 1) {
            return this.props.albums;
        }
        const allAlbums = this.props.albums;
        return [{
            name: '* All *',
            songs: _.flatten(allAlbums.map(a => a.songs))
        }].concat(allAlbums);
    }

    render() {
        return (
            <ListViewAlbum activeItem={this.props.album}
                           items={this.getAllAlbums()}
                           onClick={this.props.setCurrentAlbum}
                           toElement={this.toElement}
                           keyFor={album => album.name}
                           header="Albums" />
        );
    }
}
