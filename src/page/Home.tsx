import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Image } from 'react-bootstrap';

import SearchBox from '../component/SearchBox';
import './Home.scss';
import logo from '../image/home_page_logo.png';
import { isVariantValid } from '../util/variantValidator';
import client from './genomeNexusClientInstance';
import ValidatorNotification, {
    ErrorType,
} from '../component/ValidatorNotification';

const EXAMPLE_DATA = [
    {
        value: '7:g.140453136A>T',
        label: '7:g.140453136A>T (BRAF V600E)',
    },
    { value: '7:g.55249071C>T', label: '7:g.55249071C>T (EGFR T790M)' },
    {
        value: '7:g.55242468_55242481delinsAC',
        label: '7:g.55242468_55242481delinsAC (EGFR L747_T751delinsP)',
    },
    {
        value: '7:g.55249017_55249018insCCA',
        label: '7:g.55249017_55249018insCCA (EGFR H773dup)',
    },
];

@observer
class Home extends React.Component<{ history: any }> {
    @observable
    protected inputText: string | undefined;

    @observable
    protected alert: boolean = false;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    public render() {
        return (
            <div>
                <div className={'container-fluid page-section'}>
                    <div
                        className={'home-banner text-center position-relative'}
                    >
                        <h2>
                            Genome Ne<span className={'d-none'}>X</span>
                            <Image
                                src={logo}
                                fluid
                                style={{
                                    height: 63,
                                    verticalAlign: 'baseline',
                                    position: 'relative',
                                    top: 5,
                                }}
                            />
                            us
                        </h2>
                        Annotation and Interpretation of Genetic Variants in
                        Cancer
                    </div>

                    <div className={'mx-auto'} style={{ width: 600 }}>
                        <SearchBox
                            onChange={this.onTextChange}
                            onSearch={this.onSearch}
                            height={44}
                            exampleData={EXAMPLE_DATA}
                            placeholder={'e.g.: 7:g.140453136A>T '}
                        />
                    </div>

                    <ValidatorNotification
                        showAlert={this.alert}
                        type={this.alertType}
                        onClose={this.onClose}
                    >
                        <table className={'table validator-notification'}>
                            <tbody>
                                {EXAMPLE_DATA.map(example => {
                                    return (
                                        <tr>
                                            <td>{example.label}</td>
                                            <td>
                                                <a
                                                    href={`/variant/${example.value}`}
                                                    className={
                                                        'btn btn-primary btn-sm'
                                                    }
                                                    role={'button'}
                                                >
                                                    Try it
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </ValidatorNotification>
                </div>
            </div>
        );
    }

    @action.bound
    private onTextChange(input: string) {
        this.inputText = input.trim();
    }

    @action.bound
    async onSearch() {
        if (isVariantValid(`${this.inputText}`).isValid) {
            // check if the variant has response
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
    }

    @action.bound
    private onClose() {
        this.alert = false;
    }
}

export default Home;
