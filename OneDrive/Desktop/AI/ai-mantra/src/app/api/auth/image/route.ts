import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const apiKey = process.env.NEXT_PUBLIC_MONSTER_API_KEY;
    const apiUrl = `https://api.monsterapi.ai/v1/generate/txt2img`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        aspect_ratio: 'portrait',
        guidance_scale: '12.5',
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
