import { SurveyInfo } from "./ui/domain/survey-info";
import { Header } from "./ui/layout/header";

export const App = () => {
  return (
    <>
      <Header />
      <main class="container px-5 mx-auto mt-32">
        <SurveyInfo />
      </main>
    </>
  );
};
