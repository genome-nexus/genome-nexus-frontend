import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ColumnSortDirection, DataTable } from 'react-mutation-mapper';

import { Evidence } from '../../util/EvidenceUtils';

import '../dataTable.scss';
import styles from './functionalGroups.module.scss';

export interface IEvidenceTableProps {
    evidences?: Evidence[];
    url: string;
    getEvidenceUrl?: (column: any) => string;
    info?: JSX.Element;
}

enum EvidenceColumn {
    Disease = 'disease',
    Drugs = 'drugs',
    Significance = 'clinicalSignificance',
    Type = 'type',
    Level = 'level',
}

enum EvidenceColumnName {
    Disease = 'Disease',
    Drugs = 'Drugs',
    Significance = 'Significance',
    Type = 'Type',
    Level = 'Level',
}

const ColumnHeader = (props: { name: string }) => {
    return <strong>{props.name}</strong>;
};

const Level = (props: { level: string; url: string }) => {
    return (
        <span className={styles['data-with-link']}>
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                {props.level} <i className="fas fa-external-link-alt" />
            </a>
        </span>
    );
};

@observer
class EvidenceTableComponent extends DataTable<Evidence> {}

@observer
class EvidenceTable extends React.Component<IEvidenceTableProps> {
    @observable searchText = '';

    constructor(props: IEvidenceTableProps) {
        super(props);

        makeObservable(this);
    }

    @computed
    get data() {
        let data = this.props.evidences;

        if (this.searchText) {
            data = data?.filter(
                (e) =>
                    e.drugs.join(' ').toLowerCase().includes(this.searchText) ||
                    e.disease?.toLowerCase().includes(this.searchText) ||
                    e.type.toLowerCase().includes(this.searchText) ||
                    e.clinicalSignificance
                        .toLowerCase()
                        .includes(this.searchText) ||
                    e.level.toLowerCase().includes(this.searchText)
            );
        }

        return data;
    }

    get columns() {
        return [
            {
                id: EvidenceColumn.Disease,
                name: EvidenceColumnName.Disease,
                accessor: EvidenceColumn.Disease,
                searchable: true,
                Header: <ColumnHeader name={EvidenceColumnName.Disease} />,
            },
            {
                id: EvidenceColumn.Drugs,
                name: EvidenceColumnName.Drugs,
                accessor: EvidenceColumn.Drugs,
                searchable: true,
                Header: <ColumnHeader name={EvidenceColumnName.Drugs} />,
                Cell: (column: { original: Evidence }) =>
                    column.original.drugs.join(', ') || 'N/A',
            },
            {
                id: EvidenceColumn.Type,
                name: EvidenceColumnName.Type,
                accessor: EvidenceColumn.Type,
                searchable: true,
                Header: <ColumnHeader name={EvidenceColumnName.Type} />,
            },
            {
                id: EvidenceColumn.Significance,
                name: EvidenceColumnName.Significance,
                accessor: EvidenceColumn.Significance,
                searchable: true,
                Header: <ColumnHeader name={EvidenceColumnName.Significance} />,
                maxWidth: 150,
            },
            {
                id: EvidenceColumn.Level,
                name: EvidenceColumnName.Level,
                accessor: EvidenceColumn.Level,
                searchable: true,
                Header: <ColumnHeader name={EvidenceColumnName.Level} />,
                Cell: (column: { original: Evidence }) => (
                    <Level
                        level={column.original.level}
                        url={
                            this.props.getEvidenceUrl
                                ? this.props.getEvidenceUrl(column.original)
                                : this.props.url
                        }
                    />
                ),
                maxWidth: 50,
            },
        ];
    }

    public render() {
        return (
            <EvidenceTableComponent
                columns={this.columns}
                data={this.data}
                showColumnVisibility={false}
                showSearchBox={true}
                info={this.props.info}
                className="default-data-table"
                initialItemsPerPage={10}
                initialSort={[
                    {
                        column: EvidenceColumn.Level,
                        sortDirection: ColumnSortDirection.ASC,
                    },
                    {
                        column: EvidenceColumn.Type,
                    },
                    {
                        column: EvidenceColumn.Significance,
                    },
                ]}
                onSearch={this.onSearch}
            />
        );
    }

    @action.bound
    protected onSearch(searchText: string) {
        this.searchText = searchText;
    }
}

export default EvidenceTable;
