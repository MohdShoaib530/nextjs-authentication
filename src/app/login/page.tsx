'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/router';

function Signup() {
  // const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const onSignIn = async () => {
    console.log('user', user);
    setLoading(true);
    try {
      console.log('hi');
      const response = await axios.post('/api/users/login', user);
      toast.success(response.data.message);
      // router.push('/')
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className='flex flex-col w-full items-center justify-center text-center h-screen bg-gray-800'>
      <div className='border border-white rounded-xl flex flex-col p-7 hover:shadow-lg gap-4 justify-center'>
        <h1 className='text-3xl'>{loading ? 'Processing' : 'SignIn'}</h1>
        <hr />
        
        <div className='flex-row gap-2 flex items-center justify-center'>
          <label htmlFor='email'>email:</label>
          <input
            type='text'
            id='email'
            value={user.email}
            placeholder='email'
            className='bg-gray-900 px-2 py-1 rounded-lg'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className='flex-row gap-2 flex items-center justify-center'>
          <label htmlFor='password'>password:</label>
          <input
            type='password'
            id='password'
            value={user.password}
            placeholder='password'
            className='bg-gray-900 px-2 py-1 rounded-lg'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button className='btn btn-primary btn-outline' onClick={onSignIn}>{buttonDisabled ? 'No Signin' : 'Signin'}</button>
      </div>
    </div>
  );
}

export default Signup;
