import { createForm, zodForm } from "@modular-forms/solid";
import { getDefaultSurveyForm } from "./domain/survey/generator";
import { SurveyInfo } from "./ui/domain/survey-info";
import { SurveySections } from "./ui/domain/survey-sections";
import { Header } from "./ui/layout/header";
import { SurveyForm } from "domain/survey/type";
import { SurveyFormContext } from "domain/survey/context";
import { SurveyFormSchema } from "domain/survey/validator";

export const App = () => {
  const surveyForm = createForm<SurveyForm>({
    initialValues: getDefaultSurveyForm(),
    validateOn: "input",
    revalidateOn: "input",
    validate: zodForm(SurveyFormSchema),
  });

  const [, { Form }] = surveyForm;

  return (
    <>
      <Header />
      <main class="container px-5 mx-auto mt-32">
        <SurveyFormContext.Provider value={surveyForm}>
          <Form onSubmit={console.log}>
            <SurveyInfo />
            <SurveySections />
            <button>sd</button>
          </Form>
        </SurveyFormContext.Provider>
      </main>
    </>
  );
};
