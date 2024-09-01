import { DatePicker } from "ui/component/date-picker";
import { Input } from "ui/component/input";
import { useContext } from "solid-js";
import { SurveyFormContext } from "domain/survey/context";
import { email, maxLength, required, setValue } from "@modular-forms/solid";
import { ErrorMessage } from "ui/component/error-message";

export const SurveyInfo = () => {
  const [form, { Field }] = useContext(SurveyFormContext)!;

  return (
    <div class="styled">
      <h3>개인정보</h3>
      <label for="fname">
        First name:
        <Field
          name="fname"
          validate={maxLength(10, "10자 이하로 입력해주세요.")}
        >
          {(field) => (
            <div>
              <Input
                value={field.value ?? ""}
                onInput={(fname) => setValue(form, "fname", fname)}
              />
              <ErrorMessage message={field.error} />
            </div>
          )}
        </Field>
      </label>
      <label for="lname">
        Last name:
        <Field
          name="lname"
          validate={maxLength(10, "10자 이하로 입력해주세요.")}
        >
          {(field) => (
            <div>
              <Input
                value={field.value ?? ""}
                onInput={(lname) => setValue(form, "lname", lname)}
              />
              <ErrorMessage message={field.error} />
            </div>
          )}
        </Field>
      </label>
      <label for="email">
        Email:
        <Field name="email" validate={email("이메일 형식이 아닙니다.")}>
          {(field) => (
            <div>
              <Input
                type="email"
                value={field.value ?? ""}
                onInput={(email) => setValue(form, "email", email)}
              />
              <ErrorMessage message={field.error} />
            </div>
          )}
        </Field>
      </label>
      <label for="birthday">
        Birthday:
        <Field name="birthday" validate={required("반드시 입력해주세요.")}>
          {(field) => (
            <div>
              <DatePicker
                value={field.value ?? ""}
                onInput={(date) => setValue(form, "birthday", date)}
              />
              <ErrorMessage message={field.error} />
            </div>
          )}
        </Field>
      </label>
    </div>
  );
};
