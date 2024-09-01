import { DatePicker } from "ui/component/date-picker";
import { setSurveyStore, surveyStore } from "../../domain/survey/store";
import { Input } from "ui/component/input";

export const SurveyInfo = () => {
  return (
    <div class="styled">
      <h3>개인정보</h3>
      <label for="fname">
        First name:
        <Input
          value={surveyStore.fname}
          onInput={(fname) => setSurveyStore("fname", fname)}
        />
      </label>
      <label for="lname">
        Last name:
        <Input
          value={surveyStore.lname}
          onInput={(lname) => setSurveyStore("lname", lname)}
        />
      </label>
      <label for="email">
        Email:
        <Input
          type="email"
          value={surveyStore.email}
          onInput={(email) => setSurveyStore("email", email)}
        />
      </label>
      <label for="birthday">
        Birthday:
        <DatePicker value={surveyStore.birthday} onInput={console.log} />
      </label>
    </div>
  );
};
