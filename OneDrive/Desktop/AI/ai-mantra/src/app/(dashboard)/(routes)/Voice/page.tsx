"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/Heading';
import { MessageCircle } from 'lucide-react';

const Voice = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await fetch('/api/auth/voice?upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const fileId = data.fileId;

      const noiseRemovalResponse = await fetch('/api/auth/voice?remove-noise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId }),
      });

      if (noiseRemovalResponse.ok) {
        const noiseData = await noiseRemovalResponse.json();
        setJobId(noiseData.jobId);
      } else {
        console.error('Noise removal failed');
      }
    } else {
      console.error('Upload failed');
    }

    setIsLoading(false);
  };

  const checkStatus = async () => {
    if (!jobId) return;

    const response = await fetch(`/api/auth/voice?status&jobId=${jobId}`);

    if (response.ok) {
      const data = await response.json();
      if (data.state === 'succeeded') {
        setDownloadLink(data.downloadPath);
      } else {
        console.log('Job status:', data.state);
      }
    } else {
      console.error('Status check failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Heading
        title="Voice Processing"
        description="Upload and process your voice files with Audo"
        icon={MessageCircle}
        iconColour="text-blue-500"
        bgColour="bg-blue-100"
      />
      <div className="w-full max-w-lg px-4 lg:px-8">
        <div className="mb-4">
          <Input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between mb-4">
          <Button onClick={handleUpload} disabled={!file || isLoading}>
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
          {jobId && (
            <Button onClick={checkStatus} disabled={isLoading}>
              Check Status
            </Button>
          )}
        </div>
        {downloadLink && (
          <a href={downloadLink} download className="text-blue-500 hover:underline">
            <Button>Download Processed File</Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Voice;
