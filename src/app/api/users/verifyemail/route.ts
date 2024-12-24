import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest){
  try {
    const reqbody = await request.json();
    const {token} = reqbody;
    console.log('token',token);
  } catch (error: unknown) {
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
     return NextResponse.json({error: errorMessage},
      {status: 500}
     )
  }
}