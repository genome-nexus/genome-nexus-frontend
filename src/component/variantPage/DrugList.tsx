import * as React from 'react';

export interface IDrugListProps {
    url: string;
    drugs: string[];
    title: string;
}

const DrugList: React.FunctionComponent<IDrugListProps> = props => {
    const drugs = props.drugs.join(',');

    return drugs.length > 0 ? (
        <a href={props.url} target="_blank" rel="noopener noreferrer">
            <p>
                <strong>{props.title}</strong> {drugs}
            </p>
        </a>
    ) : null;
};

export default DrugList;
