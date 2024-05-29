import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadDocumentPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const xhrRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setStatus('idle');
    setProgress(0);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      setStatus('uploading');
      try {
        const formData = new FormData();
        formData.append('document', file);
  
        setLoading(false);
        setStatus('completed');
        saveFileLocally(file);
        window.location.href = `/my-document/${encodeURIComponent(file.name)}`;

      } catch (error) {
        console.error('Error uploading document:', error);
        setLoading(false);
        setStatus('failed');
      }
    } else {
      console.error('No file selected.');
    }
  };

  const saveFileLocally = (file) => {
    const reader = new FileReader();
    reader.onload = function () {
      const data = reader.result;
      const fileName = file.name;
      const fileType = file.type;
      const blob = new Blob([data], { type: fileType });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file);
  };



  const handleCancel = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setLoading(false);
      setStatus('failed');
    }
  };

  const handleDelete = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
  };

  const getStatusStyle = () => {
    switch (status) {
      case 'uploading':
        return styles.uploading;
      case 'processing':
        return styles.processing;
      case 'completed':
        return styles.completed;
      case 'failed':
        return styles.failed;
      default:
        return {};
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Upload Document</h1>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div {...getRootProps({ style: styles.dropzone })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <p>Drag 'n' drop a PDF file here, or click to select one</p>
            )}
          </div>
          {file && (
            <div style={styles.fileDetails}>
              <p style={styles.fileName}>Selected File: {file.name}</p>
              <button type="button" onClick={handleDelete} style={styles.deleteButton}>
                Delete
              </button>
            </div>
          )}
          <button type="submit" disabled={!file || loading} style={styles.button}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {loading && (
            <button type="button" onClick={handleCancel} style={styles.cancelButton}>
              Cancel
            </button>
          )}
          <div style={{ ...styles.status, ...getStatusStyle() }}>
            {status === 'uploading' && 'Uploading...'}
            {status === 'processing' && 'Processing...'}
            {status === 'completed' && 'Completed'}
            {status === 'failed' && 'Failed'}
          </div>
          {loading && (
            <div style={styles.progressContainer}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '50px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  dropzone: {
    width: '300%',
    padding: '160px',
    borderWidth: '2px',
    borderColor: '#cccccc',
    borderStyle: 'dashed',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    color: '#333333',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  fileDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  fileName: {
    fontSize: '14px',
    marginRight: '10px',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  cancelButton: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginTop: '10px',
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#76c7c0',
    borderRadius: '5px',
  },
  status: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  uploading: {
    color: '#ffa500', 
  },
  processing: {
    color: '#007bff', 
  },
  completed: {
    color: '#28a745', 
  },
  failed: {
    color: '#dc3545', 
  },
};

export default UploadDocumentPage;
