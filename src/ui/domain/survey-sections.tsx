import { For, Match, Switch, useContext } from "solid-js";
import {
  getDefaultSection,
  getDefaultQuestion,
} from "../../domain/survey/generator";
import { Select } from "ui/component/select";
import { Input } from "ui/component/input";
import { Button } from "ui/component/base/button";
import { HiOutlineMinus, HiOutlinePlus } from "solid-icons/hi";
import { SurveyFormContext } from "domain/survey/context";
import {
  FieldPath,
  getValue,
  insert,
  remove,
  setValue,
} from "@modular-forms/solid";
import { SurveyFormWithQuestion } from "domain/survey/type";
import { SurveyQuestionRadio } from "./survey-question-radio";

export const SurveySections = () => {
  const [form, { Field, FieldArray }] = useContext(SurveyFormContext)!;

  return (
    <div class="styled">
      <h3>Section</h3>
      <FieldArray name="sections">
        {(sectionField) => (
          <For each={sectionField.items}>
            {(_, sectionIndex) => (
              <div>
                <h4 class="text-2xl mt-16 mb-5 flex justify-between">
                  Section {sectionIndex() + 1}:
                  <div class="flex gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      type="button"
                      onClick={() =>
                        insert(form, "sections", { value: getDefaultSection() })
                      }
                    >
                      <HiOutlinePlus />
                    </Button>
                    <Button
                      size="icon"
                      disabled={sectionField.items.length === 1}
                      variant="outline"
                      onClick={() =>
                        remove(form, "sections", { at: sectionIndex() })
                      }
                    >
                      <HiOutlineMinus />
                    </Button>
                  </div>
                </h4>
                <h5 class="text-xl mb-3">Setting:</h5>
                <label>
                  Title:
                  <Field name={`sections.${sectionIndex()}.title`}>
                    {(field, props) => (
                      <Input
                        {...props}
                        value={field.value ?? ""}
                        error={field.error}
                      />
                    )}
                  </Field>
                </label>
                <label>
                  Description:
                  <Field name={`sections.${sectionIndex()}.description`}>
                    {(field, props) => (
                      <Input
                        {...props}
                        value={field.value ?? ""}
                        error={field.error}
                      />
                    )}
                  </Field>
                </label>
                <FieldArray name={`sections.${sectionIndex()}.questions`}>
                  {(questionField) => (
                    <For each={questionField.items}>
                      {(_, questionIndex) => (
                        <div>
                          <h4 class="text-xl mt-8 mb-3 flex justify-between">
                            Question {questionIndex() + 1}:
                            <div class="flex gap-3">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  insert(
                                    form,
                                    `sections.${sectionIndex()}.questions`,
                                    { value: getDefaultQuestion("radio") }
                                  )
                                }
                              >
                                <HiOutlinePlus />
                              </Button>
                              <Button
                                size="icon"
                                disabled={questionField.items.length === 1}
                                variant="outline"
                                onClick={() =>
                                  remove(
                                    form,
                                    `sections.${sectionIndex()}.questions`,
                                    {
                                      at: questionIndex(),
                                    }
                                  )
                                }
                              >
                                <HiOutlineMinus />
                              </Button>
                            </div>
                          </h4>
                          <label>
                            Question Type:
                            <Field
                              name={`sections.${sectionIndex()}.questions.${questionIndex()}.type`}
                            >
                              {(field, props) => (
                                <Select
                                  options={(
                                    [
                                      "radio",
                                      "checkbox",
                                      "date",
                                      "text",
                                      "radio-link",
                                    ] as const
                                  ).map((o) => ({ label: o, value: o }))}
                                  value={field.value ?? "text"}
                                  onChange={(value) =>
                                    value && setValue(form, props.name, value)
                                  }
                                />
                              )}
                            </Field>
                          </label>
                          <Switch fallback={<div>Unknown question type</div>}>
                            <Match
                              when={
                                getValue(
                                  form,
                                  `sections.${sectionIndex()}.questions.${questionIndex()}.type`
                                ) === "text"
                              }
                            >
                              <label>
                                Question:
                                <Field<
                                  FieldPath<SurveyFormWithQuestion<"text">>
                                >
                                  name={`sections.${sectionIndex()}.questions.${questionIndex()}.textInput.question`}
                                >
                                  {(field, props) => (
                                    <Input
                                      {...props}
                                      value={field.value ?? ""}
                                      error={field.error}
                                    />
                                  )}
                                </Field>
                              </label>
                            </Match>
                            <Match
                              when={
                                getValue(
                                  form,
                                  `sections.${sectionIndex()}.questions.${questionIndex()}.type`
                                ) === "radio"
                              }
                            >
                              <SurveyQuestionRadio
                                questionIndex={questionIndex()}
                                sectionIndex={sectionIndex()}
                              />
                            </Match>
                          </Switch>
                        </div>
                      )}
                    </For>
                  )}
                </FieldArray>
              </div>
            )}
          </For>
        )}
      </FieldArray>
    </div>
  );
};
