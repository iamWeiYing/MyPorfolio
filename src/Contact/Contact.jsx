import React from 'react';
import { MailTwoTone, EnvironmentTwoTone     } from '@ant-design/icons';
import './Contact.css'

function Contact() {
    return (
        <div className='contact'>
            <p className='contact__1'>
                <MailTwoTone twoToneColor='#00ffdd' /> <a href='mailto: akashishuusaku@gmail.com' target="_blank" rel='noreferrer'>akashishuusaku@gmail.com</a>
                <br/>
                <EnvironmentTwoTone twoToneColor='#00ffdd' /> Hanoi, Vietnam
            </p>
            <div className='contact__2'>
                <a href='https://github.com/iamWeiYing' target="_blank" rel='noreferrer'>
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg" alt="git" />
                </a>
                <a href='https://www.facebook.com/than.rua.90410' target="_blank" rel='noreferrer'>
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/facebook/facebook-original.svg" alt="git" />
                </a>
            </div>
        </div>
  );
}

export default Contact;