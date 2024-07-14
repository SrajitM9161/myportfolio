import type { NextApiRequest, NextApiResponse } from 'next';
import fetch, { HeadersInit } from 'node-fetch';

const SHOTSTACK_API_URL = 'https://api.shotstack.io/edit/stage/render';
const SHOTSTACK_API_KEY = process.env.SHOTSTACK_API_KEY;

const helloJson = (text: string) => ({
  timeline: {
    soundtrack: {
      src: "https://s3-ap-southeast-2.amazonaws.com/shotstack-assets/music/moment.mp3",
      effect: "fadeOut"
    },
    background: "#000000",
    tracks: [
      {
        clips: [
          {
            asset: {
              type: "text",
              text: text,
              font: {
                size: 32,
                align: "center",
                font: "Montserrat ExtraBold",
                color: "#FFFFFF"
              }
            },
            start: 0,
            length: 5,
            transition: {
              in: "fade",
              out: "fade"
            }
          }
        ]
      }
    ]
  },
  output: {
    format: "mp4",
    size: {
      width: 1024,
      height: 576
    }
  }
});

const createVideo = async (text: string) => {
  if (!SHOTSTACK_API_KEY) {
    throw new Error('Shotstack API key is not set');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-api-key': SHOTSTACK_API_KEY,
  };

  const response = await fetch(SHOTSTACK_API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(helloJson(text)),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

const checkRenderStatus = async (id: string) => {
  if (!SHOTSTACK_API_KEY) {
    throw new Error('Shotstack API key is not set');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-api-key': SHOTSTACK_API_KEY,
  };

  const response = await fetch(`${SHOTSTACK_API_URL}/${id}`, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { text } = req.body;
      const renderResponse = await createVideo(text);
      const renderId = renderResponse.response.id;

      let renderStatus = await checkRenderStatus(renderId);

      while (renderStatus.response.status !== 'done') {
        await new Promise(resolve => setTimeout(resolve, 5000));
        renderStatus = await checkRenderStatus(renderId);
      }

      res.status(200).json({ success: true, url: renderStatus.response.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
