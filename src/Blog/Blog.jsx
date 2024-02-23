import React, { useState, useEffect } from 'react';
import { Pagination, Card } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import './Blog.css';

const pageSize = 4;
const baseURL = 'https://65ae210d1dfbae409a74037a.mockapi.io/blog-web/Post';

function Blog() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setPosts(response.data.filter(item => item.status === 'Published'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //pagination value
    const [val, setVal] = useState({
        totalPage: posts.length,
        current: 1,
        minIndex: 0,
        maxIndex: pageSize
    })
    //pagination handle
    const handleChange = (page) => {
        setVal({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };

    return (
        <div className='blog'>
            <h2>Blog</h2>
            <div className='blog__container'>
                {posts?.map(
                    (x, index) =>
                        index >= val.minIndex &&
                        index < val.maxIndex && (
                            <Card
                                key={x.id}
                                size="small"
                                title={x.title}
                                extra={<Link to={`/blog/${x.id}`}>Read More →</Link>}
                                style={{ width: '80%', marginBottom: 5 }}
                            >
                                <p className='blog__subTitle'><strong>{x.subTitle}</strong></p>
                                <p className='blog__createAt'>
                                    {dayjs(x.createAt).format('MMMM DD, YYYY')}
                                </p>
                                <p className='blog__shortDescription'>{x.shortDescription}</p>
                            </Card>
                        ))}
            </div>
            <Pagination
                pageSize={pageSize}
                current={val.current}
                total={posts.length}
                onChange={handleChange}
            />
        </div>
    );
}

export default Blog;