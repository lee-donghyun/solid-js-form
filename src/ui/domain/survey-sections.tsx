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
  FormStore,
  getValue,
  getValues,
  insert,
  remove,
  setValue,
} from "@modular-forms/solid";
import { SurveyFormWithQuestion } from "domain/survey/type";

export const SurveySections = () => {
  const [form, { Field, FieldArray, HiddenField }] =
    useContext(SurveyFormContext)!;

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
                                    {
                                      value: getDefaultQuestion("radio"),
                                    }
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
                              <div>
                                <label>
                                  Question:
                                  <Field<
                                    FieldPath<SurveyFormWithQuestion<"radio">>
                                  >
                                    name={`sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.question`}
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
                                <FieldArray
                                  name={`sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options`}
                                >
                                  {(optionField) => (
                                    <For each={optionField.items}>
                                      {(_, optionIndex) => (
                                        <label>
                                          Option {optionIndex() + 1}:
                                          <div class="flex gap-2">
                                            <HiddenField
                                              name={`sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options.${optionIndex()}.id`}
                                            />
                                            <Field<
                                              FieldPath<
                                                SurveyFormWithQuestion<"radio">
                                              >
                                            >
                                              name={`sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options.${optionIndex()}.text`}
                                            >
                                              {(field, props) => (
                                                <Input
                                                  {...props}
                                                  value={field.value ?? ""}
                                                  error={field.error}
                                                />
                                              )}
                                            </Field>
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              onClick={() =>
                                                insert(
                                                  form as FormStore<
                                                    SurveyFormWithQuestion<"radio">
                                                  >,
                                                  `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options`,
                                                  {
                                                    value: {
                                                      id: String(Date.now()),
                                                      text: "",
                                                    },
                                                    at: optionIndex() + 1,
                                                  }
                                                )
                                              }
                                            >
                                              <HiOutlinePlus />
                                            </Button>
                                            <Button
                                              disabled={
                                                optionField.items.length === 1
                                              }
                                              variant="outline"
                                              size="icon"
                                              onClick={() => {
                                                if (
                                                  getValue(
                                                    form,
                                                    `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.defaultOptionId`
                                                  ) ===
                                                  getValue(
                                                    form,
                                                    `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options.${optionIndex()}.id`
                                                  )
                                                ) {
                                                  setValue(
                                                    form as FormStore<
                                                      SurveyFormWithQuestion<"radio">
                                                    >,
                                                    `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.defaultOptionId`,
                                                    null
                                                  );
                                                }
                                                remove(
                                                  form,
                                                  `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options`,
                                                  { at: optionIndex() }
                                                );
                                              }}
                                            >
                                              <HiOutlineMinus />
                                            </Button>
                                          </div>
                                        </label>
                                      )}
                                    </For>
                                  )}
                                </FieldArray>
                                <label>
                                  Default Option:
                                  <Field<
                                    FieldPath<SurveyFormWithQuestion<"radio">>
                                  >
                                    name={`sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.defaultOptionId`}
                                  >
                                    {(field, props) => (
                                      <Select
                                        options={
                                          getValues(
                                            form as FormStore<
                                              SurveyFormWithQuestion<"radio">
                                            >,
                                            `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options`
                                          )?.map((o) => ({
                                            label: o?.text ?? "",
                                            value: o?.id ?? "",
                                          })) ?? []
                                        }
                                        placeholder="Select default option"
                                        onChange={(value) =>
                                          setValue(
                                            form as FormStore<
                                              SurveyFormWithQuestion<"radio">
                                            >,
                                            props.name,
                                            value
                                          )
                                        }
                                        allowClear
                                        value={field.value ?? null}
                                      />
                                    )}
                                  </Field>
                                </label>
                              </div>
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
