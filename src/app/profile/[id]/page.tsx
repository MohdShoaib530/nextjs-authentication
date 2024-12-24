"use client";
import { useParams } from "next/navigation";
import React from "react";

function ProfileId() {
  const {id} = useParams();
  return <div className="flex flex-row items-center justify-center w-full h-screen">ProfileId : {id}</div>;
}

export default ProfileId;
