import React from 'react';
// import NodeChoices from './header/nodeChoices';
import TopMainMenuChoices from './header/mainMenu';

class App extends React.Component {
    render () {
        return (
            <React.Fragment>
                <TopMainMenuChoices />
                {/* <NodeChoices /> */}
            </React.Fragment>
            
        )

    }
}

export default App;