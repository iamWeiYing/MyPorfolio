import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Anchor, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import './NavBar.css'


function NavBar() {

    const navigateTo = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    function goToAdmin() {
        navigateTo('/login');
    }

    return (
        <div className="nav-bar">
            <a className="nav-icon" href="/">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/7207/7207850.png"
                    alt="react"
                />
                <h2>DuyAnh</h2>
            </a>
            <div className='nav-btn-group'>
                {isHomePage &&
                    <Anchor
                        direction="horizontal"
                        items={[
                            {
                                key: 'intro',
                                href: '#intro',
                                title: 'Intro',
                            },
                            {
                                key: 'about',
                                href: '#about',
                                title: 'About',
                            },
                            {
                                key: 'skill',
                                href: '#skill',
                                title: 'Skill',
                            },
                            {
                                key: 'project',
                                href: '#project',
                                title: 'Project',
                            },
                            {
                                key: 'blog',
                                href: '#blog',
                                title: 'Blog',
                            },
                        ]}
                    />}
                <Button icon={<SettingFilled />} onClick={goToAdmin} />
            </div>
        </div>
    )
}
export default NavBar;