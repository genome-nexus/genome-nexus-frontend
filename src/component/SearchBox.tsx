import { remoteData } from 'cbioportal-frontend-commons';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { components } from 'react-select';
import Select from 'react-select';
import { SEARCH_QUERY_FIELDS } from '../config/configDefaults';
import client from '../util/genomeNexusClientInstance';
import {
    extractHgvsg,
    GENOME_BUILD,
    isSearchingByHgvsg,
    isSearchingByRsid,
    isValidInput,
    normalizeInputFormatForDatabaseSearch,
    normalizeInputFormatForOutsideSearch,
    normalizeSearchText,
} from '../util/SearchUtils';
import { isVariantValid } from '../util/variantValidator';

interface ISearchBoxProps {
    styles?: CSSRule;
    history?: any;
    placeholder?: string;
    onChange?: (input: string) => void;
    onSearch: () => void;
    changeSearchTooltipVisibility: () => void;
    genomeBuild: string;
}

type Option = {
    value: string;
    label: string;
};

@observer
export default class SearchBox extends React.Component<ISearchBoxProps> {
    @observable keyword: string = '';
    @observable options: Option[] = [];
    @observable searchRecoderClicked: boolean = false;

    constructor(props: ISearchBoxProps) {
        super(props);
        makeObservable(this);
    }

    private searchRecoder(keyword: string, genomeBuild: string): Promise<any> {
        keyword = normalizeInputFormatForOutsideSearch(keyword);
        return genomeBuild === GENOME_BUILD.GRCh38
            ? fetch(
                  `https://rest.ensembl.org/variant_recoder/human/${keyword}?content-type=application/json`
              )
            : fetch(
                  `https://grch37.rest.ensembl.org/variant_recoder/human/${keyword}?content-type=application/json`
              );
    }

    private searchInternalDb(
        keyword: string,
        genomeBuild: string
    ): Promise<any> {
        return genomeBuild === GENOME_BUILD.GRCh38
            ? fetch(
                  encodeURI(
                      `https://grch38.genomenexus.org/search?keyword=${keyword}`
                  )
              )
            : fetch(
                  encodeURI(
                      `https://www.genomenexus.org/search?keyword=${keyword}`
                  )
              );
    }

    private getGenomeNexusDataByKeywords(keywords: string[]): Promise<any> {
        return client.fetchVariantAnnotationPOST({
            variants: keywords,
            fields: SEARCH_QUERY_FIELDS as any,
        });
    }

    @action
    public getInternalOptions = (keyword: string) => {
        return this.searchInternalDb(keyword, this.props.genomeBuild);
    };

    @action
    public getRecoderOptions = (keyword: string) => {
        return this.searchRecoder(keyword, this.props.genomeBuild);
    };

    @action
    public getGenomeNexusData = (keywords: string[]) => {
        return this.getGenomeNexusDataByKeywords(keywords);
    };

    private getEnrichedOptions(
        annotations: VariantAnnotation[],
        options: Option[]
    ) {
        const optionsByVariant = _.keyBy(options, (option) => option.value);
        for (const annotation of annotations) {
            let optionLabel = '';
            if (
                annotation.annotation_summary?.transcriptConsequenceSummary
                    ?.hugoGeneSymbol &&
                annotation.annotation_summary?.variant
            ) {
                if (
                    annotation.annotation_summary?.transcriptConsequenceSummary
                        ?.hgvspShort
                ) {
                    optionLabel = `${annotation.annotation_summary.variant} (${annotation.annotation_summary.transcriptConsequenceSummary.hugoGeneSymbol} ${annotation.annotation_summary.transcriptConsequenceSummary.hgvspShort})`;
                } else if (
                    annotation.annotation_summary?.transcriptConsequenceSummary
                        ?.variantClassification
                ) {
                    optionLabel = `${annotation.annotation_summary.variant} (${annotation.annotation_summary.transcriptConsequenceSummary.hugoGeneSymbol} ${annotation.annotation_summary.transcriptConsequenceSummary.variantClassification})`;
                }
                optionsByVariant[annotation.annotation_summary.variant].label =
                    optionLabel;
            }
        }
        return _.values(optionsByVariant);
    }

    private onChange = (option: Option) => {
        if (option && option.value === 'search_recoder') {
            this.searchRecoderClicked = true;
        } else if (this.props.onChange && option && option.value) {
            this.props.onChange(option.value);
            this.props.onSearch();
        }
    };

    private getOptionsFromInternalDb = remoteData<Option[]>({
        await: () => [],
        invoke: async () => {
            let keyword = this.keyword.trim();
            let options: Option[] = [];
            let enrichedOptions: Option[] = [];

            if (isValidInput(keyword)) {
                keyword = normalizeInputFormatForDatabaseSearch(keyword);
                // if search by hgvsg, directly push to dropdown, don't look up in internal db
                if (isSearchingByHgvsg(keyword)) {
                    options.push({
                        value: keyword,
                        label: keyword,
                    });
                }
                // if search by rsid, directly search from recoder, because we don't have rsid in index db
                if (!isSearchingByRsid(keyword)) {
                    await this.getInternalOptions(keyword)
                        .then((response) => response.json())
                        .then(async (queryResponse) => {
                            const variantList = queryResponse[0].results;
                            _.forEach(variantList, (item) => {
                                if (
                                    item &&
                                    item.variant &&
                                    isVariantValid(item.variant).isValid
                                ) {
                                    const hgvsg = normalizeSearchText(
                                        item.variant
                                    );
                                    if (hgvsg) {
                                        options.push({
                                            value: hgvsg,
                                            label: hgvsg,
                                        });
                                    }
                                }
                            });
                            // enrich options with gene and protein change
                            enrichedOptions = options;
                            await this.getGenomeNexusData(
                                options.map((option) => option.value)
                            )
                                .then((annotations) => {
                                    enrichedOptions = this.getEnrichedOptions(
                                        annotations,
                                        options
                                    );
                                })
                                .catch((error: any) => {
                                    console.log(
                                        'error fetch Genome Nexus data'
                                    );
                                });
                        });
                }
            }

            return Promise.resolve(enrichedOptions);
        },
    });

    private getOptionsFromRecoder = remoteData<Option[]>({
        await: () => [],
        invoke: async () => {
            let keyword = this.keyword.trim();
            let options: Option[] = [];
            let enrichedOptions: Option[] = [];
            if (isValidInput(keyword)) {
                keyword = normalizeInputFormatForDatabaseSearch(keyword);

                if (this.searchRecoderClicked || isSearchingByRsid(keyword)) {
                    await this.getRecoderOptions(keyword)
                        .then((response) => response.json())
                        .then(async (result) => {
                            _.forEach(result, (item) => {
                                _.forEach(item, (value, key) => {
                                    if (value && value.hgvsg) {
                                        _.forEach(
                                            value.hgvsg,
                                            (hgvsg: string) => {
                                                const optionValue =
                                                    extractHgvsg(hgvsg);
                                                if (optionValue) {
                                                    options.push({
                                                        value: optionValue,
                                                        label: optionValue,
                                                    });
                                                }
                                            }
                                        );
                                    }
                                });
                            });

                            enrichedOptions = options;
                            await this.getGenomeNexusData(
                                options.map((option) => option.value)
                            )
                                .then((annotations) => {
                                    enrichedOptions = this.getEnrichedOptions(
                                        annotations,
                                        options
                                    );
                                })
                                .catch((error: any) => {
                                    console.log(
                                        'error fetch Genome Nexus data'
                                    );
                                });
                        })
                        .catch((error: any) => Promise.resolve([]));
                }
                if (!this.searchRecoderClicked && !isSearchingByRsid(keyword)) {
                    enrichedOptions = [
                        ...enrichedOptions,
                        {
                            label: 'Show more search results',
                            value: 'search_recoder',
                        },
                    ];
                }
            }
            return Promise.resolve(enrichedOptions);
        },
    });

    private getOptions = remoteData<Option[]>({
        await: () => [
            this.getOptionsFromInternalDb,
            this.getOptionsFromRecoder,
        ],
        invoke: async () => {
            return Promise.resolve(
                _.uniqBy(
                    _.concat(
                        this.getOptionsFromInternalDb.result!,
                        this.getOptionsFromRecoder.result!
                    ),
                    (option) => option.value
                )
            );
        },
    });

    @action
    private handleInputChange = (keyword: string, action: any) => {
        if (action.action === 'input-change') {
            this.keyword = keyword;
            this.searchRecoderClicked = false;
        }
    };

    render() {
        const Menu: React.FunctionComponent<any> = observer((props: any) => {
            if (!_.isEmpty(this.keyword)) {
                return <components.Menu {...props} />;
            } else {
                return null;
            }
        });

        const NoOptionsMessage: React.FunctionComponent<any> = observer(
            (props: any) => {
                if (this.keyword) {
                    return (
                        <components.Option {...props}>
                            <span className="mr-2">
                                No variant found for {this.keyword}. Click
                                <Button
                                    variant="link"
                                    className="btn btn-xs"
                                    onClick={() =>
                                        this.props.changeSearchTooltipVisibility()
                                    }
                                    style={{ padding: 4 }}
                                >
                                    <i
                                        className="fas fa-info-circle"
                                        style={{ color: '#49A8E5' }}
                                    />
                                </Button>
                                to see supported formats.
                            </span>
                        </components.Option>
                    );
                } else {
                    return null;
                }
            }
        );

        return (
            <Select
                options={this.getOptions.result || []}
                filterOption={false}
                onChange={(option: any) => this.onChange(option)}
                inputValue={this.keyword}
                onInputChange={this.handleInputChange}
                isLoading={this.getOptions.isPending}
                placeholder={`Search variant in HGVS / rs id / Gene:Protein change`}
                closeMenuOnSelect={false}
                styles={{
                    input(styles: any) {
                        return {
                            ...styles,
                            lineHeight: '35px',
                        };
                    },
                    placeholder(styles: any) {
                        return {
                            ...styles,
                            width: '100%',
                            lineHeight: '20px',
                            textAlign: 'center',
                            paddingRight: '16px',
                            fontSize: 'min(2.5vw, 16px)',
                        };
                    },
                    container(styles: any) {
                        return {
                            ...styles,
                            flex: 1,
                        };
                    },
                }}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    Menu,
                    NoOptionsMessage,
                }}
            />
        );
    }
}
