'use client'

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CardContent } from '@/components/ui/card';
import { useForm } from "react-hook-form"
import { QuizCreationSchema } from "@/schemas/form/quiz";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { Mutation, useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from 'next/server';
import { Island_Moments } from "next/font/google";
import LoadingQuestion from "./LoadingQuestion";
import { useToast } from "./ui/use-toast";
type Props = {
    topic: string;
  };
  
  type Input = z.infer<typeof QuizCreationSchema>;
  
  const QuizCreation = ({ topic: topicParam }: Props) => {
    const router = useRouter();
    const [showLoader, setShowLoader] = React.useState(false);
    const [finishedLoading, setFinishedLoading] = React.useState(false);
    const { toast } = useToast();
    const { mutate: getQuestions, isLoading } = useMutation({
      mutationFn: async ({ amount, topic, type }: Input) => {
        const response = await axios.post("/api/game", { amount, topic, type });
        return response.data;
      },
    });
  
    const form = useForm<Input>({
      resolver: zodResolver(QuizCreationSchema),
      defaultValues: {
        topic: topicParam,
        type: "mcq",
        amount: 3,
      },
    });
  
    const onSubmit = async (data: Input) => {
      setShowLoader(true);
      getQuestions(data, {
        onError: (error) => {
          setShowLoader(false);
          if (error instanceof AxiosError) {
            if (error.response?.status === 500) {
              toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
              });
            }
          }
        },
        onSuccess: ({ gameId }: { gameId: string }) => {
          setFinishedLoading(true);
          setTimeout(() => {
            if (form.getValues("type") === "mcq") {
              router.push(`/play/mcq/${gameId}`);
            } else if (form.getValues("type") === "open_ended") {
              router.push(`/play/open-ended/${gameId}`);
            }
          }, 2000);
        },
      });
    };
    form.watch();
  
    if (showLoader) {
      return <LoadingQuestion finished={finishedLoading} />;
    }
  
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">انشاء الاختبار</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a topic" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please provide any topic you would like to be quizzed on
                        here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الاسألة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="How many questions?"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            form.setValue("amount", parseInt(e.target.value));
                          }}
                          min={1}
                          max={10}
                        />
                      </FormControl>
                      <FormDescription>
                        You can choose how many questions you would like to be
                        quizzed on here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <div className="flex justify-between">
                  <Button
                    variant={
                      form.getValues("type") === "mcq" ? "default" : "secondary"
                    }
                    className="w-1/2 rounded-none rounded-l-lg"
                    onClick={() => {
                      form.setValue("type", "mcq");
                    }}
                    type="button"
                  >
                    <CopyCheck className="w-4 h-4 mr-2" /> خيار متعدد
                  </Button>
                  <Separator orientation="vertical" />
                  <Button
                    variant={
                      form.getValues("type") === "open_ended"
                        ? "default"
                        : "secondary"
                    }
                    className="w-1/2 rounded-none rounded-r-lg"
                    onClick={() => form.setValue("type", "open_ended")}
                    type="button"
                  >
                    <BookOpen className="w-4 h-4 mr-2 " />اسألة
                  </Button>
                </div>
                <Button  disabled={isLoading} type="submit">
                  انشاء
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
export default QuizCreation