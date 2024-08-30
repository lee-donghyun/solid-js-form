import { setSurveyStore, surveyStore } from "../../domain/survey/store";

export const SurveyInfo = () => {
  return (
    <div class="styled">
      <h3>개인정보</h3>
      <label for="fname">
        First name:
        <input
          type="text"
          id="fname"
          name="fname"
          onInput={({ target: { value } }) => {
            setSurveyStore("fname", value);
          }}
          value={surveyStore.fname}
        />
      </label>
      <label for="lname">
        Last name:
        <input
          type="text"
          id="lname"
          name="lname"
          onInput={({ target: { value } }) => {
            setSurveyStore("lname", value);
          }}
          value={surveyStore.lname}
        />
      </label>
      <label for="email">
        Email:
        <input
          type="email"
          id="email"
          name="email"
          onInput={({ target: { value } }) => {
            setSurveyStore("email", value);
          }}
          value={surveyStore.email}
        />
      </label>
      <label for="birthday">
        Birthday:
        <input
          type="date"
          id="birthday"
          name="birthday"
          onInput={({ target: { value } }) => {
            setSurveyStore("birthday", value);
          }}
          value={surveyStore.birthday}
        />
      </label>
    </div>
  );
};
