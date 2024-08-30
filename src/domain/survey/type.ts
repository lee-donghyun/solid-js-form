export interface SurveyForm {
  fname: string;
  lname: string;
  email: string;
  birthday: string;
  sections: {
    title: string;
    description: string;
    questions: (
      | {
          type: "text";
          input: {
            text: string;
          };
        }
      | {
          type: "radio";
          input: {
            options: { text: string; id: string }[];
            defaultOptionId: string | null;
          };
        }
      | {
          type: "checkbox";
          input: {
            options: { text: string; id: string; specificity: "기타" | null }[];
          };
        }
      | {
          type: "date";
          input: null;
        }
    )[];
  }[];
}
