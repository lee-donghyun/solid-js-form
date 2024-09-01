import { For, Match, Switch } from "solid-js";
import {
  surveyStore,
  setSurveyStore,
  getDefaultSection,
  getDefaultQuestion,
} from "../../domain/survey/generator";
import { Select } from "ui/component/select";
import { Input } from "ui/component/input";
import { Button } from "ui/component/base/button";
import { HiOutlineMinus, HiOutlinePlus } from "solid-icons/hi";

export const SurveySections = () => {
  return (
    <div class="styled">
      <h3>Section</h3>
      <For each={surveyStore.sections}>
        {(item, index) => (
          <div>
            <h4 class="text-2xl mt-16 mb-5 flex justify-between">
              Section {index() + 1}:
              <div class="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setSurveyStore("sections", (sections) => [
                      ...sections.slice(0, index() + 1),
                      getDefaultSection(),
                      ...sections.slice(index() + 1),
                    ])
                  }
                >
                  <HiOutlinePlus />
                </Button>
                <Button
                  size="icon"
                  disabled={item.questions.length === 1}
                  variant="outline"
                  onClick={() =>
                    setSurveyStore("sections", (sections) =>
                      sections.filter((_, i) => i !== index())
                    )
                  }
                >
                  <HiOutlineMinus />
                </Button>
              </div>
            </h4>
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
                  <h4 class="text-xl mt-8 mb-3 flex justify-between">
                    Question {questionIndex() + 1}:
                    <div class="flex gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setSurveyStore(
                            "sections",
                            index(),
                            "questions",
                            (questions) => [
                              ...questions.slice(0, questionIndex() + 1),
                              getDefaultQuestion("radio"),
                              ...questions.slice(questionIndex() + 1),
                            ]
                          )
                        }
                      >
                        <HiOutlinePlus />
                      </Button>
                      <Button
                        size="icon"
                        disabled={item.questions.length === 1}
                        variant="outline"
                        onClick={() =>
                          setSurveyStore(
                            "sections",
                            index(),
                            "questions",
                            (prev) =>
                              prev.filter((_, i) => i !== questionIndex())
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
                      value={question.type}
                      onChange={(value) =>
                        value &&
                        setSurveyStore(
                          "sections",
                          index(),
                          "questions",
                          questionIndex(),
                          "type",
                          value
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
                            value={question().textInput.question}
                            onInput={(value) => {
                              setSurveyStore(
                                "sections",
                                index(),
                                "questions",
                                questionIndex(),
                                "textInput",
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
                              value={question().radioInput.question}
                              onInput={(value) => {
                                setSurveyStore(
                                  "sections",
                                  index(),
                                  "questions",
                                  questionIndex(),
                                  "radioInput",
                                  "question",
                                  value
                                );
                              }}
                            />
                          </label>
                          <For each={question().radioInput.options}>
                            {(option, optionIndex) => (
                              <label>
                                Option {optionIndex() + 1}:
                                <div class="flex gap-2">
                                  <Input
                                    class="w-80"
                                    value={option.text}
                                    onInput={(value) => {
                                      setSurveyStore(
                                        "sections",
                                        index(),
                                        "questions",
                                        questionIndex(),
                                        "radioInput",
                                        "options",
                                        optionIndex(),
                                        "text",
                                        value
                                      );
                                    }}
                                  />
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      setSurveyStore(
                                        "sections",
                                        index(),
                                        "questions",
                                        questionIndex(),
                                        "radioInput",
                                        "options",
                                        [
                                          ...question().radioInput.options.slice(
                                            0,
                                            optionIndex() + 1
                                          ),
                                          { id: String(Date.now()), text: "" },
                                          ...question().radioInput.options.slice(
                                            optionIndex() + 1
                                          ),
                                        ]
                                      )
                                    }
                                  >
                                    <HiOutlinePlus />
                                  </Button>
                                  {question().radioInput.options.length > 1 && (
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        if (
                                          question().radioInput
                                            .defaultOptionId === option.id
                                        ) {
                                          setSurveyStore(
                                            "sections",
                                            index(),
                                            "questions",
                                            questionIndex(),
                                            "radioInput",
                                            "defaultOptionId",
                                            null
                                          );
                                        }
                                        setSurveyStore(
                                          "sections",
                                          index(),
                                          "questions",
                                          questionIndex(),
                                          "radioInput",
                                          "options",
                                          (prev) =>
                                            prev.filter(
                                              (_, i) => i !== optionIndex()
                                            )
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
                              options={question().radioInput.options.map(
                                (o) => ({
                                  label: o.text,
                                  value: o.id,
                                })
                              )}
                              placeholder="Select default option"
                              onChange={(value) =>
                                setSurveyStore(
                                  "sections",
                                  index(),
                                  "questions",
                                  questionIndex(),
                                  "radioInput",
                                  "defaultOptionId",
                                  value
                                )
                              }
                              allowClear
                              value={
                                question().radioInput.defaultOptionId ?? null
                              }
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
