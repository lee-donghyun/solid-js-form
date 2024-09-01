import { z } from "zod";
import {
  CheckboxQuestionSchema,
  DateQuestionSchema,
  RadioQuestionSchema,
  SurveyFormSchema,
  TextQuestionSchema,
} from "./validator";

export type TextQuestion = z.infer<typeof TextQuestionSchema>;

export type RadioQuestion = z.infer<typeof RadioQuestionSchema>;

export type CheckboxQuestion = z.infer<typeof CheckboxQuestionSchema>;

export type DateQuestion = z.infer<typeof DateQuestionSchema>;

export type SurveyForm = z.infer<typeof SurveyFormSchema>;
