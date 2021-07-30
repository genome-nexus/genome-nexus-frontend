import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import AsyncSelect from 'react-select/async';

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
}

function searchProteinChangeByKeyword(
    keyword: string,
): Promise<any>
{
    // TODO support grch38
    return fetch(`https://grch37.rest.ensembl.org/variant_recoder/human/${keyword}?content-type=application/json`);
}

@observer
export default class SearchBox extends React.Component<ISearchBoxProps> {
    
    @observable keyword: string = "";
    @observable options: Option[] = [];

    constructor(props: ISearchBoxProps) {
        super(props);
        makeObservable(this);
    }
    
    private debouncedFetch = _.debounce((searchTerm, callback) => {
            let keyword = this.keyword;
            let options: Option[] = [];
            if (this.keyword.includes(' ') || this.keyword.includes(':') || this.keyword.startsWith("rs") ) {
                if (this.keyword.includes(' ') && !this.keyword.includes('c.')) {
                    let gene = this.keyword.split(' ')[0];
                    let proteinChange = this.keyword.split(' ')[1];
                    keyword = gene + ":p." + proteinChange;
                    console.log(keyword);
                    console.log(this.keyword);
                    
                }
                this.getOptions(keyword)
                .then(response => 
                    response.json()
                )
                .then(result => {
                    _.forEach(result, (item) => {
                        _.forEach(item, (value, key) => {
                            if (value && value.hgvsg) {
                                _.forEach(value.hgvsg, (hgvsg: string) => {
                                    const splitedHgvsg = hgvsg.split(":");                                
                                    if (splitedHgvsg.length === 2 && splitedHgvsg[0].startsWith('NC_')) {
                                        // if chromosome is 1-9, keep the last character, if chromosome is 10-24, keep two charaters
                                        const chromosome = splitedHgvsg[0].split(".")[0].charAt(splitedHgvsg[0].split(".")[0].length - 2) === '0' ? splitedHgvsg[0].split(".")[0].slice(-1) : splitedHgvsg[0].split(".")[0].slice(-2);                                    
                                        if (splitedHgvsg[1].charAt(0) === 'g') {
                                            const optionValue = chromosome + ':' + splitedHgvsg[1];
                                            options.push({value: optionValue, label: optionValue});
                                        }
                                    }
                                });
                            }
                        });
                    })
                    this.setOptions(options);
                    return callback(options);
                })
                .catch((error: any) => callback([]));
            }
            else {
                return callback(options)
            }
            
    }, 1000);

    @action
    public getOptions = (keyword: string) => {
        return searchProteinChangeByKeyword(keyword);
    }

    @action
    public setOptions(options: Option[]) {
        this.options = options;
    }

    private onChange = (option: Option) => {
        if (this.props.onChange && option && option.value) {
            this.props.onChange(option.value);
            this.props.onSearch();
        }
    };

    @action
    private handleInputChange = (keyword: string, action: any) => {
        if (action.action === "input-change") this.keyword = keyword;;
    }

    @computed
    get exampleOptions() {
        if (this.keyword.length === 0) {
            return this.props.exampleOptions;
        } else if (this.options.length > 0) {
            return this.options;
        } else {
            return [];
        }
    }

    render() {
        return (
            <AsyncSelect
                cacheOptions
                isClearable
                loadOptions={this.debouncedFetch}
                defaultOptions={this.exampleOptions}
                onChange={(option: any) => this.onChange(option)}
                inputValue={this.keyword}
                onInputChange={this.handleInputChange}
                placeholder={`Search variant in HGVS / rs id / Gene:Protein change`}
                noOptionsMessage={() => 'No variants'}
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
                }}
            />
        );
    }
}
