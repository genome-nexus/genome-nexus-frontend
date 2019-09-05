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
                        <Modal show={this.setAlert} onHide={this.handleCloseModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>This variant is invalid</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Currently we only support <a href="https://varnomen.hgvs.org/" target="_blank">HGVS</a> format.
                                <p>For example: 17:g.41242962_41242963insGA</p>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        {/* {(this.setAlert) && (<span>this should work</span>)} */}
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
    onSearch() {
        if (isVariantValid(`${this.inputText}`).isValid === true) {
            this.setAlert = false;
            this.props.history.push(`/variant/${this.inputText}`);
            
        }
        else {
            this.setAlert = true;
        }
    }

    @action.bound
    private handleCloseModal() {
        this.setAlert = false;
    }
}

export default withRouter(SideBar);