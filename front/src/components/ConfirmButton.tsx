import * as React from 'react';
import {Button, ButtonProps} from 'react-bootstrap';

interface IConfirmButtonProps extends ButtonProps {
    children?: any;
}

interface IConfirmButtonState {
    doRealAction?: boolean;
}

export default class ConfirmButton extends React.Component<IConfirmButtonProps, IConfirmButtonState> {

    state: IConfirmButtonState = {
        doRealAction: false
    };

    onClickWrapper = (event: MouseEvent) => {
        if (!this.state.doRealAction) {
            this.setState({ doRealAction: true });
            setTimeout(() => this.setState({ doRealAction: false }), 1000);
            event.stopPropagation();
        } else {
            this.setState({ doRealAction: false });
            return this.props.onClick(event);
        }
    };

    bsStyle() {
        return this.state.doRealAction ? 'danger' : this.props.bsStyle;
    }

    render() {
        return (
            <Button {...this.props}
                    bsStyle={this.bsStyle()}
                    onClick={this.onClickWrapper}>
                {this.props.children}
            </Button>
        );
    }
}
