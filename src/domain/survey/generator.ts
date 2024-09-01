import { createStore } from "solid-js/store";
import {
  RadioQuestion,
  CheckboxQuestion,
  DateQuestion,
  TextQuestion,
  SurveyForm,
} from "./type";

const getDefaultRadioInput = (): RadioQuestion => ({
  question: "",
  options: [{ text: "1", id: "1" }],
  defaultOptionId: null,
  _type: "radio",
});

const getDefaultCheckboxInput = (): CheckboxQuestion => ({
  question: "",
  options: [{ text: "1", id: "1", specificity: null }],
  _type: "checkbox",
});

const getDefaultDateInput = (): DateQuestion => ({
  question: "",
  _type: "date",
});

const getDefaultTextInput = (): TextQuestion => ({
  question: "",
  _type: "text",
});

export const getDefaultQuestion = (
  type: SurveyForm["sections"][number]["questions"][number]["type"]
): SurveyForm["sections"][number]["questions"][number] => ({
  type,
  radioInput: getDefaultRadioInput(),
  checkboxInput: getDefaultCheckboxInput(),
  dateInput: getDefaultDateInput(),
  textInput: getDefaultTextInput(),
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
