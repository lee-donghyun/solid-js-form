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
import { getValue, insert, remove, setValue } from "@modular-forms/solid";
import { ErrorMessage } from "ui/component/error-message";

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
                      <div>
                        <Input
                          value={field.value ?? ""}
                          onInput={(value) => {
                            setValue(form, props.name, value);
                          }}
                        />
                        <ErrorMessage message={field.error} />
                      </div>
                    )}
                  </Field>
                </label>
                <label>
                  Description:
                  <Field name={`sections.${sectionIndex()}.description`}>
                    {(field, props) => (
                      <div>
                        <Input
                          value={field.value ?? ""}
                          onInput={(value) => {
                            setValue(form, props.name, value);
                          }}
                        />
                        <ErrorMessage message={field.error} />
                      </div>
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
                            <Select
                              options={(
                                ["radio", "checkbox", "date", "text"] as const
                              ).map((o) => ({ label: o, value: o }))}
                              value={
                                getValue(
                                  form,
                                  `sections.${sectionIndex()}.questions.${questionIndex()}.type`
                                ) ?? "text"
                              }
                              onChange={(value) =>
                                value &&
                                setValue(
                                  form,
                                  `sections.${sectionIndex()}.questions.${questionIndex()}.type`,
                                  value
                                )
                              }
                            />
                          </label>
                          {/* <Switch fallback={<div>Unknown question type</div>}>
                            <Match
                              when={
                                getValue(
                                  form,
                                  `sections.${sectionIndex()}.questions.${questionIndex()}.type`
                                ) === "text"
                                  ? question
                                  : null
                              }
                            >
                              {(question) => (
                                <label>
                                  Question:
                                  <Input
                                    value={
                                      question()?.textInput?.question ?? ""
                                    }
                                    onInput={(value) => {
                                      setValue(
                                        form,
                                        `sections.${sectionIndex()}.questions.${questionIndex()}.textInput.question`,
                                        value
                                      );
                                    }}
                                  />
                                </label>
                              )}
                            </Match>
                            <Match
                              when={
                                question?.type === "radio" ? question : null
                              }
                            >
                              {(question) => (
                                <div>
                                  <label>
                                    Question:
                                    <Input
                                      value={
                                        question()?.radioInput?.question ?? ""
                                      }
                                      onInput={(value) =>
                                        setValue(
                                          form,
                                          `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.question`,
                                          value
                                        )
                                      }
                                    />
                                  </label>
                                  <For each={question().radioInput?.options}>
                                    {(option, optionIndex) => (
                                      <label>
                                        Option {optionIndex() + 1}:
                                        <div class="flex gap-2">
                                          <Input
                                            class="w-80"
                                            value={option?.text ?? ""}
                                            onInput={(value) => {
                                              setValue(
                                                form,
                                                `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options.${optionIndex()}.text`,
                                                value
                                              );
                                            }}
                                          />
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                              insert(
                                                form,
                                                `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.options`,
                                                {
                                                  value: {
                                                    id: String(Date.now()),
                                                    text: "",
                                                  },
                                                }
                                              )
                                            }
                                          >
                                            <HiOutlinePlus />
                                          </Button>
                                          {(question()?.radioInput?.options
                                            ?.length ?? 0) > 1 && (
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              onClick={() => {
                                                if (
                                                  question()?.radioInput
                                                    ?.defaultOptionId ===
                                                  option?.id
                                                ) {
                                                  setValue(
                                                    form,
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
                                          )}
                                        </div>
                                      </label>
                                    )}
                                  </For>
                                  <label>
                                    Default Option:
                                    <Select
                                      options={
                                        question()?.radioInput?.options?.map(
                                          (o) => ({
                                            label: o?.text ?? " ",
                                            value: o?.id ?? "",
                                          })
                                        ) ?? []
                                      }
                                      placeholder="Select default option"
                                      onChange={(value) =>
                                        value &&
                                        setValue(
                                          form,
                                          `sections.${sectionIndex()}.questions.${questionIndex()}.radioInput.defaultOptionId`,
                                          value
                                        )
                                      }
                                      allowClear
                                      value={
                                        question()?.radioInput
                                          ?.defaultOptionId ?? null
                                      }
                                    />
                                  </label>
                                </div>
                              )}
                            </Match>
                          </Switch> */}
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
