import { connectDB } from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel.js';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, email } = reqBody;
    console.log('reqBody', email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User does not exists' },
        {
          status: 500
        }
      );
    }
    console.log('user', user);
    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        { message: 'password does not match' },
        {
          status: 500
        }
      );
    }
    const tokenOptions = {
      id: user._id,
      email
    };
    const token = await jwt.sign(tokenOptions, process.env.TOKEN_SECRET!, {
      expiresIn: '1h'
    });
    const response = NextResponse.json({
      message: 'Login Successfull',
      success: true
    });
    response.cookies.set('token', token, { httpOnly: true, path: '/' });
    return response;
  } catch (error) {
    console.log('error', error);
  }
}
