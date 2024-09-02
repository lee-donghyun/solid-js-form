import { z } from "zod";

export const RadioQuestionSchema = z.object({
  radioInput: z.object({
    question: z.string().min(1, "질문을 반드시 입력해주세요."),
    options: z
      .array(
        z.object({
          text: z.string().min(1, "옵션 텍스트를 반드시 입력해주세요."),
          id: z.string().min(1, "옵션 ID를 반드시 입력해주세요."),
        })
      )
      .min(1, "옵션을 최소 하나 이상 입력해주세요."),
    defaultOptionId: z.string().nullable(),
  }),
  type: z.literal("radio"),
});
export const RadioLinkQuestionSchema = z.object({
  radioLinkInput: z.object({
    question: z.string().min(1, "질문을 반드시 입력해주세요."),
    options: z
      .array(
        z.object({
          text: z.string().min(1, "옵션 텍스트를 반드시 입력해주세요."),
          id: z.string().min(1, "옵션 ID를 반드시 입력해주세요."),
          nextSectionId: z
            .string()
            .min(1, "다음 섹션 ID를 반드시 입력해주세요."),
          nextSectionQuestionId: z
            .string()
            .min(1, "다음 섹션 질문 ID를 반드시 입력해주세요."),
        })
      )
      .min(1, "옵션을 최소 하나 이상 입력해주세요."),
    defaultOptionId: z.string().nullable(),
  }),
  type: z.literal("radio-link"),
});

export const CheckboxQuestionSchema = z.object({
  checkboxInput: z.object({
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
  }),
  type: z.literal("checkbox"),
});

export const DateQuestionSchema = z.object({
  dateInput: z.object({
    question: z.string().min(1, "질문을 반드시 입력해주세요."),
  }),
  type: z.literal("date"),
});

export const TextQuestionSchema = z.object({
  textInput: z.object({
    question: z.string().min(1, "질문을 반드시 입력해주세요."),
  }),
  type: z.literal("text"),
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
            z.discriminatedUnion("type", [
              RadioQuestionSchema,
              CheckboxQuestionSchema,
              DateQuestionSchema,
              TextQuestionSchema,
              RadioLinkQuestionSchema,
            ])
          )
          .min(1, "질문을 최소 하나 이상 추가해주세요."),
      })
    )
    .min(1, "섹션을 최소 하나 이상 추가해주세요."),
});
