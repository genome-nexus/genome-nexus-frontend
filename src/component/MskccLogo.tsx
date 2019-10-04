import * as React from 'react';

import mskLogo from '../image/logo/msk.png';

class MskccLogo extends React.Component<{
    imageHeight?: number;
    className?: string;
}> {
    public render() {
        return (
            <a
                href="http://mskcc.org"
                target="_blank"
                rel="noopener noreferrer"
                className={this.props.className}
            >
                <img
                    alt="mskcc-logo"
                    src={mskLogo}
                    style={{
                        height: this.props.imageHeight || 50,
                    }}
                />
            </a>
        );
    }
}

export default MskccLogo;
