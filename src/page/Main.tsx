import * as React from 'react';
import {
    BrowserRouter, Route, Switch
} from "react-router-dom";

import Footer from "../component/Footer";
import Header from "../component/Header";
import Annotation from "./Annotation";
import Home from "./Home";
import Patient from "./Patient";
import Variant from "./Variant";
import Api from "./Api";

class Main extends React.Component<{}>
{
    public render()
    {
        const VariantPage = (props: any) => (
            <Variant
                variant={props.match.params.variant}
            />
        );

        return (
            <BrowserRouter>
                <div className="Main">
                    <Header />
                    <div style={{
                        marginLeft: "2rem",
                        marginRight: "2rem",
                        paddingTop: 20,
                        paddingBottom: 100,
                        fontSize: "1.25rem",
                        color: "#2c3e50"}}
                    >
                        <Switch>
                            <Route exact={true} path="/" component={Home}/>
                            <Route exact={true} path="/variant/:variant" component={VariantPage} />
                            <Route exact={true} path="/annotation" component={Annotation}/>
                            <Route exact={true} path="/patient" component={Patient}/>
                            <Route exact={true} path="/api" component={Api}/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;