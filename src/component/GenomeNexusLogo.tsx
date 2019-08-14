import * as React from 'react';

import gnLogo from '../image/logo/genome_nexus.png';

class GenomeNexusLogo extends React.Component<{imageHeight?: number, className?: string}>
{
    public render() {
        return (
            <img
                alt="genome-nexus-logo"
                src={gnLogo}
                style={{
                    height: this.props.imageHeight || 40
                }}
            />
        );
    }
}

export default GenomeNexusLogo;
