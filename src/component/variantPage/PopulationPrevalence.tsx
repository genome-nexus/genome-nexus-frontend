import * as React from 'react';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
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
    public gnomad() {
        if (
            this.props.myVariantInfo &&
            (this.props.myVariantInfo.gnomadExome ||
                this.props.myVariantInfo.gnomadGenome)
        ) {
            return (
                <span className={functionalGroupsStyle['data-group-gap']}>
                    {this.gnomadTooltip(
                        this.props.myVariantInfo,
                        this.props.chromosome
                    )}
                    <span className={functionalGroupsStyle['gnomad']}>
                        <GnomadFrequency
                            myVariantInfo={this.props.myVariantInfo}
                        />
                    </span>
                </span>
            );
        } else {
            return (
                <span className={functionalGroupsStyle['data-group-gap']}>
                    {this.gnomadTooltip(
                        this.props.myVariantInfo,
                        this.props.chromosome
                    )}
                    <span className={functionalGroupsStyle['gnomad']}>N/A</span>
                </span>
            );
        }
    }

    public gnomadTooltip(
        myVariantInfo: MyVariantInfo | undefined,
        chromosome: string | null
    ) {
        let gnomadUrl = '';
        if (myVariantInfo && myVariantInfo.vcf && chromosome) {
            const vcfVariant: Vcf = {
                chrom: chromosome,
                ref: myVariantInfo.vcf.ref,
                alt: myVariantInfo.vcf.alt,
                pos: Number(myVariantInfo.vcf.position),
            };
            gnomadUrl = `https://gnomad.broadinstitute.org/variant/${vcfVariant.chrom}-${vcfVariant.pos}-${vcfVariant.ref}-${vcfVariant.alt}`;
        } else {
            gnomadUrl = 'https://www.ncbi.nlm.nih.gov/snp/';
        }
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        gnomAD population allele frequencies. Overall population
                        <br />
                        allele frequency is shown. Hover over a frequency to see
                        <br />
                        the frequency for each specific population. <br />
                        <a
                            href={gnomadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Click to see variant on gnomAD website.</span>
                        </a>
                    </span>
                }
            >
                <span className={functionalGroupsStyle['data-source']}>
                    <a
                        href={gnomadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        gnomAD
                    </a>
                </span>
            </DefaultTooltip>
        );
    }

    public dbsnp() {
        if (
            this.props.myVariantInfo &&
            this.props.myVariantInfo.dbsnp &&
            this.props.myVariantInfo.dbsnp.rsid
        ) {
            return (
                <span className={functionalGroupsStyle['data-group-gap']}>
                    {this.dbsnpToolTip(this.props.myVariantInfo)}
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <span>
                                dbSNP ID.&nbsp;
                                <a
                                    href={`https://www.ncbi.nlm.nih.gov/snp/${this.props.myVariantInfo.dbsnp.rsid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        Click here to see variant on dbSNP
                                        website.
                                    </span>
                                </a>
                            </span>
                        }
                    >
                        <span className={functionalGroupsStyle['dbsnp']}>
                            {this.props.myVariantInfo.dbsnp.rsid}
                        </span>
                    </DefaultTooltip>
                </span>
            );
        } else {
            return (
                <span className={functionalGroupsStyle['data-group-gap']}>
                    {this.dbsnpToolTip(this.props.myVariantInfo)}
                    <span className={functionalGroupsStyle['dbsnp']}>N/A</span>
                </span>
            );
        }
    }

    public dbsnpToolTip(myVariantInfo: MyVariantInfo | undefined) {
        let dbsnpUrl = '';
        if (myVariantInfo && myVariantInfo.dbsnp && myVariantInfo.dbsnp.rsid) {
            dbsnpUrl = `https://www.ncbi.nlm.nih.gov/snp/${myVariantInfo.dbsnp.rsid}`;
        } else {
            dbsnpUrl = 'https://www.ncbi.nlm.nih.gov/snp/';
        }
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        The Single Nucleotide Polymorphism Database (dbSNP)
                        <br />
                        is a free public archive for genetic variation within
                        and
                        <br />
                        across different species. <br />
                        <a
                            href={dbsnpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Click to see variant on dbSNP website.</span>
                        </a>
                    </span>
                }
            >
                <span className={functionalGroupsStyle['data-source']}>
                    <a
                        href={dbsnpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        dbSNP
                    </a>
                </span>
            </DefaultTooltip>
        );
    }

    public render() {
        return (
            <Row className={functionalGroupsStyle['data-content']}>
                {this.gnomad()}
                {this.dbsnp()}
            </Row>
        );
    }
}

export default PopulationPrevalence;
