import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tabs } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';

import './UserPage.css';
import BlogEdit from './BlogEdit';

function UserPage() {

    const navigateTo = useNavigate();
    const isLogedIn = JSON.parse(localStorage.getItem('isLogedIn'));

    function goBack() {
        localStorage.setItem('isLogedIn', false);
        navigateTo('/');
    }

    function goLogin() {
        navigateTo('/login');
    }

    return (
        <div className='user'>
            {isLogedIn &&
                <>
                    <div className='user__header'>
                        <Button
                            type="primary" danger
                            onClick={goBack}
                            icon={<LogoutOutlined />}
                        />
                        <h1>Porfolio Editing</h1>
                    </div>
                    <BlogEdit />
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