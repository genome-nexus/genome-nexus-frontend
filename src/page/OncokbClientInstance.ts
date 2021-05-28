import { OncoKbAPI } from 'oncokb-ts-api-client';

export const oncokbApiRoot = 'https://www.cbioportal.org/proxy/oncokb';
const oncokbClient = new OncoKbAPI(oncokbApiRoot);

export default oncokbClient;
