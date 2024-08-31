export interface TextQuestion {
  type: "text";
  input: {
    question: string;
  };
}

export interface RadioQuestion {
  type: "radio";
  input: {
    question: string;
    options: { text: string; id: string }[];
    defaultOptionId: string | null;
  };
}

export interface CheckboxQuestion {
  type: "checkbox";
  input: {
    question: string;
    options: { text: string; id: string; specificity: "기타" | null }[];
  };
}

export interface DateQuestion {
  type: "date";
  input: {
    question: string;
  };
}

export interface SurveyForm {
  fname: string;
  lname: string;
  email: string;
  birthday: string;
  sections: {
    title: string;
    description: string;
    questions: (
      | TextQuestion
      | RadioQuestion
      | CheckboxQuestion
      | DateQuestion
    )[];
  }[];
}
