import * as React from 'react';

export default function stopClickPropagation(func: React.MouseEventHandler) {
    return (event: React.MouseEvent) => {
        event.stopPropagation();
        func(event);
    }
}
