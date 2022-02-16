import { remoteData } from 'cbioportal-frontend-commons';
import MobxPromise from 'mobxpromise';
import { GENOME_BUILD } from '../util/SearchUtils';
import client from './genomeNexusClientInstance';

export class MainStore {
    readonly genomeBuild: MobxPromise<string> = remoteData({
        invoke: async () => {
            const variantAnnotation = await client.fetchVariantAnnotationGET({
                variant: '17:g.41242962_41242963insGA',
            });
            // default genome build is grch37
            return variantAnnotation?.assembly_name || GENOME_BUILD.GRCh37;
        },
        onError: () => {
            // fail silently, leave the error handling responsibility to the data consumer
        },
    });
}
