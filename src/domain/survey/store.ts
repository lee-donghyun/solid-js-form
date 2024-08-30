import { createStore } from "solid-js/store";
import { SurveyForm } from "./type";

export const getDefaultSurveyForm = (): SurveyForm => ({
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
            question: "",
            options: [{ text: "1", id: "1" }],
            defaultOptionId: "1",
          },
        },
      ],
      title: "",
    },
  ],
  birthday: "",
});

export const [surveyStore, setSurveyStore] = createStore<SurveyForm>(
  getDefaultSurveyForm()
);
