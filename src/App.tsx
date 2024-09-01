import { createForm, zodForm } from "@modular-forms/solid";
import { getDefaultSurveyForm } from "./domain/survey/generator";
import { SurveyInfo } from "./ui/domain/survey-info";
import { SurveySections } from "./ui/domain/survey-sections";
import { Header } from "./ui/layout/header";
import { SurveyForm } from "domain/survey/type";
import { SurveyFormContext } from "domain/survey/context";
import { SurveyFormSchema } from "domain/survey/validator";
import { Button } from "ui/component/base/button";

export const App = () => {
  const [form, { Form, Field, FieldArray }] = createForm<SurveyForm>({
    initialValues: getDefaultSurveyForm(),
    validateOn: "input",
    revalidateOn: "input",
    validate: zodForm(SurveyFormSchema),
  });

  return (
    <>
      <Header />
      <main class="container px-5 mx-auto mt-32">
        <SurveyFormContext.Provider
          value={[
            form,
            {
              Field,
              FieldArray,
              HiddenField: (props) => <Field {...props}>{() => null}</Field>,
            },
          ]}
        >
          <Form onSubmit={console.log}>
            <SurveyInfo />
            <SurveySections />
            <div class="py-10">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </SurveyFormContext.Provider>
      </main>
    </>
  );
};
