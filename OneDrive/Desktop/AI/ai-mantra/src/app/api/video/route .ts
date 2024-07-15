import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { script } = await request.json();
    const apiKey = process.env.RAPIDAPI_KEY;
    
    if (!apiKey) {
      throw new Error('RAPIDAPI_KEY is not defined');
    }

    const apiHost = 'text-to-video.p.rapidapi.com';
    const apiUrl = `https://${apiHost}/v3/process_text_and_search_media`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script,
        dimension: '16:9',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed with status: ${response.status}, response: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
