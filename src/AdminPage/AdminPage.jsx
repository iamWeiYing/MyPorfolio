import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tabs } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';

import './AdminPage.css';
import ProjectEdit from './ProjectEdit.jsx';
import BlogEdit from './BlogEdit';
import RequestEdit from './RequestEdit';

function AdminPage() {

    const navigateTo = useNavigate();
    const isLogedIn = JSON.parse(localStorage.getItem('isLogedIn'));

    function goBack() {
        localStorage.setItem('isLogedIn', JSON.stringify(false));
        navigateTo('/');
    }

    function goLogin() {
        navigateTo('/login');
    }

    return (
        <div className='admin'>
            {isLogedIn &&
                <>
                    <div className='admin__header'>
                        <Button
                            type="primary" danger
                            onClick={goBack}
                            icon={<LogoutOutlined />}
                        />
                        <h1>Porfolio Editing</h1>
                    </div>
                    <Tabs
                        defaultActiveKey="1"
                        destroyInactiveTabPane='true'
                        items={[
                            {
                                label: 'Project Info',
                                key: '1',
                                children: <ProjectEdit />,
                            },
                            {
                                label: 'Blog Editor',
                                key: '2',
                                children: <BlogEdit />,
                            },
                            {
                                label: 'Blog Request',
                                key: '3',
                                children: <RequestEdit />,
                            },
                        ]}
                    />
                </>
            }
            {!isLogedIn &&
                <>
                    <Button
                        type="primary" danger
                        onClick={goBack}
                        icon={<LogoutOutlined />}
                    />
                    <Player
                        src='https://lottie.host/226f8307-3969-4e1a-9e76-cfff8466f3bc/kK7f0oQjlG.json'
                        className="player"
                        loop
                        autoplay
                    />
                    <div className='admin__backloginbtn'>
                        <Button
                            type="primary"
                            onClick={goLogin}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >Return to Login Page</Button>
                    </div>
                </>
            }
        </div>
    );
}

export default AdminPage;