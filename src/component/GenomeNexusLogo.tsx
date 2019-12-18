import * as React from 'react';

import gnLogo from '../image/logo/header_logo_with_white_text_small_size_437x58.png';

class GenomeNexusLogo extends React.Component<{
    imageHeight?: number;
    className?: string;
}> {
    public render() {
        return (
            <img
                alt="genome-nexus-logo"
                src={gnLogo}
                style={{
                    height: this.props.imageHeight || 25,
                    verticalAlign: 'baseline',
                }}
            />
        );
    }
}

export default GenomeNexusLogo;
