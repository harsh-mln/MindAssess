import axios from 'axios';

const testStart = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/assessment/start');
    console.log('Success:', res.data);
  } catch (err) {
    if (err.response) {
      console.log('Error Data:', err.response.data);
      console.log('Status:', err.response.status);
    } else {
      console.log('Request Error:', err.message);
    }
  }
};

testStart();
