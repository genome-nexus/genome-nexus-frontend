import * as React from 'react';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import { MyVariantInfo, DefaultTooltip } from 'cbioportal-frontend-commons';
import classNames from 'classnames';

import functionalGroupsStyle from './functionalGroups.module.scss';
import GnomadData from './GnomadData';

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
            gnomadUrl = 'https://gnomad.broadinstitute.org/';
        }

        return (
            <span
                className={classNames(
                    functionalGroupsStyle['data-group-gap'],
                    functionalGroupsStyle['link']
                )}
            >
                <a href={gnomadUrl} target="_blank" rel="noopener noreferrer">
                    <span className={functionalGroupsStyle['gnomad']}>
                        <GnomadData
                            myVariantInfo={this.props.myVariantInfo}
                            gnomadUrl={gnomadUrl}
                        />
                    </span>
                </a>
            </span>
        );
    }

    public dbsnp(myVariantInfo: MyVariantInfo | undefined) {
        let dbsnpUrl = '';
        if (myVariantInfo && myVariantInfo.dbsnp && myVariantInfo.dbsnp.rsid) {
            dbsnpUrl = `https://www.ncbi.nlm.nih.gov/snp/${myVariantInfo.dbsnp.rsid}`;
        } else {
            dbsnpUrl = 'https://www.ncbi.nlm.nih.gov/snp/';
        }
        if (
            this.props.myVariantInfo &&
            this.props.myVariantInfo.dbsnp &&
            this.props.myVariantInfo.dbsnp.rsid
        ) {
            return (
                <span className={functionalGroupsStyle['data-group-gap']}>
                    {this.dbsnpToolTip(
                        dbsnpUrl,
                        <span className={functionalGroupsStyle['dbsnp']}>
                            {this.props.myVariantInfo.dbsnp.rsid}
                        </span>
                    )}
                </span>
            );
        } else {
            return (
                <span className={functionalGroupsStyle['data-group-gap']}>
                    {this.dbsnpToolTip(
                        dbsnpUrl,
                        <span className={functionalGroupsStyle['dbsnp']}>
                            N/A
                        </span>
                    )}
                </span>
            );
        }
    }

    public dbsnpToolTip(dbsnpUrl: string, content: JSX.Element) {
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
                <span className={functionalGroupsStyle['link']}>
                    <a
                        href={dbsnpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={functionalGroupsStyle['data-source']}>
                            dbSNP
                        </span>
                        {content}
                    </a>
                </span>
            </DefaultTooltip>
        );
    }

    public render() {
        return (
            <Row className={functionalGroupsStyle['data-content']}>
                {this.gnomad(this.props.myVariantInfo, this.props.chromosome)}
                {this.dbsnp(this.props.myVariantInfo)}
            </Row>
        );
    }
}

export default PopulationPrevalence;
