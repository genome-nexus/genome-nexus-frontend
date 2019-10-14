import autobind from 'autobind-decorator';
import * as React from 'react';
import { FormEvent } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import './SearchBox.css';
import { Link } from 'react-router-dom';

interface ISearchBoxProps {
    onChange?: (input: string) => void;
    onSearch: () => void;
    placeholder?: string;
    searchIconClassName?: string;
    height?: number;
}

class SearchBox extends React.Component<ISearchBoxProps> {
    public static defaultProps = {
        searchIconClassName: 'fa fa-search',
    };

    public render() {
        return (
            <div>
                <InputGroup className="search-box">
                    <span className="fa fa-search form-control-feedback"></span>
                    <FormControl
                        onChange={this.onChange}
                        className="text-left"
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
                            paddingLeft: '44px',
                            fontSize: '1.1rem',
                        }}
                        autoFocus={true}
                    />
                </InputGroup>
                <span className="search-example">
                    Example:
                    <Link to={'/variant/17:g.7577094G>A'}>
                        {' '}
                        17:g.7577094G>A
                    </Link>
                </span>
            </div>
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
