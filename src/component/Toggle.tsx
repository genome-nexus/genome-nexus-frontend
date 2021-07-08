import * as React from 'react';

export interface IToggleProps {
    isOpen: boolean;
    textWhenOpen: string;
    textWhenClosed: string;
    onToggle: () => void;
    className?: string;
}

const Toggle: React.FunctionComponent<IToggleProps> = (props) => {
    const className = props.className || 'cursor-pointer btn-sm btn-link';

    return (
        <span onClick={props.onToggle} className={className}>
            {props.isOpen ? (
                <span>
                    {props.textWhenOpen}{' '}
                    <i className="fa fa-chevron-circle-up" />
                </span>
            ) : (
                <span>
                    {props.textWhenClosed}{' '}
                    <i className="fa fa-chevron-circle-down" />
                </span>
            )}
        </span>
    );
};

export default Toggle;
