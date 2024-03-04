import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Form, Input, Button, Divider, notification } from 'antd';
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import './LoginPage.css';

const baseURL = 'https://65ba06cab4d53c066551dc36.mockapi.io/project-data/user'

function RegisterPage() {
    localStorage.setItem('isLogedIn', JSON.stringify(false));
    const navigateTo = useNavigate();
    function goBack() {
        navigateTo('/');
    }

    const [api, contextHolder] = notification.useNotification();
    const notifiWrong = () => {
        api.open({
            message: 'Register failed!',
            icon: <CloseOutlined style={{ color: '#ff0000' }} />,
            duration: 2.5,
        });
    };

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const checkObjectExistence = (username) => {
        const foundObject = users.find((obj) => obj.username === username);

        if (foundObject) {
            return true;
        } else {
            return false;
        }
    };

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

    const handleRegister = async () => {
        try {
            const response = await axios.post(baseURL, {
                username,
                password,
                name,
                account_type: "user"
            });

            // Handle successful login, e.g., store the token in local storage
            console.log('Sign up successful!', response.data);
            localStorage.setItem('userdata', JSON.stringify(response.data));
            localStorage.setItem('isLogedIn', JSON.stringify(true));
            if (response.data.account_type === 'admin') navigateTo('/admin');
            else navigateTo('/user')
        } catch (error) {
            // Handle login error
            console.error('Sign up failed!', error.response.data);
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
                icon={<CloseOutlined />}
            />
            <Form
                className='login__form'
                onFinish={handleRegister}
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
                        () => ({
                            validator(_, value) {
                                if (!value || value.length < 22) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Your Username should less than 22 letters'));
                            },
                        }),
                        () => ({
                            validator(_, value) {
                                if (!value || !checkObjectExistence(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Your Username have been existed'));
                            },
                        }),
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
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        () => ({
                            validator(_, value) {
                                if (!value || value.length > 5 && value.length < 15) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Your Password should have 6-14 letters'));
                            },
                        }),
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
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Divider />

                <Form.Item>
                    <div className='btn__login'>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Register
                        </Button>
                    </div>
                    Have account? <a href="/login">Log in now!</a>
                </Form.Item>
            </Form>
            <Outlet />
        </div>
    );
}

export default RegisterPage;