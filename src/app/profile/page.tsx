"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState('nothing');
  const logout = async () =>{
    const res = await axios.post('/api/auth/logout');
  }
  const userDetails = async () => {
    const res =  await axios.get('/api/users/me',)
    console.log('data',res.data);
    setData(res.data.data._id);
  }
  return <div className="flex flex-col gap-2 items-center justify-center w-full h-screen">
    <h1>Profile</h1>
    <hr />
    <p>profile page</p>
    <h2>{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
    <button
    onClick={logout}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    <button
    onClick={userDetails}
    className="btn btn-primary text-white font-bold py-2 px-4 rounded">getUserDetails</button>
  </div>;
  
}

export default Profile;
