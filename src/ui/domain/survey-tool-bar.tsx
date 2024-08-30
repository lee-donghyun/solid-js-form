import { unwrap } from "solid-js/store";
import {
  getDefaultSurveyForm,
  setSurveyStore,
  surveyStore,
} from "../../domain/survey/store";

export const SurveyToolBar = () => {
  return (
    <div class="fixed right-10 bottom-16 rounded-full flex flex-col gap-3">
      <button
        class="bg-blue-400 rounded-full text-white size-10 text-xs"
        onClick={() => {
          setSurveyStore("sections", (prev) => [
            ...prev,
            ...getDefaultSurveyForm().sections,
          ]);
        }}
      >
        섹션추가
      </button>
      <button
        class="bg-blue-400 rounded-full text-white size-10 text-xs"
        onClick={() => {
          console.log("load");
        }}
      >
        질문추가
      </button>
      <button
        class="bg-blue-400 rounded-full text-white size-10 text-xs"
        onClick={() => {
          console.log(unwrap(surveyStore));
        }}
      >
        저장
      </button>
    </div>
  );
};
