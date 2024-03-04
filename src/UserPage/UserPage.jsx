import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tabs } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';

import './UserPage.css';
import UserInfoEdit from './UserInfoEdit';
import BlogEdit from './BlogEdit';

function UserPage() {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const isLogedIn = JSON.parse(localStorage.getItem('isLogedIn'));

    const navigateTo = useNavigate();

    function goBack() {
        localStorage.setItem('isLogedIn', JSON.stringify(false));
        navigateTo('/');
    }

    function goLogin() {
        navigateTo('/login');
    }

    return (
        <div className='user'>
            {console.log(userdata)}
            {isLogedIn &&
                <>
                    <div className='user__header'>
                        <Button
                            type="primary" danger
                            onClick={goBack}
                            icon={<LogoutOutlined />}
                    />
                    <h1>{'Welcome ' + userdata.name + '!'}</h1>
                    </div>
                    <Tabs
                        defaultActiveKey="1"
                        destroyInactiveTabPane='true'
                        items={[
                            {
                                label: 'Your Infomation',
                                key: '1',
                                children: <UserInfoEdit />,
                            },
                            {
                                label: 'Blog Editor',
                                key: '2',
                                children: <BlogEdit />,
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
                    <div className='user__backloginbtn'>
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

export default UserPage;