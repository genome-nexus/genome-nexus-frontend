import { action, observable, computed, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import SearchBox from '../component/SearchBox';
import './Home.scss';
import logo from '../image/home_page_logo.png';
import { isVariantValid } from '../util/variantValidator';
import client from './genomeNexusClientInstance';
import { ErrorType } from '../component/ValidatorNotification';
import { Link } from 'react-router-dom';
import { DefaultTooltip } from 'cbioportal-frontend-commons';

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

const searchTooltipContent = (
    <>
        <strong style={{ fontSize: 16 }}>How to search on Genome Nexus</strong>
        <br />
        <strong>Valid input:</strong>
        <Table bordered hover size="sm">
            <thead>
                <tr>
                    <th>Format</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gene:p.Protein-change</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>
                            BRAF:p.V600E
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>Gene p.Protein-change</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>
                            BRAF p.V600E
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>Gene Protein-change</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>BRAF V600E</Link>
                    </td>
                </tr>
                <tr>
                    <td>Gene:c.cDNA</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>
                            BRAF:c.1799T{'>'}A
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>Gene c.cDNA</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>
                            BRAF c.1799T{'>'}A
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>HGVSg</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>
                            7:g.140453136A{'>'}T
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>HGVSc</td>
                    <td>
                        <Link
                            to={`/variant/7:g.140453136A>T?transcriptId=ENST00000288602`}
                        >
                            ENST00000288602.6:c.1799T{'>'}A
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>rs id</td>
                    <td>
                        <Link to={`/variant/7:g.140453136A>T`}>
                            rs113488022
                        </Link>
                    </td>
                </tr>
            </tbody>
        </Table>
        <strong>More examples:</strong>
        <div>
            <Link to={`/variant/5:g.1295228G>A`}>5:g.1295228G{'>'}A</Link>
        </div>
        <div>
            <Link to={`/variant/7:g.55249071C>T`}>EGFR p.T790M</Link>
        </div>
        <div>
            <Link to={`/variant/17:g.7577121G>A`}>TP53 R273C</Link>
        </div>
        <div>
            <Link
                to={`/variant/17:g.41223015_41223016del?transcriptId=ENST00000478531`}
            >
                BRCA1:c.68_69del
            </Link>
        </div>
        <div>
            <Link to={`/variant/17:g.41276044A>T`}>rs80357410</Link>
        </div>
    </>
);

const searchExample = (
    <>
        <strong>Examples</strong>:{' '}
        <Link to={`/variant/7:g.55249071C>T`}>EGFR:p.T790M</Link>,{' '}
        <Link to={`/variant/7:g.140453136A>T`}>7:g.140453136A{'>'}T</Link>,{' '}
        <Link to={`/variant/17:g.41276044A>T`}>rs80357410</Link>,{' '}
        <Link to={`/variant/17:g.7577121G>A`}>TP53 R273C</Link>
    </>
);

@observer
class Home extends React.Component<{ history: any }> {
    @observable searchTooltipVisibility: boolean = false;

    @observable
    protected inputText: string | undefined;

    @observable
    protected alert: boolean = false;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    @observable
    protected genomeBuild: string = '';

    constructor(props: { history: any }) {
        super(props);
        makeObservable(this);
    }

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

                    <Row className="mb-1">
                        <Col
                            md={6}
                            className="mx-auto"
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <SearchBox
                                onChange={this.onTextChange}
                                onSearch={this.onSearch}
                                exampleOptions={this.exampleData}
                                changeSearchTooltipVisibility={
                                    this.changeSearchTooltipVisibility
                                }
                            />
                            <DefaultTooltip
                                trigger="click"
                                placement="right"
                                overlay={searchTooltipContent}
                                destroyTooltipOnHide={true}
                                visible={this.searchTooltipVisibility}
                            >
                                <Button
                                    variant="link"
                                    className="btn btn-xs"
                                    onClick={this.changeSearchTooltipVisibility}
                                >
                                    <i
                                        className="fas fa-info-circle"
                                        style={{ color: '#49A8E5' }}
                                    />
                                </Button>
                            </DefaultTooltip>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col md={10} className="mx-auto text-center">
                            {searchExample}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    @action
    private onTextChange = (input: string) => {
        this.inputText = input.trim();
    };

    @action
    onSearch = async () => {
        if (isVariantValid(`${this.inputText}`).isValid) {
            this.alert = false;
            this.props.history.push(`/variant/${this.inputText}`);
            return;
        } else {
            this.alertType = ErrorType.INVALID;
        }
        this.alert = true;
    };

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

    @action
    changeSearchTooltipVisibility = () => {
        this.searchTooltipVisibility = !this.searchTooltipVisibility;
    };
}

export default Home;
