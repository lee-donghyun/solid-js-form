import { DatePicker } from "ui/component/date-picker";
import { Input } from "ui/component/input";
import { useContext } from "solid-js";
import { SurveyFormContext } from "domain/survey/context";
import { setValue } from "@modular-forms/solid";
import { ErrorMessage } from "ui/component/error-message";

export const SurveyInfo = () => {
  const [form, { Field }] = useContext(SurveyFormContext)!;

  return (
    <div class="styled">
      <h3>개인정보</h3>
      <label for="fname">
        First name:
        <Field name="fname">
          {(field, props) => (
            <Input {...props} value={field.value ?? ""} error={field.error} />
          )}
        </Field>
      </label>
      <label for="lname">
        Last name:
        <Field name="lname">
          {(field, props) => (
            <Input {...props} value={field.value ?? ""} error={field.error} />
          )}
        </Field>
      </label>
      <label for="email">
        Email:
        <Field name="email">
          {(field, props) => (
            <Input {...props} value={field.value ?? ""} error={field.error} />
          )}
        </Field>
      </label>
      <label for="birthday">
        Birthday:
        <Field name="birthday">
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
