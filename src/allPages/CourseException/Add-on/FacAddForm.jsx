// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axios from 'axios';
// import '../styles/Internship.css';

// const CreateForm = () => {
//   const [registerNumber, setRegisterNumber] = useState('');
//   const [semester, setSemester] = useState('');
//   const [department, setDepartment] = useState('');
//   const [addHm, setAddHm] = useState('');
//   const [courseID, setCourseID] = useState('');
//   const [courseName, setCourseName] = useState('');

//   const [registerNumbers, setRegisterNumbers] = useState([]);
//   const [semesters] = useState([
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
//     { value: '6', label: '6' },
//     { value: '7', label: '7' },
//     { value: '8', label: '8' },
//   ]);
//   const [departments] = useState([
//     { value: 'CSE', label: 'CSE' },
//     { value: 'ECE', label: 'ECE' },
//     { value: 'MECH', label: 'MECH' },
//     { value: 'CIVIL', label: 'CIVIL' },
//   ]);
//   const [addHmOptions] = useState([
//     { value: 'add', label: 'Add' },
//     { value: 'h', label: 'H' },
//     { value: 'm', label: 'M' },
//   ]);

//   useEffect(() => {
//     const fetchRegisterNumbers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/registerNumbers');
//         setRegisterNumbers(response.data.map(r => ({ value: r, label: r })));
//       } catch (error) {
//         console.error('Error fetching register numbers:', error);
//         alert('Failed to fetch register numbers. Please try again later.');
//       }
//     };

//     fetchRegisterNumbers();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!registerNumber || !semester || !department || !addHm || !courseID || !courseName) {
//       alert('Please fill all the fields');
//       return;
//     }

//     const formData = {
//       registerNumber,
//       semester,
//       department,
//       addHm,
//       courseID,
//       courseName,
//     };

//     try {
//       const response = await axios.post('http://localhost:3000/submitForm', formData);
//       if (response.status === 200) {
//         alert('Form submitted successfully');
//         // Clear form fields
//         setRegisterNumber('');
//         setSemester('');
//         setDepartment('');
//         setAddHm('');
//         setCourseID('');
//         setCourseName('');
//       } else {
//         alert('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Form submission failed. Please try again later.');
//     }
//   };

//   const isFormValid = registerNumber && semester && department && addHm && courseID && courseName;

//   return (
//     <div className="Full">
//       <div>Add-on/Honor/Minor</div>
//       <form onSubmit={handleSubmit} className="Default">
//         <div className="dfinside">
//           <div className="quesField">
//             <div className="titdefault">Register Number</div>
//             <Select
//               className="textField"
//               value={{ value: registerNumber, label: registerNumber }}
//               onChange={selected => setRegisterNumber(selected.value)}
//               options={registerNumbers}
//               placeholder="Select Register Number"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Semester</div>
//             <Select
//               className="textField"
//               value={{ value: semester, label: semester }}
//               onChange={selected => setSemester(selected.value)}
//               options={semesters}
//               placeholder="Select Semester"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Department</div>
//             <Select
//               className="textField"
//               value={{ value: department, label: department }}
//               onChange={selected => setDepartment(selected.value)}
//               options={departments}
//               placeholder="Select Department"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Add/H/M</div>
//             <Select
//               className="textField"
//               value={{ value: addHm, label: addHm }}
//               onChange={selected => setAddHm(selected.value)}
//               options={addHmOptions}
//               placeholder="Select Add/H/M"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Course ID</div>
//             <input
//               className="inputField"
//               type="text"
//               value={courseID}
//               onChange={e => setCourseID(e.target.value)}
//               placeholder="Enter Course ID"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Course Name</div>
//             <input
//               className="inputField"
//               type="text"
//               value={courseName}
//               onChange={e => setCourseName(e.target.value)}
//               placeholder="Enter Course Name"
//             />
//           </div>
//           <div className="inp">
//             <button type="submit" className="expCreateBtn" disabled={!isFormValid}>
//               Create
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateForm;
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

  const [registerNumbers, setRegisterNumbers] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [semesters] = useState([
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
  ]);
  const [departments] = useState([
    { value: 'CSE', label: 'CSE' },
    { value: 'ECE', label: 'ECE' },
    { value: 'MECH', label: 'MECH' },
    { value: 'CIVIL', label: 'CIVIL' },
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

    fetchRegisterNumbers();
    fetchModeOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!register_number || !semester || !department || !addHm || !courseID || !courseName) {
      alert('Please fill all the fields');
      return;
    }

    const formData = {
      register_number,
      semester,
      department,
      addHm,
      courseID,
      courseName,
    };

    try {
      const response = await axios.post('http://localhost:3000/submitForm', formData);
      if (response.status === 200) {
        alert('Form submitted successfully');
        // Clear form fields
        setRegisterNumber('');
        setSemester('');
        setDepartment('');
        setAddHm('');
        setCourseID('');
        setCourseName('');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed. Please try again later.');
    }
  };

  const isFormValid = register_number && semester && department && addHm && courseID && courseName;

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
              onChange={selected => setRegisterNumber(selected.value)}
              options={registerNumbers}
              placeholder="Select Register Number"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Semester</div>
            <Select
              className="textField"
              value={semesters.find(option => option.value === semester)}
              onChange={selected => setSemester(selected.value)}
              options={semesters}
              placeholder="Select Semester"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Department</div>
            <Select
              className="textField"
              value={departments.find(option => option.value === department)}
              onChange={selected => setDepartment(selected.value)}
              options={departments}
              placeholder="Select Department"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Add/Honor/Minor</div>
            <Select
              className="textField"
              value={modeOptions.find(option => option.value === addHm)}
              onChange={selected => setAddHm(selected.value)}
              options={modeOptions}
              placeholder="Select Add/H/M"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Course ID</div>
            <input
              className="inputField"
              type="text"
              value={courseID}
              onChange={e => setCourseID(e.target.value)}
              placeholder="Enter Course ID"
            />
          </div>
          <div className="quesField">
            <div className="titdefault">Course Name</div>
            <input
              className="inputField"
              type="text"
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              placeholder="Enter Course Name"
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
