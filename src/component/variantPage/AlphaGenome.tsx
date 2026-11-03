import * as React from 'react';

import {
    AlphaGenome as AlphaGenomePayload,
    AlphaGenomeScore,
} from '../../model/AlphaGenome';

export const OUTPUT_TYPES = [
    'RNA_SEQ',
    'SPLICE_SITES',
    'SPLICE_SITE_USAGE',
    'SPLICE_JUNCTIONS',
] as const;

export const DISCLAIMER = 'Model prediction, not experimental evidence.';

/**
 * Default tissue: the ontology_curie of the row with the strongest absolute
 * raw_score
 */
export function defaultTissue(rows: AlphaGenomeScore[]): string | undefined {
    let best: string | undefined = undefined;
    let bestValue = -1;
    for (const row of rows) {
        if (!row.ontology_curie) {
            continue;
        }
        const value = Math.abs(row.raw_score ?? 0);
        if (value > bestValue) {
            bestValue = value;
            best = row.ontology_curie;
        }
    }
    return best;
}

export function availableTissues(rows: AlphaGenomeScore[]): string[] {
    const tissues: string[] = [];
    for (const row of rows) {
        if (row.ontology_curie && tissues.indexOf(row.ontology_curie) === -1) {
            tissues.push(row.ontology_curie);
        }
    }
    return tissues;
}

export interface IAlphaGenomeProps {
    annotation?: AlphaGenomePayload;
}

interface IAlphaGenomeState {
    selectedOutputType: string;
    selectedTissue?: string;
}

export default class AlphaGenome extends React.Component<
    IAlphaGenomeProps,
    IAlphaGenomeState
> {
    constructor(props: IAlphaGenomeProps) {
        super(props);
        const rows = props.annotation?.scores ?? [];
        this.state = {
            selectedOutputType: 'RNA_SEQ',
            selectedTissue: defaultTissue(rows),
        };
    }

    private rowsForOutputType(outputType: string): AlphaGenomeScore[] {
        const rows = this.props.annotation?.scores ?? [];
        const typed = rows.filter((row) => row.output_type === outputType);
        if (this.state.selectedTissue) {
            const match = typed.filter(
                (row) => row.ontology_curie === this.state.selectedTissue
            );
            if (match.length > 0) {
                return match;
            }
        }
        return typed;
    }

    private renderBarChart() {
        const rows = (this.props.annotation?.scores ?? []).filter(
            (row) => row.output_type === this.state.selectedOutputType
        );
        const byTissue = new Map<string, number>();
        for (const row of rows) {
            if (!row.ontology_curie) {
                continue;
            }
            const value = Math.abs(row.raw_score ?? 0);
            const current = byTissue.get(row.ontology_curie);
            if (current === undefined || value > current) {
                byTissue.set(row.ontology_curie, value);
            }
        }
        const entries = Array.from(byTissue.entries());
        if (entries.length === 0) {
            return null;
        }
        const max = Math.max(...entries.map(([, value]) => value), 0.0001);
        return (
            <div style={{ marginTop: 8 }}>
                <div>
                    <strong>{this.state.selectedOutputType} by tissue</strong>
                </div>
                {entries.map(([curie, value]) => (
                    <div key={curie} style={{ whiteSpace: 'nowrap' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: 200,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontWeight:
                                    curie === this.state.selectedTissue
                                        ? 'bold'
                                        : 'normal',
                            }}
                        >
                            {curie}
                        </span>
                        <span
                            style={{
                                display: 'inline-block',
                                width: 160,
                                backgroundColor: '#eee',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: `${(value / max) * 160}px`,
                                    backgroundColor:
                                        curie === this.state.selectedTissue
                                            ? '#2c7fb8'
                                            : '#999',
                                    height: 10,
                                }}
                            />
                        </span>{' '}
                        <span>{value.toFixed(3)}</span>
                    </div>
                ))}
            </div>
        );
    }

    public render() {
        const annotation = this.props.annotation;
        if (
            !annotation ||
            !annotation.scores ||
            annotation.scores.length === 0
        ) {
            return <span />;
        }
        const tissues = availableTissues(annotation.scores);
        return (
            <div>
                <div>
                    <strong>
                        AlphaGenome {annotation.canonical_gene ?? ''}{' '}
                    </strong>
                    ({annotation.hg38_variant ?? ''})
                    {annotation.merged_splicing_score !== undefined &&
                        annotation.merged_splicing_score !== null && (
                            <span>
                                {' '}
                                merged splicing score:{' '}
                                {annotation.merged_splicing_score}
                            </span>
                        )}
                </div>
                {tissues.length > 0 && (
                    <div style={{ marginTop: 4 }}>
                        <label>
                            Tissue:{` `}
                            <select
                                value={this.state.selectedTissue ?? ''}
                                onChange={(e) =>
                                    this.setState({
                                        selectedTissue:
                                            e.target.value || undefined,
                                    })
                                }
                            >
                                {tissues.map((curie) => (
                                    <option key={curie} value={curie}>
                                        {curie}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
                <table className={'table table-sm'} style={{ marginTop: 8 }}>
                    <thead>
                        <tr>
                            <th>Output</th>
                            <th>Gene</th>
                            <th>Track</th>
                            <th>Raw score</th>
                            <th>Quantile score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {OUTPUT_TYPES.map((outputType) => {
                            const rows = this.rowsForOutputType(outputType);
                            if (rows.length === 0) {
                                return null;
                            }
                            return rows.map((row, index) => (
                                <tr
                                    key={`${outputType}-${row.track_name}-${index}`}
                                >
                                    <td>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    selectedOutputType:
                                                        outputType,
                                                });
                                            }}
                                        >
                                            {index === 0 ? outputType : ''}
                                        </a>
                                    </td>
                                    <td>{row.gene_name ?? ''}</td>
                                    <td>{row.track_name ?? ''}</td>
                                    <td>
                                        {row.raw_score !== undefined &&
                                        row.raw_score !== null
                                            ? row.raw_score
                                            : ''}
                                    </td>
                                    <td>
                                        {row.quantile_score !== undefined &&
                                        row.quantile_score !== null
                                            ? row.quantile_score
                                            : ''}
                                    </td>
                                </tr>
                            ));
                        })}
                    </tbody>
                </table>
                {this.renderBarChart()}
                <div style={{ marginTop: 8, fontStyle: 'italic' }}>
                    {DISCLAIMER}
                </div>
            </div>
        );
    }
}
