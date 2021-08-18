import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { SEARCH_QUERY_FIELDS } from '../config/configDefaults';
import client from '../page/genomeNexusClientInstance';
import {
    extractHgvsg,
    isValidInput,
    normalizeInputFormat,
    normalizeSearchText,
} from '../util/SearchUtils';

interface ISearchBoxProps {
    styles?: CSSRule;
    history?: any;
    placeholder?: string;
    exampleOptions: Option[];
    onChange?: (input: string) => void;
    onSearch: () => void;
}

type Option = {
    value: string;
    label: string;
};

@observer
export default class SearchBox extends React.Component<ISearchBoxProps> {
    @observable keyword: string = '';
    @observable options: Option[] = [];

    constructor(props: ISearchBoxProps) {
        super(props);
        makeObservable(this);
    }

    private searchProteinChangeByKeyword(keyword: string): Promise<any> {
        keyword = normalizeSearchText(keyword);
        // TODO support grch38
        return fetch(
            `https://grch37.rest.ensembl.org/variant_recoder/human/${keyword}?content-type=application/json`
        );
    }

    private getGenomeNexusDataByKeywords(keywords: string[]): Promise<any> {
        return client.fetchVariantAnnotationPOST({
            variants: keywords,
            fields: SEARCH_QUERY_FIELDS,
        });
    }

    private debouncedFetch = _.debounce((searchTerm, callback) => {
        let keyword = this.keyword.trim();
        let options: Option[] = [];
        if (isValidInput(keyword)) {
            keyword = normalizeInputFormat(keyword);
            this.getOptions(keyword)
                .then((response) => response.json())
                .then(async (result) => {
                    _.forEach(result, (item) => {
                        _.forEach(item, (value, key) => {
                            if (value && value.hgvsg) {
                                _.forEach(value.hgvsg, (hgvsg: string) => {
                                    const optionValue = extractHgvsg(hgvsg);
                                    if (optionValue) {
                                        options.push({
                                            value: optionValue,
                                            label: optionValue,
                                        });
                                    }
                                });
                            }
                        });
                    });

                    let enrichedOptions: Option[] = options;
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
                            console.log('error fetch Genome Nexus data');
                        });

                    this.setOptions(enrichedOptions);
                    return callback(enrichedOptions);
                })
                .catch((error: any) => callback([]));
        } else {
            return callback(options);
        }
    }, 1000);

    @action
    public getOptions = (keyword: string) => {
        return this.searchProteinChangeByKeyword(keyword);
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
        if (this.props.onChange && option && option.value) {
            this.props.onChange(option.value);
            this.props.onSearch();
        }
    };

    @action
    public setOptions(options: Option[]) {
        this.options = options;
    }

    @action
    private handleInputChange = (keyword: string, action: any) => {
        if (action.action === 'input-change') this.keyword = keyword;
    };

    @computed
    get dropdownOptions() {
        if (this.options.length > 0) {
            return this.options;
        } else {
            return [];
        }
    }

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
                                No variant found for {this.keyword}. See
                                supported formats{' '}
                                <a
                                    href="https://docs.genomenexus.org"
                                    target="_top"
                                >
                                    here
                                </a>
                                .
                            </span>
                        </components.Option>
                    );
                } else {
                    return null;
                }
            }
        );

        return (
            <AsyncSelect
                cacheOptions
                isClearable
                loadOptions={this.debouncedFetch}
                defaultOptions={this.dropdownOptions}
                onChange={(option: any) => this.onChange(option)}
                inputValue={this.keyword}
                onInputChange={this.handleInputChange}
                placeholder={`Search variant in HGVS / rs id / Gene:Protein change`}
                styles={{
                    input(styles) {
                        return {
                            ...styles,
                            lineHeight: '30px',
                        };
                    },
                    placeholder(styles) {
                        return {
                            ...styles,
                            width: '100%',
                            lineHeight: '30px',
                            textAlign: 'center',
                        };
                    },
                    container(styles) {
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
