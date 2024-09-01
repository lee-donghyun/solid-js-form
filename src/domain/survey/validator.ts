import { z } from "zod";

export const RadioQuestionSchema = z.object({
  question: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      id: z.string(),
    })
  ),
  defaultOptionId: z.string().nullable(),
  _type: z.literal("radio"),
});

export const CheckboxQuestionSchema = z.object({
  question: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      id: z.string(),
      specificity: z.union([z.literal("기타"), z.null()]),
    })
  ),
  _type: z.literal("checkbox"),
});

export const DateQuestionSchema = z.object({
  question: z.string(),
  _type: z.literal("date"),
});

export const TextQuestionSchema = z.object({
  question: z.string(),
  _type: z.literal("text"),
});

export const SurveyFormSchema = z.object({
  fname: z.string().max(10, "10자 이하로 입력해주세요."),
  lname: z.string().max(10, "10자 이하로 입력해주세요."),
  email: z.string().email("이메일 형식이 아닙니다."),
  birthday: z.string().date("반드시 입력해주세요."),
  sections: z.array(
    z.object({
      title: z.string().min(1, "반드시 입력해주세요."),
      description: z.string().min(1, "반드시 입력해주세요."),
      questions: z.array(
        z.object({
          type: z.enum(["radio", "checkbox", "date", "text"]),
          radioInput: z
            .lazy(() => RadioQuestionSchema)
            .refine((v) => v?._type === "radio", "라디오 타입이 아닙니다."),
          checkboxInput: z
            .lazy(() => CheckboxQuestionSchema)
            .refine(
              (v) => v?._type === "checkbox",
              "체크박스 타입이 아닙니다."
            ),
          dateInput: z
            .lazy(() => DateQuestionSchema)
            .refine((v) => v?._type === "date", "날짜 타입이 아닙니다."),
          textInput: z
            .lazy(() => TextQuestionSchema)
            .refine((v) => v?._type === "text", "텍스트 타입이 아닙니다."),
        })
      ),
    })
  ),
});
