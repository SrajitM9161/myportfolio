"use client"
import { Discuss } from "react-loader-spinner";
import React, { useState, useEffect } from 'react';
import { Heading } from '@/components/Heading';
import { MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formSchema } from '../../../../../schemas/formSchema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const Conversation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [responseText, setResponseText] = useState<string | null>(
    localStorage.getItem('responseText') || null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Save responseText to localStorage whenever it changes
    if (responseText) {
      localStorage.setItem('responseText', responseText);
    }
  }, [responseText]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/conversation', {
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
      const textContent = data.candidates[0]?.content.parts[0]?.text || '';
      setResponseText(textContent.trim());
      console.log(data);
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

  const clearResponse = () => {
    setResponseText(null);
    localStorage.removeItem('responseText');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg px-4 lg:px-8">
        <div className='flex justify-center items-center'>
          <Heading
            title="Conversation Title"
            description="This is a description for the conversation."
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
            <FormField name="prompt" render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    placeholder='How are you???'
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
        {responseText && (
          <div className="mt-4 p-4 border rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-center">Response:</h2>
              <button
                onClick={clearResponse}
                className="text-sm text-blue-500 hover:underline focus:outline-none"
              >
                Clear
              </button>
            </div>
            <p className="text-center">{responseText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;
