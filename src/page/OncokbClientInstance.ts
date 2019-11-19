import { OncoKbAPI } from 'cbioportal-frontend-commons';

export const oncokbApiRoot = 'https://www.oncokb.org';
const oncokbClient = new OncoKbAPI(oncokbApiRoot);

export default oncokbClient;
