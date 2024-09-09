import { useState } from 'react';
import axios from 'axios';
import useInfoStore from '../Zustand/useInfoStore'; // Import your Zustand store

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuthStatus = useInfoStore((state) => state.authStatus); // Zustand function to update auth status

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/v1/tech/loginTech', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming successful login, response should return something like a token or user data
      const { data } = response;
      setIsLoading(false);

      // Set authStatus to true after successful login
      setAuthStatus(true);

      return data; // Return response data
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred during login');
      return null; // Return null on failure
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
