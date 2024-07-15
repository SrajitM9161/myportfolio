"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heading } from '@/components/Heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { MessageCircle } from 'lucide-react';
const formSchema = z.object({
  script: z.string().nonempty("Script is required"),
});

const Video = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      script: "",
    },
  });

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/video', {
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
      const videoUrl = data.video_url;  // Adjust based on actual response structure
      setVideoUrl(videoUrl);
    } catch (error:any) {
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearVideo = () => {
    setVideoUrl(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg px-4 lg:px-8">
        <div className='flex justify-center items-center'>
          < Heading
            title="Text to Video Generation"
            description="Generate a video from your text script."
            icon={MessageCircle}
            iconColour="text-blue-500"
            bgColour="bg-blue-100"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
          >
            <FormField name="script" render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    placeholder='Enter your script...'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )} />
            <div className='col-span-12 lg:col-span-2 w-full flex items-center justify-center'>
              <Button disabled={isLoading}>
                Generate
              </Button>
            </div>
          </form>
        </Form>
        {isLoading && (
          <div className='mt-4 p-4 border rounded-lg flex justify-center items-center'>
            <p>Loading...</p>
          </div>
        )}
        {videoUrl && (
          <div className="mt-4 p-4 border rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-center">Generated Video:</h2>
              <button
                onClick={clearVideo}
                className="text-sm text-blue-500 hover:underline focus:outline-none"
              >
                Clear
              </button>
            </div>
            <video src={videoUrl} controls className="w-full" />
            <a href={videoUrl} download className="block mt-2 text-center text-blue-500 hover:underline">
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
