import * as React from 'react';
import './FunctionalGroups';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { MyVariantInfo, DefaultTooltip } from 'cbioportal-frontend-commons';

import { GnomadFrequency } from 'react-mutation-mapper';

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
    private gnomad() {
        if (this.props.myVariantInfo) {
            return <GnomadFrequency myVariantInfo={this.props.myVariantInfo} />;
        } else {
            return 'N/A';
        }
    }

    public generateGnomadUrl(
        myVariantInfo: MyVariantInfo | undefined,
        chromosome: string | null
    ) {
        if (myVariantInfo && myVariantInfo.vcf && chromosome) {
            const vcfVariant: Vcf = {
                chrom: chromosome,
                ref: myVariantInfo.vcf.ref,
                alt: myVariantInfo.vcf.alt,
                pos: Number(myVariantInfo.vcf.position),
            };
            return `https://gnomad.broadinstitute.org/variant/${vcfVariant.chrom}-${vcfVariant.pos}-${vcfVariant.ref}-${vcfVariant.alt}`;
        } else {
            return 'https://www.ncbi.nlm.nih.gov/snp/';
        }
    }

    private dbsnp() {
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

    public render() {
        return (
            <Row className="data-content">
                <Col lg="2">
                    <span className="gnomad">{this.gnomad()}</span>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <span>
                                <a
                                    href={this.generateGnomadUrl(
                                        this.props.myVariantInfo,
                                        this.props.chromosome
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        Click to see variant on gnomAD website.
                                    </span>
                                </a>
                            </span>
                        }
                    >
                        <span className="data-scouce">&nbsp;[gnomAD]</span>
                    </DefaultTooltip>
                </Col>
                <Col lg="2">
                    <span className="dbsnp">{this.dbsnp()}</span>
                    <span className="data-scouce">&nbsp;[dbSNP]</span>
                </Col>
            </Row>
        );
    }
}

export default PopulationPrevalence;
