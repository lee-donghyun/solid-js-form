import { z } from "zod";
import {
  CheckboxQuestionSchema,
  DateQuestionSchema,
  RadioLinkQuestionSchema,
  RadioQuestionSchema,
  SurveyFormSchema,
  TextQuestionSchema,
} from "./validator";

export type TextQuestion = z.infer<typeof TextQuestionSchema>;
export type RadioQuestion = z.infer<typeof RadioQuestionSchema>;
export type RadioLinkQuestion = z.infer<typeof RadioLinkQuestionSchema>;
export type CheckboxQuestion = z.infer<typeof CheckboxQuestionSchema>;
export type DateQuestion = z.infer<typeof DateQuestionSchema>;
export type SurveyForm = z.infer<typeof SurveyFormSchema>;

export type SurveyFormWithQuestion<
  QuestionType extends SurveyForm["sections"][number]["questions"][number]["type"]
> = Omit<SurveyForm, "sections"> & {
  sections: (Omit<SurveyForm["sections"][number], "questions"> & {
    questions: Extract<
      SurveyForm["sections"][number]["questions"][number],
      { type: QuestionType }
    >[];
  })[];
};
