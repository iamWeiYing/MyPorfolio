import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, Spin, Modal, Typography } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { QuillEditor } from './QuillEditor';
import './AdminPage.css';

const { Option } = Select;
const { Text } = Typography;
const baseURL = 'https://65ae210d1dfbae409a74037a.mockapi.io/blog-web/Post';
const userdata = JSON.parse(localStorage.getItem("userdata"));

function BlogEdit() {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            width: 200,
        },
        {
            title: 'Author',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 140,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => {
                if (dayjs(date).isValid())
                    return (
                        <Text ellipsis='true'>
                            {dayjs(date).format('DD-MM-YYYY | HH:mm:ss')}
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
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => {
                if (dayjs(date).isValid())
                    return (
                        <Text ellipsis='true'>
                            {dayjs(date).format('DD-MM-YYYY | HH:mm:ss')}
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
            width: 160,
            align: 'center',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={() => handleEdit(record)}>Edit</a>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <a href="#" onClick={() => handleDelete(record.id)}>Delete</a>
                </span>
            ),
        },
    ];

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
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

    const handleDelete = async (id) => {
        try {
            // Implement your API endpoint for deleting data
            await axios.delete(baseURL + `/${id}`);

            // Update the local state by removing the deleted item
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleSaveEdit = (values) => {
        const newPost = {
            title: values.title,
            subTitle: values.subTitle,
            shortDescription: values.shortDescription,
            content: values.content,
            status: values.status,
            updatedAt: '',
            updatedBy: ''
        };
        if (values && values.id) { newPost.updatedAt = dayjs(); }
        else {
            newPost.createdAt = dayjs();
            newPost.createdBy = userdata.username;
        }
        const handleNewData = async () => {
            try {
                let response;
                if (values && values.id) {
                    // If editedData has an ID, it's an existing object, so update it
                    response = await axios.put(baseURL + `/${values.id}`, newPost);
                } else {
                    // If editedData does not have an ID, it's a new object, so add it

                    response = await axios.post(baseURL, newPost);
                }
                console.log('Form values:', response.data);

                const updatedData = response.data;

                if (values && values.id) {
                    // If it's an existing object, update the local state
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.id === updatedData.id ? { ...item, ...updatedData } : item
                        )
                    );
                } else {
                    // If it's a new object, add it to the local state
                    setData((prevData) => [...prevData, updatedData]);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        };
        handleNewData();
        setEditModalVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={() => handleAdd()} style={{ float: 'right' }}>
                Add New
            </Button>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table dataSource={data} columns={columns} pagination={{ pageSize: 7, position: ['topRight'] }} />

                    <Modal
                        title="Blog Editor"
                        open={editModalVisible}
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