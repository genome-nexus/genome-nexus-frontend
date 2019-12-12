import * as React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import { observable } from 'mobx';
import {
    VariantAnnotationSummary,
    TranscriptConsequenceSummary,
    getCanonicalMutationType,
    DefaultTooltip,
} from 'cbioportal-frontend-commons';
import { Alteration } from 'cbioportal-frontend-commons/api/generated/OncoKbAPI';
import { Mutation } from 'react-mutation-mapper';
import TranscriptDropdown from './TranscriptDropdown';
import basicInfo from './BasicInfo.module.scss';

interface IBasicInfoProps {
    annotation: VariantAnnotationSummary | undefined;
    mutation: Mutation;
    oncokbVariant?: Alteration[];
}

type MutationTypeFormat = {
    label?: string;
    className: string;
};

type OncogeneTsg = {
    oncogene?: boolean | undefined;
    tsg?: boolean | undefined;
};

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
    @observable activeTranscript: TranscriptConsequenceSummary | undefined = this.shouldShowDropDown(this.props.annotation) ? this.props.annotation!.transcriptConsequenceSummary : undefined;

    public render() {
        if (this.props.annotation) {
            let renderData:
                | BasicInfoData[]
                | null = this.getDataFromTranscriptConsequenceSummary(
                this.activeTranscript
            );
            // no selection, return null
            if (renderData === null) {
                return null;
            }
            if (renderData) {
                renderData = renderData.filter(data => data.value != null);
            }
            let basicInfoList = _.map(renderData, data => {
                return BasicInfoUnit(data.value, data.key, data.category);
            });

            return (
                <div className={basicInfo['basic-info-container']}>
                    <span className={basicInfo['transcript-dropdown']}>
                    {
                        (this.shouldShowDropDown(this.props.annotation)) && (
                            <TranscriptDropdown
                                annotation={this.props.annotation!}
                                canonicalTranscript={
                                    this.props.annotation.transcriptConsequenceSummary!
                                }
                                otherTranscript={this.props.annotation.transcriptConsequenceSummaries!}
                                onTranscriptSelection={this.onTranscriptSelection}
                            />
                        )
                    }
                    </span>
                    <span className={basicInfo['basic-info-pills-container']}>
                        {basicInfoList}
                    </span>
                </div>
            );
        } else {
            return null;
        }
    }

    public getDataFromTranscriptConsequenceSummary(
        Transcript: TranscriptConsequenceSummary | undefined
    ): BasicInfoData[] | null {
        // no active Transcript, return null
        if (Transcript === undefined) {
            return null;
        }
        let parsedData: BasicInfoData[] = [];
        const oncokbOncogeneTsg = this.findOncokbVariant(
            this.props.oncokbVariant
        );
            parsedData.push({
                value: this.parseHgvscFromTranscriptConsequenceSummary(
                    Transcript
                ),
                key: 'hgvsc',
                category: 'default',
            });
            parsedData.push({
                value: Transcript.hgvspShort,
                key: 'hgvsShort',
                category: 'default',
            });
            parsedData.push({
                value: Transcript.hugoGeneSymbol,
                key: 'hugoGeneSymbol',
                category: 'default',
            });
            parsedData.push({
                value: this.props.annotation!.variantType,
                key: 'variantType',
                category: 'mutation',
            });
            parsedData.push({
                value: getMutationTypeData(Transcript),
                key: 'consequenceTerms',
                category: getMutationTypeClassName(Transcript),
            });
            parsedData.push({
                value: this.getOncogene(oncokbOncogeneTsg),
                key: 'oncogene',
                category: 'oncogene',
            });
            parsedData.push({
                value: this.getTsg(oncokbOncogeneTsg),
                key: 'tsg',
                category: 'tsg',
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

    public findOncokbVariant(
        oncokb: Alteration[] | undefined
    ): OncogeneTsg | null {
        if (oncokb) {
            const alterationName = this.getAlteration(this.props.annotation);
            let oncogeneTsg: OncogeneTsg = {};
            const targetVariant = _.find(oncokb, variant => {
                if (
                    alterationName &&
                    (variant.alteration === alterationName ||
                        variant.name === alterationName)
                ) {
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
            console.log(oncogeneData.oncogene);
            return oncogeneData.oncogene === true ? 'Oncogene' : null;
        } else {
            return null;
        }
    }

    private getTsg(oncogeneData: OncogeneTsg | null) {
        if (oncogeneData) {
            return oncogeneData.tsg === true ? 'Oncogene' : null;
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

    private shouldShowDropDown(annotation: VariantAnnotationSummary | undefined) {
        if (annotation
            && annotation.transcriptConsequenceSummary !== undefined
            && annotation.transcriptConsequenceSummaries !== undefined
            && annotation.transcriptConsequenceSummaries.length > 1) {
            return true;
        }
        return false;
    }

    private getTranscriptsMap(annotation: VariantAnnotationSummary) {
        return _.groupBy(annotation.transcriptConsequenceSummaries, (transcriptConsequenceSummary) => transcriptConsequenceSummary.transcriptId);
    }

    @autobind
    private onTranscriptSelection(option: {value: string, label: string}) {
        this.activeTranscript = this.getTranscriptsMap(this.props.annotation!)[option.value][0];
    }
}

function BasicInfoUnit(
    value: string | null,
    key: string,
    category: string | undefined
) {
    if (key === "consequenceTerms") {
        return (
            <DefaultTooltip
            placement="top"
            overlay={
                <span>
                    The possible mutation types are:
                    <br />Missense, Frame_shift_ins, Frame_shift_del, Frameshift, Nonsense,
                    <br />Splice_site, Nonstart, Nonstop, In_frame_del, In_frame_ins, Inframe,
                    <br />Truncating, Fusion, Silent, Other
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
        )
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
    canonicalTranscript: TranscriptConsequenceSummary
): string {
    const value: MutationTypeFormat | undefined = getMapEntry(
        canonicalTranscript.consequenceTerms
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

// logic is from react-mutation-mapper
function getMutationTypeData(
    canonicalTranscript: TranscriptConsequenceSummary
) {
    const mutationType = canonicalTranscript.consequenceTerms;
    const entry: MutationTypeFormat | undefined = getMapEntry(mutationType);

    // first, try to find a mapped value
    if (entry && entry.label) {
        return entry.label;
    }
    // if no mapped value, then return the text value as is
    else {
        return mutationType || null;
    }
}
