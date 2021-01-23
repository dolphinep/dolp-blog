import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function MenuBar() {

    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname

    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuBar = user ? (
        <Menu pointing secondary size="medium" color="blue">
            <Menu.Item
                name={user.username}
                active={activeItem === user.username}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Item
                name='contact'
                active={activeItem === 'contact'}
                onClick={handleItemClick}
                as={Link}
                to="/contact"
            />
            <Menu.Item
                name='timer'
                active={activeItem === 'timer'}
                onClick={handleItemClick}
                as={Link}
                to="/timer"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
            <Menu pointing secondary size="medium" color="blue" >
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Item
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/contact"
                />
                <Menu.Item
                    name='timer'
                    active={activeItem === 'timer'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/timer"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>
        )

    return menuBar

}

export default MenuBar