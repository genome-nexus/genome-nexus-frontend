import * as React from 'react';

import gnLogo from '../image/logo/genome_nexus_fullname_less_spacing_white.png';

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
                }}
            />
        );
    }
}

export default GenomeNexusLogo;
