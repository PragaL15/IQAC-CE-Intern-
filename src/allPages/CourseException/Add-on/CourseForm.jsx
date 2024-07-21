import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CourseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/courses', data);
      alert('Course added successfully');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Course Code</label>
        <input {...register('course_code', { required: true })} />
        {errors.course_code && <span>Course code is required</span>}
      </div>
      <div>
        <label>Course Name</label>
        <input {...register('course_name', { required: true })} />
        {errors.course_name && <span>Course name is required</span>}
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
