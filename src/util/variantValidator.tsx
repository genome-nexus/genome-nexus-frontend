import * as React from 'react';
import "./BasicInfo.css";
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import { VariantAnnotationSummary } from 'cbioportal-frontend-commons';
import _ from 'lodash';
import { string } from 'prop-types';

interface IVariantValidatorProps
{
    variant: string;
}

@observer
class VariantValidator extends React.Component<IVariantValidatorProps>
{
    private parseVariant() {
        const variant = this.props.variant.trim().replace("chr","").replace("23:g.","X:g.").replace("24:g.","Y:g.");
        const chromosome = variant.split(":g.")[0];

    }
    public render()
    {
        
        return (
            <div>
                
            </div>
        );
    }
}

export default VariantValidator;