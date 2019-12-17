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
                    Currently we only support
                    <a
                        href="https://varnomen.hgvs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        &nbsp; HGVS
                    </a>
                    &nbsp; format.
                    <br />
                    Example:&nbsp;
                    <Link to={'/variant/7:g.140453136A>T'}>
                        7:g.140453136A>T
                    </Link>
                    &nbsp;(BRAF in V600E)
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
