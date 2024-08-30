export const SurveyInfo = () => {
  return (
    <div class="styled">
      <h3>개인정보</h3>
      <label for="fname">
        First name:
        <input type="text" id="fname" name="fname" />
      </label>
      <label for="lname">
        Last name:
        <input type="text" id="lname" name="lname" />
      </label>
      <label for="email">
        Email:
        <input type="email" id="email" name="email" />
      </label>
      <label for="birthday">
        Birthday:
        <input type="date" id="birthday" name="birthday" />
      </label>
    </div>
  );
};
