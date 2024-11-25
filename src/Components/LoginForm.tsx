import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack } from '@mui/material'; // Import MUI components
import { SessionContext } from '../contexts/SessionContext'; // Adjust import path as necessary
import styles from "../styles/Auth.module.css"

// Define the shape of the form values
interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { setToken } = useContext(SessionContext)!; // Ensure that SessionContext is not undefined
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<LoginFormValues>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear errors on input change
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrors({}); // Reset errors before validation

    // Manual validation
    if (!formValues.username) {
      setErrors((prev) => ({ ...prev, username: 'Username is required' }));
      return;
    }
    if (!formValues.password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.token); // Set the token in context
        navigate("/"); // Navigate to home or dashboard
      } else {
        const errorData = await response.json();
        // Handle any server-side validation error
        setErrors({
          username: errorData.message || 'Invalid credentials',
          password: errorData.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        username: 'Login failed, please try again',
        password: 'Login failed, please try again',
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
    <div className={styles.authContainer}>
    <div className={styles.formItself}>
    <h2>Log in to your account</h2>
    <form onSubmit={handleSubmit} >
      <Stack spacing={2} width="300px"> {/* MUI Stack for spacing */}
        <TextField
          label="Username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          error={!!errors.username} // Determine if there's an error
          helperText={errors.username} // Show the error message
          fullWidth // Make it full width
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          error={!!errors.password} // Determine if there's an error
          helperText={errors.password} // Show the error message
          fullWidth // Make it full width
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </Stack>
    </form>
    </div>
    </div>
    </>
    
  );
};

export default LoginForm;