"use client";
import { Discuss } from "react-loader-spinner";
import React, { useState } from 'react';
import { Heading } from '@/components/Heading';
import { Image } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formSchema } from "../../../../../schemas/formSchema";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const ImageGeneration = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setImages([]); // Clear previous images

      const response = await fetch('https://api.monsterapi.ai/v1/generate/txt2img', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MONSTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: values.prompt,
          aspect_ratio: 'portrait',
          guidance_scale: '12.5',
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const statusUrl = data.status_url;

      // Polling for the image URL
      let isCompleted = false;
      let generatedImages = [];

      while (!isCompleted) {
        const statusResponse = await fetch(statusUrl, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MONSTER_API_KEY}`,
          }
        });
        const statusData = await statusResponse.json();

        if (statusData.status === 'COMPLETED') {
          isCompleted = true;
          generatedImages = statusData.result.output; // Assuming `output` contains an array of image URLs
        }

        // Adding a delay between status checks
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      setImages(generatedImages);
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearImages = () => {
    setImages([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg px-4 lg:px-8">
        <div className='flex justify-center items-center'>
          <Heading
            title="Image Generation"
            description="Generate images using Monster API."
            icon={Image}
            iconColour="text-blue-500"
            bgColour="bg-blue-100"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
          >
            <FormField name="prompt" render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    placeholder='Enter image description...'
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
            <Discuss visible={true} />
          </div>
        )}
        {images.length > 0 && (
          <div className="mt-4 p-4 border rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-center">Generated Images:</h2>
              <button
                onClick={clearImages}
                className="text-sm text-blue-500 hover:underline focus:outline-none"
              >
                Clear
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Generated ${index}`} className="w-full h-auto" />
                  <a href={image} download={`generated_image_${index}.png`} className="text-blue-500 hover:underline mt-2 block text-center">Download Image</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneration;
