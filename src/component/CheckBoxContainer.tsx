import autobind from "autobind-decorator";
import * as React from 'react';
import {FormEvent} from "react";
import {
    Form, Row, Col
} from "react-bootstrap";
import CheckBox from "./CheckBox";
import { observable, action, computed } from "mobx";
import { toggleIncluded } from "../lib/ArrayUtils";
import { observer } from "mobx-react";
import "./CheckboxContainer.css";

interface ICheckContainerProps
{
    allCheckboxNames: string[];
}

@observer
class CheckBoxContainer extends React.Component<ICheckContainerProps>
{

    @observable selectedCheckboxNames = this.props.allCheckboxNames;
    @computed get isAllSelected() {
        return this.selectedCheckboxNames.length === this.props.allCheckboxNames.length &&
                this.selectedCheckboxNames.length > 0;
    }

    @computed get isAllRemoved() {
        return this.selectedCheckboxNames.length === 0;
    }

    public render()
    {
        return (
            <div>
                <Form>
                    <Row className="px-3">
                        <Col className="topCheckbox justify-content-center d-flex">
                            <CheckBox 
                                key={"Select all"}
                                checkboxName={"Select all"}
                                isChecked={this.isAllSelected}
                                onChange={this.onSelectAll}
                                className={"NoColor"}/>
                        </Col>
                        <Col className="topCheckbox justify-content-center d-flex">
                            <CheckBox 
                                key={"Remove all"}
                                checkboxName={"Remove all"}
                                isChecked={this.isAllRemoved}
                                onChange={this.onRemoveAll}
                                className={"NoColor"}/>
                        </Col>
                    </Row>
                    <div className="px-3">
                        {this.props.allCheckboxNames.map((name) => {
                            return (
                                <Row className="m-auto">
                                    <CheckBox key={name} checkboxName={name} isChecked={this.selectedCheckboxNames.includes(name)} onChange={this.onSelectionChange}/>
                                </Row>
                            )
                        })}
                    </div>

               
                </Form>
            </div>
        );
    }

    @autobind
    private onSelectionChange(event: FormEvent<any>)
    {
        this.toggleSelection(event.currentTarget.value);
    }

    @autobind
    @action
    private toggleSelection(selection: string)
    {
        this.selectedCheckboxNames = toggleIncluded(selection, this.selectedCheckboxNames);
    }

    @autobind
    @action
    private onSelectAll()
    {
        this.selectedCheckboxNames = this.props.allCheckboxNames;
    }

    @autobind
    @action
    private onRemoveAll()
    {
        this.selectedCheckboxNames = [];
    }
}

export default CheckBoxContainer;