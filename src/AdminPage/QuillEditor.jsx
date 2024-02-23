import React, { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {

    const reactQuillRef = useRef(null);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "hloqrnca");

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/dbpphzhoy/image/upload`,
            { method: "POST", body: formData }
        );
        const data = await res.json();
        console.log(data);
        const url = data.url;

        return url
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await handleUpload(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", url);
                }
            }
        };
    }, []);

    return (
        <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            placeholder="Start writing..."
            modules={{
                toolbar: {
                    container: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["code-block"],
                        ["clean"],
                    ],
                    handlers: {
                        image: imageHandler,
                    },
                },
                clipboard: {
                    matchVisual: false,
                },
            }}
            formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
            ]}
            value={value}
            onChange={onChange}
        />
    );
};

export { QuillEditor };