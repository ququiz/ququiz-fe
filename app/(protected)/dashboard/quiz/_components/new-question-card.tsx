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
import { revalidatePathServer } from "@/lib/server-utils";
import { toast } from "sonner";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/input";
import { newMultipleQuestionSchema } from "@/schema";
import FormRadio from "@/components/form/radio";
import { getDefaults } from "@/lib/utils";
import { updateQuiz } from "@/lib/quiz-service";

type NewQuestionCardProps = {
  session: Session;
  quiz: Quiz;
};

// TODO: Question dari backend masih belum sesuai
const NewQuestionCard = ({ session, quiz }: NewQuestionCardProps) => {
  const [open, setOpen] = useState(false);

  const [questionType, setQuestionType] = useState<
    "multiple" | "images" | "fill"
  >("multiple");

  const [loading, startAddTransition] = useTransition();

  const addForm = useForm<z.infer<typeof newMultipleQuestionSchema>>({
    resolver: zodResolver(newMultipleQuestionSchema),
    defaultValues: getDefaults(newMultipleQuestionSchema),
  });

  async function onAddSubmit(
    values: z.infer<typeof newMultipleQuestionSchema>
  ) {
    startAddTransition(async () => {
      const updatedQuiz = {
        title: quiz.name,
        start_time: quiz.start_time,
        end_time: quiz.end_time,
        questions: [...quiz.questions, values],
      };

      const data = await updateQuiz(updatedQuiz, quiz.id, session.accessToken);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success("New question created successfully");
        await revalidatePathServer(`/dashboard/quiz/${quiz.id}/edit`);
        addForm.reset(getDefaults(newMultipleQuestionSchema));
        setOpen(!open);
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="bg-secondary hover:bg-secondary/80 cursor-pointer h-60 flex items-center justify-center rounded-md shadow-md p-6">
            <div className="flex flex-col space-y-2 items-center">
              <CirclePlus className="w-24 h-24" strokeWidth={0.5} />
              <p>Add a new question</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create a new question</DialogTitle>
            <DialogDescription>
              Fill in the following form to create a new question
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormInput
                label="Question"
                name="question"
                placeholder="Question"
              />
              <FormRadio
                label="Question type"
                name="type"
                items={[
                  { value: "MULTIPLE", label: "Multiple choice" },
                  { value: "ESSAY", label: "Fill in the blank" },
                ]}
              />
              <FormInput
                label="Question weight"
                name="weight"
                placeholder="Question weight"
                type="number"
              />
              {questionType === "multiple" && (
                <>
                  <FormInput
                    label="Choice 1"
                    name="choices[0]"
                    placeholder="Choice 1"
                  />
                  <FormInput
                    label="Choice 2"
                    name="choices[1]"
                    placeholder="Choice 2"
                  />
                  <FormInput
                    label="Choice 3"
                    name="choices[2]"
                    placeholder="Choice 3"
                  />
                  <FormInput
                    label="Choice 4"
                    name="choices[3]"
                    placeholder="Choice 4"
                  />
                  <FormInput
                    label="Answer"
                    name="answer"
                    placeholder="Answer"
                  />
                </>
              )}
              {questionType === "fill" && (
                <>
                  <FormInput
                    label="Answer"
                    name="answer"
                    placeholder="Answer"
                  />
                </>
              )}
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Create question"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default NewQuestionCard;
