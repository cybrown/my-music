import * as React from 'react';
import {ButtonGroup, Button, Label, Glyphicon} from 'react-bootstrap';

interface RepeatModeProps {
    repeatMode: RepeatModeEnum;
    setRepeatMode: (mode: RepeatModeEnum) => void;
}

export default function RepeatMode(props: RepeatModeProps) {
    return (
        <ButtonGroup>
            <Button bsStyle={props.repeatMode === RepeatModeEnum.NONE ? 'primary' : 'default'}
                    onClick={() => props.setRepeatMode(RepeatModeEnum.NONE)}>
                <Glyphicon glyph="arrow-right" />
            </Button>
            <Button bsStyle={props.repeatMode === RepeatModeEnum.ONE ? 'primary' : 'default'}
                    onClick={() => props.setRepeatMode(RepeatModeEnum.ONE)}>
                <Glyphicon glyph="repeat" />1
            </Button>
            <Button bsStyle={props.repeatMode === RepeatModeEnum.ALL ? 'primary' : 'default'}
                    onClick={() => props.setRepeatMode(RepeatModeEnum.ALL)}>
                <Glyphicon glyph="repeat" />
            </Button>
        </ButtonGroup>
    );
}

export enum RepeatModeEnum {
    NONE,
    ONE,
    ALL
}
