import {
    AlleleCount,
    AlleleFrequency,
    AlleleNumber,
    Gnomad,
    Homozygotes,
    MyVariantInfo,
    DefaultTooltip,
} from 'cbioportal-frontend-commons';
import _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';

import { GnomadSummary } from 'react-mutation-mapper/dist/model/GnomadSummary';
import GnomadFrequencyTable, {
    GnomadTableColumnName,
} from './GnomadFrequencyTable';
import { Alert } from 'react-bootstrap';

const GNOMAD_POPULATION_NAME: { [key: string]: string } = {
    African: 'afr',
    Latino: 'amr',
    Other: 'oth',
    'European (Non-Finnish)': 'nfe',
    'European (Finnish)': 'fin',
    'Ashkenazi Jewish': 'asj',
    'East Asian': 'eas',
    'South Asian': 'sas',
    Total: '',
};

export function calculateAlleleFrequency(
    count: number | null,
    totalNumber: number | null,
    frequency: number | null
): number {
    if (frequency !== null) {
        return frequency;
    } else {
        return count && totalNumber && totalNumber !== 0
            ? count / totalNumber
            : 0;
    }
}

export function generateGnomadUrl(
    chromosome: String | null,
    start: number | null,
    reference: String | null,
    variant: String | null
) {
    if (chromosome && start && reference && variant) {
        return `https://gnomad.broadinstitute.org/variant/${chromosome}-${start}-${reference}-${variant}`;
    } else {
        return 'https://gnomad.broadinstitute.org/';
    }
}

export function setGnomadTableData(
    key: string,
    data: Gnomad,
    result: { [key: string]: GnomadSummary }
) {
    // Access data by population name and column name in the format of: GnomadTableColumnName_POPULATION_NAME, e.g. "ac_afr"
    // If access "total" data, the name would be e.g. "ac" for alleleCount, "an" for alleleNumber
    const alleleCountName: keyof AlleleCount = (GNOMAD_POPULATION_NAME[key]
        ? GnomadTableColumnName.alleleCount + '_' + GNOMAD_POPULATION_NAME[key]
        : GnomadTableColumnName.alleleCount
    ).toString() as keyof AlleleCount;
    const alleleNumberName: keyof AlleleNumber = (GNOMAD_POPULATION_NAME[key]
        ? GnomadTableColumnName.alleleNumber + '_' + GNOMAD_POPULATION_NAME[key]
        : GnomadTableColumnName.alleleNumber
    ).toString() as keyof AlleleNumber;
    const homozygotesName: keyof Homozygotes = (GNOMAD_POPULATION_NAME[key]
        ? GnomadTableColumnName.homozygotes + '_' + GNOMAD_POPULATION_NAME[key]
        : GnomadTableColumnName.homozygotes
    ).toString() as keyof Homozygotes;
    const alleleFrequencyName: keyof AlleleFrequency = (GNOMAD_POPULATION_NAME[
        key
    ]
        ? GnomadTableColumnName.alleleFrequency +
          '_' +
          GNOMAD_POPULATION_NAME[key]
        : GnomadTableColumnName.alleleFrequency
    ).toString() as keyof AlleleFrequency;

    result[key] = {
        population: key,
        alleleCount: data.alleleCount[alleleCountName]
            ? data.alleleCount[alleleCountName]
            : 0,
        alleleNumber: data.alleleNumber[alleleNumberName]
            ? data.alleleNumber[alleleNumberName]
            : 0,
        homozygotes:
            data.homozygotes === undefined
                ? 'N/A'
                : data.homozygotes[homozygotesName],
        alleleFrequency: calculateAlleleFrequency(
            data.alleleCount[alleleCountName],
            data.alleleNumber[alleleNumberName],
            data.alleleFrequency[alleleFrequencyName]
        ),
    } as GnomadSummary;
}

export type GnomadFrequencyProps = {
    myVariantInfo?: MyVariantInfo;
};

@observer
export default class GnomadFrequency extends React.Component<
    GnomadFrequencyProps,
    {}
> {
    public render() {
        const myVariantInfo = this.props.myVariantInfo;

        let gnomadUrl = '';
        let content: JSX.Element | null = null;
        let result: { [key: string]: GnomadSummary } = {};
        let sorted: GnomadSummary[] = [];

        const myvariantLink = (
            <a href="https://myvariant.info/" target="_blank">
                myvariant.info
            </a>
        );

        const gnomadLink = (
            <a href={gnomadUrl} target="_blank">
                gnomAD
            </a>
        );

        // Checking if gnomad data is valid
        if (
            myVariantInfo &&
            (myVariantInfo.gnomadExome || myVariantInfo.gnomadGenome)
        ) {
            // get gnomad link from chrom, location, ref and alt
            gnomadUrl =
                myVariantInfo && myVariantInfo.dbsnp
                    ? generateGnomadUrl(
                          myVariantInfo.dbsnp.chrom,
                          myVariantInfo.dbsnp.hg19.start,
                          myVariantInfo.dbsnp.ref,
                          myVariantInfo.dbsnp.alt
                      )
                    : '';

            const gnomadExome: { [key: string]: GnomadSummary } = {};
            const gnomadGenome: { [key: string]: GnomadSummary } = {};
            const gnomadResult: { [key: string]: GnomadSummary } = {};

            // If only gnomadExome data exist, show gnomadExome result in the table
            if (myVariantInfo.gnomadExome) {
                Object.keys(GNOMAD_POPULATION_NAME).forEach(key =>
                    setGnomadTableData(
                        key,
                        myVariantInfo.gnomadExome,
                        gnomadExome
                    )
                );
                result = gnomadExome;
            }

            // If only gnomadGenome data exist, show gnomadGenome result in the table
            if (myVariantInfo.gnomadGenome) {
                Object.keys(GNOMAD_POPULATION_NAME).forEach(key =>
                    setGnomadTableData(
                        key,
                        myVariantInfo.gnomadGenome,
                        gnomadGenome
                    )
                );
                result = gnomadGenome;
            }

            // If both gnomadExome and gnomadGenome exist, combine gnomadExome and gnomadGenome together
            if (myVariantInfo.gnomadExome && myVariantInfo.gnomadGenome) {
                Object.keys(GNOMAD_POPULATION_NAME).forEach(key => {
                    gnomadResult[key] = {
                        population: key,
                        alleleCount:
                            gnomadExome[key].alleleCount +
                            gnomadGenome[key].alleleCount,
                        alleleNumber:
                            gnomadExome[key].alleleNumber +
                            gnomadGenome[key].alleleNumber,
                        homozygotes:
                            gnomadExome[key].homozygotes === undefined ||
                            gnomadGenome[key].homozygotes === undefined
                                ? 'N/A'
                                : (
                                      parseInt(gnomadExome[key].homozygotes!) +
                                      parseInt(gnomadGenome[key].homozygotes!)
                                  ).toString(),
                        alleleFrequency: calculateAlleleFrequency(
                            gnomadExome[key].alleleCount +
                                gnomadGenome[key].alleleCount,
                            gnomadExome[key].alleleNumber +
                                gnomadGenome[key].alleleNumber,
                            null
                        ),
                    } as GnomadSummary;
                });
                result = gnomadResult;
            }

            // sort by frequency
            sorted = _.sortBy(Object.values(result).slice(0, 8), [
                'alleleFrequency',
            ]).reverse();
            // add the total row at the bottom
            sorted.push(result['Total']);
            content = (
                <GnomadFrequencyTable data={sorted} gnomadUrl={gnomadUrl} />
            );
        } else {
            // show 0 in table if no gnomad data
            Object.keys(GNOMAD_POPULATION_NAME).forEach(key => {
                result[key] = {
                    population: key,
                    alleleCount: 0,
                    alleleNumber: 0,
                    homozygotes: '0',
                    alleleFrequency: 0,
                };
            });
            sorted = _.sortBy(Object.values(result).slice(0, 8), [
                'population',
            ]);
            sorted.push(result['Total']);
            content = (
                <div>
                    <GnomadFrequencyTable data={sorted} gnomadUrl={gnomadUrl} />
                    <Alert
                        key={'alert'}
                        variant={'info'}
                        className="gnomad-alert"
                    >
                        No gnomAD data.
                    </Alert>
                </div>
            );
        }

        return (
            <div>
                <DefaultTooltip
                    overlay={
                        <span>
                            <a
                                href="https://gnomad.broadinstitute.org/"
                                target="_blank"
                            >
                                gnomAD
                            </a>{' '}
                            population allele frequencies.
                            <div className="gnomad-tooltip">
                                Source: genomenexus serves {myvariantLink}'s
                                gnomAD data.
                                <br />
                                Latest {gnomadLink} data may differ.
                            </div>
                        </span>
                    }
                    placement="top"
                    trigger={['hover', 'focus']}
                    destroyTooltipOnHide={true}
                >
                    <span className="gnomad-table-title">gnomAD</span>
                </DefaultTooltip>
                {content}
            </div>
        );
    }
}
