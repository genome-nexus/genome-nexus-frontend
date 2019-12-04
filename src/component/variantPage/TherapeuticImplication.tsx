import * as React from 'react';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';

import functionalGroupsStyle from './functionalGroups.module.scss';
import therapeuticImplication from './TherapeuticImplication.module.scss';
import {
    IndicatorQueryResp,
    IndicatorQueryTreatment,
} from 'cbioportal-frontend-commons/api/generated/OncoKbAPI';
import _ from 'lodash';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import classNames from 'classnames';

interface ITherapeuticImplicationProps {
    oncokb: IndicatorQueryResp | undefined;
}

export const SENSITIVE_LEVELS = [
    'LEVEL_1',
    'LEVEL_2',
    'LEVEL_2A',
    'LEVEL_2B',
    'LEVEL_3',
    'LEVEL_3A',
    'LEVEL_3B',
    'LEVEL_4',
];

export const RESISTANT_LEVELS = ['LEVEL_R1', 'LEVEL_R2', 'LEVEL_R3'];

@observer
class TherapeuticImplication extends React.Component<
    ITherapeuticImplicationProps
> {
    public sensitiveDrugs(oncokbData: IndicatorQueryResp | undefined) {
        const treatmentsGroupByLevel = this.getTreatmentsGroupByLevel(
            oncokbData
        ); // group treatments by level
        if (
            oncokbData &&
            oncokbData.highestSensitiveLevel &&
            treatmentsGroupByLevel
        ) {
            const sensitiveTreatmentLevels = this.getSensitiveTreatmentLevels(
                treatmentsGroupByLevel
            ); // get all sensitive levels in this mutation
            const sensitiveDrugs = this.allDrugs(
                treatmentsGroupByLevel,
                sensitiveTreatmentLevels
            );
            return (
                <span className={therapeuticImplication['drugs-container']}>
                    <span className={therapeuticImplication['sensitive-text']}>
                        Sensitive to:
                    </span>
                    {sensitiveDrugs}
                </span>
            );
        }
        return null;
    }

    public resistantDrugs(oncokbData: IndicatorQueryResp | undefined) {
        const treatmentsGroupByLevel = this.getTreatmentsGroupByLevel(
            oncokbData
        ); // group treatments by level
        if (
            oncokbData &&
            oncokbData.highestResistanceLevel &&
            treatmentsGroupByLevel
        ) {
            const resistantTreatmentLevels = this.getResistantTreatmentLevels(
                treatmentsGroupByLevel
            ); // get all resistant levels in this mutation
            const resistantDrugs = this.allDrugs(
                treatmentsGroupByLevel,
                resistantTreatmentLevels
            );
            return (
                <span className={therapeuticImplication['drugs-container']}>
                    <span className={therapeuticImplication['resistant-text']}>
                        Resistant to:
                    </span>
                    {resistantDrugs}
                </span>
            );
        }
        return null;
    }

    private allDrugs(
        treatmentsGroupByLevel: { [level: string]: IndicatorQueryTreatment[] },
        levels: string[]
    ) {
        var drugs: any[] = [];
        var drugNames: string = '';
        _.forEach(levels, level => {
            drugs.push(
                _.chain(treatmentsGroupByLevel[level])
                    .flatMap(treatment => treatment.drugs)
                    .map(drug => drug.drugName)
                    .uniq()
                    .value()
            );
        });
        drugNames = _.chain(drugs)
            .flatMap()
            .uniq()
            .value()
            .join(', ');
        return (
            <span className={therapeuticImplication['drugs']}>{drugNames}</span>
        );
    }

    private getTreatmentsGroupByLevel(
        oncokbData: IndicatorQueryResp | undefined
    ): { [level: string]: IndicatorQueryTreatment[] } | undefined {
        if (oncokbData && oncokbData.treatments) {
            return _.groupBy(
                oncokbData.treatments,
                treatment => treatment.level
            );
        }
        return undefined;
    }

    private getSensitiveTreatmentLevels(treatmentsGroupByLevel: {
        [level: string]: IndicatorQueryTreatment[];
    }) {
        return _.chain(treatmentsGroupByLevel)
            .keys()
            .filter(level => SENSITIVE_LEVELS.includes(level))
            .uniq()
            .value();
    }

    private getResistantTreatmentLevels(treatmentsGroupByLevel: {
        [level: string]: IndicatorQueryTreatment[];
    }) {
        return _.chain(treatmentsGroupByLevel)
            .keys()
            .filter(level => RESISTANT_LEVELS.includes(level))
            .uniq()
            .value();
    }

    public oncokbToolTip(oncokb: IndicatorQueryResp | undefined) {
        let oncokbUrl = '';
        if (oncokb && oncokb.query && oncokb.query.hugoSymbol) {
            oncokbUrl = `https://oncokb.org/gene/${oncokb.query.hugoSymbol}`;
        } else {
            oncokbUrl = 'https://oncokb.org/gene/BRCA1';
        }
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        OncoKB is a precision oncology knowledge base and
                        contains
                        <br />
                        information about the effects and treatment implications
                        <br />
                        of specific cancer gene alterations.
                        <br />
                        <a
                            href={oncokbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Click to see variant on OncoKB website.</span>
                        </a>
                    </span>
                }
            >
                <span
                    className={classNames(
                        functionalGroupsStyle['data-source'],
                        therapeuticImplication['data-source']
                    )}
                >
                    <a
                        href={oncokbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        OncoKB
                    </a>
                </span>
            </DefaultTooltip>
        );
    }

    public render() {
        const sensitiveDrugs = this.sensitiveDrugs(this.props.oncokb);
        const resistantDrugs = this.resistantDrugs(this.props.oncokb);
        return sensitiveDrugs || resistantDrugs ? (
            <Row
                className={classNames(
                    functionalGroupsStyle['data-content'],
                    therapeuticImplication['data-content']
                )}
            >
                {this.oncokbToolTip(this.props.oncokb)}
                {sensitiveDrugs}
                {resistantDrugs}
            </Row>
        ) : (
            <span
                className={classNames(
                    functionalGroupsStyle['data-content'],
                    functionalGroupsStyle['no-data']
                )}
            >
                No data available
            </span>
        );
    }
}

export default TherapeuticImplication;
