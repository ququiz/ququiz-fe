"use client";

import { cn } from "@/lib/utils";
import { Settings, Trash2 } from "lucide-react";
import { Session } from "next-auth";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/input";
import { quizSettingsSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { deleteQuiz, updateQuiz } from "@/lib/quiz-service";
import { revalidatePathServer } from "@/lib/server-utils";
import { useRouter } from "next/navigation";

type ActionButtonsProps = {
  session: Session;
  quiz: Quiz;
};

const ActionButtons = ({ session, quiz }: ActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const quizSettingsDefault = {
    title: quiz.name,
    start_time: quiz.start_time.slice(0, quiz.start_time.length - 1),
    end_time: quiz.end_time.slice(0, quiz.end_time.length - 1),
  };

  const addForm = useForm<z.infer<typeof quizSettingsSchema>>({
    resolver: zodResolver(quizSettingsSchema),
    defaultValues: quizSettingsDefault,
  });

  async function onAddSubmit(values: z.infer<typeof quizSettingsSchema>) {
    startTransition(async () => {
      const data = await updateQuiz(values, quiz.id, session.accessToken);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success("Settings updated successfully");
        await revalidatePathServer(`/dashboard/quiz/${quiz.id}/edit`);
      }
    });
  }

  const handleDeleteQuiz = async () => {
    startTransition(async () => {
      const data = await deleteQuiz(quiz.id, session.accessToken);
      if ("error" in data) {
        toast.error(data.error);
      } else {
        toast.success("Quiz deleted successfully");
        router.replace("/dashboard/quiz");
      }
    });
  };

  return (
    <>
      {/* Settings button */}
      <Dialog open={openSettings} onOpenChange={setOpenSettings}>
        <DialogTrigger asChild>
          <Settings
            className={cn(
              `cursor-pointer`,
              loading && "opacity-75 cursor-default animate-bounce"
            )}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz settings</DialogTitle>
            <DialogDescription>The settings, yey...</DialogDescription>
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
                label="Start Date and Time"
                name="start_time"
                type="datetime-local"
              />
              <FormInput
                label="End Date and Time"
                name="end_time"
                type="datetime-local"
              />
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Change settings"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Upload button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Trash2
            className={cn(
              `cursor-pointer`,
              loading && "opacity-75 cursor-default animate-bounce"
            )}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quiz?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <Button
              disabled={loading}
              variant={"destructive"}
              onClick={handleDeleteQuiz}
            >
              Delete
            </Button>
            <Button onClick={() => setOpen((val) => !val)} variant={"ghost"}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ActionButtons;
