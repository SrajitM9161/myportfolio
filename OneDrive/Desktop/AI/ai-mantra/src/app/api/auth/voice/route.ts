import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const handleUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('File parse error:', err);
      return res.status(500).json({ error: 'File upload error' });
    }

    const uploadedFiles = files.file;
    if (!uploadedFiles) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = Array.isArray(uploadedFiles) ? uploadedFiles[0] : (uploadedFiles as FormidableFile);

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.filepath;
    const fileName = file.originalFilename || 'file.wav';  // Provide a default filename if necessary

    try {
      const apiKey = process.env.AUDO_API_KEY;
      const apiUrl = 'https://api.audo.ai/v1/upload';

      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath), { filename: fileName });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey || '',
          ...formData.getHeaders(),
        },
        body: formData as any,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(500).json({ error: `Upload failed: ${errorData.detail}` });
      }

      const data = await response.json();
      res.status(200).json({ fileId: data.fileId });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

const handleRemoveNoise = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileId, noiseReductionAmount = 100 } = req.body;

  try {
    const apiKey = process.env.AUDO_API_KEY;
    const apiUrl = 'https://api.audo.ai/v1/remove-noise';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey || '',
      },
      body: JSON.stringify({
        input: fileId,
        noiseReductionAmount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: `Noise removal failed: ${errorData.detail}` });
    }

    const data = await response.json();
    res.status(200).json({ jobId: data.jobId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleCheckStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { jobId } = req.query;

  try {
    const apiKey = process.env.AUDO_API_KEY;
    const apiUrl = `https://api.audo.ai/v1/remove-noise/${jobId}/status`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey || '',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: `Status check failed: ${errorData.detail}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      if (req.url?.includes('upload')) {
        return handleUpload(req, res);
      } else if (req.url?.includes('remove-noise')) {
        return handleRemoveNoise(req, res);
      }
      break;
    case 'GET':
      if (req.url?.includes('status')) {
        return handleCheckStatus(req, res);
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
