import React from 'react';
import { Button } from 'antd'
import { Player } from '@lottiefiles/react-lottie-player';
import './Intro.css';

function Intro() {
    const downloadFile = () => {
        const fileUrl = './public/CV Thực tập.pdf';
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = 'CV Thực tập.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className='intro'>
            <div>
                <p>Hello, I'm</p>
                <h1>Lê Đình Duy Anh </h1>
                <p>Front-end Development</p>
                <Button
                    className='button'
                    onClick={downloadFile}
                >
                    Download my CV
                </Button>
            </div>
            <div>
                <Player
                    src='https://lottie.host/6b1052b7-de36-45bb-a6b9-0461cdd92bef/CeOBNok0fT.json'
                    className="player"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
}

export default Intro;