import autobind from 'autobind-decorator';
import * as React from 'react';
import './SearchBox.css';
import Select from 'react-select';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';
import _ from 'lodash';

interface ISearchBoxProps {
    onChange?: (input: string) => void;
    onSearch: () => void;
    placeholder?: string;
    searchIconClassName?: string;
    height?: number;
    exampleData: ExampleData[];
}

export type ExampleData = {
    value: string;
    label: string;
};

@observer
class SearchBox extends React.Component<ISearchBoxProps> {
    public static defaultProps = {
        searchIconClassName: 'fa fa-search',
    };

    @observable
    currentValue: string | null = null;

    @computed get exampleOptions() {
        const options = this.props.exampleData;

        const withCustomHolder = _.concat(options, [
            {
                value: '',
                label: 'custom',
            },
        ]);

        return [
            {
                label: 'Example queries:',
                options: withCustomHolder,
            },
        ];
    }

    @computed get options() {
        const examples = this.exampleOptions;
        if (this.currentValue && this.currentValue.length) {
            examples[0].options.find(
                o => o.label === 'custom'
            )!.value = this.currentValue;
        }
        return examples;
    }

    selectRef: any;

    public render() {
        return (
            <div>
                <Select
                    value={this.currentValue}
                    defaultValue={null}
                    defaultMenuIsOpen={true}
                    autoFocus={true}
                    filterOption={(opt: ExampleData) => opt.label !== 'custom'}
                    placeholder={`Query a ${this.props.placeholder} variant`}
                    ref={(ref: any) => {
                        this.selectRef = ref;
                    }}
                    onKeyDown={(e: any) => {
                        if (e.keyCode === 13 && this.currentValue) {
                            this.onChange(this.currentValue);
                            this.props.onSearch();
                        }
                    }}
                    onInputChange={(value: string) => {
                        this.selectRef.select.getNextFocusedOption = () => null;
                        this.currentValue = value;
                    }}
                    onChange={(value: any) => {
                        this.onChange(value.value);
                        this.props.onSearch();
                    }}
                    options={this.options}
                />

                <p
                    className={'small text-center text-muted'}
                    style={{ marginTop: 5 }}
                >
                    Currently only DNA changes in&nbsp;
                    <a
                        href="https://varnomen.hgvs.org/recommendations/DNA/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        HGVS
                    </a>
                    &nbsp;format are supported.
                </p>
            </div>
        );
    }

    @autobind
    private onChange(value: string) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
}

export default SearchBox;

// const Option = (props: any) => {
//     return (
//         <div className={moduleStyles.optionGroup}>
//             <div className={moduleStyles.groupHeader}>
//                 {props.data.instruction}
//             </div>
//             <components.O {...props} />
//         </div>
//     );
// };
