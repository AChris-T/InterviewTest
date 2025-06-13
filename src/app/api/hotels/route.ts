import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://sandbox.thetravelhunters.com/hotel/hotels/', {
      headers: {
        'Content-Type': 'application/json',
        // Add any required API keys or authentication headers here
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
} 