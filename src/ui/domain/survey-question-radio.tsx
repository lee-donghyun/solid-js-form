import {
  FieldPath,
  insert,
  FormStore,
  getValue,
  setValue,
  remove,
  getValues,
} from "@modular-forms/solid";
import { SurveyFormContext } from "domain/survey/context";
import { SurveyFormWithQuestion } from "domain/survey/type";
import { HiOutlinePlus, HiOutlineMinus } from "solid-icons/hi";
import { useContext, For } from "solid-js";
import { Button } from "ui/component/base/button";
import { Input } from "ui/component/input";
import { Select } from "ui/component/select";

interface SurveyQuestionRadioProps {
  sectionIndex: number;
  questionIndex: number;
}

export const SurveyQuestionRadio = (props: SurveyQuestionRadioProps) => {
  const [form, { Field, FieldArray, HiddenField }] =
    useContext(SurveyFormContext)!;
  return (
    <div>
      <label>
        Question:
        <Field<FieldPath<SurveyFormWithQuestion<"radio">>>
          name={`sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.question`}
        >
          {(field, props) => (
            <Input {...props} value={field.value ?? ""} error={field.error} />
          )}
        </Field>
      </label>
      <FieldArray
        name={`sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.options`}
      >
        {(optionField) => (
          <For each={optionField.items}>
            {(_, optionIndex) => (
              <label>
                Option {optionIndex() + 1}:
                <div class="flex gap-2">
                  <HiddenField
                    name={`sections.${props.sectionIndex}.questions.${
                      props.questionIndex
                    }.radioInput.options.${optionIndex()}.id`}
                  />
                  <Field<FieldPath<SurveyFormWithQuestion<"radio">>>
                    name={`sections.${props.sectionIndex}.questions.${
                      props.questionIndex
                    }.radioInput.options.${optionIndex()}.text`}
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
                        form as FormStore<SurveyFormWithQuestion<"radio">>,
                        `sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.options`,
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
                    disabled={optionField.items.length === 1}
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (
                        getValue(
                          form,
                          `sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.defaultOptionId`
                        ) ===
                        getValue(
                          form,
                          `sections.${props.sectionIndex}.questions.${
                            props.questionIndex
                          }.radioInput.options.${optionIndex()}.id`
                        )
                      ) {
                        setValue(
                          form as FormStore<SurveyFormWithQuestion<"radio">>,
                          `sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.defaultOptionId`,
                          null
                        );
                      }
                      remove(
                        form,
                        `sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.options`,
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
        <Field<FieldPath<SurveyFormWithQuestion<"radio">>>
          name={`sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.defaultOptionId`}
        >
          {(field, fieldProps) => (
            <Select
              options={
                getValues(
                  form as FormStore<SurveyFormWithQuestion<"radio">>,
                  `sections.${props.sectionIndex}.questions.${props.questionIndex}.radioInput.options`
                )?.map((o) => ({
                  label: o?.text ?? "",
                  value: o?.id ?? "",
                })) ?? []
              }
              placeholder="Select default option"
              onChange={(value) =>
                setValue(
                  form as FormStore<SurveyFormWithQuestion<"radio">>,
                  fieldProps.name,
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
  );
};
