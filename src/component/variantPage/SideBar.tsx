import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { computed, action, observable, makeObservable } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router';
import CheckBoxContainer from './CheckBoxContainer';
import './SideBar.css';
import { VariantStore } from '../../page/VariantStore';
import { isVariantValid } from '../../util/variantValidator';
import { observer } from 'mobx-react';
import client from '../../page/genomeNexusClientInstance';
import ValidatorNotification, { ErrorType } from '../ValidatorNotification';

type PathParamsType = {
    history: any;
};

type SideBarProps = RouteComponentProps<PathParamsType> & {
    store: VariantStore;
    onChange?: (input: string) => void;
    placeholder?: string;
    searchIconClassName?: string;
    variant?: string;
};

@observer
class SideBar extends React.Component<SideBarProps> {
    constructor(props: SideBarProps) {
        super(props);
        makeObservable(this);
    }

    public static defaultProps = {
        placeholder: 'Search Genes',
        searchIconClassName: 'fa fa-search',
    };

    @observable
    protected alert: boolean = false;

    @computed
    private get variant() {
        return this.props.variant;
    }

    @observable
    protected inputText: string | undefined;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    public render() {
        return (
            <div>
                <Row>
                    <Col lg="10" className="pl-4 variant">
                        {this.variant}
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="11" className="searchBox">
                        {/*<SearchBox*/}
                        {/*    onChange={this.onTextChange}*/}
                        {/*    onSearch={this.onSearch}*/}
                        {/*    placeholder="Search variant"*/}
                        {/*/>*/}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ValidatorNotification
                            showAlert={this.alert}
                            type={this.alertType}
                            onClose={this.onClose}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className="text-center mb-4 resourceText">
                        Resources
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <CheckBoxContainer
                            allCheckboxNames={this.props.store.allResources}
                            store={this.props.store}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    @action
    private onTextChange = (input: string) => {
        this.inputText = input;
    };

    @action
    onSearch = async () => {
        if (isVariantValid(`${this.inputText}`).isValid) {
            const response = await client
                .fetchVariantAnnotationGET({ variant: this.inputText! })
                .catch(ex => {
                    this.alertType = ErrorType.NO_RESULT;
                });

            if (response) {
                this.alert = false;
                this.props.history.push(`/variant/${this.inputText}`);
                return;
            }
        } else {
            this.alertType = ErrorType.INVALID;
        }
        this.alert = true;
    };

    @action
    private onClose = () => {
        this.alert = false;
    };
}

export default withRouter(SideBar);
