import { createStore } from "solid-js/store";
import { SurveyForm } from "./type";

export const DEFAULT_SURVEY_FORM: SurveyForm = {
  fname: "",
  lname: "",
  email: "",
  sections: [
    {
      description: "",
      questions: [
        {
          type: "radio",
          input: {
            options: [{ text: "1", id: "1" }],
            defaultOptionId: "1",
          },
        },
      ],
      title: "",
    },
  ],
  birthday: "",
};

export const [surveyStore, setSurveyStore] =
  createStore<SurveyForm>(DEFAULT_SURVEY_FORM);
