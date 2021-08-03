import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { components } from 'react-select';
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
    if (/:/i.test(keyword) && keyword.split(':').length - 1 === 1) {
        const seperaterIndex = keyword.indexOf(':');
        let firstPart = keyword.split(':')[0];
        let secondPart = keyword.split(':')[1];
        let type = '';
        if (seperaterIndex > 1 && seperaterIndex < keyword.length - 1 && /[pcg]./i.test(keyword)) {
            firstPart = keyword.slice(0, seperaterIndex);
            secondPart = keyword.slice(seperaterIndex + 3, keyword.length);
            type = keyword.slice(seperaterIndex + 1, seperaterIndex + 3);
        }
        if (/del/i.test(keyword)) {
            keyword = `${_.toUpper(firstPart)}:${type}${secondPart}`;
        }
        else {
            keyword = `${_.toUpper(firstPart)}:${type}${_.toUpper(secondPart)}`;
        }
        
    }
    
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
            // input should have whitespace or ":" in between or start with "rs"
            if (/\s|:/i.test(this.keyword) || this.keyword.startsWith("rs") ) {
                // if input contains whitespace, transform to correct format
                if (/\s/i.test(this.keyword)) {
                    let gene = this.keyword.split(' ')[0];
                    let proteinChange = this.keyword.split(' ')[1];
                    // if input contains "c." or "p.", extract type and generate query
                    if (/[cp]./i.test(proteinChange)) {
                        keyword = `${gene}:${proteinChange.split('.')[0]}.${proteinChange.split('.')[1]}`;
                    }
                    else {
                        keyword = `${gene}:p.${proteinChange}`;
                    }
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
                return (
                    <components.Menu {...props} />
                );
            } else {
                return null;
            }
        });
        
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
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    Menu
                }}
            />
        );
    }
}
