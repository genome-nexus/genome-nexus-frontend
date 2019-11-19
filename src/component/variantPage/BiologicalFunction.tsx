import * as React from 'react';
import './FunctionalGroups';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import { MyVariantInfo, DefaultTooltip } from 'cbioportal-frontend-commons';
// import oncokb from "oncokb-styles";
import { GnomadFrequency } from 'react-mutation-mapper';
import { IndicatorQueryResp } from 'react-mutation-mapper/dist/model/OncoKb';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {

    public oncogenicity(oncokb: IndicatorQueryResp) {
        // TODO do we need to check the ""
        if(oncokb.oncogenic && oncokb.oncogenic !== "") {
        return <span className={classNames("oncokb", "likely-oncogenic")}>{oncokb.oncogenic}</span>
        }
    }
    public render() {
        if (this.props.oncokb) {
            return (
                <div>{this.props.oncokb.oncogenic}</div>
                );
        }
        
        else {
            return <div>shaziyemeiyou</div>
        }
    }
}

export default BiologicalFunction;
