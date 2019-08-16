import autobind from "autobind-decorator";
import * as React from 'react';
import {FormEvent} from "react";
import {
    FormControl
} from "react-bootstrap";

interface ISearchBoxProps
{
    onChange?: (input: string) => void;
    onSearch: () => void;
    placeholder?: string;
    searchIconClassName?: string;
    height?: number;
}

class SearchBox extends React.Component<ISearchBoxProps>
{
    public static defaultProps = {
        placeholder: "Search variant",
        searchIconClassName: "fa fa-search"
    };

    public render()
    {
        return (
            <FormControl
                onChange={this.onChange}
                className="text-center"
                placeholder={this.props.placeholder}
                aria-label="Search"
                aria-describedby="basic-addon2"
                onKeyPress={(event: { key: string; }) => {
                    if (event.key === "Enter") {
                      this.props.onSearch();
                    }
                  }}
                style={{
                    height: this.props.height
                }}
                size="lg"
            />
        );
    }

    @autobind
    private onChange(event: FormEvent<any>)
    {
        if (this.props.onChange) {
            this.props.onChange(event.currentTarget.value);
        }
    }
}

export default SearchBox;
