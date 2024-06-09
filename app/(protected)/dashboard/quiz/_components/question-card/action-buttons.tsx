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

  const handleEditQuiz = async () => {
    startTransition(async () => {
      console.log("Editing quiz...");
    });
  };

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

      <Dialog>
        <DialogTrigger>
          <Edit className="w-5 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ActionButtons;
