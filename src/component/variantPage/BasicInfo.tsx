import * as React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import { observable, action } from 'mobx';
import {
    VariantAnnotationSummary,
    TranscriptConsequenceSummary,
    getCanonicalMutationType,
    DefaultTooltip,
} from 'cbioportal-frontend-commons';
import { Alteration } from 'cbioportal-frontend-commons/api/generated/OncoKbAPI';
import { Mutation } from 'react-mutation-mapper';
import basicInfo from './BasicInfo.module.scss';
import { Button } from 'react-bootstrap';
import TranscriptSummaryTable from './TranscriptSummaryTable';

interface IBasicInfoProps {
    annotation: VariantAnnotationSummary | undefined;
    mutation: Mutation;
    oncokbVariant?: Alteration[];
    variant: string;
}

type MutationTypeFormat = {
    label?: string;
    className: string;
};

type OncogeneTsg = {
    oncogene?: boolean | undefined;
    tsg?: boolean | undefined;
};

// MAIN_MUTATION_TYPE_MAP comes from react-mutation-mapper
// TODO probably should get this from cbioportal-frontend-commons or react-mutation-mapper
export const MAIN_MUTATION_TYPE_MAP: { [key: string]: MutationTypeFormat } = {
    missense: {
        label: 'Missense',
        className: 'missense-mutation',
    },
    inframe: {
        label: 'IF',
        className: 'inframe-mutation',
    },
    truncating: {
        label: 'Truncating',
        className: 'trunc-mutation',
    },
    nonsense: {
        label: 'Nonsense',
        className: 'trunc-mutation',
    },
    nonstop: {
        label: 'Nonstop',
        className: 'trunc-mutation',
    },
    nonstart: {
        label: 'Nonstart',
        className: 'trunc-mutation',
    },
    frameshift: {
        label: 'FS',
        className: 'trunc-mutation',
    },
    frame_shift_del: {
        label: 'FS del',
        className: 'trunc-mutation',
    },
    frame_shift_ins: {
        label: 'FS ins',
        className: 'trunc-mutation',
    },
    in_frame_ins: {
        label: 'IF ins',
        className: 'inframe-mutation',
    },
    in_frame_del: {
        label: 'IF del',
        className: 'inframe-mutation',
    },
    splice_site: {
        label: 'Splice',
        className: 'trunc-mutation',
    },
    fusion: {
        label: 'Fusion',
        className: 'fusion',
    },
    silent: {
        label: 'Silent',
        className: 'other-mutation',
    },
    other: {
        label: 'Other',
        className: 'other-mutation',
    },
};

export type BasicInfoData = {
    value: string | null;
    key: string;
    category?: string;
};

@observer
export default class BasicInfo extends React.Component<IBasicInfoProps> {
    @observable showAllTranscripts = false;

    public render() {
        const haveTranscriptTable = this.haveTranscriptTable(
            this.props.annotation
        );
        const canonicalTranscript =
            this.props.annotation &&
            this.props.annotation.transcriptConsequenceSummary;
        if (this.props.annotation) {
            let renderData:
                | BasicInfoData[]
                | null = this.getDataFromTranscriptConsequenceSummary(
                canonicalTranscript
            );
            if (renderData === null) {
                return null;
            }
            if (renderData) {
                renderData = renderData.filter(data => data.value != null); // remove null fields
            }
            let basicInfoList = _.map(renderData, data => {
                return BasicInfoUnit(data.value, data.key, data.category);
            });

            return (
                <div className={basicInfo['basic-info-container']}>
                    <span className={basicInfo['basic-info-pills']}>
                        {basicInfoList}
                        {haveTranscriptTable &&
                            this.transcriptsButton(this.showAllTranscripts)}
                    </span>
                    <TranscriptSummaryTable
                        annotation={this.props.annotation}
                        isOpen={this.showAllTranscripts}
                    />
                    {this.showAllTranscripts && haveTranscriptTable && (
                        <span className={basicInfo['transcript-table-source']}>
                            Data in the table comes from&nbsp;
                            <a
                                href={
                                    'https://useast.ensembl.org/info/docs/tools/vep/index.html'
                                } // TODO goes to VEP variant page
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VEP
                            </a>
                            .&nbsp;&nbsp;&nbsp;
                            {this.transcriptsButton(this.showAllTranscripts)}
                        </span>
                    )}
                </div>
            );
        } else {
            return null;
        }
    }

    public getDataFromTranscriptConsequenceSummary(
        transcript: TranscriptConsequenceSummary | undefined
    ): BasicInfoData[] | null {
        // no canonical transcript, return null
        if (transcript === undefined) {
            return null;
        }
        let parsedData: BasicInfoData[] = [];
        const oncokbOncogeneTsg = this.findOncokbVariant(
            this.props.oncokbVariant
        );
        // gene
        parsedData.push({
            value: transcript.hugoGeneSymbol,
            key: 'hugoGeneSymbol',
            category: 'gene',
        });
        // oncogene
        parsedData.push({
            value: this.getOncogene(oncokbOncogeneTsg),
            key: 'oncogene',
            category: 'oncogene',
        });
        // tsg
        parsedData.push({
            value: this.getTsg(oncokbOncogeneTsg),
            key: 'tsg',
            category: 'tsg',
        });
        // protein change
        parsedData.push({
            value: transcript.hgvspShort,
            key: 'hgvsShort',
            category: 'default',
        });
        // variant classification
        parsedData.push({
            value: transcript.variantClassification,
            key: 'variantClassification',
            category: getMutationTypeClassName(transcript),
        });
        // variant type
        parsedData.push({
            value: this.props.annotation!.variantType,
            key: 'variantType',
            category: 'mutation',
        });
        // hgvsg
        parsedData.push({
            value: this.props.variant,
            key: 'hgvsg',
            category: 'default',
        });
        //hgvsc
        parsedData.push({
            value: this.parseHgvscFromTranscriptConsequenceSummary(transcript),
            key: 'hgvsc',
            category: 'default',
        });
        // transcript id
        parsedData.push({
            value: transcript.transcriptId,
            key: 'transcript',
            category: 'default',
        });
        // ref seq
        parsedData.push({
            value: transcript.refSeq,
            key: 'refSeq',
            category: 'default',
        });
        return parsedData;
    }

    private parseHgvscFromTranscriptConsequenceSummary(
        transcript: TranscriptConsequenceSummary
    ) {
        if (transcript.hgvsc) {
            let hgvsc = transcript.hgvsc;
            let startIndex = hgvsc.indexOf('c.');
            return startIndex !== -1 ? hgvsc.substr(startIndex) : null;
        }
        return null;
    }

    // find the target variant by alteration
    private findOncokbVariant(
        oncokb: Alteration[] | undefined
    ): OncogeneTsg | null {
        if (oncokb) {
            const alterationName = this.getAlteration(this.props.annotation);
            let oncogeneTsg: OncogeneTsg = {};
            // find the variant with same alteration
            const targetVariant = _.find(oncokb, variant => {
                if (alterationName && variant.alteration === alterationName) {
                    if (
                        variant.gene &&
                        (variant.gene.oncogene || variant.gene.tsg)
                    ) {
                        return true;
                    }
                }
                return false;
            });
            if (targetVariant) {
                oncogeneTsg = {
                    oncogene: targetVariant.gene.oncogene,
                    tsg: targetVariant.gene.tsg,
                };
            }
            return oncogeneTsg;
        }
        return null;
    }

    private getOncogene(oncogeneData: OncogeneTsg | null) {
        if (oncogeneData) {
            return oncogeneData.oncogene === true ? 'Oncogene' : null;
        } else {
            return null;
        }
    }

    private getTsg(oncogeneData: OncogeneTsg | null) {
        if (oncogeneData) {
            return oncogeneData.tsg === true ? 'TSG' : null;
        } else {
            return null;
        }
    }

    private getAlteration(annotation: VariantAnnotationSummary | undefined) {
        if (annotation && annotation.transcriptConsequenceSummary) {
            let alteration = annotation.transcriptConsequenceSummary.hgvspShort;
            let startIndex = alteration.indexOf('p.') + 2; // + 2 will exclude the 'p.' in the result
            return startIndex !== 1 ? alteration.substr(startIndex) : null; // !== -1 means there is no 'p.' in the string, here because the startIndex was +2 before, so have !== 1 instead
        } else {
            return null;
        }
    }

    private haveTranscriptTable(
        annotation: VariantAnnotationSummary | undefined
    ): boolean {
        return (
            annotation !== undefined &&
            annotation.transcriptConsequenceSummary !== undefined &&
            annotation.transcriptConsequenceSummaries !== undefined &&
            annotation.transcriptConsequenceSummaries.length > 1
        );
    }

    private transcriptsButton(isOpened: boolean) {
        return (
            <Button
                onClick={this.onButtonClick}
                aria-controls="table-content"
                variant="outline-secondary"
                className="btn-sm"
            >
                {isOpened && (
                    <span>
                        Close table&nbsp;
                        <i className="fa fa-chevron-circle-up" />
                    </span>
                )}
                {!isOpened && (
                    <span>
                        All transcripts&nbsp;
                        <i className="fa fa-chevron-circle-down" />
                    </span>
                )}
            </Button>
        );
    }

    @autobind
    @action
    onButtonClick() {
        this.showAllTranscripts = !this.showAllTranscripts;
    }
}

function BasicInfoUnit(
    value: string | null,
    key: string,
    category: string | undefined
) {
    if (key === 'oncogene' || key === 'tsg') {
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        As categorised by&nbsp;
                        <a
                            href={'https://www.oncokb.org/'} // TODO goes to oncokb variant page?
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                            >
                                OncoKB
                                <img
                                    height={12}
                                    src={require('./biologicalFunction/oncokb.png')}
                                    alt="oncokb"
                                />
                            </span>
                        </a>
                    </span>
                }
            >
                <span
                    className={classNames(
                        basicInfo[`${category}`],
                        basicInfo[`data-pills`]
                    )}
                >
                    {value}
                </span>
            </DefaultTooltip>
        );
    }

    return (
        <span
            className={classNames(
                basicInfo[`${category}`],
                basicInfo[`data-pills`]
            )}
        >
            {value}
        </span>
    );
}

// logic is from react-mutation-mapper
function getMutationTypeClassName(
    transcript: TranscriptConsequenceSummary
): string {
    const value: MutationTypeFormat | undefined = getMapEntry(
        transcript.consequenceTerms
    );
    if (value && value.className) {
        return value.className;
    } else {
        return MAIN_MUTATION_TYPE_MAP['other'].className;
    }
}

// logic is from react-mutation-mapper
function getMapEntry(mutationType: string | undefined) {
    if (mutationType) {
        return MAIN_MUTATION_TYPE_MAP[getCanonicalMutationType(mutationType)];
    } else {
        return undefined;
    }
}
