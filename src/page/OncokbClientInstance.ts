import { OncoKbAPI } from 'cbioportal-frontend-commons';

export const oncokbApiRoot = 'https://legacy.oncokb.org/api/v1';
const oncokbClient = new OncoKbAPI(oncokbApiRoot);

export default oncokbClient;
