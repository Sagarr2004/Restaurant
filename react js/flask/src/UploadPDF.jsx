import { useState } from "react";

const UploadPDF = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const uploadFile = async () => {
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData,
            });
            

            const data = await response.json();
            setMessage(data.message || "File uploaded successfully!");
        } catch (error) {
            setMessage("Error uploading file.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Upload a PDF</h2>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadFile} style={{ marginLeft: "10px" }}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default UploadPDF;
