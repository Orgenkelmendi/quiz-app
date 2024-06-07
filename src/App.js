import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [steps,setSteps] = useState(1)
  const [error,setError] = useState('')
  const [data,setData] = useState({
    weight: '',
    birthdate: '',
    email: ''
  })

  function handlingSteps() {
    if (validateInput()) {
      setSteps(steps + 1)
    }
  }

  const handleSubmit = async () => {
    console.log(data)
    try {
      setSteps(steps + 1)
      const response = await axios.post('http://localhost:3000/api/data',
        { data: data },)
        response.sendStatus(200).end();
        retrieveData()
    } catch (error) {
      console.error('Error storing data:',error);
    }
  };

  const retrieveData = async () => {
    setSteps(steps + 1)
    try {
      const response = await axios.get('/api/data');
      const dataAPI = await response.data;
      setData(dataAPI);
    } catch (error) {
      console.error('Error retrieving data:',error);
    }
  };

  function validateInput() {
    if (steps === 1) {
      // Validate weight input
      if (!data.weight || isNaN(Number(data.weight))) {
        setError('Please enter a valid weight');
        return false;
      }
    }
    else if (steps === 2) {
      // Validate birthdate input
      const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!data.birthdate || !birthdateRegex.test(data.birthdate)) {
        setError('Please enter a valid birthdate (YYYY-MM-DD)');
        return false;
      }
    } else if (steps === 3) {
      // Validate email input
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRegex.test(data.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    setError('')
    return true;
  }

  useEffect(() => {
    console.log(data);
  },[data]);

  return (
    <div>
      <h1 className='text-3xl font-bold text-center m-4'> Quiz Application</h1>
      {steps === 1 &&
        <div className='question'>
          <label className='mt-4'>
            Enter your weight (lbs):
          </label>
          <input onBlur={(event) => setData((prevData) => ({ ...prevData,'weight': event.target.value }))} type="number" className='mt-4 rounded-md p-2 w-60' placeholder='E.g. 150' />
        </div>}
      {steps === 2 &&
        <div className='question'>
          <label className='mt-4'>
            Enter your birthdate (Day-Month-Year):
          </label>
          <input onBlur={(event) => setData((prevData) => ({ ...prevData,'birthdate': event.target.value }))} type="date" className='mt-4 rounded-md p-2 w-52' placeholder='E.g. 15-05-1999' />
        </div>}
      {steps === 3 &&
        <div className='question'>
          <label className='mt-4'>
            Enter your email adress:
          </label>
          <input onBlur={(event) => setData((prevData) => ({ ...prevData,'email': event.target.value }))} type="email" className='mt-4 rounded-md p-2 w-52' placeholder='E.g. johndoe@gmail.com' />
        </div>}
      {steps < 3 && <button onClick={handlingSteps} className='mt-8 bg-[#006989] text-[#F3F7EC] p-2 w-1/5 ml-[40%] rounded-md hover:bg-[#005C78]'>
        Next question
      </button>}
      {steps === 3 && <button onClick={handleSubmit} className='mt-8 bg-[#006989] text-[#F3F7EC] p-2 w-1/5 ml-[40%] rounded-md hover:bg-[#005C78]'>
        Submit
      </button>}
      {error && <p className='text-red-700 font-bold text-center mt-6'>{error}</p>}
      {steps === 4 &&
        <div>
          <h3>Submitted successfully!</h3>
          <ul>
            <li>Weight: {data.weight} lbs</li>
            <li>Birthdate: {data.birthdate}</li>
            <li>Email: {data.email}</li>
          </ul>
        </div>}
    </div>
  );
}

export default App;
