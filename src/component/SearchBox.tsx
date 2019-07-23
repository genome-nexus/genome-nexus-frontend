import autobind from "autobind-decorator";
import * as React from 'react';
import {FormEvent} from "react";
import {
    FormControl
} from "react-bootstrap";

interface ISearchBoxProps
{
    onChange?: (input: string) => void;
    placeholder?: string;
    searchIconClassName?: string;
}

class SearchBox extends React.Component<ISearchBoxProps>
{
    public static defaultProps = {
        placeholder: "Search Genes",
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
