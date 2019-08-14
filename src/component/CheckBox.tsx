import autobind from "autobind-decorator";
import * as React from 'react';
import {FormEvent} from "react";

import "./CheckBox.css";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { Form } from "react-bootstrap";

interface ICheckBoxProps
{
    checkboxName: string;
    isChecked: boolean;
    className?: string;
    onChange?: (event: FormEvent<any>) => void;
}

@observer
class CheckBox extends React.Component<ICheckBoxProps>
{
    @computed get className() {
        if (this.props.className) {
            return this.props.className;
        }
        else {
            return this.props.isChecked ? "selectedBackground" : "unselectedBackground";
        }
    }

    public render()
    {
        return (
            <div className={this.className}>
                <Form.Check
                    className="custom-checkbox"
                    type={"checkbox"}
                    label={this.props.checkboxName}
                    onChange={this.props.onChange}
                    value={this.props.checkboxName}
                    checked={this.props.isChecked}
                />
            </div>

        );
    }
}

export default CheckBox;