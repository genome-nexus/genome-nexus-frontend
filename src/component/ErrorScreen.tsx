import * as React from 'react';
import { Link } from 'react-router-dom';

class ErrorScreen extends React.Component<{}> {
    public render() {
        return (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
                Oops. There was an error retrieving data. Click&nbsp;
                <Link to="/">here</Link>
                &nbsp;to return to homepage
            </div>
        );
    }
}

export default ErrorScreen;
