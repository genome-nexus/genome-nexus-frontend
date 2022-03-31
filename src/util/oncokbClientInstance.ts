import { OncoKbAPI } from 'oncokb-ts-api-client';
import { maskApiRequests } from 'cbioportal-utils';

export const oncokbApiRoot =
    'https://www.cbioportal.org/proxy/A8F74CD7851BDEE8DCD2E86AB4E2A711';

maskApiRequests(OncoKbAPI, oncokbApiRoot, {
    'X-Proxy-User-Agreement':
        'I/We do NOT use this obfuscated proxy to programmatically obtain private OncoKB data. I/We know that I/we should get a valid data access token by registering at https://www.oncokb.org/account/register.',
});

const oncokbClient = new OncoKbAPI(oncokbApiRoot);

export default oncokbClient;
