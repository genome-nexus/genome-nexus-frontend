import { action, observable, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import './Home.scss';
import logo from '../image/home_page_logo.png';
import { isVariantValid } from '../util/variantValidator';
import ValidatorNotification, {
    ErrorType,
} from '../component/ValidatorNotification';
import { Link } from 'react-router-dom';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import {
    GENOME_BUILD,
    MORE_EXAMPLE_DATA_GRCh37,
    MORE_EXAMPLE_DATA_GRCh38,
    SEARCH_BAR_EXAMPLE_DATA_GRCh37,
    SEARCH_BAR_EXAMPLE_DATA_GRCh38,
    TABLE_EXAMPLE_DATA_GRCh37,
    TABLE_EXAMPLE_DATA_GRCh38,
} from '../util/SearchUtils';
import { MainStore } from './MainStore';

const SearchTooltipContent: React.FunctionComponent<{
    genomeBuild: string;
    onClose: () => void;
}> = (props) => {
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
            <i
                className="fa fa-times-circle fa-lg tooltip-close-button"
                onClick={props.onClose}
            />
            <strong style={{ fontSize: 16 }}>
                How to search on Genome Nexus
            </strong>
            <br />
            <strong>Valid input:</strong>
            {/* Hide BRAF V600E examples for grch38 for now */}
            {props.genomeBuild === GENOME_BUILD.GRCh37 && (
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
            )}
            {props.genomeBuild === GENOME_BUILD.GRCh37 && (
                <strong>More examples:</strong>
            )}
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
    <div style={{ marginTop: 10 }}>
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
    </div>
);

@observer
class Home extends React.Component<{ history: any; mainStore: MainStore }> {
    @observable searchTooltipVisibility: boolean = false;

    @observable
    protected inputText: string | undefined;

    @observable
    protected alert: boolean = false;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    constructor(props: { history: any; mainStore: MainStore }) {
        super(props);
        makeObservable(this);
    }

    public render() {
        if (this.props.mainStore.genomeBuild.isPending) {
            return null;
        } else {
            return (
                <div>
                    <div className={'container-fluid page-section'}>
                        <div
                            className={
                                'home-banner text-center position-relative'
                            }
                        >
                            <h2>
                                <div>Genome</div>
                                <div className="space"> </div>
                                <div>
                                    Ne<span className={'d-none'}>X</span>
                                    <Image
                                        src={logo}
                                        fluid
                                        style={{
                                            height: 83,
                                            verticalAlign: 'baseline',
                                            position: 'relative',
                                            top: 5,
                                        }}
                                    />
                                    us
                                </div>
                            </h2>
                            <div style={{ fontSize: 20, marginTop: 25 }}>
                                Annotation and Interpretation of Genetic
                                Variants in Cancer
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div
                                className="col-md-9 col-sm-11 col-11"
                                style={{
                                    background: 'aliceblue',
                                    borderRadius: 25,
                                    padding: '25px 0px 10px 0px',
                                }}
                            >
                                <div
                                    className="mx-auto"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '95%',
                                    }}
                                >
                                    <SearchBox
                                        onChange={this.onTextChange}
                                        onSearch={this.onSearch}
                                        changeSearchTooltipVisibility={
                                            this.changeSearchTooltipVisibility
                                        }
                                        genomeBuild={
                                            this.props.mainStore.genomeBuild
                                                .result || GENOME_BUILD.GRCh37
                                        }
                                    />
                                    <DefaultTooltip
                                        trigger="click"
                                        placement="right"
                                        overlay={
                                            <SearchTooltipContent
                                                genomeBuild={
                                                    this.props.mainStore
                                                        .genomeBuild.result ||
                                                    GENOME_BUILD.GRCh37
                                                }
                                                onClose={
                                                    this
                                                        .changeSearchTooltipVisibility
                                                }
                                            />
                                        }
                                        destroyTooltipOnHide={true}
                                        visible={this.searchTooltipVisibility}
                                    >
                                        <Button
                                            variant="link"
                                            className="btn btn-xs"
                                            onClick={
                                                this
                                                    .changeSearchTooltipVisibility
                                            }
                                        >
                                            <i
                                                className="fas fa-info-circle"
                                                style={{ color: '#49A8E5' }}
                                            />
                                        </Button>
                                    </DefaultTooltip>
                                </div>
                                <div className="mx-auto text-center">
                                    <SearchExample
                                        genomeBuild={
                                            this.props.mainStore.genomeBuild
                                                .result!
                                        }
                                    />
                                    <div
                                        style={{
                                            color: 'gray',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {`Genome build: ${
                                            this.props.mainStore.genomeBuild
                                                .result
                                        }${
                                            this.props.mainStore.genomeBuild
                                                .result === GENOME_BUILD.GRCh37
                                                ? ''
                                                : `(Beta)`
                                        }`}
                                        <a
                                            href={
                                                this.props.mainStore.genomeBuild
                                                    .result ===
                                                GENOME_BUILD.GRCh37
                                                    ? 'https://grch38.genomenexus.org'
                                                    : 'https://www.genomenexus.org'
                                            }
                                            target="_top"
                                            style={{ marginLeft: '14px' }}
                                        >
                                            Go to{' '}
                                            {this.props.mainStore.genomeBuild
                                                .result === GENOME_BUILD.GRCh37
                                                ? `${GENOME_BUILD.GRCh38}(Beta)`
                                                : GENOME_BUILD.GRCh37}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            How to{' '}
                            <a
                                href={
                                    'https://docs.genomenexus.org/about#how-do-i-cite-genome-nexus'
                                }
                                rel="noopener noreferrer"
                            >
                                cite <i className="fas fa-external-link-alt" />
                            </a>
                        </div>
                        <ValidatorNotification
                            showAlert={this.alert}
                            type={this.alertType}
                            onClose={this.onClose}
                        />
                    </div>
                </div>
            );
        }
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
