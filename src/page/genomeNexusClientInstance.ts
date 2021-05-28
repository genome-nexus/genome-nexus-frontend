import { GenomeNexusAPI } from 'genome-nexus-ts-api-client';

export const genomeNexusApiRoot =
    process.env.NODE_ENV === 'production' &&
    !window.location.host.includes('netlify')
        ? `//${window.location.host}`
        : process.env.REACT_APP_GENOME_NEXUS_URL;

const client = new GenomeNexusAPI(genomeNexusApiRoot);

export default client;
