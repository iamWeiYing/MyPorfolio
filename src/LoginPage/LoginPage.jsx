import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Form, Input, Button, Divider, notification } from 'antd';
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import './LoginPage.css';

const baseURL = 'https://65ba06cab4d53c066551dc36.mockapi.io/project-data/user'

export default function LoginPage() {

    const navigateTo = useNavigate();
    function goBack() {
        navigateTo('/');
    }


    const [api, contextHolder] = notification.useNotification();
    const notifiWrong = () => {
        api.open({
            message: 'Login failed!',
            icon: <CloseOutlined style={{ color: '#ff0000' }} />,
            duration: 2.5,
        });
    };


    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //check username & password
    const checkObjectExistence = (username, password) => {
        const foundObject = users.find((obj) => obj.username === username && obj.password === password);

        if (foundObject) {
            return true;
        } else {
            return false;
        }
    };

    //get data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //handle login
    const handleLogin = () => {
        if (checkObjectExistence(username, password)) {
            console.log('Login success');
            localStorage.setItem('isLogedIn', true);
            location.reload();
        }
        else {
            console.error('Login failed');
            notifiWrong();
        }
    };


    return (
        <div className='login'>
            {contextHolder}
            <Button
                className='btn__back'
                type="primary" danger
                onClick={goBack}
                icon={<CloseOutlined /> }
            />
            <Form
                className='login__form'
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Divider />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <Outlet />
        </div>
    );
}