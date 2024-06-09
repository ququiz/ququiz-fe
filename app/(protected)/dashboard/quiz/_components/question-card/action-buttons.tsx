"use client";

import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { updateQuiz } from "@/lib/quiz-service";
import { Session } from "next-auth";
import { toast } from "sonner";
import { revalidatePathServer } from "@/lib/server-utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newMultipleQuestionSchema } from "@/schema";
import FormInput from "@/components/form/input";
import { Form } from "@/components/ui/form";

type ActionButtonsProps = {
  allQuestions: Question[];
  question: Question;
  quiz: Quiz;
  session: Session;
};

const ActionButtons = ({
  allQuestions,
  question,
  quiz,
  session,
}: ActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, startTransition] = useTransition();

  const handleDeleteQuestion = async () => {
    startTransition(async () => {
      const newQuestions = allQuestions.filter(
        (q) => q.question !== question.question
      );

      const data = await updateQuiz(
        { questions: newQuestions },
        quiz.id,
        session.accessToken
      );

      if ("error" in data) {
        toast.error("Failed to delete question: " + data.error);
        return;
      } else {
        toast.success("Question deleted successfully");
        await revalidatePathServer(`/dashboard/quiz/${quiz.id}/edit`);
        setOpen(!open);
      }
    });
  };

  const quizDetailsDefault = {
    question: question.question,
    choices: question.choices!.map((c) => c.text) as any,
    weight: question.weight,
    type: "MULTIPLE" as "MULTIPLE",
    answer: question.choices!.findIndex((c) => c.is_correct) + 1,
  };

  const addForm = useForm<z.infer<typeof newMultipleQuestionSchema>>({
    resolver: zodResolver(newMultipleQuestionSchema),
    defaultValues: quizDetailsDefault,
  });

  async function onAddSubmit(
    values: z.infer<typeof newMultipleQuestionSchema>
  ) {
    startTransition(async () => {
      let newQuestions: Question[] = allQuestions.map((q) => {
        if (q.question === question.question) {
          return values;
        }
        return q;
      });

      const data = await updateQuiz(
        { questions: newQuestions },
        quiz.id,
        session.accessToken
      );

      if ("error" in data) {
        toast.error("Failed to update question: " + data.error);
        return;
      } else {
        toast.success("Question updated successfully");
        await revalidatePathServer(`/dashboard/quiz/${quiz.id}/edit`);
        setOpenEdit(!openEdit);
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Trash2 className="w-5 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <Button
              disabled={loading}
              variant={"destructive"}
              onClick={handleDeleteQuestion}
            >
              Delete
            </Button>
            <Button onClick={() => setOpen((val) => !val)} variant={"ghost"}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger>
          <Edit className="w-5 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>
              Fill in the form to edit the question.
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
              <FormInput
                label="Question weight"
                name="weight"
                placeholder="Question weight"
                type="number"
              />
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
              <FormInput label="Answer" name="answer" placeholder="Answer" />
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Update question"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ActionButtons;
