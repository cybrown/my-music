import * as React from 'react';
import {Button} from 'react-bootstrap';

interface IConfirmButtonProps {
    onClick: Function;
    children?: any;
}

interface IConfirmButtonState {
    showRealButton?: boolean;
}

export default class ConfirmButton extends React.Component<IConfirmButtonProps, IConfirmButtonState> {

    state: IConfirmButtonState = {
        showRealButton: false
    };

    showConfirm(event: MouseEvent) {
        this.setState({
            showRealButton: true
        });
        setTimeout(() => {
            this.setState({
                showRealButton: false
            });
        }, 1000);
        event.stopPropagation();
    }

    render() {
        return (
            this.state.showRealButton ?
                <Button bsStyle="danger"
                        onClick={this.props.onClick}>
                    {this.props.children}
                </Button> :
                <Button onClick={(event: MouseEvent) => this.showConfirm(event)}>
                    {this.props.children}
                </Button>
        );
    }
}
