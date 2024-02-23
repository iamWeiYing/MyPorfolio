import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tabs } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import './AdminPage.css';
import ProjectEdit from './ProjectEdit.jsx';
import BlogEdit from './BlogEdit';

function AdminPage() {

    const navigateTo = useNavigate();
    function goBack() {
        localStorage.setItem('isLogedIn', false);
        navigateTo('/');
        location.reload();
    }

    return (
        <div className='admin'>
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
                items={[
                    {
                        label: 'Project Info',
                        key: '1',
                        children: <ProjectEdit />,
                    },
                    {
                        label: 'Blog Editor',
                        key: '2',
                        children: <BlogEdit/>,
                    },
                ]}
            />
        </div>
    );
}

export default AdminPage;