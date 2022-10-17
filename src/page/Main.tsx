import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Footer from '../component/Footer';
import Header from '../component/Header';
import Annotation from './Annotation';
import Home from './Home';
import Patient from './Patient';
import Variant from './Variant';
import Api from './Api';
import { VariantStore } from './VariantStore';
import { observer } from 'mobx-react';
import News from './News';
import { MainStore } from './MainStore';
import Revue from './REVUEPage';

@observer
class Main extends React.Component<{}> {
    private mainStore = new MainStore();
    public render() {
        const VariantPage = (props: any) => (
            <Variant
                variant={props.match.params.variant}
                store={
                    new VariantStore(
                        props.match.params.variant,
                        props.location.search,
                        this.mainStore
                    )
                }
            />
        );
        const HomePage = (props: any) => (
            <Home history={props.history} mainStore={this.mainStore} />
        );

        return (
            <BrowserRouter>
                <div className="Main">
                    <Header />
                    <div>
                        <Switch>
                            <Route exact={true} path="/" component={HomePage} />
                            <Route
                                exact={true}
                                path="/variant/:variant"
                                component={VariantPage}
                            />
                            <Route
                                exact={true}
                                path="/annotation"
                                component={Annotation}
                            />
                            <Route
                                exact={true}
                                path="/patient"
                                component={Patient}
                            />
                            <Route exact={true} path="/news" component={News} />
                            //adding revue
                            <Route
                                exact={true}
                                path="/Revue"
                                component={Revue}
                            />
                            <Route exact={true} path="/api" component={Api} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;
