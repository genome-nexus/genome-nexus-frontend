import { action, observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Image } from 'react-bootstrap';

import SearchBox from '../component/SearchBox';
import './Home.scss';
import logo from '../image/home_page_logo.png';
import { isVariantValid } from '../util/variantValidator';
import client from './genomeNexusClientInstance';
import ValidatorNotification, {
    ErrorType,
} from '../component/ValidatorNotification';
import { VariantAnnotation } from 'cbioportal-frontend-commons';

enum GENOME_BUILD {
    GRCh37 = 'GRCh37',
    GRCh38 = 'GRCh38',
}
const EXAMPLE_DATA_GRCh37 = [
    {
        value: '7:g.140453136A>T',
        label: '7:g.140453136A>T (BRAF p.V600E)',
    },
    {
        value: '5:g.1295228G>A',
        label: '5:g.1295228G>A (TERT Promotor mutation)',
    },
    {
        value: '17:g.41276045_41276046del',
        label: '17:g.41276045_41276046del (BRCA1 c.68_69del/p.E23Vfs)',
    },
    {
        value: '17:g.7577121G>A',
        label: '17:g.7577121G>A (TP53 p.R273C)',
    },
];

const EXAMPLE_DATA_GRCh38 = [
    {
        value: '17:g.39723967T>C',
        label: '17:g.39723967T>C (ERBB2 L755S)',
    },
    { value: '7:g.55181378C>T', label: '7:g.55181378C>T (EGFR T790M)' },
    {
        value: '7:g.55174775_55174788delinsAC',
        label: '7:g.55174775_55174788delinsAC (EGFR L747_T751delinsP)',
    },
    {
        value: '7:g.55181324_55181325insCCA',
        label: '7:g.55181324_55181325insCCA (EGFR H773dup)',
    },
];

@observer
class Home extends React.Component<{ history: any }> {
    @observable
    protected inputText: string | undefined;

    @observable
    protected alert: boolean = false;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    @observable
    protected genomeBuild: string = '';

    componentWillMount() {
        this.getGenomeBuild();
    }

    async getGenomeBuild() {
        // get genome build
        // check if the variant has response
        let response;
        response = await client.fetchVariantAnnotationGET({
            variant: '17:g.41242962_41242963insGA',
        });

        if (response) {
            this.genomeBuild = (response as VariantAnnotation).assembly_name;
        }
    }

    public render() {
        return (
            <div>
                <div className={'container-fluid page-section'}>
                    <div
                        className={'home-banner text-center position-relative'}
                    >
                        <h2>
                            Genome Ne<span className={'d-none'}>X</span>
                            <Image
                                src={logo}
                                fluid
                                style={{
                                    height: 63,
                                    verticalAlign: 'baseline',
                                    position: 'relative',
                                    top: 5,
                                }}
                            />
                            us
                        </h2>
                        Annotation and Interpretation of Genetic Variants in
                        Cancer
                    </div>

                    <div className={'mx-auto'} style={{ width: 600 }}>
                        <SearchBox
                            onChange={this.onTextChange}
                            onSearch={this.onSearch}
                            height={44}
                            exampleData={this.exampleData}
                            placeholder={this.genomeBuild}
                        />
                    </div>

                    <ValidatorNotification
                        showAlert={this.alert}
                        type={this.alertType}
                        onClose={this.onClose}
                    >
                        <table className={'table validator-notification'}>
                            <tbody>
                                {this.exampleData.map(example => {
                                    return (
                                        <tr>
                                            <td>{example.label}</td>
                                            <td>
                                                <a
                                                    href={`/variant/${example.value}`}
                                                    className={
                                                        'btn btn-primary btn-sm'
                                                    }
                                                    role={'button'}
                                                >
                                                    Try it
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </ValidatorNotification>
                </div>
            </div>
        );
    }

    @action.bound
    private onTextChange(input: string) {
        this.inputText = input.trim();
    }

    @action.bound
    async onSearch() {
        if (isVariantValid(`${this.inputText}`).isValid) {
            this.alert = false;
            this.props.history.push(`/variant/${this.inputText}`);
            return;
        } else {
            this.alertType = ErrorType.INVALID;
        }
        this.alert = true;
    }

    @action.bound
    private onClose() {
        this.alert = false;
    }

    @computed
    get exampleData() {
        if (this.genomeBuild === GENOME_BUILD.GRCh37) {
            return EXAMPLE_DATA_GRCh37;
        } else if (this.genomeBuild === GENOME_BUILD.GRCh38) {
            return EXAMPLE_DATA_GRCh38;
        } else {
            return [];
        }
    }
}

export default Home;
