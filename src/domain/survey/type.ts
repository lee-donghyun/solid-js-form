export interface TextQuestion {
  question: string;
}

export interface RadioQuestion {
  question: string;
  options: { text: string; id: string }[];
  defaultOptionId: string | null;
}

export interface CheckboxQuestion {
  question: string;
  options: { text: string; id: string; specificity: "기타" | null }[];
}

export interface DateQuestion {
  question: string;
}

export interface SurveyForm {
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
}
