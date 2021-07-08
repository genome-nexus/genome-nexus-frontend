import { observer } from 'mobx-react';
import * as React from 'react';

import { ICivicVariantSummary } from 'cbioportal-utils';
import functionalGroupsStyle from '../functionalGroups.module.scss';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import DrugList from '../DrugList';

interface ICivicProps {
    civic?: ICivicVariantSummary;
}

const CivicInfo: React.FunctionComponent<{ url: string }> = props => {
    return (
        <DefaultTooltip
            placement="top"
            overlay={
                <span>
                    <a
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CIViC
                    </a>{' '}
                    is TODO
                </span>
            }
        >
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                CIViC <i className="fas fa-external-link-alt" />
            </a>
        </DefaultTooltip>
    );
};

@observer
export default class Civic extends React.Component<ICivicProps> {
    public render() {
        const url = this.props.civic
            ? this.props.civic.url
            : 'https://civicdb.org/';
        const sensitiveTo = this.props.civic
            ? this.props.civic.sensitiveTo
            : [];
        const resistantTo = this.props.civic
            ? this.props.civic.resistantTo
            : [];

        return sensitiveTo.length || resistantTo.length ? (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <CivicInfo url={url} />
                </div>
                <div className={functionalGroupsStyle['data-with-link']}>
                    <DrugList
                        title="Sensitive to:"
                        drugs={sensitiveTo}
                        url={url}
                    />
                    <DrugList
                        title="Resistant to:"
                        drugs={resistantTo}
                        url={url}
                    />
                </div>
            </div>
        ) : (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <CivicInfo url={url} />
                </div>
                <div className={functionalGroupsStyle['data-with-link']}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        N/A
                    </a>
                </div>
            </div>
        );
    }
}
