'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignIn = async () => {
    console.log('user', user);
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login', user);
      toast.success(response.data.message);
      router.push('/profile');
    } catch (error) {
      console.error(error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full items-center justify-center text-center h-screen bg-gray-800">
      <div className="border border-white rounded-xl flex flex-col p-7 hover:shadow-lg gap-4 justify-center">
        <h1 className="text-3xl">{loading ? 'Processing' : 'SignIn'}</h1>
        <hr />
        <div className="flex-row gap-2 flex items-center justify-center">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={user.email}
            placeholder="email"
            className="bg-gray-900 px-2 py-1 rounded-lg"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex-row gap-2 flex items-center justify-center">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={user.password}
            placeholder="password"
            className="bg-gray-900 px-2 py-1 rounded-lg"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary btn-outline"
          onClick={onSignIn}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? 'No Signin' : 'Signin'}
        </button>
      </div>
    </div>
  );
}

export default Signup;
