import { OncoKbAPI } from 'cbioportal-frontend-commons';

export const oncokbApiRoot = 'https://www.cbioportal.org/proxy/oncokb';
const oncokbClient = new OncoKbAPI(oncokbApiRoot);

export default oncokbClient;
