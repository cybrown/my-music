import * as React from 'react';
import {Panel, ListGroup} from 'react-bootstrap';

interface IListViewProps<T> {
    items: T[];
    toElement(item: T): JSX.Element;
    onClick?(item: T): void;
    keyFor(item: T): string;
    activeItem: ((item: T) => boolean) | T;
    header: string | JSX.Element;
    footer?: string | JSX.Element;
}

export default class ListView<T> extends React.Component<IListViewProps<T>, {}> {

    isActive(item: T): boolean {
        if (typeof this.props.activeItem === 'function') {
            return (this.props.activeItem as any as Function)(item);
        } else {
            return this.props.activeItem === item;
        }
    }

    render() {
        return (
            <Panel header={this.props.header} footer={this.props.footer || <span className="pull-right">{this.props.items.length + '  Elements'}</span>}>
                {this.props.items.length > 0 ?
                    <ListGroup>
                        {this.props.items.map(item =>
                            <a className={'list-group-item ' + (this.props.activeItem === item ? 'active' : '')}
                               style={this.props.onClick ? {cursor: 'pointer'} : null}
                               key={this.props.keyFor(item)}
                               onClick={this.props.onClick && (() => this.props.onClick(item))}>
                                {this.props.toElement(item)}
                            </a>)}
                    </ListGroup> :
                    <div>No items to display</div>}
            </Panel>
        );
    }
}
