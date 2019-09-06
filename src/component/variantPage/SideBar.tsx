import * as React from 'react';
import {
    Row, Col, Modal, Button
} from "react-bootstrap";
import { computed, action, observable } from "mobx";
import SearchBox from "../SearchBox";
import { withRouter, RouteComponentProps } from "react-router";
import CheckBoxContainer from "./CheckBoxContainer";
import "./SideBar.css";
import { VariantStore } from '../../page/VariantStore';
import { isVariantValid } from '../../util/variantValidator';
import { observer } from 'mobx-react';
import client from '../../page/genomeNexusClientInstance';
import ValidatorNotification, { ErrorType } from '../ValidatorNotification';

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

@observer
class SideBar extends React.Component<SideBarProps>
{
    public static defaultProps = {
        placeholder: "Search Genes",
        searchIconClassName: "fa fa-search"
    };

    @observable
    protected setAlert:boolean = false;

    @computed
    private get variant() {
        return this.props.variant;
    }

    @observable
    protected inputText: string|undefined;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    public render()
    {
        return (
            <div>
                <Row>
                    <Col lg="10" className="pl-4 variant">
                        {this.variant}
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="11" className="searchBox">
                        <SearchBox
                                onChange={this.onTextChange}
                                onSearch={this.onSearch}
                                placeholder="Search variant"
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ValidatorNotification showAlert={this.setAlert} type={this.alertType} onClose={this.onClose}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className="text-center mb-4 resourceText">
                        Resources
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <CheckBoxContainer allCheckboxNames={this.props.store.allResources} store={this.props.store}/>
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
    async onSearch() {
        if (isVariantValid(`${this.inputText}`).isValid) {
            let hasResult = false;
            // check if the variant has response
            await client.fetchVariantAnnotationSummaryGET({variant: this.inputText!}).then(function(response){
                // fulfillment
                hasResult = true;
                }, reason => {
                // rejection
                hasResult = false;
                this.alertType = ErrorType.NO_RESULT;
            })

            if (hasResult) {
                this.setAlert = false;
                this.props.history.push(`/variant/${this.inputText}`);
                return;
            }
        }
        else {
            this.alertType = ErrorType.INVALID;
        }
        this.setAlert = true;
    }

    @action.bound
    private onClose() {
        this.setAlert = false;
    }
}

export default withRouter(SideBar);