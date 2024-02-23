import React from 'react';
import { Flex, Col, Button } from 'antd';
import './About.css'

function About() {
    return (
        <div>
            <h4>Get to know</h4>
            <h1>About Me</h1>
            <div className="about">
                <Col span={8} className="about-image">
                    <img src={'./user.jpg'} alt="avatar.jpg" />
                </Col>
                <Flex
                    className="about-content"
                    vertical align="center"
                    justify="space-between"
                    style={{ padding: 32 }}
                >
                    <div>
                        <article>
                            <h4>Experience</h4>
                            <small>&lt;1 year</small>
                        </article>
                        <article>
                            <h4>Projects</h4>
                            <small>2+ Completed Projects</small>
                        </article>
                    </div>
                    <p>
                        Able Front-end Developer with less than 1 years of expertise in building Web & Mobile applications development.
                        <br />
                        I love to create responsive websites using ReactJS, JavaScript, HTML, CSS and Bootstrap.
                        <br />
                        I've done some small projects to learn basics and now starting to do more complex projects.
                    </p>
                    <Button
                        className='button'
                        href="#contact"
                    >
                        Contact Me
                    </Button>
                </Flex>
            </div>
        </div>
      /*<section id="about">
          <h4>Get to know</h4>
          <h1>About Me</h1>
          <div>
              <div>
                  <div>
                      <img className="about-image" src={'./user.jpg'} alt="Rasif Taghizade" />
                  </div>
              </div>
              <div>
                  <div>
                      <article>
                          <h4>Experience</h4>
                          <small>5+ year</small>
                      </article>
                      <article>
                          <h4>Projects</h4>
                          <small>32+ Completed Projects</small>
                      </article>
                  </div>
                  <p>
                      Able Full-stack Developer with over 6 years of expertise in building Web & Mobile applications development.
                      <br />
                      My goal is to deliver efficient and effective solutions, and I adhere to the following principles in my work:
                      <br />
                      - I focus on providing solutions that address the client's needs and solve their problems.
                      <br />
                      - I believe in keeping my clients engaged throughout the development process, ensuring them.
                  </p>
                  <a href="#contact">
                      Let's Talk
                  </a>
              </div>
          </div>
      </section>*/
  );
}

export default About;