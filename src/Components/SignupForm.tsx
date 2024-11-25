import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from '@mui/material'; 
import styles from "../styles/Auth.module.css"

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<SignupFormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupFormValues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: Partial<SignupFormValues> = {};

    if (formValues.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email";
    }
    if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent submit if validation fails
    }

    setIsLoading(true);
    // Prepare the payload
    const { username, email, password } = formValues;
    const payload = { username, email, password };

    // Simulated API call
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show success message or redirect
        const data = await response.json();
        console.log("Registration successful", data);
        navigate("/login");
      } else if (response.status === 409) {
        const data = await response.json();
        setErrors({ username: data.message });
      } else {
        throw new Error("Something went wrong during signup");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        username: "Something went wrong, please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <div className={styles.authContainer}>
    <div className={styles.formItself}>
    <h2>Sign up for an account</h2>
    
<form onSubmit={handleSubmit}>
    <Stack spacing={2} width="300px">
      <TextField
        label="Username"
        name="username"
        value={formValues.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        fullWidth
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign Up'} {/* Conditional button text */}
      </Button>
    </Stack>
  </form>
  </div>
  </div>
</>
  );
};

export default SignupForm;
