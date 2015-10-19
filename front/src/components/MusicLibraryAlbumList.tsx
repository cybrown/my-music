import * as React from 'react';
import Album from '../models/Album';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Glyphicon} from 'react-bootstrap';
import stopClickPropagation from '../utils/stopClickPropagation';

interface MusicLibraryAlbumListProps {
    albums: Album[];
    album: Album;
    setCurrentAlbum: (album: Album) => void;
    playAlbum: (album: Album) => void;
    playAlbumNext: (album: Album) => void;
    appendAlbum: (album: Album) => void;
}

export default class MusicLibraryAlbumList extends React.Component<MusicLibraryAlbumListProps, {}> {

    render() {
        return (
            <Panel header="Albums">
                {this.props.albums ?
                    <ListGroup>
                        {this.props.albums.sort((a1, a2) => a1.name.localeCompare(a2.name)).map(album =>
                            <ListGroupItem key={album.name}
                                           active={this.props.album === album}
                                           onClick={() => this.props.setCurrentAlbum(album)}>
                                <ButtonGroup>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.playAlbum(album))}>
                                        <Glyphicon glyph="play"/>
                                    </span>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.playAlbumNext(album))}>
                                        <Glyphicon glyph="play"/>
                                        <Glyphicon glyph="plus"/>
                                    </span>
                                    <span className="btn btn-default"
                                          onClick={stopClickPropagation(() => this.props.appendAlbum(album))}>
                                        <Glyphicon glyph="plus"/>
                                    </span>
                                </ButtonGroup>
                                <span>{album.name}</span>
                            </ListGroupItem>)}
                    </ListGroup> :
                    <div>No albums to display</div>}
            </Panel>
        );
    }
}
