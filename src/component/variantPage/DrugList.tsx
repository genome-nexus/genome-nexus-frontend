import * as React from 'react';
// import _ from 'lodash';

export interface IDrugListProps {
    url: string;
    drugs: { level: string; drugNames: string[] }[];
    title: string;
}

export interface IDrugListItem {
    level: string;
    drugNames: string[];
}

// function getAllUniqueDrugNames(drugs: IDrugListItem[]) {
//     return _.chain(drugs)
//         .flatMap(drug => drug.drugNames)
//         .uniq()
//         .value();
// }

const DrugList: React.FunctionComponent<IDrugListProps> = (props) => {
    return props.drugs.length > 0 ? (
        <a href={props.url} target="_blank" rel="noopener noreferrer">
            <p>
                <strong>{props.title}</strong>
                <div className="pl-3">
                    {props.drugs.map((d) => (
                        <div>
                            <strong>
                                Level{' '}
                                {d.level.toUpperCase().replace('LEVEL_', ' ')}
                            </strong>
                            : {d.drugNames.join(', ')}
                        </div>
                    ))}
                </div>
            </p>
        </a>
    ) : null;
};

export default DrugList;
