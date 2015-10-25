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

interface IListViewState {
    searchFieldVisible?: boolean;
    searchValue?: string;
}

export default class ListView<T> extends React.Component<IListViewProps<T>, IListViewState> {

    state: IListViewState = {
        searchFieldVisible: false,
        searchValue: null
    };

    isActive(item: T): boolean {
        if (typeof this.props.activeItem === 'function') {
            return (this.props.activeItem as any as Function)(item);
        } else {
            return this.props.activeItem === item;
        }
    }

    showSearchField = () => this.setState({ searchFieldVisible: true });

    hideSearchField = () => this.setState({ searchValue: null, searchFieldVisible: false });

    onSearchChange = (event: React.FormEvent) => {
        const value = (event as any).target.value;
        this.state.searchValue = value;
        setTimeout(() => 1);
    };

    onHideSearchField = (event: React.KeyboardEvent) => {
        if (event.keyCode === 27) {
            setTimeout(() => this.setState({ searchValue: null, searchFieldVisible: false }), 100);
        }
    }

    createHeader = () => (
        <div onClick={this.showSearchField}>
            {this.state.searchFieldVisible ?
                <div>
                    <input type="text"
                           className="form-control input-sm"
                           autoFocus
                           onKeyUp={this.onHideSearchField}
                           onChange={this.onSearchChange} />
                </div> :
                <div>{this.props.header}</div>}
        </div>
    );

    getItems = () => this.props.items.filter(item => {
        if (this.state.searchValue == null) {
            return true;
        }
        const regexp = new RegExp(this.state.searchValue, 'i');
        if (typeof item === 'string') {
            return (item as any as string).search(regexp) !== -1;
        }
        return Object.keys(item).filter(key => {
            return typeof (item as any)[key] === 'string' && (item as any)[key].search(regexp) !== -1
        }).length > 0;
    });

    render() {
        return (
            <Panel header={this.createHeader()}
                   footer={this.props.footer || <span className="pull-right">{this.props.items.length + '  Elements'}</span>}>
                {this.props.items.length > 0 ?
                    <ListGroup>
                        {this.getItems().map(item =>
                            <a className={'list-group-item ' + (this.isActive(item) ? 'active' : '')}
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
