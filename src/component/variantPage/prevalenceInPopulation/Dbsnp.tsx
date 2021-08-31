import { observer } from 'mobx-react';
import * as React from 'react';
import { MyVariantInfo } from 'genome-nexus-ts-api-client';
import functionalGroupsStyle from '../functionalGroups.module.scss';
import { DefaultTooltip } from 'cbioportal-frontend-commons';

export interface IDbSnpProps {
    myVariantInfo?: MyVariantInfo;
}

@observer
class Dbsnp extends React.Component<IDbSnpProps> {
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
                <a href={dbsnpUrl} target="_blank" rel="noopener noreferrer">
                    dbSNP&nbsp;
                    <i className="fas fa-external-link-alt" />
                </a>
            </DefaultTooltip>
        );
    }

    public render() {
        const myVariantInfo = this.props.myVariantInfo;

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
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        {this.dbsnpToolTip(dbsnpUrl)}
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
                </div>
            );
        } else {
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        {this.dbsnpToolTip(dbsnpUrl)}
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
                </div>
            );
        }
    }
}

export default Dbsnp;
