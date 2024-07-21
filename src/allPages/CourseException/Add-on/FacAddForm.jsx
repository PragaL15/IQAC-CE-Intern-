import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../styles/Internship.css';

const CreateForm = () => {
  const [register_number, setRegisterNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [addHm, setAddHm] = useState('');
  const [courseID, setCourseID] = useState('');
  const [courseName, setCourseName] = useState('');
  const [electiveId, setElectiveId] = useState('');
  const [registerNumbers, setRegisterNumbers] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [electiveOptions, setElectiveOptions] = useState([]);

  const [semesters] = useState([
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
  ]);

  const [departments] = useState([
    { value: 1, label: 'CSE' },
    { value: 2, label: 'ECE' },
    { value: 3, label: 'MECH' },
    { value: 4, label: 'CIVIL' },
  ]);

  useEffect(() => {
    const fetchRegisterNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/registerNumbers');
        setRegisterNumbers(response.data);
      } catch (error) {
        console.error('Error fetching register numbers:', error);
        alert('Failed to fetch register numbers. Please try again later.');
      }
    };

    const fetchModeOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/modeOptions');
        setModeOptions(response.data);
      } catch (error) {
        console.error('Error fetching mode options:', error);
        alert('Failed to fetch mode options. Please try again later.');
      }
    };

    const fetchElectiveOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/electiveNames');
        setElectiveOptions(response.data);
      } catch (error) {
        console.error('Error fetching elective options:', error);
        alert('Failed to fetch elective options. Please try again later.');
      }
    };

    fetchRegisterNumbers();
    fetchModeOptions();
    fetchElectiveOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!register_number || !semester || !department || !addHm || !courseID || !courseName || !electiveId) {
      alert('Please fill all the fields');
      return;
    }

    const formData = {
      register_number: register_number.toUpperCase(),
      semester: semester,
      department: department,
      addHm: addHm,
      courseID: courseID.toUpperCase(),
      courseName: courseName.toUpperCase(),
      electiveId: electiveId,
    };

    try {
      const response = await axios.post('http://localhost:3000/submitForm', formData);
      if (response.status === 200) {
        alert('Form submitted successfully');
        // Clear form fields
        setRegisterNumber('');
        setSemester('');
        setDepartment( );
        setAddHm('');
        setCourseID('');
        setCourseName('');
        setElectiveId('');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed. Please try again later.');
    }
  };

  const handleSelectChange = (setter) => (selectedOption) => {
    if (selectedOption) {
      setter(selectedOption.value);
    } else {
      setter('');
    }
  };

  const isFormValid = register_number && semester && department && addHm && courseID && courseName && electiveId;

  return (
    <div className="Full">
      <div className="titledfault">
        <h4>Add/Honor/Minor Details</h4>
      </div>
      <form onSubmit={handleSubmit} className="Default">
        <div className="dfinside">
          <div className="quesField">
            <div className="titdefault">Register Number</div>
            <Select
              className="textField"
              value={registerNumbers.find(option => option.value === register_number)}
              onChange={handleSelectChange(setRegisterNumber)}
              options={registerNumbers}
              placeholder="Select Register Number"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Semester</div>
            <Select
              className="textField"
              value={semesters.find(option => option.value === semester)}
              onChange={handleSelectChange(setSemester)}
              options={semesters}
              placeholder="Select Semester"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Department</div>
            <Select
              className="textField"
              value={departments.find(option => option.value === department)}
              onChange={handleSelectChange(setDepartment)}
              options={departments}
              placeholder="Select Department"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Add/Honor/Minor</div>
            <Select
              className="textField"
              value={modeOptions.find(option => option.value === addHm)}
              onChange={handleSelectChange(setAddHm)}
              options={modeOptions}
              placeholder="Select Add/H/M"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Course code</div>
            <input
              className="inputField"
              type="text"
              value={courseID}
              onChange={e => setCourseID(e.target.value.toUpperCase())}
              placeholder="Enter Course code"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Course Name</div>
            <input
              className="inputField"
              type="text"
              value={courseName}
              onChange={e => setCourseName(e.target.value.toUpperCase())}
              placeholder="Enter Course Name"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Elective Name</div>
            <Select
              className="textField"
              value={electiveOptions.find(option => option.value === electiveId)}
              onChange={handleSelectChange(setElectiveId)}
              options={electiveOptions}
              placeholder="Select Elective Name"
            />
          </div>
          <div className="inp">
            <button type="submit" className="expCreateBtn" disabled={!isFormValid}>
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
