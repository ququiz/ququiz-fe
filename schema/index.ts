import { z } from "zod";

export const newMultipleQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  type: z.literal("MULTIPLE"),
  weight: z.number().int().min(1, "Weight must be at least 1"),
  choices: z
    .array(z.string().min(1, "Answer is required"))
    .length(4, "Options must be 4"),
  answer: z.coerce
    .number()
    .min(1, "There's only four choices...")
    .max(4, "There's only four choices..."),
});

// export const newMultipleImageQuestionSchema = z.object({
//   question: z.string().min(1, "Question is required"),
//   type: z.literal("MULTIPLE"),
//   options: z
//     .array(
//       z.object({
//         value: z.string().min(1, "Answer is required"),
//         image: z.string().url().min(1, "Image is required"),
//       })
//     )
//     .length(4, "Options must be 4"),
//   answer: z.coerce
//     .number()
//     .min(1, "There's only four choices...")
//     .max(4, "There's only four choices..."),
// });

export const newEssayQuestionSchema = z.object({
  question: z.string(),
  type: z.literal("ESSAY"),
  answer: z.string(),
});

export const quizSettingsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start_time: z
    .any()
    .transform((dateString: string) => new Date(dateString))
    .transform((date) => (date ? date.toISOString() : new Date())),
  end_time: z
    .any()
    .transform((dateString: string) => new Date(dateString))
    .refine((date) => date > new Date(), "End date must be in the future")
    .transform((date) => (date ? date.toISOString() : new Date())),
});

export const initQuizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start_time: z
    .any()
    .transform((dateString: string) => new Date(dateString))
    .transform((date) => (date ? date.toISOString() : new Date())),
  end_time: z
    .any()
    .transform((dateString: string) => new Date(dateString))
    .refine((date) => date > new Date(), "End date must be in the future")
    .transform((date) => (date ? date.toISOString() : new Date())),
  questions: z.array(newMultipleQuestionSchema),
});
