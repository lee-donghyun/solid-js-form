import { For, Match, Switch } from "solid-js";
import {
  surveyStore,
  setSurveyStore,
  DEFAULT_QUESTION,
} from "../../domain/survey/store";
import { Select } from "ui/component/select";
import { Input } from "ui/component/input";
import { Button } from "ui/component/base/button";

export const SurveySections = () => {
  return (
    <div class="styled">
      <h3>Section</h3>
      <For each={surveyStore.sections}>
        {(item, index) => (
          <div>
            <h4 class="text-2xl mt-8 mb-5">Section {index() + 1}:</h4>
            <h5 class="text-xl mb-3">Setting:</h5>
            <label>
              Title:
              <Input
                value={item.title}
                onInput={(value) => {
                  setSurveyStore("sections", index(), "title", value);
                }}
              />
            </label>
            <label>
              Description:
              <Input
                value={item.description}
                onInput={(value) => {
                  setSurveyStore("sections", index(), "description", value);
                }}
              />
            </label>
            <For each={item.questions}>
              {(question, questionIndex) => (
                <div>
                  <h4 class="text-xl mt-5 mb-3">
                    Question {questionIndex() + 1}:
                  </h4>
                  <label>
                    Question Type:
                    <Select
                      options={["radio", "checkbox", "date", "text"].map(
                        (o) => ({ label: o, value: o })
                      )}
                      value={question.type}
                      onChange={(value) =>
                        setSurveyStore(
                          "sections",
                          index(),
                          "questions",
                          questionIndex(),
                          DEFAULT_QUESTION[value as "date"]()
                        )
                      }
                    />
                  </label>
                  <Switch fallback={<div>Unknown question type</div>}>
                    <Match when={question.type === "text" ? question : null}>
                      {(question) => (
                        <label>
                          Question:
                          <Input
                            value={question().input.question}
                            onInput={(value) => {
                              setSurveyStore(
                                "sections",
                                index(),
                                "questions",
                                questionIndex(),
                                "input",
                                "question",
                                value
                              );
                            }}
                          />
                        </label>
                      )}
                    </Match>
                    <Match when={question.type === "radio" ? question : null}>
                      {(question) => (
                        <div>
                          <label>
                            Question:
                            <Input
                              value={question().input.question}
                              onInput={(value) => {
                                setSurveyStore(
                                  "sections",
                                  index(),
                                  "questions",
                                  questionIndex(),
                                  "input",
                                  "question",
                                  value
                                );
                              }}
                            />
                          </label>
                          <For each={question().input.options}>
                            {(option, optionIndex) => (
                              <label>
                                Option {optionIndex() + 1}:
                                <div class="flex gap-2">
                                  <Input
                                    class="w-80"
                                    value={option.text}
                                    onInput={(value) => {
                                      setSurveyStore<
                                        any,
                                        any,
                                        any,
                                        any,
                                        any,
                                        any,
                                        any
                                      >(
                                        "sections",
                                        index(),
                                        "questions",
                                        questionIndex(),
                                        "input",
                                        "options",
                                        optionIndex(),
                                        "text",
                                        value
                                      );
                                    }}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setSurveyStore<
                                        any,
                                        any,
                                        any,
                                        any,
                                        any,
                                        any
                                      >(
                                        "sections",
                                        index(),
                                        "questions",
                                        questionIndex(),
                                        "input",
                                        "options",
                                        [
                                          ...question().input.options.slice(
                                            0,
                                            optionIndex() + 1
                                          ),
                                          { id: String(Date.now()), text: "" },
                                          ...question().input.options.slice(
                                            optionIndex() + 1
                                          ),
                                        ]
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                  {question().input.options.length > 0 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        if (
                                          question().input.defaultOptionId ===
                                          option.id
                                        ) {
                                          setSurveyStore<
                                            any,
                                            any,
                                            any,
                                            any,
                                            any,
                                            any
                                          >(
                                            "sections",
                                            index(),
                                            "questions",
                                            questionIndex(),
                                            "input",
                                            "defaultOptionId",
                                            null
                                          );
                                        }
                                        setSurveyStore<
                                          any,
                                          any,
                                          any,
                                          any,
                                          any,
                                          any
                                        >(
                                          "sections",
                                          index(),
                                          "questions",
                                          questionIndex(),
                                          "input",
                                          "options",
                                          (prev: unknown[]) =>
                                            prev.filter(
                                              (_, i) => i !== optionIndex()
                                            )
                                        );
                                      }}
                                    >
                                      -
                                    </Button>
                                  )}
                                </div>
                              </label>
                            )}
                          </For>
                          <label>
                            Default Option:
                            <Select
                              options={question().input.options.map((o) => ({
                                label: o.text,
                                value: o.id,
                              }))}
                              onChange={(value) =>
                                setSurveyStore<any, any, any, any, any, any>(
                                  "sections",
                                  index(),
                                  "questions",
                                  questionIndex(),
                                  "input",
                                  "defaultOptionId",
                                  value
                                )
                              }
                              allowClear
                              value={question().input.defaultOptionId}
                            />
                          </label>
                        </div>
                      )}
                    </Match>
                  </Switch>
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};
