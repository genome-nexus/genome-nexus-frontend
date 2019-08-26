import autobind from "autobind-decorator";
import * as React from 'react';
import {FormEvent} from "react";
import {
    Form, Row, Col
} from "react-bootstrap";
import CheckBox from "./CheckBox";
import { action, computed } from "mobx";
import { toggleIncluded } from "../../util/ArrayUtils";
import { observer } from "mobx-react";
import "./CheckboxContainer.css";
import { VariantStore } from "../../page/VariantStore";

interface ICheckContainerProps
{
    store: VariantStore;
    allCheckboxNames: string[];
}

@observer
class CheckBoxContainer extends React.Component<ICheckContainerProps>
{
    public render()
    {
        return (
            <div>
                <Form>
                    <Row style={{fontSize: "1rem"}}>
                        <Col lg="6" className="justify-content-center d-flex mb-4">
                            <CheckBox 
                                key={"Select all"}
                                checkboxName={"Select all"}
                                isChecked={this.isAllSelected}
                                onChange={this.onSelectAll}
                                className={"NoColor"}/>
                        </Col>
                        <Col lg="6" className="justify-content-center d-flex mb-4">
                            <CheckBox 
                                key={"Remove all"}
                                checkboxName={"Remove all"}
                                isChecked={this.isAllRemoved}
                                onChange={this.onRemoveAll}
                                className={"NoColor"}/>
                        </Col>
                    </Row>
                    <div>
                        {this.props.allCheckboxNames.map((name) => {
                            return (
                                <Row>
                                    <Col>
                                        <CheckBox 
                                            key={name}
                                            checkboxName={name}
                                            isChecked={this.selectedCheckboxNames.includes(name)}
                                            onChange={this.onSelectionChange}
                                        />
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                </Form>
            </div>
        );
    }

    @computed get selectedCheckboxNames() {
        return this.props.store.selectedRecources;
    }

    @computed
    get isAllSelected() {
        return this.selectedCheckboxNames.length === this.props.allCheckboxNames.length &&
                this.selectedCheckboxNames.length > 0;
    }

    @computed
    get isAllRemoved() {
        return this.selectedCheckboxNames.length === 0;
    }

    @autobind
    private onSelectionChange(event: FormEvent<any>) {
        this.toggleSelection(event.currentTarget.value);
    }

    @autobind
    @action
    private toggleSelection(selection: string) {
        this.props.store.selectedRecources = toggleIncluded(selection, this.props.store.selectedRecources);
    }

    @autobind
    @action
    private onSelectAll() {
        this.props.store.selectedRecources = this.props.allCheckboxNames;
    }

    @autobind
    @action
    private onRemoveAll() {
        this.props.store.selectedRecources = [];
    }
}

export default CheckBoxContainer;