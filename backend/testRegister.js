import axios from 'axios';

const testRegister = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'New Test User',
      email: 'newuser123@example.com',
      password: 'newpassword123',
      role: 'patient'
    });
    console.log('Success!', res.data);
  } catch (err) {
    console.log('Error:', err.response ? err.response.data : err.message);
  }
};

testRegister();
