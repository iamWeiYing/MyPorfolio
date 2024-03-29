import React, { useState } from 'react';
import Axios from "axios";


function ImageUploader() {
    const [uploadFile, setUploadFile] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("")

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "hloqrnca");

        Axios.post(
            "https://api.cloudinary.com/v1_1/dbpphzhoy/image/upload",
            formData
        )
            .then((response) => {
                console.log(response);
                setCloudinaryImage(response.data.secure_url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="App">
            <section className="left-side">
                <form>
                    <h3> Upload Images to Cloudinary Cloud Storage</h3>
                    <div>
                        <input type="file"
                            onChange={(event) => { setUploadFile(event.target.files[0]); }}
                        />
                    </div>
                    <button onClick={handleUpload}> Upload File</button>
                </form>
            </section>
            <section className="right-side">
                <h3>The resulting image will be displayed here</h3>
                {cloudinaryImage && (<img src={cloudinaryImage} style={{ height: 600, width: 800, objectFit: 'contain' }} />)}
            </section>
        </div>
    );
}

export default ImageUploader;