import { GenomeNexusAPI } from 'cbioportal-frontend-commons';

export const genomeNexusApiRoot =
    process.env.NODE_ENV === 'production' &&
    !window.location.host.includes('netlify')
        ? `//${window.location.host}`
        : 'https://www.genomenexus.org';
const client = new GenomeNexusAPI(genomeNexusApiRoot);

export default client;
