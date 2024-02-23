import React from 'react';
import './Skill.css'

function Skill() {
    return (
        <div className='skill'>
            <h2>Languages and tools I use:</h2>

            <p>
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
                    alt="html5"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
                    alt="css3"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                    alt="javascript"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                    alt="react"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg"
                    alt="bootstrap"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
                    alt="git"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg"
                    alt="github"
                />
                <img
                    className='skill-icon'
                    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg"
                    alt="gitlab"
                />
            </p>
        </div>
    );
}

export default Skill;