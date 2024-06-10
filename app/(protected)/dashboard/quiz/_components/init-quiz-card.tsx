"use client";

import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/input";
import { initQuizSchema } from "@/schema";
import FormRadio from "@/components/form/radio";
import { getDefaults } from "@/lib/utils";
import { createQuiz } from "@/lib/quiz-service";
import { useRouter } from "next/navigation";
import { revalidatePathServer } from "@/lib/server-utils";

type InitQuizCardProps = {
  session: Session;
};

const InitQuizCard = ({ session }: InitQuizCardProps) => {
  const [questionType, setQuestionType] = useState<
    "multiple" | "images" | "fill"
  >("multiple");

  const [loading, startAddTransition] = useTransition();
  const router = useRouter();

  const addForm = useForm<z.infer<typeof initQuizSchema>>({
    resolver: zodResolver(initQuizSchema),
    defaultValues: getDefaults(initQuizSchema),
  });

  async function onAddSubmit(values: z.infer<typeof initQuizSchema>) {
    startAddTransition(async () => {
      const data = await createQuiz(values, session.accessToken);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success("Quiz created successfully");
        addForm.reset(getDefaults(initQuizSchema));
        if (data.data) {
          revalidatePathServer("/dashboard/quiz", "page");
          revalidatePathServer("/dashboard");
          router.push(`/dashboard/quiz/${data.data.created_quiz.id}/edit`);
        }
      }
    });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-secondary hover:bg-secondary/80 cursor-pointer h-60 flex items-center justify-center rounded-md shadow-md p-6">
            <div className="flex flex-col space-y-2 items-center">
              <CirclePlus className="w-24 h-24" strokeWidth={0.5} />
              <p>Create a new quiz</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create a new quiz</DialogTitle>
            <DialogDescription>
              Fill in the following form to create a new quiz with the first
              question
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormInput
                label="Quiz name"
                name="title"
                placeholder="Quiz name"
              />
              <FormInput
                label="Start time"
                name="start_time"
                type="datetime-local"
              />
              <FormInput
                label="End time"
                name="end_time"
                type="datetime-local"
              />
              <FormInput
                label="Question"
                name="questions[0].question"
                placeholder="Question"
              />
              <FormRadio
                label="Question type"
                name="questions[0].type"
                items={[
                  { value: "MULTIPLE", label: "Multiple choice" },
                  { value: "ESSAY", label: "Multiple choice (with images)" },
                ]}
              />
              <FormInput
                label="Question weight"
                name="questions[0].weight"
                placeholder="Question weight"
                type="number"
              />
              {questionType === "multiple" && (
                <>
                  <FormInput
                    label="Choice 1"
                    name="questions[0].choices[0]"
                    placeholder="Choice 1"
                  />
                  <FormInput
                    label="Choice 2"
                    name="questions[0].choices[1]"
                    placeholder="Choice 2"
                  />
                  <FormInput
                    label="Choice 3"
                    name="questions[0].choices[2]"
                    placeholder="Choice 3"
                  />
                  <FormInput
                    label="Choice 4"
                    name="questions[0].choices[3]"
                    placeholder="Choice 4"
                  />
                  <FormInput
                    label="Answer (1-4)"
                    name="questions[0].answer"
                    placeholder="Answer"
                    type="number"
                  />
                </>
              )}
              {questionType === "fill" && (
                <>
                  <FormInput
                    label="Answer"
                    name="questions[0].answer"
                    placeholder="Answer"
                  />
                </>
              )}
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Initialize quiz"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default InitQuizCard;
