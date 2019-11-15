import * as React from 'react';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import { MyVariantInfo, DefaultTooltip } from 'cbioportal-frontend-commons';
import { GnomadFrequency } from 'react-mutation-mapper';

import './FunctionalGroups.css';

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
            return <GnomadFrequency myVariantInfo={this.props.myVariantInfo} />;
        } else {
            return 'N/A';
        }
    }

    public generateGnomadTooltip(
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
                <span>gnomAD</span>
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
                                    Click here to see variant on dbSNP website.
                                </span>
                            </a>
                        </span>
                    }
                >
                    <span>{this.props.myVariantInfo.dbsnp.rsid}</span>
                </DefaultTooltip>
            );
        } else {
            return 'N/A';
        }
    }

    public generateDbsnpToolTip(myVariantInfo: MyVariantInfo | undefined) {
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
                <span>dbSNP</span>
            </DefaultTooltip>
        );
    }

    public render() {
        return (
            <Row className="data-content">
                <span className="data-source">
                    {this.generateGnomadTooltip(
                        this.props.myVariantInfo,
                        this.props.chromosome
                    )}
                </span>
                <span className="gnomad">{this.gnomad()}</span>
                <span className="data-source">
                    {this.generateDbsnpToolTip(this.props.myVariantInfo)}
                </span>
                <span className="dbsnp">{this.dbsnp()}</span>
            </Row>
        );
    }
}

export default PopulationPrevalence;
