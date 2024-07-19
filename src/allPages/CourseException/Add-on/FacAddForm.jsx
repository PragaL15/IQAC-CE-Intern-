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
      register_number,
      semester,
      department,
      addHm,
      courseID,
      courseName,
      electiveId,
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
        setElectiveId('');
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed. Please try again later.');
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
          <div className="quesField">
            <div className="titdefault">Elective Name</div>
            <Select
              className="textField"
              value={electiveOptions.find(option => option.value === electiveId)}
              onChange={selected => setElectiveId(selected.value)}
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

// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import axios from 'axios';
// import '../styles/Internship.css';

// const FacAddForm = () => {
//   // State variables
//   const [register_number, setRegisterNumber] = useState('');
//   const [semester, setSemester] = useState('');
//   const [department, setDepartment] = useState('');
//   const [addHm, setAddHm] = useState('');
//   const [courseID, setCourseID] = useState('');
//   const [courseName, setCourseName] = useState('');
//   const [electiveId, setElectiveId] = useState('');
//   const [registerNumbers, setRegisterNumbers] = useState([]);
//   const [electiveNames, setElectiveNames] = useState([]);
//   const [modeOptions, setModeOptions] = useState([]);
//   const [semesters] = useState([
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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [registerNumbersRes, electiveNamesRes, modeOptionsRes] = await Promise.all([
//           axios.get('http://localhost:3000/registerNumbers'),
//           axios.get('http://localhost:3000/electiveNames'),
//           axios.get('http://localhost:3000/modeOptions')
//         ]);

//         setRegisterNumbers(registerNumbersRes.data);
//         setElectiveNames(electiveNamesRes.data);
//         setModeOptions(modeOptionsRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Failed to fetch data. Please try again later.');
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!isFormValid()) {
//       alert('Please fill all the fields');
//       return;
//     }

//     const formData = {
//       register_number,
//       semester,
//       department,
//       addHm,
//       courseID,
//       courseName,
//       electiveId
//     };

//     try {
//       const response = await axios.post('http://localhost:3000/submitForm', formData);
//       if (response.status === 200) {
//         alert('Form submitted successfully');
//         resetForm();
//       } else {
//         alert('Form submission failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Form submission failed. Please check the console for details.');
//     }
//   };

//   const isFormValid = () => {
//     return register_number && semester && department && addHm && courseID && courseName && electiveId;
//   };

//   const resetForm = () => {
//     setRegisterNumber('');
//     setSemester('');
//     setDepartment('');
//     setAddHm('');
//     setCourseID('');
//     setCourseName('');
//     setElectiveId('');
//   };

//   return (
//     <div className="Full">
//       <div className="titledfault">
//         <h4>Add/Honor/Minor Details</h4>
//       </div>
//       <form onSubmit={handleSubmit} className="Default">
//         <div className="dfinside">
//           <div className="quesField">
//             <div className="titdefault">Register Number</div>
//             <Select
//               className="textField"
//               value={registerNumbers.find(option => option.value === register_number)}
//               onChange={selected => setRegisterNumber(selected ? selected.value : '')}
//               options={registerNumbers}
//               placeholder="Select Register Number"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Semester</div>
//             <Select
//               className="textField"
//               value={semesters.find(option => option.value === semester)}
//               onChange={selected => setSemester(selected ? selected.value : '')}
//               options={semesters}
//               placeholder="Select Semester"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Department</div>
//             <Select
//               className="textField"
//               value={departments.find(option => option.value === department)}
//               onChange={selected => setDepartment(selected ? selected.value : '')}
//               options={departments}
//               placeholder="Select Department"
//             />
//           </div>
//           <div className="quesField">
//             <div className="titdefault">Add/Honor/Minor</div>
//             <Select
//               className="textField"
//               value={modeOptions.find(option => option.value === addHm)}
//               onChange={selected => setAddHm(selected ? selected.value : '')}
//               options={modeOptions}
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
//           <div className="quesField">
//             <div className="titdefault">Elective Name</div>
//             <Select
//               className="textField"
//               value={electiveNames.find(option => option.value === electiveId)}
//               onChange={selected => setElectiveId(selected ? selected.value : '')}
//               options={electiveNames}
//               placeholder="Select Elective"
//             />
//           </div>
//         </div>
//         <div className="submitDefault">
//           <button className="btnsubmit" type="submit" disabled={!isFormValid()}>CREATE</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FacAddForm;
