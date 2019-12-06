import * as React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { VariantAnnotationSummary, TranscriptConsequenceSummary } from 'cbioportal-frontend-commons';
import _ from 'lodash';
import basicInfo from './BasicInfo.module.scss';

interface IBasicInfoProps {
    annotation: VariantAnnotationSummary | undefined;
}

// type BasicInfoData = {
//     hgvsc?: string | null;
//     hgvsShort?: string | null;
//     hugoGeneSymbol?: string | null;
//     variantType?: string | null;
//     consequenceTerms?: string | null;
//     oncogene?: string | null;
//     tsg?: string | null;
// }

export type BasicInfoData = {
    value:string | null;
    key:string;
    category?:string;
};

@observer
class BasicInfo extends React.Component<IBasicInfoProps> {    
    
    public render() {
        // if (this.props.annotation) {
        //     if (this.props.annotation.transcriptConsequenceSummary)
        // }
        // var basicInfoData : BasicInfoData[] = [];

        if (this.props.annotation) {
            const renderData: BasicInfoData[] | null= this.getDataFromTranscriptConsequenceSummary(
                this.props.annotation
            );
            const basicInfoList = _.map(renderData, data => {
                return (
                    
                        BasicInfoUnit(data.value, data.key, data.category)
                    
                );
            })
            return <div style={{display:"flex", flexWrap:"wrap"}}>{basicInfoList}</div>
        }
        else {
            return null;
        }
    }

    public getDataFromTranscriptConsequenceSummary(annotation: VariantAnnotationSummary): BasicInfoData[] | null {
        let parsedData: BasicInfoData[] = [];
        if (annotation.transcriptConsequenceSummary) {
            let canonicalTranscript = annotation.transcriptConsequenceSummary;
            parsedData.push({
                value: this.parseHgvscFromTranscriptConsequenceSummary(canonicalTranscript),
                key: 'hgvsc',
                category:'default'
            });
            parsedData.push({
                value: canonicalTranscript.hgvspShort,
                key: 'hgvsShort',
                category:'default'
            });
            parsedData.push({
                value: canonicalTranscript.hugoGeneSymbol,
                key: 'hugoGeneSymbol',
                category:'default'
            });
            parsedData.push({
                value: annotation.variantType,
                key: 'variantType',
                category:'mutation'
            });
            parsedData.push({
                value: canonicalTranscript.consequenceTerms,
                key: 'consequenceTerms',
                category:'mutation'
            });
            parsedData.push({
                value: "TODO",
                key: 'oncogene',
                category:'oncogene'
            });
            parsedData.push({
                value: "TODO",
                key: 'tsg',
                category:'tsg'
            });
            return parsedData;
        }
        return null;
    }

    private parseHgvscFromTranscriptConsequenceSummary(transcript: TranscriptConsequenceSummary) {
        if (transcript.hgvsc) {
            let hgvsc = transcript.hgvsc;
            var startIndex = hgvsc.indexOf('c.');
            return startIndex !== -1 ? hgvsc.substr(startIndex) : null; 
        }
        return null;
    }
}

function BasicInfoUnit(value: string | null, key: string, category: string | undefined) {
    return (
        <span className={basicInfo[`${category}`]}>{value}</span>
    );
}


export default BasicInfo;
