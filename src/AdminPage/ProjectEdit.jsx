import React, { useState, useEffect } from 'react';
import { Table, Spin, Modal, Form, Input, Button } from 'antd';
import axios from 'axios';
import './AdminPage.css';
const { TextArea } = Input;

const baseURL = 'https://65ba06cab4d53c066551dc36.mockapi.io/project-data/data';

function ProjectEdit() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Technology',
            dataIndex: 'technology',
            key: 'technology',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={() => handleEdit(record)}>Edit</a>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <a href="#" onClick={() => handleDelete(record.id)}>Delete</a>
                </span>
            ),
        },
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [uploadFile, setUploadFile] = useState("");

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
        setEditedData(null); // Reset editedData for a new object
        setEditModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditedData(record);
        setEditModalVisible(true);
    };

    const handleCancelEdit = () => {
        setEditModalVisible(false);
    };

    const handleSaveEdit = async () => {
        try {
            let response;

            if (editedData && editedData.id) {
                // If editedData has an ID, it's an existing object, so update it
                response = await axios.put(
                    baseURL + `/${editedData.id}`,
                    editedData
                );
            } else {
                // If editedData does not have an ID, it's a new object, so add it
                response = await axios.post(
                    baseURL,
                    editedData
                );
            }

            const updatedData = response.data;

            if (editedData && editedData.id) {
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

            setEditModalVisible(false);
        } catch (error) {
            console.error('Error updating/adding data:', error);
        }
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

    const handleUpload = async (value) => {
        const formData = new FormData();
        formData.append("file", value);
        formData.append("upload_preset", "hloqrnca");

        await axios.post(
            "https://api.cloudinary.com/v1_1/dbpphzhoy/image/upload",
            formData
        )
            .then((response) => {
                console.log(response);
                setEditedData({ ...editedData, img_url: response.data.secure_url });
            })
            .catch((error) => {
                console.log(error);
            });
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
                    <Table 
                            dataSource={data}
                            columns={columns}
                            pagination={{ pageSize: 7, position: ['topRight'] }}
                        />

                    <Modal
                        title="Project"
                        open={editModalVisible}
                        onOk={handleSaveEdit}
                        onCancel={handleCancelEdit}
                    >
                        <Form
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 17 }}
                        >
                            <Form.Item label="Name" key='data_name'>
                                <Input
                                    value={editedData ? editedData.name : ''}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, name: e.target.value })
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Description" key='data_description'>
                                <TextArea
                                    rows={4}
                                    value={editedData ? editedData.description : ''}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, description: e.target.value })
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Technology" key='data_technology'>
                                <Input
                                    value={editedData ? editedData.technology : ''}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, technology: (e.target.value).split(',') })
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Image" key='data_image'>
                                <div className='upload_image'>
                                    <input type="file"
                                        onChange={(event) => { handleUpload(event.target.files[0]); }}
                                    />
                                    {editedData && (<img className='img_upload' src={editedData.img_url} />)}
                                </div>
                            </Form.Item>
                            <Form.Item label="Source" key='data_source'>
                                <Input
                                    value={editedData ? editedData.source_url : ''}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, source_url: e.target.value })
                                    }
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default ProjectEdit;