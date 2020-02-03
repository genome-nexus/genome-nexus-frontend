import * as React from 'react';
import Main from './page/Main';

import 'bootstrap/dist/css/bootstrap.css';
import 'cbioportal-frontend-commons/dist/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'react-mutation-mapper/dist/styles.css';
import 'react-table/react-table.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Main />
        </div>
    );
};

export default App;
