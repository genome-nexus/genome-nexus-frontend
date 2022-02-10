import { action, observable, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import SearchBox from '../component/SearchBox';
import './Home.scss';
import logo from '../image/home_page_logo.png';
import { isVariantValid } from '../util/variantValidator';
import client from './genomeNexusClientInstance';
import ValidatorNotification, {
    ErrorType,
} from '../component/ValidatorNotification';
import { Link } from 'react-router-dom';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import {
    MORE_EXAMPLE_DATA_GRCh37,
    MORE_EXAMPLE_DATA_GRCh38,
    SEARCH_BAR_EXAMPLE_DATA_GRCh37,
    SEARCH_BAR_EXAMPLE_DATA_GRCh38,
    TABLE_EXAMPLE_DATA_GRCh37,
    TABLE_EXAMPLE_DATA_GRCh38,
} from '../util/SearchUtils';

enum GENOME_BUILD {
    GRCh37 = 'GRCh37',
    GRCh38 = 'GRCh38',
}

const SearchTooltipContent: React.FunctionComponent<{ genomeBuild: string }> = (
    props
) => {
    const tableExamples =
        props.genomeBuild === GENOME_BUILD.GRCh37
            ? TABLE_EXAMPLE_DATA_GRCh37
            : TABLE_EXAMPLE_DATA_GRCh38;
    const moreExamples =
        props.genomeBuild === GENOME_BUILD.GRCh37
            ? MORE_EXAMPLE_DATA_GRCh37
            : MORE_EXAMPLE_DATA_GRCh38;

    return (
        <>
            <strong style={{ fontSize: 16 }}>
                How to search on Genome Nexus
            </strong>
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
                    {tableExamples.map((data) => (
                        <tr>
                            <td>{data.format}</td>
                            <td>
                                <Link to={data.link}>{data.label}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <strong>More examples:</strong>
            {moreExamples.map((data) => (
                <div>
                    <Link to={data.link}>{data.label}</Link>
                </div>
            ))}
        </>
    );
};

const SearchExample: React.FunctionComponent<{ genomeBuild: string }> = (
    props
) => (
    <>
        <strong>Examples</strong>:{' '}
        {props.genomeBuild === GENOME_BUILD.GRCh37
            ? SEARCH_BAR_EXAMPLE_DATA_GRCh37.map((data, index) => (
                  <>
                      <Link to={data.link}>{data.label}</Link>
                      {/* Add comma and whitespace between examples */}
                      {index !== SEARCH_BAR_EXAMPLE_DATA_GRCh37.length - 1 && (
                          <>, </>
                      )}
                  </>
              ))
            : SEARCH_BAR_EXAMPLE_DATA_GRCh38.map((data, index) => (
                  <>
                      <Link to={data.link}>{data.label}</Link>
                      {index !== SEARCH_BAR_EXAMPLE_DATA_GRCh38.length - 1 && (
                          <>, </>
                      )}
                  </>
              ))}
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
                                changeSearchTooltipVisibility={
                                    this.changeSearchTooltipVisibility
                                }
                            />
                            <DefaultTooltip
                                trigger="click"
                                placement="right"
                                overlay={
                                    <SearchTooltipContent
                                        genomeBuild={this.genomeBuild}
                                    />
                                }
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
                            <SearchExample genomeBuild={this.genomeBuild} />
                            <div style={{ color: 'gray', fontSize: '14px' }}>
                                {`Genome build: ${this.genomeBuild}`}
                                <a
                                    href={
                                        this.genomeBuild === GENOME_BUILD.GRCh37
                                            ? 'https://grch38.genomenexus.org'
                                            : 'https://www.genomenexus.org'
                                    }
                                    target="_top"
                                    style={{ marginLeft: '14px' }}
                                >
                                    Go to{' '}
                                    {this.genomeBuild === GENOME_BUILD.GRCh37
                                        ? GENOME_BUILD.GRCh38
                                        : GENOME_BUILD.GRCh37}
                                    (Beta)
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <ValidatorNotification
                        showAlert={this.alert}
                        type={this.alertType}
                        onClose={this.onClose}
                    />
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

    @action
    changeSearchTooltipVisibility = () => {
        this.searchTooltipVisibility = !this.searchTooltipVisibility;
    };

    @action
    private onClose = () => {
        this.alert = false;
    };
}

export default Home;
