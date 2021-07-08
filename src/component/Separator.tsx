import * as React from 'react';

import styles from './separator.module.scss';

export interface ISeparatorProps {
    borderClassName?: string;
}

const Separator: React.FunctionComponent<ISeparatorProps> = (props) => {
    return (
        <div className={props.borderClassName || styles.dashedTopSeparator} />
    );
};

export default Separator;
