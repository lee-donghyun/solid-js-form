import { createContext, JSX } from "solid-js";
import { createForm } from "@modular-forms/solid";
import { SurveyForm } from "./type";

type Form = ReturnType<typeof createForm<SurveyForm>>;

export const SurveyFormContext = createContext<
  [
    Form[0],
    Omit<Form[1], "Form"> & {
      HiddenField: (
        props: Omit<Parameters<Form[1]["Field"]>[0], "children">
      ) => JSX.Element;
    }
  ]
>();
