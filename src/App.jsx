import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from 'antd';
import NavBar from './NavBar/NavBar'
import Intro from './Intro/Intro'
import About from './About/About'
import Skill from './Skill/Skill'
import Project from './Project/Project';
import Blog from './Blog/Blog';
import Contact from './Contact/Contact'
import AdminPage from './AdminPage/AdminPage';
import UserPage from './UserPage/UserPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './LoginPage/RegisterPage';
import BlogPage from './BlogPage/BlogPage';


function App() {
    if (window.location.pathname === "/")
        localStorage.setItem('isLogedIn', JSON.stringify(false));

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <NavBar />
                            <div>
                                <div
                                    className='layout-body'
                                    id="intro"
                                    style={{ background: 'rgba(59, 7, 7, 0.5)' }}
                                ><Intro /></div>
                                <div
                                    className='layout-body'
                                    id="about"
                                    style={{ background: 'rgba(33, 59, 7, 0.5)' }}
                                ><About /></div>
                                <div
                                    className='layout-body'
                                    id="skill"
                                    style={{ background: 'rgba(7, 59, 59, 0.5)' }}
                                ><Skill /></div>
                                <div
                                    className='layout-body'
                                    id="project"
                                    style={{ background: 'rgba(33, 7, 59, 0.5)' }}
                                ><Project /></div>
                                <div
                                    className='layout-body'
                                    id="blog"
                                    style={{ background: 'rgba(59, 7, 7, 0.5)' }}
                                ><Blog /></div>
                                <div
                                    className='layout-footer'
                                    id="contact"
                                    style={{ background: '#176141' }}
                                ><Contact /></div>
                            </div>
                        </div>
                    } />
                    {/*<Route path="/admin" element={isLogedIn ? < AdminPage /> : <LoginPage />} />*/}
                    <Route path="/admin" element={< AdminPage />} />
                    <Route path="/user" element={< UserPage />} />
                    <Route path="/login" element={< LoginPage />} />
                    <Route path="/signup" element={< RegisterPage />} />
                    <Route path="/blog/:id" element={
                        <div>
                            <NavBar />
                            <BlogPage />
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>


    )
}

export default App
