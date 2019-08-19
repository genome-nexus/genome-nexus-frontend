import * as React from 'react';
import {
    Row, Col
} from "react-bootstrap";
import { computed, action, observable } from "mobx";
import SearchBox from "./SearchBox";
import { withRouter, RouteComponentProps } from "react-router";
import CheckBoxContainer from "./CheckBoxContainer";
import "./SideBar.css";
import { VariantStore } from '../page/VariantStore';

type PathParamsType = {
    history: any,
}

type SideBarProps = RouteComponentProps<PathParamsType> &
{
    store: VariantStore;
    onChange?: (input: string) => void;
    placeholder?: string;
    searchIconClassName?: string;
    variant?: string;
}

class SideBar extends React.Component<SideBarProps>
{
    public static defaultProps = {
        placeholder: "Search Genes",
        searchIconClassName: "fa fa-search"
    };

    @computed
    private get variant() {
        return this.props.variant;
    }

    @observable
    protected inputText: string|undefined;

    public render()
    {
        return (
            <div>
                <Row>
                    <Col lg="10" id="variant">
                        {this.variant}
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" id="searchBox">
                        <SearchBox
                                onChange={this.onTextChange}
                                onSearch={this.onSearch}
                                placeholder="Search variant"
                            />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className="text-center" style={{fontSize: "1.5rem"}}>
                        Resources
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className="mt-4">
                        <CheckBoxContainer allCheckboxNames={this.props.store.allRecources} store={this.props.store}/>
                    </Col>
                </Row>
            </div>
        );
    }

    @action.bound
    private onTextChange(input: string) {
        this.inputText = input;
    }

    @action.bound
    onSearch () {
        this.props.history.push(`/variant/${this.inputText}`);
    }
}

export default withRouter(SideBar);