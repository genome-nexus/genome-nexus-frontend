import { remoteData } from 'cbioportal-frontend-commons';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { InputActionMeta } from 'react-select/src/types';
import { SEARCH_QUERY_FIELDS } from '../config/configDefaults';
import client from '../page/genomeNexusClientInstance';
import {
    extractHgvsg,
    isValidInput,
    normalizeInputFormatForInternalDatabaseSearch,
    normalizeInputFormatForOutsideSearch,
    normalizeSearchText,
} from '../util/SearchUtils';

interface ISearchBoxProps {
    styles?: CSSRule;
    history?: any;
    placeholder?: string;
    exampleOptions: Option[];
    onChange?: (input: string) => void;
    onSearch: () => void;
    changeSearchTooltipVisibility: () => void;
}

type Option = {
    value: string;
    label: string;
};

@observer
export default class SearchBox extends React.Component<ISearchBoxProps> {
    @observable keyword: string = '';
    @observable options: Option[] = [];
    @observable searchOutsideResourcesClicked: boolean = false;

    constructor(props: ISearchBoxProps) {
        super(props);
        makeObservable(this);
    }

    private searchRecoder(keyword: string): Promise<any> {
        keyword = normalizeInputFormatForOutsideSearch(keyword);
        console.log(keyword);
        
        // TODO support grch38
        return fetch(
            `https://grch37.rest.ensembl.org/variant_recoder/human/${keyword}?content-type=application/json`
        );
    }

    private searchInternalDb(keyword: string): Promise<any> {
        // todo: do normalization her
        //keyword = normalizeSearchText(keyword);
        // TODO support grch38
        const link = encodeURI(`https://beta.genomenexus.org/search?keyword=${keyword}`);        
        return fetch(
            link
        );
    }

    private getGenomeNexusDataByKeywords(keywords: string[]): Promise<any> {
        return client.fetchVariantAnnotationPOST({
            variants: keywords,
            fields: SEARCH_QUERY_FIELDS,
        });
    }
    // old function
    // private debouncedFetch = _.debounce((searchTerm, callback) => {
    //     let keyword = this.keyword.trim();
    //     let options: Option[] = [];
    //     if (isValidInput(keyword)) {
    //         keyword = normalizeInputFormat(keyword);
    //         this.getOptions(keyword)
    //             .then((response) => response.json())
    //             .then(async (result) => {
    //                 _.forEach(result, (item) => {
    //                     _.forEach(item, (value, key) => {
    //                         if (value && value.hgvsg) {
    //                             _.forEach(value.hgvsg, (hgvsg: string) => {
    //                                 const optionValue = extractHgvsg(hgvsg);
    //                                 if (optionValue) {
    //                                     options.push({
    //                                         value: optionValue,
    //                                         label: optionValue,
    //                                     });
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 });

    //                 let enrichedOptions: Option[] = options;
    //                 await this.getGenomeNexusData(
    //                     options.map((option) => option.value)
    //                 )
    //                     .then((annotations) => {
    //                         enrichedOptions = this.getEnrichedOptions(
    //                             annotations,
    //                             options
    //                         );
    //                     })
    //                     .catch((error: any) => {
    //                         console.log('error fetch Genome Nexus data');
    //                     });

    //                 this.setOptions(enrichedOptions);
    //                 return callback(enrichedOptions);
    //             })
    //             .catch((error: any) => callback([]));
    //     } else {
    //         return callback(options);
    //     }
    // }, 1000);s

    // private debouncedFetch = _.debounce((searchTerm, callback) => {
    //     console.log(searchTerm);
        
    //     let keyword = this.keyword.trim();
    //     let options: Option[] = [];
    //     if (isValidInput(keyword)) {
    //         keyword = normalizeInputFormatForInternalDatabaseSearch(keyword);
    //         this.getInternalOptions(keyword)
    //             .then((response) => response.json())
    //             .then(async (queryResponse) => {
    //                 const variantList = queryResponse[0].results;
    //                 _.forEach(variantList, (item) => {
    //                     console.log(item);
    //                         if (item && item.variant) {
    //                             options.push({
    //                                 value: item.variant,
    //                                 label: item.variant,
    //                             });       
    //                         };
    //                 });
    //                 // enrich options with gene and protein change
    //                 let enrichedOptions: Option[] = options;
    //                 await this.getGenomeNexusData(
    //                     options.map((option) => option.value)
    //                 )
    //                     .then((annotations) => {
    //                         enrichedOptions = this.getEnrichedOptions(
    //                             annotations,
    //                             options
    //                         );
    //                     })
    //                     .catch((error: any) => {
    //                         console.log('error fetch Genome Nexus data');
    //                     });

    //                 if (!this.searchOutsideResourcesClicked) {
    //                     enrichedOptions = [
    //                         ...enrichedOptions,
    //                         { label: "Show more searching results", value: "search_outside_resources" }
    //                     ];
    //                     this.setOptions(enrichedOptions);
    //                     return callback(enrichedOptions);
    //                 }
    //             })
    //             .catch((error: any) => callback([]));

    //         if (this.searchOutsideResourcesClicked) {
    //             this.getOutsideOptions(keyword)
    //                 .then((response) => response.json())
    //                 .then(async (result) => {
    //                     _.forEach(result, (item) => {
    //                         _.forEach(item, (value, key) => {
    //                             if (value && value.hgvsg) {
    //                                 _.forEach(value.hgvsg, (hgvsg: string) => {
    //                                     const optionValue = extractHgvsg(hgvsg);
    //                                     console.log(optionValue);
                                        
    //                                     if (optionValue) {
    //                                         options.push({
    //                                             value: optionValue,
    //                                             label: optionValue,
    //                                         });
    //                                     }
    //                                 });
    //                             }
    //                         });
    //                     });

    //                     let enrichedOptions: Option[] = options;
    //                     await this.getGenomeNexusData(
    //                         options.map((option) => option.value)
    //                     )
    //                         .then((annotations) => {
    //                             enrichedOptions = this.getEnrichedOptions(
    //                                 annotations,
    //                                 options
    //                             );
    //                         })
    //                         .catch((error: any) => {
    //                             console.log('error fetch Genome Nexus data');
    //                         });

    //                     this.setOptions(enrichedOptions);
    //                     return callback(enrichedOptions);
    //                 })
    //                 .catch((error: any) => callback([]));
    //         }
    //     } else {
    //         return callback(options);
    //     }
    // }, 1000);

    @action
    public getInternalOptions = (keyword: string) => {
        // return this.searchRecoder(keyword);
        return this.searchInternalDb(keyword);
    };

    @action
    public getOutsideOptions = (keyword: string) => {
        return this.searchRecoder(keyword);
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
        if (option && option.value === "search_outside_resources") {
            this.searchOutsideResourcesClicked = true;
            // const actionMeta: InputActionMeta = {action: 'input-change'}
            // this.keyword = this.keyword + "something";
            // // this.handleInputChange(this.keyword, actionMeta);
            // console.log("here I am ");
            
        } else if (this.props.onChange && option && option.value) {
            this.props.onChange(option.value);
            this.props.onSearch();
        }
    };

    private newOptions = remoteData<Option[]>({
        await: () => [],
        invoke: async () => {
            let keyword = this.keyword.trim();
            let options: Option[] = [];
            let enrichedOptions: Option[] = [];
            const promises = [];
            if (isValidInput(keyword)) {
                keyword = normalizeInputFormatForInternalDatabaseSearch(keyword);
                promises.push(
                    this.getInternalOptions(keyword)
                .then((response) => response.json())
                .then(async (queryResponse) => {
                    const variantList = queryResponse[0].results;
                    _.forEach(variantList, (item) => {
                        console.log(item);
                            if (item && item.variant) {
                                options.push({
                                    value: item.variant,
                                    label: item.variant,
                                });       
                            };
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
                            console.log(enrichedOptions);
                            
                            return Promise.resolve(enrichedOptions);
                        })
                        .catch((error: any) => {
                            console.log('error fetch Genome Nexus data');
                        });
                }));
                if (this.searchOutsideResourcesClicked) {
                    promises.push(
                        this.getOutsideOptions(keyword)
                        .then((response) => response.json())
                        .then(async (result) => {
                            _.forEach(result, (item) => {
                                _.forEach(item, (value, key) => {
                                    if (value && value.hgvsg) {
                                        _.forEach(value.hgvsg, (hgvsg: string) => {
                                            const optionValue = extractHgvsg(hgvsg);
                                            console.log(optionValue);
                                            
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
    
                            enrichedOptions = options;
                            console.log(options);
                            
                            await this.getGenomeNexusData(
                                options.map((option) => option.value)
                            )
                                .then((annotations) => {
                                    enrichedOptions = this.getEnrichedOptions(
                                        annotations,
                                        options
                                    );
                                    return Promise.resolve(enrichedOptions);
                                })
                                .catch((error: any) => {
                                    console.log('error fetch Genome Nexus data');
                                });
    
                            console.log(enrichedOptions);

                        })
                        .catch((error: any) => Promise.resolve([]))
                    );
                }
                // return Promise.all([]);
                await Promise.all(promises);
                console.log(enrichedOptions);
                if (!this.searchOutsideResourcesClicked) {
                    enrichedOptions = [
                        ...enrichedOptions,
                        { label: "Show more searching results", value: "search_outside_resources" }
                    ];
                    return Promise.resolve(enrichedOptions);
                }
                
                return Promise.resolve(enrichedOptions);
            } else {
                console.log(options);
                
                return Promise.resolve(options);
            }
        },
    });

    // @action
    // public setOptions(options: Option[]) {
    //     this.options = options;
    // }

    @action
    private handleInputChange = (keyword: string, action: any) => {
        if (action.action === 'input-change') {
            this.keyword = keyword;
            this.searchOutsideResourcesClicked = false;
        };
    };

    // @computed
    // get dropdownOptions() {
        // if (this.options.length > 0) {
        //     return this.options;
        // } else {
            // return [];
        // }
    // }

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
                options={this.newOptions.result || []}
                // controlShouldRenderValue={false}
                filterOption={false}
                // isClearable
                // loadOptions={this.debouncedFetch}
                // defaultOptions={this.dropdownOptions}
                onChange={(option: any) => this.onChange(option)}
                inputValue={this.keyword}
                onInputChange={this.handleInputChange}
                isLoading={this.newOptions.isPending}
                placeholder={`Search variant in HGVS / rs id / Gene:Protein change`}
                closeMenuOnSelect={false}
                styles={{
                    input(styles: any) {
                        return {
                            ...styles,
                            lineHeight: '30px',
                        };
                    },
                    placeholder(styles: any) {
                        return {
                            ...styles,
                            width: '100%',
                            lineHeight: '30px',
                            textAlign: 'center',
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
