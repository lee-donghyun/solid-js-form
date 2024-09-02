import { createStore } from "solid-js/store";
import {
  RadioQuestion,
  CheckboxQuestion,
  DateQuestion,
  TextQuestion,
  SurveyForm,
  RadioLinkQuestion,
} from "./type";
import { FormStore, FormValues, PartialValues } from "@modular-forms/solid";

const getDefaultRadioInput = (): RadioQuestion => ({
  radioInput: {
    question: "",
    options: [{ text: "1", id: "1" }],
    defaultOptionId: null,
  },
  type: "radio",
});

const getDefaultRadioLinkInput = (): PartialValues<
  FormValues<FormStore<RadioLinkQuestion>>
> => ({
  radioLinkInput: {
    question: "",
    options: [
      {
        text: "1",
        id: "1",
        nextSectionId: undefined,
        nextSectionQuestionId: undefined,
      },
    ],
    defaultOptionId: null,
  },
  type: "radio-link",
});

const getDefaultCheckboxInput = (): CheckboxQuestion => ({
  checkboxInput: {
    question: "",
    options: [{ text: "1", id: "1", specificity: null }],
  },
  type: "checkbox",
});

const getDefaultDateInput = (): DateQuestion => ({
  dateInput: {
    question: "",
  },
  type: "date",
});

const getDefaultTextInput = (): TextQuestion => ({
  textInput: {
    question: "",
  },
  type: "text",
});

export const getDefaultQuestion = <
  QuestionType extends SurveyForm["sections"][number]["questions"][number]["type"]
>(
  type: QuestionType
) => ({
  ...getDefaultTextInput(),
  ...getDefaultRadioInput(),
  ...getDefaultCheckboxInput(),
  ...getDefaultDateInput(),
  ...getDefaultRadioLinkInput(),
  type,
});

export const getDefaultSection = (): SurveyForm["sections"][number] => ({
  title: "",
  description: "",
  questions: [getDefaultQuestion("radio")],
});

export const getDefaultSurveyForm = (): SurveyForm => ({
  fname: "",
  lname: "",
  email: "",
  sections: [getDefaultSection()],
  birthday: "",
});

export const [surveyStore, setSurveyStore] = createStore<SurveyForm>(
  getDefaultSurveyForm()
);
