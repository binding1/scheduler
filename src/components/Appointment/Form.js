import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//form mode for appointment component
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //function to reset form and resets student and interview states
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  //function that runs on cancel button, resets state
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //function validates if a student name is inputted and interviewer is selected
  function validate() {
    if (student === null || student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            value={student}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onSubmit={(e) => e.preventDefault()}
            onClick={() => validate()}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
