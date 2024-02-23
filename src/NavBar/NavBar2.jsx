import React from 'react';
import { useNavigate } from "react-router-dom";
import { Anchor, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import './NavBar.css'


function NavBar2() {

    const navigateTo = useNavigate();
    function goToAdmin() {
        navigateTo('/admin');
    }

    return (
        <div className="nav-bar">
            <div className="nav-icon">
                <img
                    src="./logo.jpg"
                    alt="react"
                />
                <h2>DuyAnh</h2>
            </div>
            <div className='nav-btn-group'>
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
                />
                <Button icon={<SettingFilled />} onClick={goToAdmin} />
            </div>
        </div>
    )
}
export default NavBar2;