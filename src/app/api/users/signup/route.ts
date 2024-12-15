import { connectDB } from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel.js';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log('reqBody', username, email, password);
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        {
          status: 400
        }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    console.log('salt', salt);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log('hashedPassword', hashedPassword);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    console.log('user', user);
    await user.save();
    user.password = undefined;
    return NextResponse.json(
      { message: 'User created', user },
      { status: 201 }
    );
  } catch (error) {
    console.log('error', error);
  }
}
