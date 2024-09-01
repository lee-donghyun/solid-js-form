import { createStore } from "solid-js/store";
import {
  RadioQuestion,
  CheckboxQuestion,
  DateQuestion,
  TextQuestion,
  SurveyForm,
} from "./type";

const getDefaultRadioInput = (): RadioQuestion => ({
  radioInput: {
    question: "",
    options: [{ text: "1", id: "1" }],
    defaultOptionId: null,
  },
  type: "radio",
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

export const getDefaultQuestion = (
  type: SurveyForm["sections"][number]["questions"][number]["type"]
): SurveyForm["sections"][number]["questions"][number] => ({
  ...getDefaultRadioInput(),
  ...getDefaultCheckboxInput(),
  ...getDefaultDateInput(),
  ...getDefaultTextInput(),
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
