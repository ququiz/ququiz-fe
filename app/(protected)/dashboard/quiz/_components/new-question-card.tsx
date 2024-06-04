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
import {
  newMultipleImageQuestionSchema,
  newMultipleQuestionSchema,
} from "@/schema";
import FormRadio from "@/components/form/radio";
import { getDefaults } from "@/lib/utils";

type NewQuestionCardProps = {
  session: Session;
};

const NewQuestionCard = ({ session }: NewQuestionCardProps) => {
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

  return (
    <>
      <Dialog>
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
                name="questionType"
                items={[
                  { value: "multiple", label: "Multiple choice" },
                  { value: "images", label: "Multiple choice (with images)" },
                  { value: "fill", label: "Fill in the blank" },
                ]}
              />
              {questionType === "multiple" && (
                <>
                  <FormInput
                    label="Option 1"
                    name="options[0]"
                    placeholder="Option 1"
                  />
                  <FormInput
                    label="Option 2"
                    name="options[1]"
                    placeholder="Option 2"
                  />
                  <FormInput
                    label="Option 3"
                    name="options[2]"
                    placeholder="Option 3"
                  />
                  <FormInput
                    label="Option 4"
                    name="options[3]"
                    placeholder="Option 4"
                  />
                  <FormInput
                    label="Answer"
                    name="answer"
                    placeholder="Answer"
                  />
                </>
              )}
              {questionType === "images" && (
                <>
                  <FormInput
                    label="Option 1"
                    name="options[0].value"
                    placeholder="Option 1"
                  />
                  <FormInput
                    label="Option 2"
                    name="options[1].value"
                    placeholder="Option 2"
                  />
                  <FormInput
                    label="Option 3"
                    name="options[2].value"
                    placeholder="Option 3"
                  />
                  <FormInput
                    label="Option 4"
                    name="options[3].value"
                    placeholder="Option 4"
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
