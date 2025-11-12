import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authUser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4 '>
        <Link to='/'>
          <img src='/netflix-logo.png' className='w-52' alt='logo' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-16 mx-3 '>
        <div className='w-full max-w-md p-6 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-white text-center text-2xl font-bold mb-4'>
            Sign Up
          </h1>

          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label
                htmlFor='email'
                className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input
                type='email'
                className='w-full px-3 py-2 mt-1  border-gray-700 rounded-md text-white bg-transparent focus:outline-none focus:ring'
                placeholder='you@example.com'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input
                type='password'
                className='w-full px-3 py-2 mt-1  border-gray-700 rounded-md text-white bg-transparent focus:outline-none focus:ring'
                placeholder='**********'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>
              Login
            </button>
          </form>

          <div className='text-center text-gray-400  '>
            Don't have an account?{' '}
            <Link to='/signup' className='text-red-500  hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
