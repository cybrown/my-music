import * as React from 'react';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistModel from '../models/Playlist';
import SongInPlaylist from '../models/SongInPlaylist';
import DoubleLinkedListEntry from '../utils/DoubleLinkedListEntry';
import stopClickPropagation from '../utils/stopClickPropagation';
import {Panel, ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon, Modal} from 'react-bootstrap';
import ConfirmButton from './ConfirmButton';
import ListView from './ListView';

export interface IPlaylistDispatcher {
    playlistEntryPlay(entry: DoubleLinkedListEntry<SongInPlaylist>): void;
    playlistEntryRemove(entry: DoubleLinkedListEntry<SongInPlaylist>): void;
    playlistEntryMoveup(entry: DoubleLinkedListEntry<SongInPlaylist>): void;
    playlistEntryMovedown(entry: DoubleLinkedListEntry<SongInPlaylist>): void;
    playlistSaveCurrent(name: string): void;
    playlistClear(): void;
    playlistRandom(): void;
}

interface PlaylistProps {
    playlist: PlaylistModel;
    dispatcher: IPlaylistDispatcher;
}

interface PlaylistState {
    showModal?: boolean;
}

class ListViewPlaylist extends ListView<DoubleLinkedListEntry<SongInPlaylist>> {};

export default class Playlist extends React.Component<PlaylistProps, PlaylistState> {

    nameInput: HTMLInputElement;

    state: PlaylistState = {
        showModal: false
    };

    showModal = () => {
        console.log(this.state);
        this.setState({
            showModal: true
        });
    }

    savePlaylist = () => {
        this.props.dispatcher.playlistSaveCurrent(this.nameInput.value);
        this.setState({
            showModal: false
        });
    }

    onHideDialog = () => {
        this.setState({
            showModal: false
        });
    }

    toElement = (entry: DoubleLinkedListEntry<SongInPlaylist>) => (
        <div>
            <ButtonGroup>
                <span className="btn btn-default"
                      onClick={stopClickPropagation(event => this.props.dispatcher.playlistEntryRemove(entry))}>
                    <Glyphicon glyph="minus"/>
                </span>
                <span className="btn btn-default"
                      onClick={stopClickPropagation(event => this.props.dispatcher.playlistEntryMoveup(entry))}>
                    <Glyphicon glyph="arrow-up"/>
                </span>
                <span className="btn btn-default"
                      onClick={stopClickPropagation(event => this.props.dispatcher.playlistEntryMovedown(entry))}>
                    <Glyphicon glyph="arrow-down"/>
                </span>
            </ButtonGroup>
            <span>{entry.value.song.title}</span>
        </div>
    );

    headerContent = () => (
        <div>
            Playlist
            <span className="pull-right">
                <ButtonGroup>
                    <Button onClick={() => this.showModal()}>
                        <Glyphicon glyph="floppy-disk" />
                    </Button>
                    <ConfirmButton onClick={() => this.props.dispatcher.playlistClear()}>
                        <Glyphicon glyph="remove" />
                    </ConfirmButton>
                    <Button onClick={() => this.props.dispatcher.playlistRandom()}>
                        <Glyphicon glyph="random" />
                    </Button>
                </ButtonGroup>
            </span>
            <Modal show={this.state.showModal}
                   onHide={() => this.onHideDialog()}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Playlist Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(event) => {this.savePlaylist(); event.preventDefault();}}>
                        <input className="form-control"
                               autoFocus={true}
                               ref={nameInput => this.nameInput = nameInput as any}
                               type="text" />
                        <button style={{display: 'none'}}></button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary"
                            onClick={() => this.savePlaylist()}>
                        Save playlist
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    render() {
        return (
            <ListViewPlaylist activeItem={s => s.value.isPlaying}
                              header={this.headerContent()}
                              items={this.props.playlist.map(x => x)}
                              toElement={this.toElement}
                              keyFor={e => e.value.song.uuid}
                              onClick={entry => this.props.dispatcher.playlistEntryPlay(entry)} />
        );
    }
}
