import React from 'react';
import MainAppLayout from './mainAppLayout/mainAppLayout';
import AppHeader from './mainAppLayout/appHeader'

class App extends React.Component {
    render () {
        return (
            <React.Fragment>
                <AppHeader />
                <MainAppLayout />
            </React.Fragment>
            
        )

    }
}

export default App;