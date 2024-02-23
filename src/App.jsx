import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './NavBar/NavBar'
import Intro from './Intro/Intro'
import About from './About/About'
import Skill from './Skill/Skill'
import Project from './Project/Project';
import Blog from './Blog/Blog';
import Contact from './Contact/Contact'
import AdminPage from './AdminPage/AdminPage';
import LoginPage from './LoginPage/LoginPage';
import BlogPage from './BlogPage/BlogPage';

function App() {
    const isLogedIn = JSON.parse(localStorage.getItem('isLogedIn'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <div>
                        <NavBar />
                        <div>
                            <div
                                className='layout-body'
                                id="intro"
                                style={{ background: 'rgba(18, 7, 59, 0.5)' }}
                            ><Intro /></div>
                            <div
                                className='layout-body'
                                id="about"
                                style={{ background: 'rgba(223, 171, 200, 0.5)' }}
                            ><About /></div>
                            <div
                                className='layout-body'
                                id="skill"
                                style={{ background: 'rgba(37, 90, 145, 0.5)' }}
                            ><Skill /></div>
                            <div
                                className='layout-body'
                                id="project"
                                style={{ background: 'rgba(53, 176, 191, 0.5)' }}
                            ><Project /></div>
                            <div
                                className='layout-body'
                                id="blog"
                                style={{ background: 'rgba(18, 7, 59, 0.5)' }}
                            ><Blog /></div>
                            <div
                                className='layout-footer'
                                id="contact"
                                style={{ background: '#176141' }}
                            ><Contact /></div>
                        </div>
                    </div>
                } />
                <Route path="/admin" element={isLogedIn ? < AdminPage /> : <LoginPage />} />
                <Route path="/blog/:id" element={
                    <div>
                        <NavBar />
                        <BlogPage />
                    </div>
                } />
                {/*<Route path="/login" element={<LoginPage />} />*/}
            </Routes>
        </BrowserRouter>

    )
}

export default App
