import { For, Match, Switch } from "solid-js";
import { surveyStore, setSurveyStore } from "../../domain/survey/store";

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
              <input
                type="text"
                name={`section-title-${index()}`}
                value={item.title}
                onInput={({ target: { value } }) => {
                  setSurveyStore("sections", index(), "title", value);
                }}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name={`section-description-${index()}`}
                value={item.description}
                onInput={({ target: { value } }) => {
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
                  <Switch fallback={<div>Unknown question type</div>}>
                    <Match when={question.type === "text" ? question : null}>
                      {(question) => (
                        <label>
                          Question:
                          <input
                            type="text"
                            name={`question-${questionIndex()}`}
                            value={question().input.question}
                            onInput={({ target: { value } }) => {
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
                            <input
                              type="text"
                              name={`question-${questionIndex()}`}
                              value={question().input.question}
                              onInput={({ target: { value } }) => {
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
                                Option:
                                <input
                                  type="text"
                                  name={`option-${optionIndex()}`}
                                  value={option.text}
                                  onInput={({ target: { value } }) => {
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
                                      "text",
                                      value
                                    );
                                  }}
                                />
                              </label>
                            )}
                          </For>
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
