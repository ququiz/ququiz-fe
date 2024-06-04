import { z } from "zod";

export const newMultipleQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  questionType: z.literal("multiple"),
  options: z
    .array(z.string().min(1, "Answer is required"))
    .length(4, "Options must be 4"),
  answer: z.coerce
    .number()
    .min(1, "There's only four choices...")
    .max(4, "There's only four choices..."),
});

export const newMultipleImageQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  questionType: z.literal("multiple"),
  options: z
    .array(
      z.object({
        value: z.string().min(1, "Answer is required"),
        image: z.string().url().min(1, "Image is required"),
      })
    )
    .length(4, "Options must be 4"),
  answer: z.coerce
    .number()
    .min(1, "There's only four choices...")
    .max(4, "There's only four choices..."),
});

export const newFillQuestionSchema = z.object({
  question: z.string(),
  questionType: z.literal("fill"),
  answer: z.string(),
});

export const quizSettingsSchema = z.object({
  quizName: z.string().min(1, "Quiz name is required"),
  startDateTime: z
    .any()
    .transform((dateString: string) => new Date(dateString))
    .refine((date) => date > new Date(), "Start date must be in the future")
    .transform((date) => date.toISOString()),
  endDateTime: z
    .any()
    .transform((dateString: string) => new Date(dateString))
    .refine((date) => date > new Date(), "End date must be in the future")
    .transform((date) => date.toISOString()),
});
