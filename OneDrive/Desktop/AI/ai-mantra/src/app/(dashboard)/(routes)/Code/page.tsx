"use client"
import { Discuss } from "react-loader-spinner";
import React, { useState, useEffect } from 'react';
import { Heading } from '@/components/Heading';
import { Code } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formSchema } from '../../../../../schemas/formSchema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const CodeGenerationPage = () => {
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
    if (responseText) {
      localStorage.setItem('responseText', responseText);
    }
  }, [responseText]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/code', {
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

  const copyToClipboard = () => {
    if (responseText) {
      navigator.clipboard.writeText(responseText);
      alert('Response copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl px-4 lg:px-8 mt-8">
        <div className='flex justify-center items-center'>
          <Heading
            title="Code Generation"
            description="Generate code snippets based on the input prompt."
            icon={Code}
            iconColour="text-green-500"
            bgColour="bg-green-100"
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white'
          >
            <FormField name="prompt" render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    placeholder='Enter your prompt'
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
          <div className='mt-4 p-4 border rounded-lg flex justify-center items-center bg-white'>
            <Discuss visible={true} />
          </div>
        )}
        {responseText && (
          <div className="mt-4 p-4 border rounded-lg w-full max-w-2xl bg-black text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Response:</h2>
              <div className="flex">
                <button
                  onClick={clearResponse}
                  className="text-sm text-blue-500 hover:underline focus:outline-none"
                >
                  Clear
                </button>
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-500 hover:underline focus:outline-none ml-4"
                >
                  Copy
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap text-left">{responseText}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGenerationPage;
