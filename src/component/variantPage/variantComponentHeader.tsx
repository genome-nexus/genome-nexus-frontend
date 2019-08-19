import * as React from 'react';
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import './variantComponentHeader.css';


interface IVariantComponentHeaderProps
{
    name: string;
}

@observer
class VariantComponentHeader extends React.Component<IVariantComponentHeaderProps>
{

    public render()
    {
        return (
            <div className="header" id={this.props.name}>
                {this.props.name}
            </div>
        );
    }
}

export default VariantComponentHeader;