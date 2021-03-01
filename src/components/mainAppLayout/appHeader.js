import React, { useState }from 'react';
import { Menu } from 'semantic-ui-react'

function handleItemClick (e,a,b) {
    console.log(a.name)
    return (a.name)
}

const MainAppHeader = () => {
    const [activeItem, setActiveItem] = useState("vault-viewer")
    return (
        <React.Fragment>
            <Menu>
                <Menu.Item
                    onClick={(e,a) => {setActiveItem(handleItemClick(e,a))}}
                    name="vault-viewer"
                    active={activeItem === 'vault-viewer'}
                >
                Vault Viewer
                </Menu.Item>
            </Menu>
        </React.Fragment>
    )

}

export default MainAppHeader;