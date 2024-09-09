import { useState } from 'react';
import axios from 'axios';
import useInfoStore from '../Zustand/useInfoStore'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuthStatus = useInfoStore((state) => state.authStatus); // Function to set authStatus
  const navigate = useNavigate();

  const performLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the backend logout API
      await axios.post('/api/v1/tech/logoutTech');

      // Set auth status to false in Zustand
      setAuthStatus(false);

      // Redirect to the homepage (or any desired route)
      navigate('/');

      setIsLoading(false);
      return true; // Logout successful
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred during logout');
      return false; // Logout failed
    }
  };

  return { performLogout, isLoading, error };
};

export default useLogout;
