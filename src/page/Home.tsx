import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {
    Col, Row
} from 'react-bootstrap';

import SearchBox from "../component/SearchBox";

@observer
class Home extends React.Component<{history: any}>
{
    @observable
    protected inputText: string|undefined;

    public render() {
        return (
            <div className="text-center">
                <Row>
                    <Col lg="8" className="m-auto">
                        <SearchBox
                            onChange={this.onTextChange}
                            onSearch={this.onSearch}
                            placeholder="Search variant"
                        />
                    </Col>
                </Row>
                <Row className="py-4">
                    <Col className="m-auto">
                        {this.inputText}
                    </Col>
                </Row>
            </div>
        );
    }

    @action.bound
    private onTextChange(input: string) {
        this.inputText = input;
    }

    @action.bound
    onSearch () {
        const { history } = this.props;
        history.push(`/variant/${this.inputText}`);
      
    }

}
export default Home;
