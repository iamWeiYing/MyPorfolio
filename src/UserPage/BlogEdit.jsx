import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, Spin, Modal, Typography, notification } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { CheckOutlined } from '@ant-design/icons';
import { QuillEditor } from '../AdminPage/QuillEditor';
import './UserPage.css';

import Constants from '../Constant';
const { Option } = Select;
const { Text } = Typography;
const baseURL = 'https://65ae210d1dfbae409a74037a.mockapi.io/blog-web/';

function BlogEdit() {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
        },
        {
            title: 'Author',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 200,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
        },
        {
            title: 'Created Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date) => {
                if (dayjs(date).isValid())
                    return (
                        <Text ellipsis='true'>
                            {dayjs(date).format('DD-MM-YYYY')}
                        </Text>
                    )
                else
                    return (
                        <Text ellipsis='true'></Text>
                    )
            }
        },
        {
            title: 'Last Update',
            key: 'updatedAt',
            width: 280,
            render: (record) => {
                if (dayjs(record.updatedAt).isValid())
                    return (
                        <Text ellipsis='true'>
                            {dayjs(record.updatedAt).format('DD-MM-YYYY') + ' by ' + record.updatedBy}
                        </Text>
                    )
                else
                    return (
                        <Text ellipsis='true'></Text>
                    )
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 130,
            align: 'center',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={() => handleEdit(record)}>Edit</a>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <a href="#" onClick={() => handleDelete(record)}>Delete</a>
                </span>
            ),
        },
    ];

    const [api, contextHolder] = notification.useNotification();
    const notiRequest = () => {
        api.open({
            message: 'Send request success!',
            description: 'Admin will approve your request soon.',
            icon: <CheckOutlined style={{ color: '#00ff00' }} />,
            duration: 2.5,
        });
    };

    const notiWrong = () => {
        api.open({
            message: 'Send request error!',
            description: 'Something wrong.',
            icon: <CheckOutlined style={{ color: '#ff0000' }} />,
            duration: 2.5,
        });
    };

    const [form] = Form.useForm();
    const userdata = Constants.userdata;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL + 'Post');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAdd = () => {
        form.resetFields();
        setEditModalVisible(true);
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditModalVisible(true);
    };

    const handleCancelEdit = () => {
        setEditModalVisible(false);
    };

    const handleDelete = async (values) => {
        const newPost = {
            title: values.title,
            subTitle: values.subTitle,
            shortDescription: values.shortDescription,
            content: values.content,
            status: values.status,
            createdAt: dayjs(),
            createdBy: userdata.name,
            updatedAt: '',
            updatedBy: '',
            PostId: values.id,
            requestType: 'delete',
        };
        const handleNewData = async () => {
            try {
                let response;
                response = await axios.post(baseURL + 'Request', newPost);
                console.log('Form values:', response.data);
                notiRequest();
            } catch (error) {
                console.error('Error updating data:', error);
                notiWrong();
            }
        };
        handleNewData();
    };

    const handleSaveEdit = (values) => {
        const newPost = {
            title: values.title,
            subTitle: values.subTitle,
            shortDescription: values.shortDescription,
            content: values.content,
            status: values.status || 'Private',
            updatedAt: '',
            updatedBy: '',
            PostId: null,
        };
        if (values && values.id) {
            newPost.createdAt = values.createdAt;
            newPost.createdBy = values.createdBy;
            newPost.updatedAt = dayjs();
            newPost.updatedBy = userdata.name;
            newPost.PostId = values.id;
            newPost.requestType = 'update';
        }
        else {
            newPost.createdAt = dayjs();
            newPost.createdBy = userdata.name;
            newPost.requestType = 'add';
        }
        const handleNewData = async () => {
            try {
                let response;
                response = await axios.post(baseURL + 'Request', newPost);
                console.log('Form values:', response.data);
                notiRequest();
            } catch (error) {
                console.error('Error updating data:', error);
                notiWrong();
            }
        };
        handleNewData();
        setEditModalVisible(false);
    };

    return (
        <div>
            {contextHolder}
            <Button className='nav-btn' type="primary" onClick={() => handleAdd()}>
                Add New
            </Button>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={{ pageSize: 7, position: ['topCenter'] }}
                        scroll={{ y: 425 }}
                    />

                    <Modal
                        title="Blog Editor"
                        open={editModalVisible}
                        width="70vw"
                        onOk={form.submit}
                        onCancel={handleCancelEdit}
                    >
                        <Form
                            form={form}
                            onFinish={handleSaveEdit}
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 17 }}
                        >
                            <Form.Item
                                label="ID"
                                name="id"
                                style={{ display: 'none' }}
                            >
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item
                                label="createdAt"
                                name="createdAt"
                                style={{ display: 'none' }}
                            >
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item
                                label="createdBy"
                                name="createdBy"
                                style={{ display: 'none' }}
                            >
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please enter a title!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Sub Title"
                                name="subTitle"
                                rules={[{ required: true, message: 'Please enter a sub title!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="shortDescription"
                                rules={[{ required: true, message: 'Please enter a short description!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Content"
                                name="content"
                                rules={[{ required: true, message: 'Please enter content!' }]}
                            >
                                <QuillEditor />
                            </Form.Item>

                            <Form.Item
                                label="Status"
                                name="status"
                            >
                                <Select defaultValue='Privated'>
                                    <Option value="Published">Published</Option>
                                    <Option value="Privated">Privated</Option>
                                </Select>
                            </Form.Item>

                        </Form>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default BlogEdit;