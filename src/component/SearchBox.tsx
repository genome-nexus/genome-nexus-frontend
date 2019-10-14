import autobind from 'autobind-decorator';
import * as React from 'react';
import { FormEvent } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import './SearchBox.css';

interface ISearchBoxProps {
    onChange?: (input: string) => void;
    onSearch: () => void;
    placeholder?: string;
    searchIconClassName?: string;
    height?: number;
}

class SearchBox extends React.Component<ISearchBoxProps> {
    public static defaultProps = {
        placeholder: 'Search variant',
        searchIconClassName: 'fa fa-search',
    };

    public render() {
        return (
            <InputGroup>
                <FormControl
                    onChange={this.onChange}
                    className="text-center"
                    placeholder={this.props.placeholder}
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onKeyPress={(event: { key: string }) => {
                        if (event.key === 'Enter') {
                            this.props.onSearch();
                        }
                    }}
                    style={{
                        height: this.props.height,
                    }}
                    autoFocus={true}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        className="search-button"
                        onClick={this.props.onSearch}
                    >
                        <i className="fa fa-search" />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }

    @autobind
    private onChange(event: FormEvent<any>) {
        if (this.props.onChange) {
            this.props.onChange(event.currentTarget.value);
        }
    }
}

export default SearchBox;
