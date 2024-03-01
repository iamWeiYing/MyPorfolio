import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Select, Table, Spin, Modal, Typography } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { CheckCircleOutlined } from '@ant-design/icons';
import './AdminPage.css';

const { Text } = Typography;
const baseURL = 'https://65ae210d1dfbae409a74037a.mockapi.io/blog-web/';

const RequestForm = ({ data }) => {
    return (
        <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 17 }}
        >
            <Form.Item
                label="Title"
            >
                {data.title}
            </Form.Item>

            <Form.Item
                label="Sub Title"
            >
                {data.subTitle}
            </Form.Item>

            <Form.Item
                label="Description"
            >
                {data.shortDescription}
            </Form.Item>

            <Form.Item
                label="Content"
            >
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </Form.Item>

            <Form.Item
                label="Status"
            >
                {data.status}
            </Form.Item>
        </Form>
    );
};

function RequestEdit() {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 270,
        },
        {
            title: 'Requester',
            key: 'createdBy',
            width: 200,
            render: (record) => (
                <Text ellipsis='true'>{record.updatedBy || record.createdBy}</Text>
            ),
        },
        {
            title: 'Request Time',
            key: 'createdAt',
            width: 120,
            align: 'center',
            render: (record) => {
                const date = record.updatedAt || record.createdAt;
                if (dayjs(date).isValid())
                    return (
                        <Text ellipsis='true'>
                            {dayjs(date).format('MMM DD, YYYY')}
                        </Text>
                    )
                else
                    return (
                        <Text ellipsis='true'></Text>
                    )
            }
        },
        {
            title: 'Request Type',
            dataIndex: 'requestType',
            key: 'requestType',
            width: 150,
            align: 'center',
            render: (text) => <span>{text.toUpperCase()}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 130,
            align: 'center',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={() => handleDetail(record)}>Detail</a>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <a href="#" onClick={() => confirmDelete(record.id)}>Delete</a>
                </span>
            ),
        },
    ];

    const [modal, contextHolder] = Modal.useModal();
    const confirmRequest = () => {
        modal.confirm({
            title: 'Confirm',
            centered: true,
            icon: <CheckCircleOutlined style={{ color: '#00ff00' }} />,
            content: 'Do you want to approve this request?',
            onOk: data.requestType === 'delete' ? handleDelete : handleAddUpdate,
        });
    };
    const confirmDelete = (id) => {
        modal.confirm({
            title: 'Confirm',
            centered: true,
            icon: <CheckCircleOutlined style={{ color: '#00ff00' }} />,
            content: 'Do you want to delete this request?',
            onOk: () => { handleDeleteRequest(id) },
        })
    }

    const [data, setData] = useState({});
    const [requestData, setRequestData] = useState([]);
    const [oldData, setOldData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(baseURL + 'Request');
                setRequestData(response1.data);
                const response2 = await axios.get(baseURL + 'Post');
                setOldData(response2.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDetail = (record) => {
        setData(record);
        setEditModalVisible(true);
    };

    const handleCancelDetail = () => {
        setEditModalVisible(false);
    };

    const handleDeleteRequest = async (id) => {
        try {
            // Implement your API endpoint for deleting data
            await axios.delete(baseURL + `Request/${id}`);

            // Update the local state by removing the deleted item
            setRequestData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleAddUpdate = () => {
        const newPost = {
            title: data.title,
            subTitle: data.subTitle,
            shortDescription: data.shortDescription,
            content: data.content,
            status: data.status,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
            updatedAt: data.updatedAt,
            updatedBy: data.updatedBy
        };
        const handleRequest = async () => {
            console.log(data);
            try {
                let response;
                if (data.PostId) {
                    // If data has an PostID, it's an existing object, so update it
                    response = await axios.put(baseURL + `Post/${data.PostId}`, newPost);
                } else {
                    // If data does not have an PostID, it's a new object, so add it

                    response = await axios.post(baseURL + 'Post', newPost);
                }
                console.log('Form values:', response.data);

                const updatedData = response.data;

                if (data && data.PostId) {
                    // If it's an existing object, update the local state
                    setOldData((prevData) =>
                        prevData.map((item) =>
                            item.id === updatedData.id ? { ...item, ...updatedData } : item
                        )
                    );
                } else {
                    // If it's a new object, add it to the local state
                    setOldData((prevData) => [...prevData, updatedData]);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        };
        handleRequest();
        handleDeleteRequest(data.id);
        setEditModalVisible(false);
    };

    const handleDelete = async () => {
        console.log('Delete!');
        try {
            await axios.delete(baseURL + `Post/${data.PostId}`);
            setRequestData((prevData) => prevData.filter((item) => item.id !== data.id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
        if (data.PostId !== null) {
            try {
                const itemsToDelete = requestData.filter(item => item.PostId === data.PostId && item.id !== data.id);
                await Promise.all(itemsToDelete.map(async item => {
                    await axios.delete(baseURL + `Request/${item.id}`);
                }));
                /*await axios.delete(`Request?PostId=${data.PostId}`);*/
                setRequestData((prevData) => prevData.filter((item) => item.PostId !== data.PostId));
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
        handleDeleteRequest(data.id);
        setEditModalVisible(false);
    };

    return (
        <div>
            {contextHolder}
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table
                        dataSource={requestData}
                        columns={columns}
                        pagination={{ pageSize: 7, position: ['topCenter'] }}
                        scroll={{ y: 425 }}
                    />

                    <Modal
                        title="User's Request"
                        open={editModalVisible}
                        width="70vw"
                        destroyOnClose="true"
                        onOk={confirmRequest}
                        onCancel={handleCancelDetail}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    label: 'New Data',
                                    key: 'new',
                                    children: <RequestForm data={data} />,
                                },
                                {
                                    label: 'Old Data',
                                    key: 'old',
                                    children: <RequestForm data={oldData.find((item) => item.id === data.PostId) || {}} />,
                                },
                            ]}
                        />
                    </Modal>
                </>
            )}
        </div>
    );
}

export default RequestEdit;