import React, { useState, useContext } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import { Link, } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';


export default function login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ status: null, message: '' });
  const authContext = useContext(AuthContext);

  const { getToken } = authContext;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);

    const res = await getToken(formData);
    console.log(res);

    setAlert(res);

    if (res.status === true) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }

    setTimeout(() => {
      setAlert({ status: null, message: '' });
    }, 3000);
  };


  return (
    <>
      {alert.status != null && (
        <AlertMessage
          status={alert.status}
          message={alert.message}
          onClose={() => setAlert({ status: null, message: '' })}
        />
      )}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Note Application</h1>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

