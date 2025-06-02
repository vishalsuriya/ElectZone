import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const Passwordreset = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!password || !confirmPassword) {
      setMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (userId && token) {
      try {
        const response = await fetch(
          `https://electzone-server.onrender.com/api/users/updatepassword/${userId}/${token}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMessage('Password reset successful!');
          setTimeout(() => navigate('/UserLogin'), 2000);
        } else {
          setMessage(data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        setMessage('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">Reset Password</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={Passwordreset}>
        <div className="mb-3 position-relative">
          <label className="form-label">New Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span
              className="input-group-text"
              style={{ cursor: 'pointer' }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </span>
          </div>
        </div>
        <div className="mb-3 position-relative">
          <label className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <span
              className="input-group-text"
              style={{ cursor: 'pointer' }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
};
