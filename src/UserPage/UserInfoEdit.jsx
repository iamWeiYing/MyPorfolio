import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { CheckCircleOutlined } from '@ant-design/icons';

const baseURL = 'https://65ba06cab4d53c066551dc36.mockapi.io/project-data/user';

function UserInfoEdit() {

    const [modal, contextHolder] = Modal.useModal();
    const confirmAction = () => {
        modal.confirm({
            title: 'Confirm',
            centered: true,
            icon: <CheckCircleOutlined style={{ color: '#00ff00' }} />,
            content: 'Are you sure you want to save the change?',
            onOk: form.submit,
        });
    };

    const [form] = Form.useForm();
    form.setFieldsValue(JSON.parse(localStorage.getItem('userdata')));

    const handleChange = (values) => {
        const newInfo = {
            account_type: "user",
            id: values.id,
            name: values.name,
            password: values.password,
            username: values.username
        };
        const handleNewData = async () => {
            try {
                let response;
                response = await axios.put(baseURL + `/${values.id}`, newInfo);
                console.log('User Infomation Updated:', response.data);

                localStorage.setItem('userdata', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error updating data:', error);
            }
        };
        handleNewData();
    };

    return (
        <div>
            {contextHolder}
            <>
                <Form
                    form={form}
                    onFinish={handleChange}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    style={{ maxWidth: 450, margin: 'auto', paddingTop: 30 } }
                >
                    <Form.Item
                        label="ID"
                        name="id"
                        style={{ display: 'none' }}
                    >
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input disabled={true} type="text" />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
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
                        <Input.Password type="password" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 17 }}>
                        <Button type="primary" onClick={confirmAction}>
                            Change Info
                        </Button>
                    </Form.Item>
                </Form>
            </>
        </div>
    );
}

export default UserInfoEdit;