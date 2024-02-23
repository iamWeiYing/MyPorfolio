import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import axios from 'axios';
import './BlogPage.css'


export default function BlogPage() {
    let { id } = useParams();

    //get data
    const baseURL = `https://65ae210d1dfbae409a74037a.mockapi.io/blog-web/Post/${id}`;
    const [post, setPost] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className='blogPage'>
            <div className='blog_header'>
                <h1>{post.title}</h1>
                <p><strong>{post.subTitle}</strong></p>
                <p className="createAt">{dayjs(post.createAt).format('MMMM DD, YYYY')}</p>
                <p className="author"><strong>author: </strong>{post.createdBy}</p>
            </div>
            <div className='blog_body' dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}