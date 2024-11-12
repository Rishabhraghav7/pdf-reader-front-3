import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPdf.css';

const UploadPdf = () => {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));  // Convert to an array of files
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setLoading(true);
    const formData = new FormData();

    // Append each selected file to FormData
    files.forEach((file, index) => {
      formData.append('files', file);
    });

    try {
      const res = await fetch('http://127.0.0.1:8000/process_pdfs/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
        console.log('Success',data);
        setError(null);
        setLoading(false);
        navigate('/answer');  // Only navigate after setting response
      } else {
        setError(data.error || 'An error occurred');
        setResponse(null);
      }
    } catch (err) {
      setError('Error uploading files');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        multiple  // Allow multiple file selection
        style={{ color: "black" }}
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {response && (
        <div>
          <h2>Response:</h2>
          <ul>
            {response.file_paths.map((path, index) => (
              <li key={index}>File {index + 1}: <a href={`/${path}`} download>{path}</a></li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default UploadPdf;
