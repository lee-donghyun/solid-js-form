import { z } from "zod";

export const RadioQuestionSchema = z.object({
  question: z.string().min(1, "질문을 반드시 입력해주세요."),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "옵션 텍스트를 반드시 입력해주세요."),
        id: z.string().min(1, "옵션 ID를 반드시 입력해주세요."),
      })
    )
    .min(1, "옵션을 최소 하나 이상 입력해주세요."),
  defaultOptionId: z.string().nullable().optional(),
  _type: z.literal("radio"),
});

export const CheckboxQuestionSchema = z.object({
  question: z.string().min(1, "질문을 반드시 입력해주세요."),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "옵션 텍스트를 반드시 입력해주세요."),
        id: z.string().min(1, "옵션 ID를 반드시 입력해주세요."),
        specificity: z.union([z.literal("기타"), z.null()]),
      })
    )
    .min(1, "옵션을 최소 하나 이상 입력해주세요."),
  _type: z.literal("checkbox"),
});

export const DateQuestionSchema = z.object({
  question: z.string().min(1, "질문을 반드시 입력해주세요."),
  _type: z.literal("date"),
});

export const TextQuestionSchema = z.object({
  question: z.string().min(1, "질문을 반드시 입력해주세요."),
  _type: z.literal("text"),
});

export const SurveyFormSchema = z.object({
  fname: z
    .string()
    .max(10, "10자 이하로 입력해주세요.")
    .min(1, "성을 입력해주세요."),
  lname: z
    .string()
    .max(10, "10자 이하로 입력해주세요.")
    .min(1, "이름을 입력해주세요."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  birthday: z.string().min(1, "생일을 입력해주세요."),
  sections: z
    .array(
      z.object({
        title: z.string().min(1, "제목을 반드시 입력해주세요."),
        description: z.string().min(1, "설명을 반드시 입력해주세요."),
        questions: z
          .array(
            z.object({
              type: z.enum(["radio", "checkbox", "date", "text"], {
                message: "유효한 질문 타입이 아닙니다.",
              }),
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
          )
          .min(1, "질문을 최소 하나 이상 추가해주세요."),
      })
    )
    .min(1, "섹션을 최소 하나 이상 추가해주세요."),
});
