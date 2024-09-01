import { createStore } from "solid-js/store";
import {
  RadioQuestion,
  CheckboxQuestion,
  DateQuestion,
  TextQuestion,
  SurveyForm,
} from "./type";

const getDefaultRadioInput = (): RadioQuestion => ({
  type: "radio",
  input: {
    question: "",
    options: [{ text: "1", id: "1" }],
    defaultOptionId: null,
  },
});

const getDefaultCheckboxInput = (): CheckboxQuestion => ({
  type: "checkbox",
  input: {
    question: "",
    options: [{ text: "1", id: "1", specificity: null }],
  },
});

const getDefaultDateInput = (): DateQuestion => ({
  type: "date",
  input: {
    question: "",
  },
});

const getDefaultTextInput = (): TextQuestion => ({
  type: "text",
  input: {
    question: "",
  },
});

export const DEFAULT_QUESTION = {
  radio: getDefaultRadioInput,
  checkbox: getDefaultCheckboxInput,
  date: getDefaultDateInput,
  text: getDefaultTextInput,
};

export const getDefaultSection = () => ({
  title: "",
  description: "",
  questions: [getDefaultRadioInput()],
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
