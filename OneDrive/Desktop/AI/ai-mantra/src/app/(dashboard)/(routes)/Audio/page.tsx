"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required",
  }),
});

const VideoComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setVideoUrl(data.url);
    } catch (error) {
      console.error(
        'Error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearVideo = () => {
    setVideoUrl(null);
    localStorage.removeItem('videoUrl');
  };

  const downloadVideo = () => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = 'video.mp4'; // Customize the file name
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg px-4 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Text to Video</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Enter text to convert to video
            </label>
            <input
              id="text"
              type="text"
              {...form.register('text')}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled={isLoading}
            />
            {form.formState.errors.text && (
              <p className="mt-2 text-sm text-red-600">
                {form.formState.errors.text.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Video'}
          </button>
        </form>
        {videoUrl && (
          <div className="mt-4">
            <video controls src={videoUrl} className="w-full" />
            <div className="mt-2 flex justify-between">
              <button
                onClick={clearVideo}
                className="text-blue-600 hover:underline"
              >
                Clear
              </button>
              <button
                onClick={downloadVideo}
                className="text-blue-600 hover:underline"
              >
                Download Video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
