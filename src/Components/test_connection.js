import { BACKEND_URL } from '../constants';

const testConnection = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/endpoint`);
    if (response.ok) {
      console.log('Connection successful');
    } else {
      console.log('Connection failed');
    }
  } catch (error) {
    console.log('Connection failed:', error);
  }
};

testConnection();
