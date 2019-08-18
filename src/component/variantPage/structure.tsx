import * as React from 'react';
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import './structure.css';


interface IStructureProps
{
    name?: string;
}

@observer
class Structure extends React.Component<IStructureProps>
{

    public render()
    {
        return (
            <div className="moduleHeader" id={this.props.name}>
                {this.props.name}
            </div>
        );
    }
}

export default Structure;