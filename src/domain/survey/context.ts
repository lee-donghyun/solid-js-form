import { createContext } from "solid-js";
import { createForm } from "@modular-forms/solid";
import { SurveyForm } from "./type";

export const SurveyFormContext =
  createContext<ReturnType<typeof createForm<SurveyForm>>>();
