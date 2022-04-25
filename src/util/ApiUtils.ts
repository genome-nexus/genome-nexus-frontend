import { DefaultMutationMapperDataFetcher } from 'react-mutation-mapper';
import genomeNexusClient from './genomeNexusClientInstance';
import genomeNexusInternalClient from './genomeNexusClientInternalInstance';
import oncoKbClient from './oncokbClientInstance';

const dataFetcher = new DefaultMutationMapperDataFetcher(
    {},
    genomeNexusClient,
    genomeNexusInternalClient,
    oncoKbClient
);

export function getDataFetcher() {
    return dataFetcher;
}
