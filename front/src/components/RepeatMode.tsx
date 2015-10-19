import * as React from 'react';
import {ButtonGroup, Button, Label, Glyphicon} from 'react-bootstrap';
import {IHasDispatch} from '../utils/IHasDispatch';

interface RepeatModeProps extends IHasDispatch {
    repeatMode: RepeatModeEnum;
}

export default class RepeatMode extends React.Component<RepeatModeProps, {}> {

    render() {
        return (
            <ButtonGroup>
                <Button bsStyle={this.props.repeatMode === RepeatModeEnum.NONE ? 'primary' : 'default'}
                        onClick={() => this.props.dispatch('player.repeat.set', RepeatModeEnum.NONE)}>
                    <Glyphicon glyph="arrow-right" />
                </Button>
                <Button bsStyle={this.props.repeatMode === RepeatModeEnum.ONE ? 'primary' : 'default'}
                        onClick={() => this.props.dispatch('player.repeat.set', RepeatModeEnum.ONE)}>
                    <Glyphicon glyph="repeat" />1
                </Button>
                <Button bsStyle={this.props.repeatMode === RepeatModeEnum.ALL ? 'primary' : 'default'}
                        onClick={() => this.props.dispatch('player.repeat.set', RepeatModeEnum.ALL)}>
                    <Glyphicon glyph="repeat" />
                </Button>
            </ButtonGroup>
        );
    }
}

export enum RepeatModeEnum {
    NONE,
    ONE,
    ALL
}
