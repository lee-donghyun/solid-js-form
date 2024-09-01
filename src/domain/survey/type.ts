export type TextQuestion = {
  question: string;
};

export type RadioQuestion = {
  question: string;
  options: { text: string; id: string }[];
  defaultOptionId: string | null;
};

export type CheckboxQuestion = {
  question: string;
  options: { text: string; id: string; specificity: "기타" | null }[];
};

export type DateQuestion = {
  question: string;
};

export type SurveyForm = {
  fname: string;
  lname: string;
  email: string;
  birthday: string;
  sections: {
    title: string;
    description: string;
    questions: {
      type: "radio" | "checkbox" | "date" | "text";
      radioInput: RadioQuestion;
      checkboxInput: CheckboxQuestion;
      dateInput: DateQuestion;
      textInput: TextQuestion;
    }[];
  }[];
};
