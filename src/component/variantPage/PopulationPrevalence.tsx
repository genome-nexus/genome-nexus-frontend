import * as React from 'react';
import { observer } from 'mobx-react';
import { MyVariantInfo, DefaultTooltip } from 'cbioportal-frontend-commons';
import { GnomadFrequency } from 'react-mutation-mapper';

import functionalGroupsStyle from './functionalGroups.module.scss';

interface IPopulationPrevalenceProps {
    myVariantInfo: MyVariantInfo | undefined;
    chromosome: string | null;
}

type Vcf = {
    chrom: string;
    ref: string;
    alt: string;
    pos: number;
};
@observer
class PopulationPrevalence extends React.Component<IPopulationPrevalenceProps> {
    public gnomad(
        myVariantInfo: MyVariantInfo | undefined,
        chromosome: string | null
    ) {
        // generate gnomad url
        let gnomadUrl = 'https://gnomad.broadinstitute.org/';
        if (myVariantInfo && myVariantInfo.vcf && chromosome) {
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
                <span className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <a
                            href={gnomadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.gnomadTooltip(gnomadUrl)}
                        </a>
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
                </span>
            );
        } else {
            return (
                <span className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <a
                            href={gnomadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.gnomadTooltip(gnomadUrl)}
                        </a>
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
                </span>
            );
        }
    }

    public gnomadTooltip(gnomadUrl: string) {
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        <a
                            href={gnomadUrl}
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
                <span>
                    gnomAD&nbsp;<i className="fas fa-external-link-alt"></i>
                </span>
            </DefaultTooltip>
        );
    }

    public dbsnp(myVariantInfo: MyVariantInfo | undefined) {
        const dbsnpUrl =
            myVariantInfo && myVariantInfo.dbsnp && myVariantInfo.dbsnp.rsid
                ? `https://www.ncbi.nlm.nih.gov/snp/${myVariantInfo.dbsnp.rsid}`
                : 'https://www.ncbi.nlm.nih.gov/snp/';
        if (
            this.props.myVariantInfo &&
            this.props.myVariantInfo.dbsnp &&
            this.props.myVariantInfo.dbsnp.rsid
        ) {
            return (
                <span className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <a
                            href={dbsnpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.dbsnpToolTip(dbsnpUrl)}
                        </a>
                    </div>
                    <div className={functionalGroupsStyle['data-with-link']}>
                        <a
                            href={dbsnpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.props.myVariantInfo.dbsnp.rsid}
                        </a>
                    </div>
                </span>
            );
        } else {
            return (
                <span className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <a
                            href={dbsnpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.dbsnpToolTip(dbsnpUrl)}
                        </a>
                    </div>
                    <div className={functionalGroupsStyle['data-with-link']}>
                        <a
                            href={dbsnpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            N/A
                        </a>
                    </div>
                </span>
            );
        }
    }

    public dbsnpToolTip(dbsnpUrl: string) {
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        The Single Nucleotide Polymorphism Database (
                        <a
                            href={dbsnpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            dbSNP
                        </a>
                        )<br />
                        is a free public archive for genetic variation within
                        and
                        <br />
                        across different species.
                    </span>
                }
            >
                <span>
                    <a
                        href={dbsnpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        dbSNP&nbsp;<i className="fas fa-external-link-alt"></i>
                    </a>
                </span>
            </DefaultTooltip>
        );
    }

    public render() {
        return (
            <div>
                {this.gnomad(this.props.myVariantInfo, this.props.chromosome)}
                {this.dbsnp(this.props.myVariantInfo)}
            </div>
        );
    }
}

export default PopulationPrevalence;
