import { GenomeNexusAPIInternal } from 'cbioportal-frontend-commons';

const client =
    process.env.NODE_ENV === 'production' &&
    window.location.host === 'localhost:38080'
        ? new GenomeNexusAPIInternal('http://localhost:38080')
        : new GenomeNexusAPIInternal('https://www.genomenexus.org');

export default client;
