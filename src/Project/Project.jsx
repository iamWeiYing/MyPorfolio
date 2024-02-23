import React, { useState, useEffect } from 'react';
import { Pagination, Card, Tag, Button } from 'antd';
import axios from 'axios';
import './Project.css';

const pageSize = 3;
const baseURL = 'https://65ba06cab4d53c066551dc36.mockapi.io/project-data/data';
function Project() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setPosts(response.data);
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
        <div className='project'>
            <h2>Some projects I have completed:</h2>
            <div className='project__container'>
                {posts?.map(
                    (x, index) =>
                        index >= val.minIndex &&
                        index < val.maxIndex && (
                            <Card
                                key={x.id}
                                className='project__item'
                                size="small"
                                title={x.name}
                                cover={<img alt={x.name} src={x.img_url} />}
                            >
                                <p dangerouslySetInnerHTML={{ __html: (x.description).replace(/\n/g, "<br />") }} />
                                <div>
                                    {(x.technology).map((y) => (
                                        <Tag key={x.id+y} color="blue">{y}</Tag>
                                    )) }
                                </div>
                                <Button className='button' type="primary" href={x.source_url} target="_blank">
                                    Source Code
                                </Button>
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

export default Project;