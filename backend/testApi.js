import axios from 'axios';

const testLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Success!', res.data);
  } catch (err) {
    console.log('Error:', err.response ? err.response.data : err.message);
  }
};

testLogin();
