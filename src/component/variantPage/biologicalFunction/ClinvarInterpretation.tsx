import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { Clinvar } from 'genome-nexus-ts-api-client';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import functionalGroupsStyle from '../functionalGroups.module.scss';

interface IClinvarInterpretationProps {
    clinvar?: Clinvar | undefined;
}

@observer
export default class ClinvarInterpretation extends React.Component<
    IClinvarInterpretationProps
> {
    @computed get clinvarLink() {
        return this.props.clinvar
            ? `https://www.ncbi.nlm.nih.gov/clinvar/variation/${this.props.clinvar.clinvarId}/`
            : `https://www.ncbi.nlm.nih.gov/clinvar/`;
    }

    @computed get clinvarInterpretationContent() {
        let clinvarInterpretation = '';
        if (this.props.clinvar && this.props.clinvar.clinicalSignificance) {
            clinvarInterpretation = this.props.clinvar
                .conflictingClinicalSignificance
                ? `${this.props.clinvar.clinicalSignificance.replaceAll(
                      '_',
                      ' '
                  )} (${this.props.clinvar.conflictingClinicalSignificance.replaceAll(
                      '_',
                      ' '
                  )})`
                : this.props.clinvar.clinicalSignificance.replaceAll('_', ' ');
            return (
                <DefaultTooltip
                    placement="top"
                    overlay={
                        <div>
                            {clinvarInterpretation}
                            <div>
                                {`ClinVar ID: `}
                                {
                                    <a
                                        href={this.clinvarLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {this.props.clinvar.clinvarId}
                                    </a>
                                }
                            </div>
                        </div>
                    }
                >
                    <a
                        href={this.clinvarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={functionalGroupsStyle['data-with-link']}
                    >
                        {clinvarInterpretation}
                    </a>
                </DefaultTooltip>
            );
        }
        return (
            <a
                href={this.clinvarLink}
                target="_blank"
                rel="noopener noreferrer"
                className={functionalGroupsStyle['data-with-link']}
            >
                N/A
            </a>
        );
    }

    public render() {
        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <span>
                                <a
                                    href={this.clinvarLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`ClinVar `}
                                </a>{' '}
                                aggregates information about genomic variation
                                and its relationship to human health.
                            </span>
                        }
                    >
                        <a
                            href={this.clinvarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {`ClinVar `}
                            <i className="fas fa-external-link-alt" />
                        </a>
                    </DefaultTooltip>
                </div>
                <div className={functionalGroupsStyle['data-with-link']}>
                    {this.clinvarInterpretationContent}
                </div>
            </div>
        );
    }
}
