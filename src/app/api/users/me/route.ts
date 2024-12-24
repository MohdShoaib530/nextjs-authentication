import { getDataFromToken } from '@/helper/getTokenFromData';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connectDB } from '@/dbConfig/dbConfig';

connectDB();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    if (typeof userId === 'string') {
      const user = await User.findOne({ _id: userId }).select('-password');
      return NextResponse.json({
        message: 'User found',
        data: user
      });
    } else {
      console.log('Invalid user ID');
      throw new Error('Invalid user ID');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      {
        error: errorMessage
      },
      {
        status: 400
      }
    );
  }
}
