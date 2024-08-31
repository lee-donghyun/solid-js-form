import { getDefaultSurveyForm, setSurveyStore } from "./domain/survey/store";
import { SurveyInfo } from "./ui/domain/survey-info";
import { SurveySections } from "./ui/domain/survey-sections";
import { Header } from "./ui/layout/header";

export const App = () => {
  setSurveyStore(getDefaultSurveyForm());

  return (
    <>
      <Header />
      <main class="container px-5 mx-auto mt-32">
        <SurveyInfo />
        <SurveySections />
      </main>
    </>
  );
};
