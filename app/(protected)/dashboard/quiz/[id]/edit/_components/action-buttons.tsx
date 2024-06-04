"use client";

import { cn, getDefaults } from "@/lib/utils";
import { Settings, Upload } from "lucide-react";
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

type ActionButtonsProps = {
  session: Session;
  quiz: any;
};

const ActionButtons = ({ session, quiz }: ActionButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const [loading, startTransition] = useTransition();

  const addForm = useForm<z.infer<typeof quizSettingsSchema>>({
    resolver: zodResolver(quizSettingsSchema),
    defaultValues: getDefaults(quizSettingsSchema),
  });

  async function onAddSubmit(values: z.infer<typeof quizSettingsSchema>) {
    console.log(values);

    // startAddTransition(async () => {
    //   const data = await initDeposit(session.accessToken, values.amount);
    //   if ("error" in data) {
    //     toast.error(data.error);
    //     return;
    //   } else {
    //     toast.success("Redirection link created successfully");
    //     await revalidatePathServer("/dashboard/billing");
    //     addForm.reset(initDepositDefault);
    //   }
    // });
  }

  const handleUploadQuiz = async () => {
    startTransition(async () => {
      console.log("Upload:", quiz);
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
                name="quizName"
                placeholder="Quiz name"
              />
              <FormInput
                label="Start Date and Time"
                name="startDateTime"
                type="datetime-local"
              />
              <FormInput
                label="End Date and Time"
                name="endDateTime"
                type="datetime-local"
              />
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Create question"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Upload button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Upload
            className={cn(
              `cursor-pointer`,
              loading && "opacity-75 cursor-default animate-bounce"
            )}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload quiz changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to make changes to this quiz?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between">
            <Button onClick={handleUploadQuiz}>Yes</Button>
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
