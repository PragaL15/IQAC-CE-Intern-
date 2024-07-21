import React from 'react';
import axios from 'axios';

const CourseUpload = () => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`File processed successfully. ${response.data.count} rows added.`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <form>
      <input type="file" onChange={handleFileChange} />
    </form>
  );
};

export default CourseUpload;
