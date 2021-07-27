import _ from 'lodash';
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

export default class SearchBox extends React.Component<ISearchBoxProps> {
    private debouncedFetch = _.debounce((searchTerm, callback) => {
            searchProteinChangeByKeyword(searchTerm)
            .then(response => 
                 response.json()
            )
            .then(result => {
                let options: Option[] = [];
                _.forEach(result, (item) => {
                    _.forEach(item, (value, key) => {
                        if (value && value.hgvsg) {
                            _.forEach(value.hgvsg, (hgvsg: string) => {
                                const splitedHgvsg = hgvsg.split(":");
                                if (splitedHgvsg.length === 2) {
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
                
                return callback(options);
            })
            .catch((error: any) => callback([]));
    }, 1000);

    private onChange = (option: Option) => {
        if (this.props.onChange && option && option.value) {
            this.props.onChange(option.value);
            this.props.onSearch();
        }
    };

    render() {
        return (
            <AsyncSelect
                cacheOptions
                isClearable
                loadOptions={this.debouncedFetch}
                defaultOptions={this.props.exampleOptions}
                onChange={(option: any) => this.onChange(option)}
                placeholder={`Search HGVS / rs id / gene + protein change`}
            />
        );
    }
}
