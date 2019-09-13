import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

import SearchBox from '../component/SearchBox';

@observer
class Home extends React.Component<{}> {
    @observable
    protected inputText: string | undefined;

    public render() {
        return (
            <div className="text-center">
                <Row>
                    <Col lg="8" className="m-auto">
                        <SearchBox
                            onChange={this.onSearch}
                            placeholder="Search variants"
                        />
                    </Col>
                </Row>
                <Row className="py-4">
                    <Col className="m-auto">{this.inputText}</Col>
                </Row>
            </div>
        );
    }

    @action.bound
    private onSearch(input: string) {
        this.inputText = input;
    }
}

export default Home;
