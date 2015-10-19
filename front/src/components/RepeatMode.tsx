import * as React from 'react';
import {ButtonGroup, Button, Label, Glyphicon} from 'react-bootstrap';

interface RepeatModeProps {
    repeatMode: RepeatModeEnum;
    setRepeatMode: (mode: RepeatModeEnum) => void;
}

export default class RepeatMode extends React.Component<RepeatModeProps, {}> {

    render() {
        return (
            <ButtonGroup>
                <Button bsStyle={this.props.repeatMode === RepeatModeEnum.NONE ? 'primary' : 'default'}
                        onClick={() => this.props.setRepeatMode(RepeatModeEnum.NONE)}>
                    <Glyphicon glyph="arrow-right" />
                </Button>
                <Button bsStyle={this.props.repeatMode === RepeatModeEnum.ONE ? 'primary' : 'default'}
                        onClick={() => this.props.setRepeatMode(RepeatModeEnum.ONE)}>
                    <Glyphicon glyph="repeat" />1
                </Button>
                <Button bsStyle={this.props.repeatMode === RepeatModeEnum.ALL ? 'primary' : 'default'}
                        onClick={() => this.props.setRepeatMode(RepeatModeEnum.ALL)}>
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
