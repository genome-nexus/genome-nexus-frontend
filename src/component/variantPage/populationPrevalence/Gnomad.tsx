import { observer } from 'mobx-react';
import * as React from 'react';
import { MyVariantInfo } from 'genome-nexus-ts-api-client';

import { GnomadFrequency } from 'react-mutation-mapper';
import functionalGroupsStyle from '../functionalGroups.module.scss';
import { DefaultTooltip } from 'cbioportal-frontend-commons';

export interface IGnomadProps {
    myVariantInfo?: MyVariantInfo;
    chromosome: string | null;
}

type Vcf = {
    chrom: string;
    ref: string;
    alt: string;
    pos: number;
};

const GnomadInfo: React.FunctionComponent<{ url: string }> = (props) => {
    return (
        <DefaultTooltip
            placement="top"
            overlay={
                <span>
                    <a
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        gnomAD
                    </a>
                    &nbsp;population allele frequencies. Overall population
                    <br />
                    allele frequency is shown. Hover over a frequency to see
                    <br />
                    the frequency for each specific population.
                </span>
            }
        >
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                gnomAD&nbsp;
                <i className="fas fa-external-link-alt" />
            </a>
        </DefaultTooltip>
    );
};

@observer
class Gnomad extends React.Component<IGnomadProps> {
    public render() {
        const myVariantInfo = this.props.myVariantInfo;
        const chromosome = this.props.chromosome;

        // generate gnomad url
        let gnomadUrl = 'https://gnomad.broadinstitute.org/';
        if (myVariantInfo?.vcf && chromosome) {
            const vcfVariant: Vcf = {
                chrom: chromosome,
                ref: myVariantInfo.vcf.ref,
                alt: myVariantInfo.vcf.alt,
                pos: Number(myVariantInfo.vcf.position),
            };
            gnomadUrl = `https://gnomad.broadinstitute.org/variant/${vcfVariant.chrom}-${vcfVariant.pos}-${vcfVariant.ref}-${vcfVariant.alt}`;
        }

        if (
            this.props.myVariantInfo &&
            (this.props.myVariantInfo.gnomadExome ||
                this.props.myVariantInfo.gnomadGenome)
        ) {
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        {<GnomadInfo url={gnomadUrl} />}
                    </div>
                    <div className={functionalGroupsStyle['data-with-link']}>
                        <a
                            href={gnomadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GnomadFrequency
                                myVariantInfo={this.props.myVariantInfo}
                            />
                        </a>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        {<GnomadInfo url={gnomadUrl} />}
                    </div>
                    <div className={functionalGroupsStyle['data-with-link']}>
                        <a
                            href={gnomadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            N/A
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export default Gnomad;
